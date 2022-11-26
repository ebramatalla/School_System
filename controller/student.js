const Course = require("../models/Courses/course");
const { validationResult } = require("express-validator");
const student = require("../models/users/student");
const Exam = require("../models/exam/exam");
const Answer = require("../models/exam/scoreExam");
const { NetworkContext } = require("twilio/lib/rest/supersim/v1/network");

// edit user

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

const deleteHomework = async (req, res) => {
  try {
    req.user.myHomework = req.user.myHomework.filter((myHomework) => {
      return (myHomework._id.toString() !== req.params.id).length;
    });
    await req.user.save();
    res.status(200).send({ message: "Deleted" });
  } catch (error) {
    res.status(400).send(error);
  }
};
const getExam = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const enrolled = req.user.currentCourses.find((element) => {
      return element._id.toString() === req.params.id;
    });
    if (!enrolled) {
      return res.status(400).json({ errors: "you Not Enroll this course" });
    }

    const examCourse = await Exam.findOne({
      courseId: req.params.id,
      activeNow: true,
    }).select("-_id -modelAnswer");
    if (!examCourse) {
      return res.status(400).json({ errors: "no exams right now" });
    }
    res.status(200).send(examCourse);
  } catch (error) {
    return res.status(400).json({ error });
  }
};
const submitAnswer = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);
    if (!exam || !exam.activeNow) {
      throw new Error("This Exam Is Invalid");
    }
    var score = 0;
    req.body.answers.forEach((element, i) => {
      const found = exam.modelAnswer.find(
        (model) => model.questionId == element.questionId
      );
      if (found.answer == req.body.answers[i].answer) {
        score++;
      }
    });
    // check if this student submit this exam before
    const studentAnswer = Exam.findOne({
      examId: req.params.id,
      student: req.user.id,
    });
    if (studentAnswer) {
      throw new Error("You Submit this exam before");
    }
    const answer = new Answer({
      examId: exam._id,
      student: req.user._id,
      answers: req.body.answers,
      score: score,
    });
    await answer.save();
    res.status(200).send(answer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enrollCourse,
  getAllHomework,
  deleteHomework,
  getExam,
  submitAnswer,
};
