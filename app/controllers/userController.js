const User = require('../models/user');
const otpService = require('../services/otpService');

exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user by email
    let user = await User.findOne({ email });

    // If the user doesn't exist, show the msg to sign up
    if (!user) {
        return res.status(401).json({ message: 'User not registered. Please sign up' });
    }

    //    // Verify the entered OTP
    //   if (user.otp !== otp) {
    //     return res.status(401).json({ message: 'Invalid OTP' });
    //   }

    const generatedOTP = otpService.generateOTP();
    console.log(`OTP for email ${email}: ${generatedOTP}`);
    // Successful login
    return res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.signup = async (req, res) => {
    try {
      const { email, firstName, lastName } = req.body;
  
      // Find the user by email
      let user = await User.findOne({ email });

      // If the user exists, show the msg to log in
      if(user) {
        return res.status(401).json({ message: 'User already registered. Please log in' });
      }

      // Validate input
      if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and Last name are required' });
      }

      // If the user doesn't exist, create a new one
      if (!user) {
        // Generate a random 6-digit OTP
        const generatedOTP = otpService.generateOTP();
  
        // Save the user with the email and OTP
        user = new User({ email, firstName, lastName, otp: generatedOTP });
        await user.save();
  
        console.log(`OTP for email ${email}: ${generatedOTP}`);
      }

      // Successful login
      return res.status(200).json({ message: 'Login successful' , user});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.getProfile = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the user profile
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  exports.updateProfile = async (req, res) => {
    try {
      const { userId } = req.params;
      const { firstName, lastName, city, state, country } = req.body;
  
      // Validate input
      if (!firstName || !lastName) {
        return res.status(400).json({ message: 'First name and Last name are required' });
      }

      // Validate maximum character limit for First Name and Last Name
    const maxChars = 40;
    if (firstName.length > maxChars || lastName.length > maxChars) {
      return res.status(400).json({ message: `First name and last name should not exceed ${maxChars} characters` });
    }
  
      // Update the user profile
      const user = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, city, state, country},
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the updated user profile
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.uploadPhoto = async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by userId
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the request contains a file
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      // Perform validation on the file size
      if (req.file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ message: 'Maximum file size allowed is 5MB' });
      }
  
      // Save the file name to the user's profile
      user.photo = req.file.filename;
      await user.save();
  
      // Return success message
      return res.status(200).json({ message: 'Photo uploaded successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
