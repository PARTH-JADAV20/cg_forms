import mongoose from "mongoose";

const OptionSchema = new mongoose.Schema({
    text: { type: String, required: true },
  });

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    type: {
      type: String,
      enum: ["text", "number", "boolean", "mcq", "checkbox"],
      required: true,
    },
    options: [OptionSchema], 
    required: { type: Boolean, default: false },
  });

const FormSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    questions: [QuestionSchema], // Array of questions
    expiration: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
  }, {timestamps: true});

const UserSchema = new mongoose.Schema({
    _id : { // This is the Firebase userid
        type : String, 
        required : true,
        unique : true
    },
    name: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    created_forms : [
        FormSchema
    ]
})


export const User = mongoose.model("User", UserSchema);