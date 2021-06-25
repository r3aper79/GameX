import React from "react"
import { connect } from 'react-redux';
import Header from "../components/Header";
import hardwareActions from '../redux/actions/hardwareActions';
import gamesActions from '../redux/actions/gamesActions';
import HeroStore from "../components/Games/HeroStore";
import Loader from '../components/Loader';
import StoreGame from "../components/Games/StoreGame";
import CarruselStore from '../components/Games/CarruselStore'
import Footer from "../components/Footer";





class Store extends React.Component {

    

    toTop = () => {
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth"
        })
    }

    state = {
        games: [],
        hardware: [],
    }

    componentDidMount() {
        this.toTop()
        this.props.loadGames()      
        this.setState({ games: this.props.allGames })
    }
    render() {

        return (
            <>
                {!this.props.allGames.length
                    ? (
                        <Loader />
                    )
                    : (
                        <>
                        <Header props={this.props.history}/>
                            {/* <div className="containerStore" style={{backgroundImage: `url("/assets/dark-green-smoke-cloud-background-floriana.jpg")`}}> */}
                            <div className="containerStore" >
                                <HeroStore heroGames={!this.props.preLoaderGames ? this.props.allGames.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, 7) : this.props.allGames} />
                                <StoreGame props={this.props.history}/>
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 style={{ fontSize: '2rem', color: 'white', paddingLeft:'2rem' }}>Latest games</h3>
                                    <div className="containerSlider" >
                                        <CarruselStore games={this.props.allGames.filter(game => game.year >= 2021)} />
                                    </div>
                                </div>
                                <div style={{ marginTop: '2rem' }}>
                                    <h3 style={{ fontSize: '2rem', color: 'white', paddingLeft:'2rem' }}>Retro games</h3>
                                    <div className="containerSlider" >
                                        <CarruselStore games={this.props.allGames.filter(game => game.year <= 2015)} props={this.props.history}/>
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </>
                    )
                }
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        allHardwares: state.hardwareReducer.allHardwares,
        allGames: state.gamesReducer.allGames,
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames
}
export default connect(mapStateToProps, mapDispatchToProps)(Store)
