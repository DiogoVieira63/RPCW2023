import requests
from bs4 import BeautifulSoup



def generate_person(index):
        print(index)
        page = "https://this-person-does-not-exist.com/en"
        response_page = requests.get(page)
        if response_page.status_code == 200:
            soup = BeautifulSoup(response_page.content, 'html.parser')
            img = soup.find("img", {"id": "avatar"})
            img_url = "https://this-person-does-not-exist.com" + f"{img['src']}"
            return img_url