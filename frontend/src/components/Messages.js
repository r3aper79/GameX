import React, { useEffect, useRef, useState } from 'react'
import {VscChromeClose} from 'react-icons/vsc'
import {FaWindowMinimize} from 'react-icons/fa'
import {SiRiotgames} from 'react-icons/si'
import { connect } from 'react-redux'
import chatActions from '../redux/actions/chatActions'
import Tooltip from '@material-ui/core/Tooltip';

const Messages = (props)=>{

    const messagesContainerRef = useRef(null)
    
    let {leftHide, setLeftHide, rightHide, chatToView, setChatToView} = props.props
    
    const [minimized , setMinimized] = useState(false)
    const [newMessage , setNewMessage] = useState("")
    // const [loadingMessages, setLoadingMessages] = useState(false)

    const close = ()=>{
        setChatToView({messages:[],user:{name:null}})
        setLeftHide(!leftHide)
    }
    const minimize = ()=>{
        setMinimized(!minimized)
    }
    const readInput = (e)=>{
        const value = e.target.value
        setNewMessage(value)
    }

    const scrollDown = ()=>{
        messagesContainerRef.current?.scrollIntoView({ 
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        })
    }
    
    useEffect(()=>{
        scrollDown()
    },[chatToView])

    // useEffect(()=>{
    //     if(props.Socket){
    //         props.Socket.on('reloadMessages',()=>{
    //                 props.reloadMessages()                
    //         })
    //     }
    // },[props.chatToView])

    const sendMessage = async (e)=>{
        const validado = newMessage.trim() !== "" && newMessage.trim() !== " " 
        if(validado){
            let oldMessagesCondition
            if(chatToView.messages){
                oldMessagesCondition = [...chatToView.messages,{message:newMessage,ownerUserMessage:props.userLogged.id}]
            }else{
                oldMessagesCondition = [{message:newMessage,ownerUserMessage:props.userLogged.id}]
            }
            setChatToView({...chatToView,messages:oldMessagesCondition})
            setNewMessage("")
            try{
                const postedMessage = await props.sendMessage(newMessage,chatToView._id)
                setChatToView({...postedMessage,friend:chatToView.friend})
                // props.Socket.emit('messageSent')
                // setLoadingMessages(true)
            }catch(e){
                // ACA UN POPUP DICIENDO QUE NO SE PUDO ENVIAR EL MENSAJE
                console.log(e)
            }
        }
    }
    let leftSideHide 

        if(minimized && !rightHide){
            leftSideHide ={
                height:'3.5rem',
                transition:".7s",
                 transform:'translate(34rem,0)',
                 cursor:'pointer'
                }
        }else if( minimized && rightHide ){
            
            leftSideHide = {
                height:'3.5rem',
                transition:".7s",
                 transform:'translate(18rem,0)',
                 cursor:'pointer'
                }
        }else if(!leftHide && !rightHide){
            leftSideHide={
                transform: "translate(34rem, 0)", 
                transition: ".7s", 
                opacity:'1'
            }
        }else if (!leftHide){
            leftSideHide={
                transform: "translate(18rem, 0)",
                transition: ".7s",
                opacity:'1'
            }
        }else{
            leftSideHide = {
                transform: "translate(0rem, 0)",
                transition: ".7s",
                 opacity:'1'
                }
        }
        const friendUserName = chatToView.friend ? chatToView.friend.userName.split('@')[0] : ""
        const userAvatar = chatToView.friend ? chatToView.friend.avatar : ""
        
     

    return (
            <div className="containerLeftSide"  onClick={ ()=> minimized && minimize()} style={ leftSideHide }>
                <div className="infoUserContainer" style={minimized ? {height:'100%',transition:".7s",borderBottom:'1px solid rgba(0,0,0,0)', marginTop:'10px'}: {transition:'.7s',cursor:'default',padding: "35px 0"}}>
                    <div className="friendUserImage" style={minimized ? {backgroundImage:`url(${userAvatar})`,width:'2rem',transition:".7s", height:'2rem'}:{transition:".7s",backgroundImage:`url(${userAvatar})`,cursor:'default'}}></div>
                    <p className="userNameChat" style={minimized ? {transition:".7s"}: {transition:'.7s',cursor:'default'}}> {friendUserName}</p>
                    <div style={{display:'flex'}}>
                    <Tooltip title="Minimize chat" placement="top-start">
                        <div className="iconoClose" style={minimized ? {marginLeft:'2.5rem'}: null} onClick={minimize}><FaWindowMinimize /></div>
                    </Tooltip>
                    { !minimized && <div className="iconoClose" onClick={close}><VscChromeClose className="iconoClose"/></div>} 
                    </div>               
                </div>
                <div className="chatsContainer" style={minimized ? {opacity:"0", height:'0',transition:".7s"}: {transition:'.7s'}}>
                    {/* Mapeo de mensajes */}
                    { chatToView.messages ? chatToView.messages.map((message,index) => {
                        const receiving = message.ownerUserMessage !== props.userLogged.id 
                        return(
                    <div ref={messagesContainerRef} key={index} className="containerMessageContainer" style={receiving ? { justifyContent:'flex-start', margin: "0px 10px 5px 0px" } : { justifyContent:'flex-end', margin: "5px 0px 0px 10px" }}>
                        <div className="messageContainer" style={ receiving ? {borderTopLeftRadius:"0px"}: {borderTopRightRadius:"0px"}}>
                            <p className="messageText"> {message.message}</p>
                        </div>
                    </div>

                        )
                    })
                    : null
                }
                </div>
                <div className="inputContainer" style={minimized ? {opacity:"0", height:'0',transition:".7s"}: null}>
                    <input onKeyPress={(e)=> e.key === 'Enter' && sendMessage()} style={minimized ? {opacity:"0", height:'0',transition:".7s"}: null} value={newMessage} onChange={readInput} type="text" className="inputStyle" ></input>
                        <div className="iconSendContainer" onClick={sendMessage} style={minimized ? {opacity:"0", height:'0',transition:".7s"}: {transition:".7s"}}>
                            <SiRiotgames/>
                        </div>
                </div>
            </div>
    
    )
    
}

const mapStateToProps = state =>{
    return {
        userLogged : state.userReducer.userLogged,
        // Socket: state.userReducer.Socket
    }
}

const mapDispatchToProps = {
    sendMessage: chatActions.sendMessage,
    // reloadMessages: chatActions.reloadMessages
}

export default connect (mapStateToProps, mapDispatchToProps) (Messages)