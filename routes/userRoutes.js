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
  '/users/',
  [authenticateUser, authenticatePermissions('admin')],
  getAllUsers
)
router.get('/users/showMe', showCurrentUser)
router.patch('/users/updateUser', updateUser)
router.patch('/users/updateUserPassword', updateUserPassword)

router.get('/users/:id', authenticateUser, getSingleUser)

module.exports = router
