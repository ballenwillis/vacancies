from scraper import Scraper

def main():
    starting_page = 'https://www.indeed.com/jobs?q=&l=Champaign%2C+IL&start=10'
    scraper = Scraper()
    scraper.scrape(starting_page)
    # scraper.store_to_json() ## json file has 100 jobs information


if __name__ == "__main__":
    main()
