'use strict';

var userCrudModel = require('../../model/addUser');

var userInfo = {

	getRegistrationDetail : function(req, res, next){

         var options='hardik';
         userCrudModel.registerUser(options, function(err, result) {
          if (err) {
            return next(err);
          }
          res.json(result);
         
        });
    },

    validate : function(req, res, next){


    	var userData = req.body;
 
        if (!userData || Object.keys(userData).length === 0){
            var err = new Error('no registeration information sent');
            err.status=400;
            return next(err);
        }


        if (!userData.first_name || !userData.last_name || !userData.email || !userData.mobile || !userData.gender || !userData.dob){
            var err = new Error('some parameters are missing');
            err.status=400;
            return next(err);
        }

        var currentDateTime = new Date();

    	userData.status = '1';
    	//userData.created_at = getDateTime(currentDateTime);;
    	//userData["updated_at"] = getDateTime(currentDateTime);;

        var data = {
                first_name : userData.first_name,
                last_name : userData.last_name,
                email : userData.email,
                mobile : userData.mobile,
                gender : userData.gender,
                dob : userData.dob,
                status : userData.status,
                created_at : userData.created_at,
                updated_at : userData.updated_at
            };


           
            userCrudModel.registerUserDetails(userData, function(err, result) {
              if (err) {
                return next(err);
              }
              res.json(result);
             
            });

},
	saveUser : function(req, res, next){

	}

};

module.exports = userInfo;