const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");

});




app.post("/", function(req, res){


    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    const data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us17.api.mailchimp.com/3.0/lists/80fc0e9a11";

    const options = {
        method: "post",
        auth: "showmik73:fcb78e553b85e61c3b0dd25fb43e6ebc-us17"
    }

    const request =  https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendfile(__dirname+"/success.html");
        }else{
            res.sendfile(__dirname+"/failure.html");
        }


        response.on("data", function(data){
            console.log(JSON.parse(data));
        })

    })
    
    request.write(jsonData);
    request.end();



});


app.post("/failure", function(req, res){
    res.redirect("/");
})






app.listen(process.env.PORT || 3000, function(){
    console.log("server running");
})


// fcb78e553b85e61c3b0dd25fb43e6ebc-us17


// 80fc0e9a11