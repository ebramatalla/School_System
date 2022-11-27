const Exam = require("../models/exam/exam");
let schedule = require("node-schedule");

const startExam = async (examId) => {
  try {
    const exam = await Exam.findById(examId);
    const date = new Date(exam.startDate);
    schedule.scheduleJob(date, async function () {
      const exam = await Exam.findByIdAndUpdate(examId, { activeNow: true });
    });
  } catch (error) {
    return error;
  }
};
const endExam = async (examId) => {
  try {
    const exam = await Exam.findById(examId);
    const date = new Date(exam.endDate);
    schedule.scheduleJob(date, async function () {
      const exam = await Exam.findByIdAndUpdate(examId, { activeNow: false });
    });
  } catch (error) {
    return error;
  }
};
const startAllExams = async () => {
  const exams = await Exam.find({ activeNow: false });

  exams.forEach((element) => {
    if (element.startDate > Date.now()) {
      startExam(element.id);
    }
  });
};
const endAllExam = async () => {
  const exams = await Exam.find({ activeNow: true });
  exams.forEach(async (element) => {
    if (element.endDate < Date.now()) {
      element.activeNow = false;
      await element.save();
    }
    endExam(element.id);
  });
};
module.exports = { startExam, endExam, startAllExams, endAllExam };
