import { connect } from 'mongoose';

async function conn() {
    await connect(process.env.CONNECTION_STRING,{useNewUrlParser:true})
.then(()=>{
    console.log("MongoDB connected ");
})
.catch((error)=>{
    console.log("error connecting to db "+error);
})}

export {conn};