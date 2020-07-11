const express = require('express');
//const axios = require('axios');
const request = require('request-promise');
const bodyParser = require('body-parser');
const app = express();
const app2 = express();
const PORT = 8085;
const PORT2 = 8086;



app.use(bodyParser.json());
app2.use(bodyParser.json());

app.use((req,res,next)=>{
	//console.log(req);
	handleRequest(req,res,'https://api.ninjakiwi.com/matchmaking/join');
	console.log('join');
	//next();
})

app2.use((req,res,next)=>{
	//console.log(req);
	handleRequest(req,res,'https://api.ninjakiwi.com/matchmaking/create');
	console.log('create');
	//next();
})

const handleRequest = async (req,res,url)=>{
	console.log(req.body);
	/*const response = await axios.post(url,req.body,{
		headers:req.headers,
	}).catch(e=>console.error(e));*/
	req.headers.host = 'api.ninjakiwi.com';
	const response = await request({
		//servername :'api.ninjakiwi.com',
		//hostname :'api.ninjakiwi.com',
		uri:url,
		method:'POST',
		body:JSON.stringify(req.body),
		headers:req.headers
	}).catch(e=>console.error(e));
	console.log(response);
	res.send(response);
}


app.listen(PORT,()=>{
	console.log(`Listening on port ${PORT}.`);
})

app2.listen(PORT2,()=>{
	console.log(`Listening on port ${PORT}.`);
})
