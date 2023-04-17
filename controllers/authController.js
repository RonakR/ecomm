const register = async (req, res) => {
  /**
   * #swagger.tags = ['Auth']
   * #swagger.description = 'Register a new user'
   */
  res.send('register')
}

const login = async (req, res) => {
  res.send('login user')
}

const logout = async (req, res) => {
  res.send('logout')
}

module.exports = {
  register,
  login,
  logout,
}
