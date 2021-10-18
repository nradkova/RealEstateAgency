const mongoose=require('mongoose');

const config =require('./config.json')[process.env.NODE_ENV];

const databaseConfig=(app)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(config.DB_CONNECTION_STRING,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        const db=mongoose.connection;
        db.on('error',err=>{
            console.log('Database error:',err.messsage);
            reject(err.messsage);
        });
        db.on('open',()=>{
            console.log('Database connected');
            resolve();
        })
    })
}

module.exports= databaseConfig;