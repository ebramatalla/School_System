const mongoose = require("mongoose");

const examSchema = mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  questions: [
    {
      questionId: Number,
      question: {
        type: String,
        required: true,
      },
      mcq: [{ type: String }],
    },
  ],
  modelAnswer: [
    {
      questionId: Number,
      answer: String,
    },
  ],
  startDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Date,
  },
  activeNow: {
    type: Boolean,
    default: false,
  },
});
examSchema.pre("validate", function (next) {
  if (this.startDate < Date.now() && this.activeNow) {
    throw "Can not Start Exam In Past";
  }
  if (this.questions.length > 10) {
    throw "questions exceeds maximum array size (10)!";
  }
  if (this.modelAnswer.length != this.questions.length) {
    throw "answer must equal of number of Questions";
  }
  this.modelAnswer.forEach((element, i) => {
    if (!this.questions[i].mcq.includes(element.answer)) {
      throw `Answer Of Question ${i + 1}  Not In Mcq`;
    }
  });

  next();
});
examSchema.pre("save", function (next) {
  this.modelAnswer.forEach((element, i) => {
    this.questions[i].questionId = i + 1;
    element.questionId = this.questions[i].questionId;
  });

  var end = new Date(this.startDate);
  end.setMinutes(end.getMinutes() + this.duration);
  end = new Date(end);
  this.endDate = end;
  next();
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
