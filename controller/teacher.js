const Teacher = require("../models/users/teacher");
const Course = require("../models/Courses/course");
const Student = require("../models/users/student");

const addHomeWork = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new Error("Invalid Course");
    }
    course.homeworkOfCourse.push({ homework: req.body.homework });
    await course.save();
    // TODO: Check If Teacher is Teach this course
    res.status(200).send({ message: "HomeWork Added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addHomeWork };
