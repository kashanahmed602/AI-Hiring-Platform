
const mongoose = require("mongoose");

const attemptedAssessmentSchema = new mongoose.Schema(
  {
    assessmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assessment",
      required: true,
    },

    CandidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    score: {
      type: Number,
      default: 0,
      min: 0,
    },

    totalMarks: {
      type: Number,
      default: 0,
      min: 0,
    },

    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    status: {
      type: String,
      enum: ["Completed", "In Progress", "Not Started"],
      default: "Not Started",
    },

    result: {
      type: String,
      enum: ["Pass", "Fail", "Pending"],
      default: "Pending",
    },

    answers: [
      {
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },

        answer: {
          type: String,
          default: "",
        },

        marksAwarded: {
          type: Number,
          default: 0,
          min: 0,
        },

        maxMarks: {
          type: Number,
          default: 0,
          min: 0,
        },
      },
    ],

    startedAt: {
      type: Date,
      default: Date.now,
    },

    submittedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "AttemptedAssessment",
  attemptedAssessmentSchema
);