const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse } = require('../utils')

const register = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Register a new user'
   * #swagger.responses[201] = {}
   */
  const { name, password, email } = req.body
  const user = await User.create({ name, password, email })

  const tokenUser = {
    name: user.name,
    userId: user._id,
    role: user.role,
  }

  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Login a user'
   */
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError('Please provide email and password')
  }

  const user = await User.findOne({ email })
  console.log(user)
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError('Invalid credentials')
  }
  res.send('user logged in')
}

const logout = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Logout a user'
   */
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  res.send('user logged out')
}

module.exports = {
  register,
  login,
  logout,
}
