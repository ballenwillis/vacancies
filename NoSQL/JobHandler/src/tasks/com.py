from pymongo import MongoClient
from pprint import pprint
from random import randint
import json
import sys

#       python3 operation <JsonObject>  collection additionalArguments
# eg: # python3 insert    <JsonObject>  projects

def insert_record(db, input, collection):
    data = json.loads(input)
    result = db[collection].insert_one(data)
    pprint(result)
    return

def update_record(db, to_update, collection, additional_args):
    if (additional_args == None):
        exit("update requires additional_args that haven't been provided")
    data = json.loads(to_update)
    args = json.loads(additional_args)
    result = db[collection].update_one(data, args)
    pprint(result)
    return None

def find_record(db, query, collection, additional_args):
    data = json.loads(query)
    if (additional_args == None):
        result = db[collection].find(data)
    else:
        args = json.loads(additional_args)
        result = db[collection].find(data, args)
    for i in result:
        pprint(i)
    return result

def delete_record(db, index, collection):
    data = json.loads(index)
    result = db[collection].delete_one(data)
    pprint(result)
    return None

def main_func(operation, data, collection, additional_args, option="-port", location="27017"):
    if (option == "-port"):
        client = MongoClient(port=int(location))
    elif (option == "-path"):
        client = MongoClient(location)
    else:
        exit("Invalid option!\nOptions are either '-port' or '-path'")

    print(data)

    db = client.vacancies
    serverStatusResult=db.command("serverStatus")


    if (operation == "insert"):
        insert_record(db, data, collection)
    elif (operation == "update"):
        update_record(db, data, collection, additional_args)
    elif (operation == "find"):
        return find_record(db, data, collection, additional_args)
    elif (operation == "delete"):
        delete_record(db, data, collection)
    else:
        exit("Invalid operation!\n")


# python3 insert <JsonObject> projects -port 27017
if __name__ == '__main__':
    if (len(sys.argv) < 4):
        print("wrong number of arguments")
        exit("That was bad")

    operation = sys.argv[1]
    data = sys.argv[2]
    collection = sys.argv[3]
    if (len(sys.argv) == 5):
        additional_args = sys.argv[4]
    else:
        additional_args = None

    main_func(operation, data, collection, additional_args)
