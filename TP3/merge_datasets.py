

import json
import multiprocessing
import generate_persons


  
all = {"pessoas" : []}

datasets = ['dataset-extra1.json', 'dataset-extra2.json', 'dataset-extra3.json', 'dataset.json']

for dataset in datasets:
    with open("datasets/" +dataset) as f:
        data = json.load(f)
        all["pessoas"] += data["pessoas"]


pool = multiprocessing.Pool()
result_async = [pool.apply_async(generate_persons.generate_person,args = (i, )) for i in
                range(len(all["pessoas"]))]
results = [r.get() for r in result_async]

for index,entrada in enumerate(all["pessoas"]):
    entrada["id"] = f"p{index + 1}"
    entrada["foto"] = results[index]


all["pessoas"] = sorted(all["pessoas"], key=lambda k: k['nome'])


with open('datasets/all_dataset.json', 'w') as f:
    json.dump(all, f, indent=4)
