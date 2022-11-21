const Student = require("../models/users/student");
const Course = require("../models/Courses/course");
const { models } = require("mongoose");

const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new Error("current invalid");
    }
    if (course.availableFor == 0) {
      throw new Error("Course has reach max Student");
    }
    const student = await Student.findById(req.body.id);
    if (!student) {
      throw new Error("Student is invalid");
    }

    const enrolled = student.currentCourses.find(
      (element) => element.toString() === req.params.id
    );
    if (enrolled) {
      throw new Error("current enrolled");
    }
    course.numberOfAllowedStudent = course.numberOfAllowedStudent - 1;
    student.currentCourses.push(course._id);
    course.save();
    student.save();
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};
module.exports = { enrollCourse };
