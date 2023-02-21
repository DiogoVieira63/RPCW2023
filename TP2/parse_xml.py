# Import BeautifulSoup
from bs4 import BeautifulSoup as bs

import os


mapTags = {
    "identi": "identidade",
    "descri":"descrição",
    "crono":"cronologia",
    "fregue":"freguesia",
    "concel":"concelho",
    "codadm":"código administrativo",
    "latitu":"latitude",
    "longit":"longitude",
    "altitu":"altitude",
    "biblio":"bibliografia",
    "traarq":"traçado arqueológico",
    "desarq":"descrição arqueológica",
    "interp":"interpretação",
    "intere":"interesses",
    "deposi":"deposição",
}




def parse_xml(filename):
    content = []
    # Read the XML file
    with open("arq.xml", "r") as file:
        # Read each line in the file, readlines() returns a list of lines
        content = file.readlines()
    # Combine the lines in the list into a string
    content = "".join(content)
    return bs(content, "lxml")

bs_content = parse_xml("arq.xml")

elems = bs_content.find_all("arqelem")


def write_file(text,name):
    f = open(name, "w")
    f.write(text)
    f.close()


def write_files_xml():
    if not os.path.exists("arq_xml"):
        os.makedirs("arq_xml")
    for elem in range(1,len(elems)):
        name = "arq_xml/arq"+str(elem)+".xml"
        write_file(str(elems[elem]),name)

elems.sort(key=lambda x: x.find("identi").text.strip())

write_files_xml()


def build_html():
    indices = ""
    for elem in range(1,len(elems)):
        name =elems[elem].find("identi").text.strip()
        indices += f"<li><address><a href='{elem}'>{name}</a></address></li>\n"
    return indices

indices = build_html()


pageWeb=f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Indices</title>
</head>
<body>
    <center><h1>Indices</h1></center>
        <a name="Indice"/>
        <h3>Indíce</h3>
        <ul>
        {indices}
        </ul>
</body>
</html>
"""

file = open('index.html', 'w')
file.write(pageWeb)
file.close()


def createList(d):
    lista = ""
    for key,value in d.items():
        if len(value) == 1:
            lista += f"<li><p><b>{key.capitalize()}:</b>{value[0]}</p></li>\n"
        else:
            lista += f"<li><p><b>{key.capitalize()}:</b></p><ul>\n"
            for v in value:
                lista += f"<li><p>{v}</p></li>\n"
            lista += f"</ul></li>\n"
    return lista





def convert_to_html():
    if not os.path.exists("arq_html"):
        os.makedirs("arq_html")
    for elem in range(1,len(elems)):
        d = {}
        lista = ""
        namePage =elems[elem].find("identi").text.strip()
        for line in list(elems[elem].children):
            try:
                name = line.name
                if name in mapTags:
                    name = mapTags[name]
                if line.text:
                    if name in d:
                        d[name].append(line.text)
                    else:
                        d[name]=[line.text]
            except:
                pass
        lista = createList(d)
        pageWeb=f"""
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>{namePage}</title>
</head>
<h1>{namePage}</h1>
<body>
<ul>
{lista}
</ul>
<a href="/"><h3>Voltar ao indice</h3></a>
</body>
</html>
        """
        write_file(pageWeb,"arq_html/arq"+str(elem)+".html")

convert_to_html()











