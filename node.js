const express = require("express");
const nodemailer = require("nodemailer");
const bodyparser = require('body-parser');



const app = express();

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    console.log(__dirname);
})

app.post("/", function(req, res){
    const comm = req.body.message;
    const na = req.body.nameofperson;
    // console.log(req);
    var transporter = nodemailer.createTransport({
        service: "gmail",
        secure: false,
        auth: {
          user: 'fkluckykhan1@gmail.com',
          pass: 'kesbkttipuisvenj',
        },
        tls: {
          rejectUnauthorized: false
        }
      });
      const mailOption = {
        from: 'fkluckykhan1@gmail.com',
        to: 'fkluckykhan1@gmail.com',
        replyTo: req.body.username,
        subject: 'You got a message from ' + na + ` <${req.body.username}>`,
        text: comm
      };
      transporter.sendMail(mailOption, function(error, info){
        if(error){
            console.log(error);
        }else{
            //res.send("mail submited")
            res.redirect('/');
            console.log("email sent" + info.response);
        }
      })
});


app.listen(3000, function(){
    console.log("server is running at 3000");
})
