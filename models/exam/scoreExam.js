const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
  examId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  student: { type: mongoose.Schema.Types.ObjectId, required: true },
  answers: [
    {
      questionId: Number,
      answer: String,
    },
  ],
  score: {
    type: Number,
    default: 0,
  },
});
const Answer = mongoose.model("Answer", answerSchema);
module.exports = Answer;
