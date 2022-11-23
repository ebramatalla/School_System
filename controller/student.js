const Student = require("../models/users/student");
const Course = require("../models/Courses/course");
const { models } = require("mongoose");

const enrollCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new Error("current invalid");
    }
    if (course.availableFor == 0) {
      throw new Error("Course has reach max Student");
    }
    const student = req.user;
    if (!student) {
      throw new Error("Student is invalid");
    }
    if (student.level != course.availableFor) {
      throw new Error("this course not available for this year");
    }

    const enrolled = student.currentCourses.find(
      (element) => element._id.toString() === req.params.id
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
const getAllHomework = async (req, res) => {
  try {
    res.status(200).send(req.user.myHomework);
  } catch (error) {}
};
module.exports = { enrollCourse, getAllHomework };
