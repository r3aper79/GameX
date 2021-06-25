
import React from 'react';
import InfiniteCarousel from 'react-leaf-carousel';
import CarouselComponent from './CarouselComponent';
class CarruselStore extends React.Component {


    render() {
        
        return (
            <InfiniteCarousel
                breakpoints={[
                   
                    {
                        breakpoint: 2000,
                        settings: {
                            slidesToShow: 7,
                            slidesToScroll: 7,
                        },
                    },
                    {
                        breakpoint: 1500,
                        settings: {
                            slidesToShow: 5,
                            slidesToScroll: 5,
                        },
                    },
                    {
                        breakpoint: 1355,
                        settings: {
                            slidesToShow: 4,
                            slidesToScroll: 4,
                        },
                    },
                    {
                        breakpoint: 1095,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                        },
                    },
                    {
                        breakpoint: 839,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                    {
                        breakpoint: 585,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                        },
                    },
                ]}
                showSides={true}
                sidesOpacity={0.3}
                sideSize={0.1}
                slidesToScroll={4}
                slidesToShow={5}
                scrollOnDevice={true}
            >
                {this.props.games.map(game => {
                    return (
                        <CarouselComponent key={game._id} game={game} props={this.props.props}/>
                    )
                })}
            </InfiniteCarousel>
        )
    }
}
export default CarruselStore