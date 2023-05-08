const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse } = require('../utils')

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
    throw new CustomError.BadRequestError('Please provide email and passowrd')
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
  res.send('login user', user)
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
