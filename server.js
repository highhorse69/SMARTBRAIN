const express=require('express');
const bodyParser=require('body-parser');
const bcrypt=require('bcrypt-nodejs');
const cors=require('cors');
const knex=require('knex');



const signin=require('./Controller/signin');
const register=require('./Controller/register');
const profile=require('./Controller/profile');
const image=require('./Controller/image');

const db=knex({
    //connect database
  client: 'pg',

  connection: {
     connectionString:process.env.DATABASE_URL,
     ssl: {
    rejectUnauthorized: false
  }

}
});

const app=express();


app.use(cors());
app.use(bodyParser.json());



app.get('/',(req,res)=>{res.send('it is working!')})
app.post('/signin',(req,res)=>{signin.handleSignin(req,res,db,bcrypt)})

app.post('/register',(req,res)=>{register.handleRegister(req,res,db,bcrypt)})

app.get('/profile/:id',(req,res)=>{profile.handleProfile(req,res,db)})

app.put('/image',(req,res)=>{image.handleImage(req,res,db)})

app.post('/imageurl',(req,res)=>{image.handleApi(req,res)})



app.listen(process.env.PORT || 3000,()=>{
    console.log(`app is running on port ${process.env.PORT}`);
});