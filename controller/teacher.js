const Teacher = require("../models/users/teacher");
const Course = require("../models/Courses/course");
const Student = require("../models/users/student");
const student = require("../models/users/student");

const addHomeWork = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new Error("Invalid Course");
    }
    const allStudent = await Student.find({
      currentCourses: { $in: [course._id] },
    });
    const currentTime = new Date().toISOString();
    const myDate = new Date(currentTime);
    myDate.setDate(myDate.getDate() + parseInt(req.body.time));
    allStudent.forEach(async (student) => {
      student.myHomework.push({
        name: course.name,
        homework: req.body.homework,
        time: myDate,
      });
      await student.save();
    });
    res.status(200).send({ message: "Added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addHomeWork };
