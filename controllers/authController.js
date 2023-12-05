const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')

const register = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'Register a new user'
   * #swagger.description = 'Registers a user as admin or regular user'
   * #swagger.responses[201] = { description: 'User registered successfully.' }
   */
  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0
  const role = isFirstAccount ? 'admin' : 'user'
  const { name, password, email } = req.body
  const user = await User.create({ name, password, email, role })

  const tokenUser = createTokenUser(user)

  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.CREATED).json({ user: tokenUser })
}

const login = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'Login a user'
   * #swagger.description = "Logs a user in, returns a cookie"
   * #swagger.responses[200] = {
   * decription: Logs a user in
   * }
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

  const tokenUser = createTokenUser(user)

  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({ user: tokenUser })
}

const logout = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.summary = 'Logout a user'
   * #swagger.description = "Ends a user's session by expiring the cookie"
   * #swagger.responses[200] = {
   *  description: 'Ends a user's session'
   * }
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
