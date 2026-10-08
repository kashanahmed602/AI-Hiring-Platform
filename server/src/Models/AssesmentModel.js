const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      enum: ["mcq", "true-false", "question"],
      required: true,
    },

    options: {
      type: [String],
      default: [],
    },

    correctAnswer: {
      type: String,
      default: null,
    },

    marks: {
      type: Number,
      default: 1,
    },
  },
  { _id: true }
);

const assessmentSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Recruiter",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    questionCount: {
      type: Number,
      required: true,
    },

    questions: {
      type: [questionSchema],
      default: [],
    },

    passingScore: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["draft", "published", "closed"],
      default: "draft",
    },

    creationMethod: {
      type: String,
      enum: ["ai", "manual"],
      default: "ai",
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assessment", assessmentSchema);