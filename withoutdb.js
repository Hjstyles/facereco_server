const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyparser.json());
app.use(cors());

const database= {
	users :[
	 {

		id : '123',
		name: 'john',
		email : 'john@gmail.com',
		password : 'cookies',
		entries : 5,
		joined : new Date()

	 },
	 {
        id : '124',
		name : 'sally',
		email : 'sally@gmail.com',
		password : 'bananas',
		entries : 0,
		joined : new Date()
	 }
	]
}

app.get('/', (req,res) => {
	res.json(database.users);
})

app.post('/signin', (req, res) =>{

   if((req.body.email===database.users[1].email && req.body.password===database.users[1].password)){
   	 res.json(database.users[1]);
   }
   else{
   	 res.status(400).json('error logning in');
   }

    
})

app.post('/profile/:id', (req,res)=>{
   const{id}=req.params;
   let found=false
   database.users.forEach((user)=>{
   	if(id===user.id){
   		found = true;
   		res.json(user);
   	}
   })
   if(!found)
   	res.status(400).json('no user found');

})

app.put('/image', (req,res)=>{
     const{id}=req.body;  
     let found=false
     database.users.forEach((user)=>{
   	    if(id===user.id){
   		   user.entries++
   		   res.json(user.entries);
   	    }
     })
     if(!found)
   	    res.status(400).json('no user found');
})

app.post('/register', (req,res) => {
    const{name, email,password}= req.body;
	database.users.push({
		id : '125',
		name: name,
		email : email,
		password : password,
		entries : 0,
		joined : new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.listen(3000, () => {
	console.log('i am listening');
})

