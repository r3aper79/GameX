import { connect } from 'react-redux';
import hardwareActions from '../../redux/actions/hardwareActions';
import gamesActions from '../../redux/actions/gamesActions';
import CardProduct from "./CardProduct";
import { useEffect } from 'react';
import { IoArrowDownOutline } from "react-icons/io5";
import { ToastContainer } from 'react-toastify';

const StoreGame = (props) => {
    useEffect(() => {
        props.filterGames('All','games', false)
        // eslint-disable-next-line
    }, [])
    let genres = ['All', 'Action', 'Action-adventure', 'Adventure', 'Multiplayer', 'RPG', 'Strategy']
    let consolas = ['All','PS3','PS4','PS5','PC','Xbox One','Xbox 360']
    const filterGamesEvent = async (filterBy, product) => {
        props.filterGames(filterBy, product, false)
    }
    const searchGame = (e) => {
        let valueSearch = e.target.value.trim().toLowerCase()
        props.filterGames(valueSearch,'games', true)

    }
    return (
        <div  >
            <div className='containSectionFiltersGames'>
                <div className='containTextFilterGames'>
                    <h2>Leaders and heroes don't choose themselves</h2>
                    <h4>But you can choose your Game to be a Hero!</h4>
                </div>
                <div className="containerFilters">
                    <div className='containInputFilterGames'>
                        <input type="text" placeholder="Specific game?" onChange={searchGame} />
                    </div>
                    <div className="tagsContainer">
                        <div className='filtroPorCategoriasGames'>                   
                            <h4 className='tituloFiltroGames'>Filter by Categories:</h4>
                            <div className="tagsFilter">
                                {genres.map((genre, i) => {
                                    return <p key={i} onClick={(e) => filterGamesEvent(genre,'games')} className='cadaTextoFiltroGame'>{genre}</p>
                                })}
                            </div>
                        </div>
                        <div className='filtroPorCategoriasGames'>
                            <h4 className='tituloFiltroGames'>Filter by Consoles:</h4>
                            <div className="tagsFilter ">
                                {consolas.map((console, i) => {
                                    return <p key={i} onClick={(e) => filterGamesEvent(console, 'console')} className='cadaTextoFiltroGame'>{console}</p>
                                })}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            <div className="cards containerCards">
                {props.gamesFiltered.length
                ? props.gamesFiltered.map((game, index) => {
                    return (
                        <div key ={game._id} className='divCardProduct '>
                            <CardProduct key={game._id} discount={game.discount} idGame={game._id} image={game.imageBanner} title={game.title} props={props.props} />
                        </div>
                        
                    )
                })
                : <div className='gamesNotFounded'>
                    <h1 className='titleGamesNotFounded'>Sorry, that game is not available yet... Try one of the newest!</h1>
                    <IoArrowDownOutline className='iconGamesNotFounded'/>
                </div>
                }
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        allHardwares: state.hardwareReducer.allHardwares,
        preLoader: state.hardwareReducer.preLoader,
        allGames: state.gamesReducer.allGames,
        gamesFiltered: state.gamesReducer.gamesFiltered,
        preLoaderGames: state.gamesReducer.preLoader
    }
}
const mapDispatchToProps = {
    loadHardwares: hardwareActions.loadHardwares,
    loadGames: gamesActions.loadGames,
    filterGames: gamesActions.filterGames
}
export default connect(mapStateToProps, mapDispatchToProps)(StoreGame)