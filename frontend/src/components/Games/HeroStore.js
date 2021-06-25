import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom'


const HeroStore = (props) => {

    const [infoHeroGames, setInfoHeroGames]= useState([])

    useEffect(()=>{
        setInfoHeroGames([...heroGames])
    // eslint-disable-next-line
    },[])
    const { heroGames } = props



    return (
        <>
            {
                infoHeroGames.length > 0
                    ? (
                        <div className="parent animate__animated animate__fadeIn">
                            <div className="div1">
                                <NavLink to={`/game/${infoHeroGames[0]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${infoHeroGames[0].imagesBackground[0]}")` }}></div>
                                </NavLink>
                            </div>
                            <div className="div2">
                                <NavLink to={`/game/${infoHeroGames[1]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${infoHeroGames[1].imageBanner}")` }}> </div>
                                </NavLink>
                            </div>
                            <div className="div3">
                                <NavLink to={`/game/${infoHeroGames[2]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${infoHeroGames[2].imageBanner}")` }}> </div>
                                </NavLink>
                            </div>
                            <div className="div5">
                                <NavLink to={`/game/${infoHeroGames[4]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${infoHeroGames[4].imageBanner}")` }}> </div>
                                </NavLink>
                            </div>
                            <div className="div6">
                                <NavLink to={`/game/${infoHeroGames[5]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${infoHeroGames[5].imageBanner}")` }}>
                                    </div>
                                </NavLink>
                            </div>
                            <div className="div7">
                                <NavLink to={`/game/${infoHeroGames[6]._id}`}>
                                    <div className="imageHeroStore" style={{ backgroundImage: `url("${infoHeroGames[6].imagesBackground[0]}")` }}> </div>
                                </NavLink>
                            </div>
                        </div>
                    )
                    : null

            }
        </>
    );
}

export default HeroStore;