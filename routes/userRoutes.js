const express = require('express')
const router = express.Router()

const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController')

router.get('/users/', getAllUsers)
router.get('/users/showMe', showCurrentUser)
router.patch('/users/updateUser', updateUser)
router.patch('/users/updateUserPassword', updateUserPassword)

router.get('/users/:id', getSingleUser)

module.exports = router
