const User = require('../models/userModel');

exports.registration = async (request, response) => {
  const { firstName, lastName, email, age, password, confirmPassword } =
    request.body;

  if (password != confirmPassword) {
    return response.send("password and confirm password do not match");
  }

  const user = User.create({
    firstName,
    lastName,
    email,
    age,
    password,
  });

  response.send("user registered successfully");
};


exports.login = async (req, res)=>{
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(user === null || user === undefined){
        return res.send('Account does not exist or email is incorrect')
    }

    if(user.password !== password){
        res.send('Password is incorrect')
    }else {
        res.send({
            message: 'Login successful',
            user: user
        })
    }
}


exports.changePassword = async (req,res)=>{
    const {email, oldPassword, newPassword, confirmNewPassword} = req.body;

    const user = await User.findOne({email: email});

    if(user === null || user === undefined){
        return res.send('Account does not exist or email is incorrect')
    }

    if(user.password !== oldPassword){
        return res.send('Old password is incorrect')
    }

    if(newPassword !== confirmNewPassword){
        return res.send('New password and confirm new password do not match')
    }

    user.password = newPassword;
    await user.save();

    res.send('Password changed successfully')

}

