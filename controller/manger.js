const Course = require("../models/Courses/course");
const Teacher = require("../models/users/teacher");
const Student = require("../models/users/student");
const { validationResult } = require("express-validator");
const { Role } = require("../models/users/shared/user");

const addCourse = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const course = new Course(req.body);
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
};
const addTeacher = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const teacher = new Teacher({
      ...req.body,
      role: Role.teacher,
    });
    await teacher.save();
    res.status(201).send(teacher);
  } catch (error) {
    res.status(400).send(error);
  }
};
const addStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const student = new Student({
      ...req.body,
      role: Role.student,
    });
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).json({ error });
  }
};
module.exports = { addCourse, addTeacher, addStudent };
