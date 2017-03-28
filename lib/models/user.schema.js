const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');


const schema = new Schema({
    userName: {
        type: String, 
        required: true
    },
    hash: { 
        type: String, 
        required: true 
    },
    role: {
        type: String,
        enum: ['recruiter', 'talent']
    },
    email: {
        type: String
    },
    skills: {
        type: [String]
    },
    location: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    company: {
        type: String
    },
    likedResumes: {
        type: [Schema.Types.ObjectId],
        ref: 'Resume'
    },
    likedCompanies: {
        type: String
    },
    myCompany: {
        type: String  
    },
    myResume: {
        type: Schema.Types.ObjectId,
        ref: 'Resume'
    }
});

schema.virtual('password').set(function(password){
    this.hash = bcrypt.hashSync(password, 8);
});

schema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash);
};

const User = mongoose.model('User', schema);
module.exports = User;