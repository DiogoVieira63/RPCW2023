import json


file = open('mapa.json', 'r') 

mapa = json.load(file)

cidades = mapa['cidades']

ligacoes = mapa['ligações']

ligacoesList = {}
# ligacoesList = {ligacao['origem']: [ligacao]}
for ligacao in ligacoes:
    if ligacao['origem'] not in ligacoesList:
        ligacoesList[ligacao['origem']] = []  
    ligacoesList[ligacao['origem']].append(ligacao)

cidades.sort(key=lambda x: x['nome'])

cidadesList = {}
# cidadesList = {cidade['id']: cidade['nome']}
for cidade in cidades:
    cidadesList[cidade['id']] = cidade['nome']


for key,value in ligacoesList.items():
    value.sort(key=lambda x: cidadesList[x['destino']])


registos=""
indices=""

for linha in cidades: 
    id = linha['id']
    nome = linha['nome']
    anchorIndice = f'<li><a href="#{id}">{nome}</a></li>\n'
    indices += anchorIndice
    table= f'<a name="{id}"/>\n'
    title = f'<h2>{nome}</h2>\n'
    table += title
    for key,value in linha.items():
        if key != 'id' and key != 'nome':
            table += f'<p><b>{key.capitalize()}</b>: {value}</p>\n'
    if id in ligacoesList: 
        table += f'<h2>Ligações</h2>\n'
        table += "<ul>\n"
        for ligacao in ligacoesList[id]:
            destino = cidadesList[ligacao['destino']]
            distancia = ligacao['distância']
            table += f'<li><p><a href="#{ligacao["destino"]}">{destino}</a>: {distancia} km</p></li>\n'
        table += "</ul>\n"
    table += f"<address><a href='#Indice'>[Voltar ao Indice]</a></address>\n"
    registos += f"<l1>{table}</l1>\n<center><hr width='80%'></center>\n"
    


pageWeb=f"""
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Mapa Virtual</title>
</head>
<body>
    <center><h1>Mapa Virtual</h1></center>
    <table>
        <tr>
            <td width="30%" valign="top">
                <a name="Indice"/>
                <h3>Indíce</h3>
                <ul>
                {indices}
                </ul>
                <!--Lista de Indice-->
            </td>
            <td width="70%">
                <h2>Registos</h2> 
                <ul>  
                {registos}
                </ul>
            </td>
        </tr>
    </table>
</body>
</html>
"""


#from bs4 import BeautifulSoup
#pageWeb = (BeautifulSoup(pageWeb, 'html.parser').prettify())



file = open('mapa.html', 'w')
file.write(pageWeb)
file.close()
