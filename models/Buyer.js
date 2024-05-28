const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const BuyerSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required: true
    },
    lastName: {
        type: String,
        required : true
    },
    mobile: {
        type : String,
        unique : true,
        required:true
    },
    email: {
        type : String,
        unique: true,
        required:true
    },
    userName: {
        type : String,
        required : true,
        unique : true
    },
    passWord: {
        type : String,
        required : true
    },
    property: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Property'
    }],
    role: {
        type: String,
        default: 'buyer'
    }
});

BuyerSchema.methods.comparePassword = async function(userPassword){
    try{
        const isMatch = await bcrypt.compare(userPassword, this.passWord);
        return isMatch;
    }catch(err){
        throw err;
    }
}

BuyerSchema.pre('save', async function (next) {
    const person = this;
    if(!person.isModified('passWord')) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(person.passWord, salt);
        person.passWord = hashedPassword;
        next();
    }catch(err){
        return next(err);
    }
});

const Buyer = mongoose.model('buyer',BuyerSchema);

module.exports = Buyer;