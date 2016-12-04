/*
 * @Author: Stephen Kuehl 
 * @Date: 2016-11-28 20:54:03 
 * @Last Modified by: Stephen Kuehl
 * @Last Modified time: 2016-12-04 16:47:52
 */


var express = require('express'); // Express instaniated a different way for serving static webpages
var app = express(); // Express App include
var bodyParser = require('body-parser'); // Read data from HTTP Post
var nodemailer = require('nodemailer');  // NodeMailer allows for sending email through SMTP

// To create SSL certificates visit https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/
var https = require('https');  // Sets up HTTPS for SSL
var fs = require('fs'); // Allows the server read information from files

app.use(bodyParser.urlencoded({ extended: true })); // Allows the usage of reading urlencoded data
app.use(bodyParser.json()); // Allows the usage of parsing JSON

// Setup the certificates for SSL
var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

app.post('/welcome', function (req, res) {

  // Grab everything from the POST
  var email = req.body.email;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var account_type = req.body.account_type;

  
  
  if (account_type == "New Customer") {   // New Customer. Send BIENVENIDA email


    var to = email;
    var from = '"Fred Foo" <foo@blurdybloop.com>';
    var subject = 'Bienvenidos ' + first_name + ' ' + last_name + '!';
    var html = fs.readFileSync("BIENVENIDA.html", "utf8");

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://EMAIL%40gmail.com:PASSWORD@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: '"Fred Foo ?" <foo@blurdybloop.com>', // sender address
      to: email, // list of receivers
      subject: subject, // Subject line
      html: html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });

  }
  
  
  
  else if (account_type == "Paid Customer") {   // Paid Customer. Send SOLiCITUD DE CITA CONFIRMADA email

    var to = email;
    var from = '"Fred Foo" <foo@blurdybloop.com>';
    var subject = 'SOLICITUD DE CITA CONFIRMADA';
    var html = fs.readFileSync("SOLICITUD DE CITA CONFIRMADA.html", "utf8");

    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport('smtps://EMAIL%40gmail.com:PASSWORD@smtp.gmail.com');

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: from, // Sender address
      to: to, // Reciever address
      subject: subject,  // Subject line
      html: html // Html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: ' + info.response);
    });


  }
  else {   // Wrong account_type
    console.log("Wrong Account Type");

  }






  res.send("Server Running!");
});

https.createServer(options, app).listen(8085, function () {
  console.log('Started!');
});