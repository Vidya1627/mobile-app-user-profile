const User = require('../models/user');
const otpService = require('../services/otpService');

exports.login = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find the user by email
    let user = await User.findOne({ email });

    // If the user doesn't exist, create a new one
    if (!user) {
      // Generate a random 6-digit OTP
      const generatedOTP = otpService.generateOTP();

      // Save the user with the email and OTP
      user = new User({ email, otp: generatedOTP });
      await user.save();

      console.log(`OTP for email ${email}: ${generatedOTP}`);
    }

    // Verify the entered OTP
    if (user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // Successful login
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
