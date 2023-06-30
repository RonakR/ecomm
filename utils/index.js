const createTokenUser = require('./createTokenUser')
const { createJWT, isTokenValid, attachCookiesToResponse } = require('./jwt')

module.exports = {
  attachCookiesToResponse,
  createJWT,
  createTokenUser,
  isTokenValid,
}
