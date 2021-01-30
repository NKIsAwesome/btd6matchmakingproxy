const express = require('express');
//const axios = require('axios');
const request = require('request-promise');
const bodyParser = require('body-parser');
const app = express();
const app2 = express();
const PORT = 8085;
const PORT2 = 8086;

const relayProxy = '192.168.230.132'


app.use(bodyParser.json());
app2.use(bodyParser.json());

app.use((req,res,next)=>{
	//console.log(req);
	handleRequest(req,res,'https://api.ninjakiwi.com/matchmaking/anon/join');
	console.log('join');
	//next();
})

app2.use((req,res,next)=>{
	//console.log(req);
	handleRequest(req,res,'https://api.ninjakiwi.com/matchmaking/anon/create',true);
	console.log('create');
	//next();
})

const handleRequest = async (req,res,url,create)=>{
	//console.log(req.body);
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
	console.log(response);
	//if(response && response.data){
		//let newData = JSON.parse(response.data);
		if(create){
			let modded = JSON.parse(response);
			let moddedData = JSON.parse(modded.data);
			//moddedData.metadata.Map = 'MoonLanding';
			//moddedData.metadata.Mode = 'Sandbox';
			const oldIp = moddedData.metadata.relay.ip;
			const oldPort = moddedData.metadata.relay.port;
			await request(`http://localhost:8090/createServer?address=${oldIp}&port=${oldPort}`).catch(e=>console.error(e));
			moddedData.metadata.relay_server_ip = relayProxy;
			moddedData.metadata.relay.ip = relayProxy
			modded.data = JSON.stringify(moddedData);
			response = JSON.stringify(modded);
		}
		//response.data = JSON.stringify(newData);
		//console.log('updated response');
		//console.log(response.data);	
	//}
	//console.log(response);
	console.log('connected');
	console.log(response);

	res.send(response);
}


app.listen(PORT,()=>{
	console.log(`Listening on port ${PORT}.`);
})

app2.listen(PORT2,()=>{
	console.log(`Listening on port ${PORT2}.`);
})
