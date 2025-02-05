const responseSchema = new mongoose.Schema({
    formId: { type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
    answers: [
      {
        fieldId: mongoose.Schema.Types.ObjectId, // Reference to the form field
        answer: { type:Array }, // Can be String or Array
      },
    ]
  }, {Timestamp:true});

  const UserResponse = mongoose.model('UserResponse', responseSchema);
  export default UserResponse;