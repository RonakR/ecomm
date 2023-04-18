const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const register = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Register a new user'
   */
  const { name, password, email } = req.body
  const user = await User.create({ name, password, email })
  res.status(StatusCodes.CREATED).json({ user })
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
