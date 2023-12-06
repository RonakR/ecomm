const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController')
const {
  authenticateUser,
  authenticatePermissions,
} = require('../middleware/authentication')

router.get(
  '/users',
  [authenticateUser, authenticatePermissions('admin')],
  getAllUsers
)
router.get('/users/show-me', authenticateUser, showCurrentUser)
router.patch('/users/update-user', updateUser)
router.patch(
  '/users/update-user-password',
  authenticateUser,
  updateUserPassword
)

router.get('/users/:id', authenticateUser, getSingleUser)

module.exports = router
