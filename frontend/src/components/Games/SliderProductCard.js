import { NavLink } from 'react-router-dom'
const SliderProductCard = (props) => {
    const { image, id } = props
    return (
        <>
            {<NavLink to={`/product/${id}`}>
                <div className="cardSlider">
                    <div className="cardImgSlider" style={{ backgroundImage: `url("${image}")` }}></div>
                    <div className="contentSlider">
                        <p>name game</p>
                        <p>price game</p>
                    </div>
                </div>
            </NavLink>
            }
        </>
    );
}

export default SliderProductCard;