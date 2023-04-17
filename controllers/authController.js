const register = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Register a new user'
   */
  res.send('register')
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
