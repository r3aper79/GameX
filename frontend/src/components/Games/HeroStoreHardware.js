import { NavLink } from 'react-router-dom'
const HeroStore = (props) => {
    const { heroHardware } = props
    return (
        <>
            {
                heroHardware.length > 0
                    ? (
                        <div className="parentHardware">
                        {
                            heroHardware.map((hardware,index)=>{
                                    let cssClass = "divHardware"+index 
                                return (
                                    <div key={index} className={cssClass}>
                                        <NavLink to={`/hardware/${hardware._id}`}>
                                            <div className="imageHeroStoreHardware" style={{ backgroundImage: `url("${hardware.imageBanner}")` }}> </div>
                                        </NavLink>
                                    </div>
                                )    
                            })
                        }
                        </div>
                    )
                    : null

            }
        </>
    );
}

export default HeroStore;