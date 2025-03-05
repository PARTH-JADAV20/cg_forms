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
    const formData = req.body

    const user = await User.findOne({_id : userId});
    console.log(user)

    user.created_forms.push(formData);
    await user.save();

    res.status(200).json({
      message: 'Form added successfully',
      form: formData,
      user: user
    });
  } catch (error) {
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
    const user = await User.findOne({_id : userId});

    res.status(200).json({
      message: 'Forms fetched successfully',
      forms: user.created_forms
    });

  } catch (error) {
    
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });

  }
});




export default UserRouter;