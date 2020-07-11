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
	let response = await request({
		//servername :'api.ninjakiwi.com',
		//hostname :'api.ninjakiwi.com',
		uri:url,
		method:'POST',
		body:JSON.stringify(req.body),
		headers:req.headers
	}).catch(e=>console.error(e));
	//if(response && response.data){
		//let newData = JSON.parse(response.data);
		let modded = JSON.parse(response);
		console.log(modded.data.metadata);
		//modded.data.metadata.Map = 'MoonLanding';
		response = JSON.stringify(modded);
		//response.data = JSON.stringify(newData);
		//console.log('updated response');
		//console.log(response.data);	
	//}
	//console.log(response);
	res.send(response);
}


app.listen(PORT,()=>{
	console.log(`Listening on port ${PORT}.`);
})

app2.listen(PORT2,()=>{
	console.log(`Listening on port ${PORT}.`);
})
