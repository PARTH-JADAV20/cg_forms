import express from 'express';
import { User } from '../models/User.model.js';

const UserRouter = express.Router();


UserRouter.get('/', (req, res) => {
    res.send('User Routes');
})

// Route to create a new user
UserRouter.post('/create', async (req, res) => {
  try {
    const { 
      _id,  // Firebase user ID
      name, 
      email 
    } = req.body;

    // Validate required fields
    if (!_id || !name || !email) {
      return res.status(400).json({ 
        message: 'Missing required fields: _id, name, or email' 
      });
    }

    // Check if user already exists
    const existingUser = await User.findById(_id);
    if (existingUser) {
      return res.status(200).json({ 
        message: 'User already exists', 
        user: existingUser 
      });
    }

    // Create new user with empty created_forms
    const newUser = new User({
      _id,
      name,
      email,
      created_forms: []
    });

    // Save the user
    await newUser.save();

    res.status(201).json({ 
      message: 'User created successfully', 
      user: newUser 
    });

  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
});

// Route to get user details
UserRouter.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
});




// Route to add a new form to user's created_forms
UserRouter.post('/:userId/add-form', async (req, res) => {
  try {
    const { userId } = req.params;
    const formData = req.body;

    // Validate form data
    if (!formData.title || !formData.expiration) {
      return res.status(400).json({ 
        message: 'Missing required form fields: title or expiration' 
      });
    }

    // Find the user
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    // Prepare the form object
    const newForm = {
      title: formData.title,
      description: formData.description || '',
      questions: formData.questions || [],
      expiration: new Date(formData.expiration),
      created_at: new Date()
    };

    // Add the form to user's created_forms
    user.created_forms.push(newForm);

    // Save the updated user
    await user.save();

    // Return the newly added form
    const addedForm = user.created_forms[user.created_forms.length - 1];

    res.status(201).json({ 
      message: 'Form added successfully', 
      form: addedForm 
    });

  } catch (error) {
    console.error('Error adding form:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
});

// Route to get all forms for a user
UserRouter.get('/:userId/forms', async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user and populate forms
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json({ 
      forms: user.created_forms 
    });

  } catch (error) {
    console.error('Error fetching user forms:', error);
    res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
});




export default UserRouter;