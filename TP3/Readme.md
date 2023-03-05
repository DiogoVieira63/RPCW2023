<p>First of all, all the available datasets were merge into one. 
    There were 4 different datasets, all with unique records that resulted in one final dataset with 16000 unique entries</p>
<p>In this process, it was added an attribute <b>id</b> to each record. And an attribute <b>foto</b> that will be explained afterwards.</p>
<p>The data layer of the service will be provided with the help of <xref url="https://www.npmjs.com/package/json-server">Json Server</xref>.</p>
<p>The service will be created with <b>node.js</b> and is able to answer the following queries:</p>
<ul>
    <li>List of all records</li>
    <li>Sports Distribution</li>
    <li>Sex Distribution</li>
    <li>Top 10 professions</li>
</ul>
<p>There are 6 different pages:</p>
<ul>
    <li>Main page, that presents all the options above.</li>
    <li>One page for each option (Sports Distribution,Sex Distribution and Top 10 Professions)</li>
    <li>A page that presents a list of people and some of their attributes. Each row is clickable, and it redirects to that person's page.</li>
    <li>A page for each person that contains all information about them.</li>
</ul>
<p>All the pages are created at <xref url="mypages.js">my pages</xref> file. 
    This file has specific functions for each page, and more generic functions to buttons and other elements that are reused between pages.</p>
<p>All the styling used was done with <xref url="w3.css">w3 css</xref>.</p>
<p>To make each person card more real,it was added a photo. All the photos were gotten via <xref url="https://this-person-does-not-exist.com">This person does not exist</xref>.
This process was made in the merge of the datasets with the help of a small<xref url="generate_persons.py">script</xref>.</p> 
<p>Each person has now a field named <b>foto</b> that is a link to that person's photo.</p>
