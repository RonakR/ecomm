const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Register a new user'
   */
  const { name, password, email } = req.body
  const user = await User.create({ name, password, email })

  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  }
  const token = jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  res.status(StatusCodes.CREATED).json({ user: tokenUser, token })
}

const login = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Login a user'
   */
  res.send('login user')
}

const logout = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Logout a user'
   */
  res.send('logout')
}

module.exports = {
  register,
  login,
  logout,
}
