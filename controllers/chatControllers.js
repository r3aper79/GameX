const Chat = require('../models/Chat')
const User = require('../models/User')

const chatControllers = {

    getChatOfUser: async(req, res)=>{
        try{
            const user = req.user
            const {friendId} = req.params
            const query = {$and: [
                { $or: [ { issuer:user._id }, { issuer:friendId } ] },
                { $or: [ { receiver: friendId }, { receiver:user._id } ] }
            ]}

            const chat = await Chat.findOne(query)
            res.json({success:true, response:chat}) 
        }catch(e){
            res.json({success:false})
        }
    },
    postMessageOfUser: async(req, res)=>{
        try{
            const chatId = req.params.friendId
            const {message} = req.body
            const user = req.user
            const query = {_id:chatId}
            const messageAndEmitter = {message, ownerUserMessage:user._id}
            const update = {$push:{messages:messageAndEmitter}}
            const options = {new:true}
            const newMessage = await Chat.findOneAndUpdate(query,update,options)

            res.json({success:true, response:newMessage})

        }catch(e){
            res.json({success:false, response:e})
        }
    },
    deleteUserChats: async(req, res) =>{
        try{
            const {friendId} = req.params
            const userId = friendId
            const userDataDeleted = await User.findOneAndUpdate({_id:userId},{chats:[],friends:[]},{new:true})
            res.json({success:true,response:userDataDeleted})
            
        }catch(e){
            res.json({success:false})
        }
    },
    deleteChat: async(req,res)=>{
        try{
            const {friendId} = req.params
            // const chatId = friendId
            // const chatDeleted = await Chat.findOneAndDelete({_id:chatId})
            const userId = friendId
            const userDataDeleted = await User.findOneAndUpdate({_id:userId},{chats:[],friends:[]},{new:true})
            res.json({success:true,response:userDataDeleted})
            
            // res.json({success:true,response:chatDeleted})
        }catch(e){
            res.json({success:false,response:e})
        }
    },
    getFriendList: async(req,res)=>{
        try{
            const {userId} = req.params
            const userWithPopulatedFriends = await User.findOne({_id:userId}).populate('friends')
            const populatedFriends = userWithPopulatedFriends.friends
            const filteredFriendData = populatedFriends.map(friend =>{
                return {avatar:friend.avatar, userName:friend.userName,id:friend._id,email:friend.email}
            })
            res.json({success:true,response:filteredFriendData})
        }catch(e){
            res.json({success:false,response:e})
        }
    }



}

module.exports = chatControllers