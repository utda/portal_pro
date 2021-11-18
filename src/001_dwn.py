import requests
import json

map = {
    "cpas": "https://da.dl.itc.u-tokyo.ac.jp/portal/search?kywd=&title=&author=&publisher=&collection=All&facet%5B0%5D=collection%3A205&facet%5B1%5D=original_owner%3A215&items_per_page=200&sort_by=search_api_relevance&_format=json",
    "l": "https://da.dl.itc.u-tokyo.ac.jp/portal/search?kywd=&title=&author=&publisher=&collection=All&items_per_page=200&sort_by=search_api_relevance&facet%5B0%5D=collection%3A132&facet%5B1%5D=department%3A25&_format=json",
    "iii": "https://da.dl.itc.u-tokyo.ac.jp/portal/search?kywd=&title=&author=&publisher=&collection=All&items_per_page=200&sort_by=search_api_relevance&facet%5B0%5D=collection%3A81&facet%5B1%5D=department%3A27&facet%5B0%5D=collection%3A81&facet%5B1%5D=department%3A27&_format=json"
}

index = []

for id in map:

    page = 0

    prefix = map[id]

    flg = True

    while flg:

        print("id", id, "page", page)

        url = prefix + "&page=" + str(page)

        df = requests.get(url).json()

        for item in df:
            fulltext = ""
            item2 = {
                "objectID" : item["id"].split("/")[-1].split("?")[0],
                "label" : item["title"],
                # "type" : item["type"],
                "collection" : item["collection"],
                "department" : item["department"],
                # "creator" : ,
                # "publisher" : ,
                # "publication_place" : item["publication_place"],
                "thumbnail" : item["thumbnail_url"]
            }

            creator = item["creator"]
            publisher = item["publisher"]

            if creator != "":
                item2["creator"] = creator

            if publisher != "":
                item2["publisher"] = publisher
            

            fulltext = item["title"] + " " + item["type"] + " " + item["collection"] + " " + item["department"] + " " + item["creator"] + " " + item["publisher"]

            item2["fulltext"] = fulltext.strip()

            index.append(item2)

        if len(df) == 0:
            flg = False

        page += 1

print(len(index))

with open("data/index.json", mode='wt', encoding='utf-8') as file:
    json.dump(index, file, ensure_ascii=False, indent=2)