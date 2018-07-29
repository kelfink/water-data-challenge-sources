var fs = require('fs');
var parse = require('csv-parse');

var input = '#Welcome\n"2","2","3","4"\n"a","b","c","d"';
fs.readFile('datasets.csv', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  // console.log(data);
  parse(data, {comment: '#'}, function(err, rows){
    //console.log(output);
    rows.forEach( row => {
      console.log("A row", row[9]);
    });
    // output.should.eql([ [ '1', '2', '3', '4' ], [ 'a', 'b', 'c', 'd' ] ]);
  });
});
