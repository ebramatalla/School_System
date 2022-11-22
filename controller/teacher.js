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

    // Check if this teacher teach this course
    if (req.user._id.toString() !== course.teacher.toString()) {
      throw new Error("you don't teach this course");
    }
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
    res.status(400).send({ error });
  }
};
const studentInCourse = async (req, res) => {
  try {
    const allStudent = await Student.find({
      currentCourses: { $in: [req.params.id] },
    });
    res.status(200).send(allStudent);
  } catch (error) {}
};

module.exports = { addHomeWork, studentInCourse };
