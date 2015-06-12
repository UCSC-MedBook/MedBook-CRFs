## MedBook-CRFs


This is an implementation of Clinical Report Forms for MedBook using Meteor.


==================================
#### Installation

````sh
$ git clone https://github.com/UCSC-MedBook/MedBook-CRFs
$ meteor
````



==================================
#### Import Data

````sh
# import the data into mongo database
$ cd webapp
$ mongoimport --port 3001 -d meteor -c clinical_oncore clinical_oncore.sample

# then launch the app in the development environment
ROOT_URL=http://localhost/CRF/ meteor

# and run the ingestion script by navigation to the following url
http://localhost:3000/CRF/ingestOncore
````

==================================
#### Run Tests  

````sh
# install the starrynight test runner
$ npm install starrynight -g

# launch meteor
$ ROOT_URL=http://localhost/CRF/ meteor

# launch the test runner  
$ starrynight run-tests --framework nightwatch
````

==================================
#### Style Guide  

- DON'T USE ABBREVIATIONS.  Use camelCase and be somewhat verbose in naming variables.  
- We're not limited to 64kb of memory.  Variables should have at least 5 chars in their name; preferably 7.
- Write variables and function names as if you were writing instructions that another *human* will be reading.
- Don't use the Tracker API if you can avoid it.  It's an infrastructure API.  Use Blaze instead (it uses Tracker for you).
- Templates should go in /client, not in /lib.
- Add an id to any globally unique UI element that a user might click on
- Always use braces { }; don't get clever with implicit if/else syntax
- Query field filters should be specified with 'true' rather than '1'
- Don't use variables starting with a dollar sign.  $ is used as a keyword indicator in Mongo!
- Class names shouldn't have punctuation:  parentheses, question marks, etc.
- Be consistent with single vs double quotes; pick one
- Be consistent with indentation

==================================
#### Bad Grammar and Syntax Habits

Always use braces.  Javascript doesn't recognize whitespace syntax.  
Implicit if/else clausing will only work on the FIRST line following an if/else

````js
if(foo)
  doSomething();
else
  doSomethingElse();
  doAnotherThing();  // this won't get run!  
````



==================================
#### Architecture Questions
- Do we really need to prefix everything with 'CRF'?
- What is the benefit of being able to sort/order tables and menu items?
- Do the benefits justify the architectural complexity/abstractions that sorting introduces?
- Why are we attaching collections to the window[] object???  :(
- What happens when list of patient outgrows what can display on a drop-down menu?


==================================
#### Architecture Recommendations  
- Replace Select2 with a modal dialog?


==================================
#### Bugs  
- autoform:autoformDate doesn't seem to be supported?  Should either implement or remove from schema.
- datepickers don't seem to be working in the forms
