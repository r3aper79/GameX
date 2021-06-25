import React from "react"
import { connect } from "react-redux"
import userActions from "../redux/actions/userActions";
import swal from 'sweetalert'
import AddGame from "../components/AddGame";
import AddHardware from "../components/AddHardware";
import Header from "../components/Header";


class AdminPanel extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    token= localStorage.getItem('token')

    state={
        userInfoToEdit:{
            userName:'',
            newRol:''
        },
        modifyUserRol:false,
        addingHardware:false,
        addingGame:false,
        hardwareInfo:{

        }
    }

    confirm = (e) =>{
        e.preventDefault()
        swal({
            title: `You are about to change Rol of ${this.state.userInfoToEdit.userName} to ${this.state.userInfoToEdit.newRol}`,
            text: "Is that ok?",
            icon: "info",
            buttons: true,
            dangerMode: true,
          })
          .then((ok) => {
            if (ok) {
              this.send()
            } 
          });
    } 

    send = async (e) => {
        e && e.preventDefault()
        const respuesta = await this.props.changeRol(this.state.userInfoToEdit, this.token)
        if (respuesta.error) {
            swal(respuesta.error,'', "error")           
        } else {
            swal("Changed correctly!", respuesta, "success")
            this.setState({...this.state, userInfoToEdit:{userName:'', newRol:''}})
        }   
    }

    readInput = ((e) => {
        const field = e.target.name
        const value = e.target.value
        this.setState({
            ...this.state,
            userInfoToEdit:{...this.state.userInfoToEdit,
            [field]: value}
        })
    })


    
    componentDidMount(){
        this.toTop()
    }




    render() {
         
        return(
            <>
                <Header props={this.props.history}/>
                <div className='containerAdminPanel animate__animated animate__fadeIn'>
                    <div className='options'>
                        <button className='buttonForm buttonOptions' onClick={() => this.setState({...this.state, modifyUserRol:false, addingHardware:true, addingGame:false })}>Add Hardware</button>
                        <button className='buttonForm buttonOptions' onClick={() => this.setState({...this.state, modifyUserRol:false, addingHardware:false, addingGame:true })}>Add Game</button>
                        <button className='buttonForm buttonOptions' onClick={() => this.setState({...this.state, modifyUserRol:true, addingHardware:false, addingGame:false })}>Modify user rol</button>
                    </div>
                    <div className='adminPanelForm'>
                        {this.state.modifyUserRol &&
                            <form className='animate__animated animate__fadeIn modifyUserRol'>
                                <h1 className='titleForm'>Modify user's Rol</h1>
                                <div>
                                    <input className='input2' type="text" placeholder="Username" name="userName" value={this.state.userInfoToEdit.userName} onChange={this.readInput} />
                                    <input  className='input2' type="text" placeholder="New Rol" name="newRol" value={this.state.userInfoToEdit.newRol} onChange={this.readInput} />
                                </div>
                                <button className=' buttonForm btnSubmitAdminPanel' onClick={(e)=>this.confirm(e)}>Send</button>
                            </form>}
                        <div className='addProduct'>
                            {this.state.addingGame && <AddGame />}
                            {this.state.addingHardware && <AddHardware />}

                        </div>
                    </div>
                </div> 
            </>       
        )
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged
    }
}
const mapDispatchToProps = {
    changeRol: userActions.changeRol,
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminPanel)

