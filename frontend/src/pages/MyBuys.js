import React from "react"
import { connect } from "react-redux"
import Header from "../components/Header";
import buyActions from "../redux/actions/buyActions";
import Loader from '../components/Loader';
import ProductBuyed from "../components/ProductBuyed";
import { NavLink } from "react-router-dom";


class MyBuys extends React.Component{

    toTop= () => {window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    })}

    token= localStorage.getItem('token')

    
    componentDidMount(){
        this.toTop()
        this.props.loadBuys(this.props.userLogged.id, this.token)
    }

    
    render() {
            if (!this.props.buyList) {
                return <Loader/>
                
            } else{
            
            return(
                <>
                    <Header props={this.props.history}/>
                    <div className='containerMyBuys animate__animated animate__fadeIn'>
                        {this.props.buyList.length 
                        ? this.props.buyList.map(buy => {
                            return  <div key={buy._id} className='containerOrder'>
                                        <div className='divInfoMyBuys'>
                                            <div>
                                                <h1>Date: {buy.date.slice(5,10)}-{buy.date.slice(0,4)} at {buy.date.slice(11,19)} Hs</h1>
                                                <h1>Total: ${(buy.totalPrice).toFixed(0)}</h1>
                                            </div>
                                            <div>
                                                <h1>Deliver information: </h1>
                                                <h3>Name: {buy.deliverInformation[0].firstName} {buy.deliverInformation[0].lastName}</h3>
                                                <h3>Direction: {buy.deliverInformation[0].direction} - {buy.deliverInformation[0].city}</h3>
                                                <h3>Cellphone Number: {buy.deliverInformation[0].cellphone}</h3>
                                            </div>
                                        </div>
                                        <h2>Products acquired:</h2>
                                        <div className='divProductosComprados'>
                                            {buy.products.map(product =>{
                                                return <ProductBuyed key={product._id} product={product}/>
                                            })}
                                        </div>    
                                    </div>
                        })
                        :<>
                            <h1 className='emptyListBuys'>Your list of buys is empty</h1>
                            <div className='divButtonsEmptyListBuys'>
                                <NavLink to='/hardware' ><p className='linksEmptyListBuys'>Hardware Store</p></NavLink>
                                <NavLink to='/games' ><p className='linksEmptyListBuys'>Game Store</p></NavLink>
                            </div>                        
                        </>                    
                        }


                    </div> 
                </>       
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        userLogged: state.userReducer.userLogged,
        buyList: state.userReducer.buyList
    }
}
const mapDispatchToProps = {
    loadBuys: buyActions.loadBuys,
}


export default connect(mapStateToProps, mapDispatchToProps)(MyBuys)
