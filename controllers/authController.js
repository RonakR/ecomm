const register = async (req, res) => {
  res.send('register')
}

const login = async (req, res) => {
  res.send('login user')
}

const logout = async (req, res) => {
  res.send('register')
}

module.exports = {
  register,
  login,
  logout,
}
