const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/save",(req,res)=>{
	const url = "mongodb://0.0.0.0:27017";
	const client = new MongoClient(url);
	const db = client.db("kc20_march25");
	const coll = db.collection("student");
	const doc = {"name":req.body.name,"phone":req.body.phone,"query":req.body.query};
	coll.insertOne(doc)
	.then(result =>{
		
	//Create a transporter object
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
		user: 'gosaviraj66@gmail.com',
		pass: 'momncvobphuivkzw'
	}
	});

	let mailOptions = {
		from:'gosaviraj66@gmail.com',
		to:'chinmaytaware10@gmail.com',
		subject:'Enquiry from ' + req.body.name,
		text: " phone = " + req.body.phone + " query = " + req.body.query
	};

	//Send email
	transporter.sendMail(mailOptions,(error,info)=>{
	if(error){
		console.log(error);
		return res.status(500).json(error);
	}
	return res.status(200).json("mail send");
	});

	})
	.catch(error => res.send(error));
});

app.listen(9000,()=>{console.log("ready @ 9000 ")});

// 8OBwu1j1f4WM7lWB

