const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/playgraound")
// CREATE DATABASE
    .then(()=>console.log("Successfully connect to mongodb...."))
    .catch(err=>console.log("Error something happend....",err))

// Schemas is like create table (SCHEMA)

const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tag:[String],
    date: {type: Date ,default:Date.now},
    isPublic : Boolean
})

//CLASS object
// human Peter

const Course = mongoose.model('Course',courseSchema);
// CLASS uppercse


async function createCourse(){
    const course = new Course({
    // Object lowercase

        name:'101CLASS',
        author: "TSLA",
        tag:['33','11'],
        isPublic: true

    });

    const result = await course.save();
    // console.log(result)

}

// createCourse()

// GET THE DATA FROM COURCE
async function getCourse(){
    const data =await Course
        .find({isPublic:true})
        .limit(10)
        .sort({name:1}) //ASCED 
        .select({author:1,tag:1})
    console.log(data)

}


getCourse()