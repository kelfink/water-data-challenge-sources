# water-data-challenge-sources

# Parsing challenge data set spreadsheet

Recommended version of node.js:  10.7

Two scripts are runnable:

"node find_notices.js" reads one sample URL taking it to a DKAN page.  It pares the page to find the json data link, follows that link, and prints some of the found metadata, so far.  Eventually this will return the useful data as a response for notifiers, etc.
.
"node loop_over.js" reads the datasets CSV file and outputs the values of the dataset URL's.  If these are uniform, this script could call find_notices.js with the URL and have it retrieve the relevant metadata (last-modified.)
