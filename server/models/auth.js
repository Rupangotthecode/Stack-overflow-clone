import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String},
    tags: {type: [String]},
    joinedOn: {type: Date, default: Date.now},
    points: {type: Number, default: 0},
    badges: {type: [String]},
    noOfAnswers: {type: Number, default: 0},
    Questions: [{
        questionId: String,
        questionTitleEn: String,
        questionTitleFr: String,
        questionTitleHi: String,
        questionBodyEn: String,
        questionTitleFr: String,
        questionTitleHi: String,
        upVotes: Number,
        downVotes: Number,
    }],
    contributionLevel: {type: String},
    loginHistory: [{
        ipAddress: String,
        device: String,
        loginTime: {type: Date, default: Date.now}
    }]
})

export default mongoose.model("User", userSchema)