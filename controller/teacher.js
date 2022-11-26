const Teacher = require("../models/users/teacher");
const Course = require("../models/Courses/course");
const Student = require("../models/users/student");
const Social = require("../social/social");
const Exam = require("../models/exam/exam");
const { validationResult } = require("express-validator");
const Schedule = require("../controller/schedule ");
const Scores = require("../models/exam/scoreExam");

//  add home work in course
const addHomeWork = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new Error("Invalid Course");
    }
    // Check if this teacher teach this course
    if (req.user._id.toString() !== course.teacher.toString()) {
      throw new Error("you don't teach this course");
    }
    // find all student that enroll course
    const allStudent = await Student.find({
      "currentCourses._id": { $in: [req.params.id] },
    });
    // handle time to put in student
    const currentTime = new Date().toISOString();
    const myDate = new Date(currentTime);
    myDate.setDate(myDate.getDate() + parseInt(req.body.time));
    allStudent.forEach(async (student) => {
      student.myHomework.push({
        name: course.name,
        homework: req.body.homework,
        time: myDate,
      });
      await Social.AddPost(
        "New Home Work in course" + course.name + " " + req.body.homework
      );
      await student.save();
    });
    res.status(200).send({ message: "Added" });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error });
  }
};

// get student in Course
const studentInCourse = async (req, res) => {
  try {
    const allStudent = await Student.find({
      "currentCourses._id": { $in: [req.params.id] },
    });
    res.status(200).send(allStudent);
  } catch (error) {}
};

const addPracticalScore = async (req, res) => {
  try {
    const student = await Student.findById(req.body.studentId);

    if (!student) {
      throw new Error("Student Not Found");
    }
    const found = student.currentCourses.find((e) => e._id == req.params.id);
    if (!found) {
      throw new Error("this user isn't enroll this course ");
    }

    if (req.body.score > 50) {
      throw new Error("Score mustn't >50");
    }
    student.currentCourses.forEach((course) => {
      if (course._id.equals(req.params.id)) {
        const scoreNow = course.practicalScore;

        course.practicalScore += req.body.score;

        if (course.practicalScore > 50) {
          course.practicalScore = scoreNow;

          throw new Error("this student cannot added Score because Maybe >50 ");
        }
      } else {
        throw new Error("This student isn't Enroll this course");
      }
    });
    student.save();
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

const addFinalScore = async (req, res) => {
  try {
    const student = await Student.findById(req.body.studentId);

    if (!student) {
      throw new Error("Student Not Found");
    }
    // check if student enroll this course
    const found = student.currentCourses.find((e) => e._id == req.params.id);
    if (!found) {
      throw new Error("this user isn't enroll this course ");
    }
    if (req.body.score > 50) {
      throw new Error("Score mustn't >50");
    }

    student.currentCourses.forEach((course, i) => {
      if (course._id.equals(req.params.id)) {
        console.log(req.body.score);

        course.finalScore = req.body.score + course.practicalScore;
        console.log(course.finalScore);

        if (course.finalScore > 50) {
          student.endedCourses.push(course);
        } else {
          student.numberOfFalls += 1;
          if (student.numberOfFalls == 5) {
            student.isWarn = true;
          }
        }
        student.currentCourses.splice(i, 1);
      }
    });

    student.save();
    res.status(200).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
};

// exam
const addExam = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Check if this teacher teach this course
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new Error("Invalid Course");
    }
    if (req.user._id.toString() !== course.teacher.toString()) {
      throw new Error("you don't teach this course");
    }
    // check if there is exam in the same time or while exam
    const exams = await Exam.find({ startDate: { $gt: Date.now() } });
    var start = new Date(req.body.startDate);
    exams.forEach((exam) => {
      if (start > exam.startDate && start < exam.endDate) {
        throw `sorry there are exam in this time the exam start in ${exam.startDate} and end in ${exam.endDate} `;
      }
    });

    const exam = new Exam({ ...req.body, courseId: req.params.id });
    await exam.save();
    Schedule.startExam(exam._id);
    Schedule.endExam(exam._id);
    res.status(200).send(exam);
  } catch (error) {
    res.status(400).send(error);
  }
};
// see grades
const scoresOfExam = async (req, res) => {
  try {
    const scoreExam = await Scores.find({ examId: req.params.id })
      .populate("student", "name -_id")
      .select("student score");
    res.status(200).send(scoreExam);
  } catch (error) {}
};

// add Score to practicalScore
const addScoreOfExam = async (req, res) => {
  try {
    const scores = await Scores.find().populate("examId", "courseId");
    scores.forEach(async (score, i) => {
      const student = await Student.findById(score.student);
      const currentCourse = student.currentCourses.find((x) =>
        x._id.equals(score.examId["courseId"])
      );
      currentCourse.practicalScore += score.score;
      student.save();
    });
    res.status(200).send({
      message: `Score added successfully to ${scores.length} Student`,
    });
  } catch (error) {}
};

module.exports = {
  addHomeWork,
  studentInCourse,
  addPracticalScore,
  addFinalScore,
  addExam,
  scoresOfExam,
  addScoreOfExam,
};
