const express=require('express')
const app=express()
const db=require("./src/models/index")
const port=process.env.PORT||3000
// env configuration
require('dotenv').config()



db.sequelize.sync({}).then(()=>{
    console.log("Database connected")
}).catch(err=>{
    console.log(err)
})
app.listen(port,()=>{

    console.log(`Server is running on port ${port}`)
}); //