const express = require('express')
const router = express.Router()
const passport = require('passport')
const hardwareControllers = require('../controllers/hardwareControllers')
const gameController = require('../controllers/gameController')
const userController = require('../controllers/userController')
const validatorUser = require('../config/validatorUser')
const buyController  = require('../controllers/buyController')
const chatControllers = require('../controllers/chatControllers')



const { getChatOfUser, postMessageOfUser, deleteChat, getFriendList } = chatControllers
const { newUser, logIn, forcedLogin, getUsers, changeRol, addFriend, deleteFriend, getAllAddedProducts, addToList } = userController
const { getAllGames, uploadGame, modifyGame, deleteGame, findOneGame, deleteGameImageBackground } = gameController
const{getAllHardwares, getOneHardware, deleteHardware, addNewHardware, updateHardware, deleteHardwareImageBackground}=hardwareControllers
const {getBuyByID , getAllbuys , modifyBuyByID , deleteBuyByID , addBuy } = buyController

// ------------ROUTES USER---------
router.route('/user')
.put(passport.authenticate('jwt', {session: false}),getUsers)

router.route('/user/addFriend/:friendId')
.put(passport.authenticate('jwt', {session: false}),addFriend)

router.route('/user/signup')
    .post(validatorUser,newUser)

router.route('/user/login')
    .post(logIn)    

router.route('/user/loginLS')
    .get(passport.authenticate('jwt', { session: false }), forcedLogin)

router.route('/user/changeRol')
    .put(passport.authenticate('jwt', {session: false}), changeRol)

router.route('/user/mylist/:id')
    .get(getAllAddedProducts)

router.route('/user/addToList/:id')
    .put(passport.authenticate('jwt', {session: false}), addToList)


// ------------ROUTES GAMES---------
router.route('/games')
    .get(getAllGames)
    .post(passport.authenticate('jwt', {session: false}), uploadGame)

router.route('/game/:_id')
    .get(findOneGame)
    .put(modifyGame)
    .delete(deleteGame)

router.route('/game/edit/:fileName')
    .delete(deleteGameImageBackground)



// ------------ROUTES HARDWARE---------
router.route('/hardware')
    .get(getAllHardwares)
    .post(passport.authenticate('jwt', {session: false}), addNewHardware)

router.route('/hardware/:id')
    .get(getOneHardware)
    .delete(deleteHardware)
    .put(updateHardware)

router.route('/hardware/edit/:fileName')
    .delete(deleteHardwareImageBackground)

//------------ROUTES BUYS ---------
router.route('/buy')
.get(getAllbuys)
.post(passport.authenticate('jwt', {session:false}), addBuy)

router.route('/buy/:id')
.get(getBuyByID)
.delete(deleteBuyByID)
.put(modifyBuyByID)

// ------------ROUTES CHATS---------
router.route('/chats/:friendId')
.get(passport.authenticate('jwt', {session:false}), getChatOfUser)
.put(passport.authenticate('jwt', {session:false}), postMessageOfUser)
.delete(deleteChat)

router.route('/friends/:userId')
.get(getFriendList)
.delete(passport.authenticate('jwt', {session:false}),deleteFriend)

module.exports = router