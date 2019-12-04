from bs4 import BeautifulSoup
import requests
import json
import logging
import re
import decimal
from re import sub
class Scraper:
    def __init__(self):
        """
        constuctor
        """
        self.job_count = 0
        self.job_title = []
        self.company_name = []
        self.location = []
        self.salary = []
        self.job_summary = []
        self.company_link = []
        self.company_img = []

    def print_dict(self, dict):
        """
        print the dictionary in a pretty way
        :param dict: given dictionary
        :return: none
        """
        for key in dict.keys():
            print("key = ", key)
            print('value = ', dict[key])
            print()



    # this functino will return 150 links to jobs description
    def scrape(self, url):
        count = 0
        try:
            page = requests.get(url)

        except:
            logging.error("requests CANT get starting page")
            print("url: ", url)
            return

        starting_soup = BeautifulSoup(page.text, "html.parser")
        # print(starting_soup)
        if starting_soup == None:
            logging.error("soup can not be created for starting page")
            return
        count = 0
        for div in starting_soup.find_all(name='div', attrs={'class':'row'}):
            # title
            for a in div.find_all(name='a', attrs={'data-tn-element':'jobTitle'}):
                self.job_title.append(a['title'])
                self.job_count +=1

            ## find company link
            divs = div.find_all(name='a', attrs={'data-tn-element':'companyName'})
            for a in divs:
                self.company_link.append('https://www.indeed.com'+a['href'])

            if len(divs) == 0 :
                self.company_link.append("No Company Link")

            # self.company_name
            company = div.find_all(name='span', attrs={'class':'company'})
            if len(company) > 0:
                for b in company:
                    self.company_name.append(b.text.strip())
            else:
                sec_try = div.find_all(name='span', attrs={'class':'result-link-source'})
                for span in sec_try:
                    self.company_name.append(span.text.strip())

            try:
                self.salary.append(div.find('nobr').text)
            except:
                try:
                    div_two = div.find(name='span', attrs={'class':'salaryText'})
                    # div_three = div_two.find('div')
                    self.salary.append(div_two.text.strip())
                except:
                    self.salary.append('No salary Info')


        # self.location
        spans = starting_soup.findAll(['span','div'], attrs={'class': 'location'})
        for span in spans:
            self.location.append(span.text)


        ## job summary Not working
        spans = starting_soup.findAll('div', attrs={'class': 'summary'})
        for span in spans:
            self.job_summary.append(span.text.strip())



        # print(self.job_summary)
        if self.job_count < 150:
            end  = len(url)-2
            base = url[0:end]
            number = url[end:end+2]
            next_num = str(int(number)+10)
            next_url = base+next_num
            print(self.job_count)
            self.scrape(next_url)

        else:
            ## get company pictures
            # count_link = 0


            ## store into json
            # print(len(self.company_name),len(self.location),len(self.salary),len(self.company_img),len(self.company_link),len(self.job_summary),len(self.job_title))
            list = []
            for i in range(self.job_count):
                dict = {}
                dict["company_name"] = self.company_name[i]
                dict["location"] = self.location[i]
                dict["salary"] = self.salary[i]
                dict["job_summary"] = self.job_summary[i]
                dict["company_link"] = self.company_link[i]
                img = "No Company Image"
                print(i,dict["company_link"])

                ## get company imgs
                try:
                    page = requests.get(dict["company_link"])

                except:
                    logging.error("requests CANT get starting page")
                    print("url: ", dict["company_link"])
                    dict['company_img']  = "No Company Image"
                    outter_dict ={}
                    outter_dict[self.job_title[i]] = dict
                    list.append(outter_dict)
                    continue

                starting_soup = BeautifulSoup(page.text, "html.parser")
                # print(starting_soup)
                if starting_soup == None:
                    logging.error("soup can not be created for starting page")
                    dict['company_img']  = "No Company Image"
                    outter_dict ={}
                    outter_dict[self.job_title[i]] = dict
                    list.append(outter_dict)
                    continue

                divs = starting_soup.findAll('div', attrs={'class': 'cmp-HeaderImage'})
                for div in divs:
                    full_img_link = div['style']
                    desired_img_link = div['style'][22:]
                    desired_img_link = desired_img_link[:len(desired_img_link)-2]
                    img  = desired_img_link

                dict['company_img'] = img
                outter_dict ={}
                outter_dict[self.job_title[i]] = dict
                list.append(outter_dict)

            with open('jobs.json', 'w') as fp:
                json.dump(list, fp, indent=4)
