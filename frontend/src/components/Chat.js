import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import userActions from '../redux/actions/userActions'
import Messages from './Messages' 
import {AiOutlineUsergroupAdd, AiOutlineUserDelete,AiOutlineUsergroupDelete, AiOutlineClose} from 'react-icons/ai'
// import {BsPersonPlus} from 'react-icons/bs'
import {BiChat} from 'react-icons/bi'
import chatActions from '../redux/actions/chatActions'
import Tooltip from '@material-ui/core/Tooltip';
import swal from 'sweetalert'

const Chat = (props) => {

    const [leftHide, setLeftHide] = useState(true)
    const [rightHide, setRightHide] = useState(false)
    const [chatToView, setChatToView] = useState({})
    const [inputValue,setInputValue] = useState({ inputValue:""})
    const [list, setList] = useState ({ beAFriendList:[]})
    const [viewSearchBar, setViewSearchBar]  = useState(false)
    const [friendList, setFriendList] = useState([])
    

    const setInput = (e) => {
        const valor = e.target.value
        setInputValue({inputValue:valor})
    }

    const deleteAlert = (e, friend) =>{
        e.preventDefault()
        swal({
            title: `You are about to remove ${friend.userName.split('@')[0]} from your friendlist"`,
            text: "Is that ok?",
            icon: "info",
            buttons: true,
            dangerMode: true,
          })
          .then((ok) => {
            if (ok) {
                deleteFriend(friend)
            } 
          });
    } 

    useEffect(()=>{
        const windowListener = window.addEventListener('keydown',(e)=>{
            if(e.key === "Escape"){ 
                e.preventDefault()
            }
            switch (e.key){
                case "Escape":
                        setRightHide(true)
                    break;
                default:
                         
                }
        })
        props.open ? setRightHide(!rightHide) : setRightHide(!rightHide)
        return ()=>{
            window.removeEventListener('keydown',windowListener)
        }
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props.open])
    // const fetchFriends = async()=>{
    //     const list = await props.getFriendList(props.userLogged.id)
    //     setFriendList(list)
    // }

    // useEffect(()=>{
    //     if(props.userLogged && props.userLogged.friends && !friendList.length){
    //         fetchFriends()
    //     }
    // // eslint-disable-next-line
    // },[props.userLogged])
    
    // useEffect(()=>{
    //     if(props.userLogged && props.userLogged.friends){
    //         fetchFriends()
    //     }
    // // eslint-disable-next-line
    // },[props.reloadFriendListState])

    // useEffect(()=>{
    //     if(props.Socket){
    //         props.Socket.on('reloadFriendLists',()=>{
    //                 props.reloadFriendList()
                

    //         })
    //     }
    // })
    useEffect(()=>{
        const buscarAmigos = async()=>{
            const res = await props.searchUsers(inputValue.inputValue)
            setList({beAFriendList:res})

        }
        if(inputValue.inputValue.trim() !== "" && inputValue.inputValue.trim() !== " "){
            buscarAmigos()
        } 
        // eslint-disable-next-line
    },[inputValue])    
   
    const changeViewSearchBar = ()=>{
        setViewSearchBar(!viewSearchBar)
        setInputValue({inputValue:""})
      }


    const addFriend = async(person)=>{
        setFriendList([...friendList,person])
        try{
            const newChatOfFriendToAdd = await props.addFriend(person._id)
            setFriendList(newChatOfFriendToAdd)
                // if(props.Socket){
                //     props.Socket.emit('reloadFriendList')
                // }
        }catch(e){
            // ACA UN POPUP DICIENDO QUE FALLO AL AGREGAR AMIGO
            console.log(e)
        }
    }
    const deleteFriend = async (person) =>{
        setFriendList(friendList.filter(friend => friend.id !== person.id))
        try{
            await props.deleteFriend(person.id)
            if(chatToView.friend && chatToView.friend.id === person.id){
                setLeftHide(true)
            }
            // if(props.Socket){
            //     props.Socket.emit('reloadFriendList')
            // }

        }catch(e){
            // ACA UN POPUP DICIENDO QUE FALLO AL ELIMINAR AMIGO
            console.log(e)
        }
    }
    
    // useEffect(()=>{
    //     const reloadFriendChat = async()=>{
    //         if(chatToView.issuer){
    //             let noUserId;
    //             chatToView.issuer === props.userLogged.id ? noUserId = chatToView.receiver : noUserId = chatToView.issuer
    //             const chat = await props.chat(noUserId)
    //             setChatToView({...chat,friend:chatToView.friend})      
                
    //             if(chat){
    //                 setLeftHide(false)
    //             }
    //         }
    //     }
    //     reloadFriendChat()
    // },[props.reloadMessages])

    const openFriendChat = async(friend)=>{
        const chat = await props.chat(friend.id)
        setChatToView({...chat,friend})      
        if(chat){
            setLeftHide(false)
        }
    }

    const searchBarStyle = ( rightHide && viewSearchBar ? {transform: "translate(-20rem,0rem)", opacity:'0',transition: ".7s"}: rightHide && !viewSearchBar ? {transform: "translate(-20rem,3rem)", opacity:'0',transition: ".7s"} : !viewSearchBar ? {transform: "translate(0rem,3rem)",transition: ".7s", opacity:'0'} : {transform: "translate(0rem,0rem)",transition: ".7s"} )
    const innerContainerRightSideStyle = ( rightHide ?
        {transform: "translate(0rem, 0)",transition: ".7s" , opacity:'0',borderTopRightRadius:'10px'} 
        : !viewSearchBar && !rightHide ? {transform: "translate(16rem, 0)",transition: ".7s", borderTopRightRadius:'10px'}  : {transform: "translate(14rem, 0)",transition: ".7s", opacity:'1'} ) 
        


    return (<>
        <div className="extContainer">
        { props.userLogged && 
            <Tooltip title="Open Chat" placement="top-start">               
                <div className="chatIconContainer">
                    <BiChat onClick={()=> setRightHide(!rightHide)} style={!leftHide ? {transition:'.7s',transform:'translate(18rem,0.5rem)'} : !rightHide ? {transition:'.7s',opacity:'0'}:{transition:'.7s'}} className="chatIcon"/>
                </div>
            </Tooltip>}
            <div style={searchBarStyle} className="searchBarFriend">
                <input  className="searchBarInput" onChange={setInput}  value={inputValue.inputValue} placeholder="Add new friends"/>
            </div>

            <Messages props={{ userLogged:props.userLogged, leftHide, setLeftHide, rightHide, chatToView, setChatToView}}/>

            { !inputValue.inputValue.length  ? 
            <div className="innerContainerRightSide" style={innerContainerRightSideStyle }>
                <div className="containerRight">
                    <div className="titleContainer">
                       { !viewSearchBar ? <AiOutlineUsergroupAdd onClick={changeViewSearchBar} className="iconoAddFriends" />
                        :<AiOutlineUserDelete onClick={changeViewSearchBar} className="iconoAddFriends" />}
                        <h1 className="chatTitle">X-Chat
                        </h1>
                    <AiOutlineClose onClick={()=>setRightHide(!rightHide)} className="iconoAddFriends" />

                    </div>
                    <div className="friendCardsContainer">

                        {friendList && friendList.map((friend,i)=>{
                        return( 
                        <div key={i} className="friendContainer">
                            <div className="friendUserImage" onClick={()=> openFriendChat(friend)} style={{backgroundImage:`url(${friend.avatar})`}}></div>
                            <p className="userName" onClick={()=> openFriendChat(friend)} >{friend.userName.split('@')[0]}</p>
                            <div onClick={(e) => deleteAlert(e, friend)} className="deleteFriend">
                                <AiOutlineUsergroupDelete  className="iconoAddFriends" style={{width:'100%',height:'40%',border:'none'}}/>
                            </div>
                        </div>)
                        })}
                    </div>

                </div>
            </div>
            : <div className="innerContainerRightSide" style={innerContainerRightSideStyle }>
                <div className="containerRight">
                    <div className="titleContainer">
                    <AiOutlineUserDelete onClick={changeViewSearchBar} className="iconoAddFriends" />
                        <h1 className="chatTitle">
                            People
                            </h1>
                    </div>
                    <div className="friendCardsContainer">
                        {list.beAFriendList.map((person,i) => {
                            if(person.userName !== props.userLogged.userName && !props.userLogged.friends.find(friend => person._id === friend.id)){
                                return (
                                    <div onClick={()=>addFriend(person)} key={i} className="beAFriendContainer">
                                <div className="friendUserImage" style={{backgroundImage:`url(${person.avatar})`}}></div>
                                <p className="userName">{person.userName.split('@')[0]}</p>
                            </div>)
                            }else{
                                return null
                            }
                        })}
                    </div>
                </div>
            </div>
            }
        </div>
    </>)
}

const mapStateToProps = state =>{
    return {
        userLogged : state.userReducer.userLogged,
        // reloadMessages:state.userReducer.reloadMessages,
        // Socket: state.userReducer.Socket,
        // reloadFriendListState: state.userReducer.reloadFriendList
    }
}

const mapDispatchToProps = {

    searchUsers : userActions.searchUsers,
    addFriend: chatActions.addFriend,
    chat : chatActions.getChatOfUser,
    getFriendList: chatActions.getFriendList, 
    deleteFriend: chatActions.deleteFriend,
    // reloadFriendList:chatActions.reloadFriendList
    
  }
  

export default  connect(mapStateToProps,mapDispatchToProps)(Chat)