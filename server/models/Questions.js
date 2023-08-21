import mongoose from 'mongoose'

const QuestionSchema = mongoose.Schema({
    questionTitleEn: { type: String, required: "Question must have a title"},
    questionTitleFr: { type: String, required: "Question must have a title"},
    questionTitleHi: { type: String, required: "Question must have a title"},
    questionBodyEn: { type: String, required: "Question must have a body"},
    questionBodyFr: { type: String, required: "Question must have a body"},
    questionBodyHi: { type: String, required: "Question must have a body"},
    questionTags: { type: [String], required: "Question must have a tags"},
    noOfAnswers: { type: Number, default: 0},
    upVote: { type: [String], default: []},
    downVote: { type: [String], default: []},
    userPosted: { type: String, required: "Question must have an author"},
    userId: { type: String},
    askedOn: { type: Date, default: Date.now},
    rewards: { type: Object, default: {marker5: false, marker10: false, marker20: false}},
    answer: [{
        answerBodyEn: String,
        answerBodyFr: String,
        answerBodyHi: String,
        userAnswered: String,
        userId: String,
        answeredOn: { type: Date, default: Date.now},
    }]
})

export default mongoose.model("Question", QuestionSchema)