var nodemailer = require("nodemailer");
var CronJob = require('cron').CronJob;
var async = require("async");
var merchantInventory = require('../model/merchantInventory');




//*****************************Model Fetch Data ******************************************

var options='hardik';
merchantInventory. getMerchantInventorySummary(options, function(err, result) {
  if (err) {                 
    return next(err);
  }
  var inventorySummary = result;
});




module.exports = function () {

  new CronJob('* * * * *', function() {

    console.log('You will see this message ,when resource would be available to process your request');
    console.log('sending mail');  


   // ********************************gmail credential*********************************
   var smtpTransport = nodemailer.createTransport("SMTP",{
     service: "Gmail",  // sets automatically host, port and connection security settings
     auth: {
       user: "hardik.munjal@polestarllp.com",
       pass: "timeforchangex"
     }
   });





    //***************************** dummy merchant record *************************************
    var dummyMerchantRecord = [{email:"hardik.munjaal@gmail.com",merchant_id:"121",fc_name:"abb",total_pid_live:"1",less_than_1_day:"1",less_than_two_day:"1",less_than_three_day:"1"},{email:"api.integration@paytm.com",merchant_id:"1222",fc_name:"ss",total_pid_live:"2",less_than_1_day:"2",less_than_two_day:"2",less_than_three_day:"2"}];
    var merchantEmails= [{email:"hardik.munjaal@gmail.com",merchant_id:"121"},{email:"hardik.munjaal@gmail.com",merchant_id:"121"}]

    var listofemails = ["hardik.munjaal@gmail.com","api.integration@paytm.com"];


    // dummyMerchantRecord.forEach(function(mr){
    //   merchantEmails.forEach
    // })


    // headers.forEach(function(header) {
    //   csv += escapeString(header) + ',';
    // });



   //******************************dummy record for attachment**********************************
   





   //************************ CSV MAKER FOR JSON DATA ******************************
   
   function convertToCSV(data) {
    if(!data){
      return null;
    }

    function escapeString (x) {
      if (x) {
        x = x.toString();
        return ('"' + x.replace(/"/g, '""').replace(',', ' ').replace('\n', ' ') + '"');
      } else {
        return ('" "');
      }
    }

    var columns=data[0];
    var headers = Object.keys(columns);
    var csv = '';

    headers.forEach(function(header) {
      csv += escapeString(header) + ',';
    });

    csv += '\n';

    debugger;

    data.forEach(function(row) {
      Object.keys(columns).forEach(function(obj) {
        debugger;
        console.log(obj.toString());
        console.log('rrrrrr'+row.toString());
        csv += escapeString(row[obj]) + ',';
      });
      csv += '\n';
    });
    return csv;
  }

  function createCsv(data){
    if(!data){
      return null;
    }
    var attachment = {
      contentType: 'text/csv'
    };
    attachment.filename = 'attachment' + Date.now() + '.csv';
    attachment.contents = new Buffer(convertToCSV(data, 'utf-8'));
    console.log(attachment);
    return attachment;
  }



//***************************** Main SMTP method **************************
var smtp = function(email,callback) {

  


    var html='<html><head></head><body><p>Hi '+  email.merchant_id  + '!</p>';
    html+='<p>Please find attached the list of shipments that have to be picked from our Return Processing centers and delivered to the merchants.</p>';
    html+='<table class="tftable" border="1"><thead>';
    html+='<tr><th>Merchant_id</th><th>fc_name</th><th>total_pid_live</th><th>less_than_1_day</th><th>less_than_two_day</th><th>less_tham_three_day</th></tr></thead><tbody>';
    html+='<tr><td>'+email.merchant_id+'</td>';
    html+='<td>'+email.fc_name+'</td>';
    html+='<td>'+email.total_pid_live+'</td>';
    html+='<td>'+email.less_than_1_day+'</td>';
    html+='<td>'+email.less_than_two_day+'</td>';
    html+='<td>'+email.less_than_three_day+'</td></tr>';
    html+='</tbody></table></body></html>';

   debugger


    //***************************** email body configuration ********************************
    var emailConfig = {  //email options
       from: "Aman <hardik.munjal@polestarllp.com>", // sender address.  Must be the same as authenticated user if using Gmail.
       to: email.email, // receiver
       subject: "Merchant Records xxxyyy", // subject
       text: "nodemailer", // body
       html: html, // html body
       attachments: createCsv(dummyMerchantRecord)
     };



    //******************************smtp send mail method *********************************************
      smtpTransport.sendMail(emailConfig, function(error, response){  //callback
       if(error){
         callback(error);
       }else{
         console.log("Message sent: " + response.message);
         callback();
       }

       //smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
     })
    }

    
    async.eachLimit(dummyMerchantRecord,2,smtp,function(err){
      if (err){
        console.log(err);


        return process.exit(0);
      }
            // console.log(success_email);
            // console.log(failure_email);
          });

  }, null, true, 'America/Los_Angeles');

};