const express = require('express');
const nodemailer = require("nodemailer");
const bodyparser = require("body-parser");
const exphbs  = require('express-handlebars');
const dotenv = require('dotenv');
const alert = require('alert');

const app = express();

dotenv.config({path: './config.env'})

const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.use(bodyparser.json());
app.use(express.urlencoded({extended:false}));

app.get('/', function (req, res) {
  res.render('home')
});

app.get('/work', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about');
});

app.get('/contact', function (req, res) {
    res.render('contact');
});

app.get('/arrange.html', function (req, res) {
    res.sendFile(`${__dirname}/views/arrange.html`);
})

app.post('/api/v1/sendMail', (req, res) => {
    const obj = {
      email: req.body.email,
      name: req.body.name,
      message: req.body.message
    }
    main(obj, res).catch(console.error);
});

async function main(requ, res) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL, 
      pass: process.env.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: `${requ.name}`, 
    to: "Ankit mohantyankit18@gmail.com", 
    subject: `Mail from ${requ.name} from Portfolio`, // Subject line
    text: `${requ.message}\nYou can reply to ${requ.name} using ${requ.email}`, 
  });
  if(info.messageId){
    // alert("Message sent:");
    alert('Message sent:');
    console.log("Message sent",info.messageId);
    res.redirect('/contact');
  }
}

app.listen(port, () => {
    console.log(`Server started at port ${port}`);
});