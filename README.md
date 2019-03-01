# opinionviz
Repository for opinionviz data and code


to install server for saving files
=======================
Install node.js
Then goto the server directory in terminal and type
npm install express --save


* communitycrit
	* data_final.json - json file with NLP results
	* communitycrit.json - final format 
	* handlejson.py - code to transform data_final.json to communitycrit.json
	
* CommentBox
	* communitycrit.json - json file containing all data
	* test.html - html page
	* test.js - javascript file for function declaration and calls
	* overviews.js - javascript file containing functions for overviews
	* proposal_view.js - javascript file containing functions for proposal specific information. Also contains the filtering code
	* revision.js - javascript file containing functions for revisions