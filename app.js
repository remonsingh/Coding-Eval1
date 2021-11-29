const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const connect = () => {
    return mongoose.connect("mongodb+srv://remonsingh:remon123@cluster0.ylca6.mongodb.net/Job_Portal")
}

const companySchema = new mongoose.Schema(
    {
        company_name : {type : String , require : true },
        establish : {type : Number , require : true },
        head_office : {type : String , require : true }
    },{
        versionKey : false,
        timestamps : true
    }
)

const Company = mongoose.model("company",companySchema)

const skillSchema = new mongoose.Schema(
    {
        skill : {type : String , require : true}
    },{
        versionKey : false,
        timestamps : true  
    }
)

const Skill = mongoose.model("skill",skillSchema)

const citySchema = new mongoose.Schema(
    {
        city : {type : String , require : true }
    },{
        versionKey : false,
        timestamps : true  
    })

    const City = mongoose.model("city",citySchema)

const jobSchema = new mongoose.Schema(
    {
       role : {type : String , required : true},
       ratings : {type : Number , required : true},
       work_from_home : {type : String , required : false , default : "NO"},
       skills_id : [{
           type : mongoose.Schema.Types.ObjectId,
           ref : "skill",
           required : true
       }],
       company_id : {
           type : mongoose.Schema.Types.ObjectId,
           ref : "company",
           required : true
       },
       city_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "city",
        required : true
    }
    },{
        versionKey : false,
        timestamps : true
    }
)

const Job = mongoose.model("job", jobSchema)

app.post('/companies', async (req,res) => {
    try{
        const company = await Company.create(req.body)

        return res.send(company)
    } catch(e) {
        res.status(500).json({message : e.message})
    }
})

app.get('/companies', async (req,res) => {
    try{
        const company = await Company.find().lean().exec()

        return res.send(company)
    }catch(e){
        res.status(500).json({message : e.message})
    }

})

app.post('/skills', async (req,res) => {
    try{
        const skill = await Skill.create(req.body)

        return res.send(skill)
    } catch(e) {
        res.status(500).json({message : e.message})
    }
})

app.get('/skills', async (req,res) => {
    try{
        const skill = await Skill.find().lean().exec()

        return res.send(skill)
    }catch(e){
        res.status(500).json({message : e.message})
    }

})

app.post('/city', async (req,res) => {
    try{
        const city = await City.create(req.body)

        return res.send(city)
    } catch(e) {
        res.status(500).json({message : e.message})
    }
})

app.get('/city', async (req,res) => {
    try{
        const city = await City.find().lean().exec()

        return res.send(city)
    }catch(e){
        res.status(500).json({message : e.message})
    }

})

app.post('/jobs', async (req,res) => {
    try{
        const job = await Job.create(req.body)

        return res.send(job)
    } catch(e) {
        res.status(500).json({message : e.message})
    }
})

app.get('/jobs', async (req,res) => {
    try{
        const job = await Job.find().lean().exec()

        return res.send(job)
    }catch(e){
        res.status(500).json({message : e.message})
    }

})

app.get('/jobs/ratings', async (req,res) => {
    try{
        const jobs = await Job.find().sort({ratings : 1})

        return res.send(jobs)
    }catch(e){
        res.status(500).json({message : e.message})
    }

})

app.get('/jobs/wfh', async (req,res) => {
    try{
        const job = await Job.find({work_from_home: "Yes"})

        return res.send(job)
    }catch(e){
        res.status(500).json({message : e.message})
    }

})

app.listen(3445, async()=>{
    await connect()
    console.log('listening on port 3445')
})