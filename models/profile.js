const mongoose =require("mongoose");

const profileSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    img:{
        type: String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

    
},{timestamps: true});

module.exports=mongoose.model('Profile',profileSchema);