import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: String,
    email: { 
        type: String, 
        unique: true
     },
    displayName: String,
    forms: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Form'
        }
    ],
    createdAt: { type: Date, default: Date.now },
  });

  const User = mongoose.model('User', userSchema);
  export default User;