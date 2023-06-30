const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

const getAllUsers = async (req, res) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Get All Users'
   */
  console.log('user', req.user)
  const users = await User.find({ role: 'user' }).select('-password')
  res.status(StatusCodes.OK).send({ users })
}

const getSingleUser = async (req, res) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Get Single User'
   */
  const user = await User.find({ _id: req.params.id }).select('-password')
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${req.params.id}`)
  }
  res.status(StatusCodes.OK).send({ user })
}

const showCurrentUser = async (req, res) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Show Current User'
   */
  res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUser = async (req, res) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Update User'
   */
  res.send('update user')
}

const updateUserPassword = async (req, res) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Update User Password'
   */
  res.send('update user password')
}

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
}
