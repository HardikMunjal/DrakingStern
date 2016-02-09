var userInfo = require('../controller/userCrud/userInfo');

module.exports = function (app) {


 //Live APIS
 app.post('/register/user', userInfo.validate, userInfo.saveUser);
 app.get('/get/user', userInfo.getRegistrationDetail);
 

};
