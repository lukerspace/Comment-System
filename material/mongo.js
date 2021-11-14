const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playgraound")
  // CREATE DATABASE
  .then(() => console.log("Successfully connect to mongodb...."))
  .catch((err) => console.log("Error something happend....", err));

// Schemas is like create table (SCHEMA)
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 255 },
  // should be required

  // ENUM VALUAE
  category: {
    type: String,
    enum: ["web", "mobile", "network"],
  },
  // Custom VALIDATION
  test: {
    type: Array,
    validate: {
      validator: function (v) {
        return v.length > 0;
      },
      message: "at least 1 test",
    },
  },
  //
  author: String,
  tag: [String],
  date: { type: Date, default: Date.now },
  isPublic: Boolean,

  // BUILD IN VALIDATION
  price: {
    type: Number,
    required: function () {
      return this.isPublic;
    },
  },
  // price will be number if is public exist
});

//CLASS object
const Course = mongoose.model("Course", courseSchema);
// CLASS uppercse
async function createCourse() {
  const course = new Course({
    // Object lowercase
    name: "101CLASS NODE.js",
    // BUILD IN VALIDATION
    category: "web",
    //
    // CUSTOM VALIDATION
    test: [],
    //
    author: "TEaaadD",
    tag: ["33", "GOOD STUDENT"],
    isPublic: true,
    price: 200,
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (err) {
    console.log("ERR : ", err.message);
  }
}
createCourse();

// GET THE DATA FROM COURCE
async function getCourse() {
  // eq =
  // ne !=
  // gt >
  // gte >=
  // lt <
  // lte <=
  // in (in the array)
  // nin (not in)
  const data = await Course
    // .find({isPublic:true})
    .find({ price: { $gte: 10 } })
    .limit(10)
    .sort({ name: 1 })
    // ASCED by name:1
    // DESC  by name:-1
    .select({ name: 1, author: 1, isPublic: true });
  // .select({})
  console.log(data);
}
// getCourse()

async function getCourse2() {
  const data2 = await Course
    //RE  /^NAME/ START WITH
    //RE  /NAME$/ END WITH  CASE SENSITIVE
    //RE  CASE INSENSITIVE /NAME$/i
    //RE  CONTAIN  /.*NAME.*/
    .find({ isPublic: true })
    .limit(10)
    .sort({ name: 1 })
    .select({ tag: 1 });
  console.log(data2);
}
// getCourse2()
