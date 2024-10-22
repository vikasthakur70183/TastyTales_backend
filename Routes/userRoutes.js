const express = require('express');
const router = express.Router();
const signup = require('../Controller/users/signup');
const Auth=require('../Controller/users/auth')
const login=require('../Controller/users/login');
const verify=require('../Controller/users/verify')
const profile=require('../Controller/users/profile')
const logout=require('../Controller/users/logout')
// Define your routes
router.post('/api/signup', signup.registerNewUser);
router.post('/api/login',login.login)
router.post('/api/verify',verify.verify)
router.get('/api/currentuser',Auth.isAuth,(req, res) => {
    const { user } = req;
    res.json({ user: { id: user._id, name: user.name, email: user.email,isVerified: user.isVerified, } });
  })
router.get('/api/logout',logout.logout)

module.exports = router; // Export the router
