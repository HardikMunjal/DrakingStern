var mysql = require('../config/mysql');

var addRegistrationDetail = {

 registerUser: function(options, cb) {
 
     var query = {
            sql: 'SELECT * FROM UserBasicInfo'
            }
     mysql.simpletrans(query, function(e, r) {
        if (e) {
            console.log(e);
        } else {
            console.log(r[0])
            cb(null,r);
        }
    });

 },

 registerUserDetails: function(options, cb)
 {

  var arr = [ {
    sql: 'INSERT INTO UserBasicInfo(first_name, last_name, email, mobile, gender, dob, status, created_at, updated_at) values(?,?,?,?,?,?,?,?,?)',
    values: [options.first_name, options.last_name, options.email, options.mobile, options.gender, options.dob, options.status, options.created_at, options.updated_at]
  },
  {
    sql: 'INSERT INTO UserCredential(email, password, mobile, user_id, last_updated_by, created_at, updated_at) values(?,?,?,?,?,?,?)',
    values: [options.email, options.password, options.mobile, 'user_id', options.last_updated_by, options.created_at, options.updated_at]
  },
  {
    sql: 'INSERT INTO UserPermissionRole(user_id, role_id) values(?,?)',
    values: ['user_id', 3]
  }
  ];
  var useResult = [true, false, false];
  var repValue = ['user_id', null, null];
  mysql.trans(arr, useResult, repValue, function(err, result) {
    cb(err, result);
  });
 }



};
module.exports = addRegistrationDetail;


   


