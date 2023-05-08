const getAllUsers = async (req, res) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Get All Users'
   */
  res.send('get all users')
}

const getSingleUser = async (req, res) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Get Single User'
   */
  res.send('get single users')
}

const showCurrentUser = async (req, res) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.description = 'Show Current User'
   */
  res.send('show current user')
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
