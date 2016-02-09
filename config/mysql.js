var mysql = require('mysql');

//*************Currently not in use*********************
var connection = mysql.createConnection({
  connectionLimit: 10,
    host: 'localhost',
            user: 'root',
            password : 'root',
            port : 3306, //port mysql
            database:'swiftmkt'
});

connection.on('error', function(err) {

  connection.destroy();
});

module.exports = {
  simpletrans: function(query, fn) {
    connection.query(query, fn);
  },
  trans: function(queries, useResult, repValue, fn) {
    if(!useResult && !repValue) {
      useResult = repValue = null;
    }

    connection.beginTransaction(function(err) {
      var step = function(x) {
        if(x < queries.length) {
          connection.query(queries[x], function(err, result) {
            if(err) {
              console.log(err);
              connection.rollback(function() {
              });
              return fn(err, null);
            } else {
              if(useResult && repValue && useResult.length === repValue.length) {
                if(useResult[x]) {
                  for(var index = x + 1; index < queries.length; index++) {
                    if(queries[index].values && repValue[x]) {
                      var value = queries[index].values;
                      var tempindex = value.indexOf(repValue[x]);
                      if(tempindex > -1) {
                        value[tempindex] = result.insertId;
                        queries[index].values = value;
                      }
                    }
                  }
                  step(x + 1);
                } else {
                  step(x + 1);
                }
              } else {
                step(x + 1);
              }
            }
          });
        } else {
          connection.commit(function(err) {
            if (err) { 
              connection.rollback(function() {
              });
              return fn(err,null);
            } else {
              console.log('success! TRANSACTION COMPLETED SUCCESSFULLY');
              return fn(err,'success');
            }
          });
        }
      }
      step(0);
    });
  }
}

