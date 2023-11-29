import React, { useState } from "react";

import imgg from "../Images/Home/bhindi-masala.jpg"
import imgg2 from "../Images/Home/paneer-tikka-masala.jpg"

import '../Styles/RecipeCarousel.css'


const RecipeCarousel = ()  => {

    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
      setActiveIndex((prevIndex) => (prevIndex === 0 ? 2 : prevIndex - 1));
    };
  
    const handleNext = () => {
      setActiveIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    };

    return (
        <>
        <div className="recipe-carousel-container">
            <div id="carouselExampleCaptions" className="carousel slide" data-ride="carousel">
                {/* <div className="carousel-indicators">
                    <button
                    type="button"
                    data-target="#carouselExampleCaptions"
                    data-slide-to="0"
                    className={activeIndex === 0 ? 'active' : ''}
                    ></button>
                    <button
                    type="button"
                    data-target="#carouselExampleCaptions"
                    data-slide-to="1"
                    className={activeIndex === 1 ? 'active' : ''}
                    ></button>
                    <button
                    type="button"
                    data-target="#carouselExampleCaptions"
                    data-slide-to="2"
                    className={activeIndex === 2 ? 'active' : ''}
                    ></button>
                </div> */}
                
                <div className="carousel-inner">
                    <div className={`carousel-item ${activeIndex === 0 ? 'active' : ''}`}>
                    <img src={imgg} className="d-block w-100 carousel-image" alt="Slide 1" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>First slide label</h5>
                        <p>Some representative placeholder content for the first slide.</p>
                    </div>
                    </div>
                    <div className={`carousel-item ${activeIndex === 1 ? 'active' : ''}`}>
                    <img src={imgg2} className="d-block w-100 carousel-image" alt="Slide 2" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Second slide label</h5>
                        <p>Some representative placeholder content for the second slide.</p>
                    </div>
                    </div>
                    <div className={`carousel-item ${activeIndex === 2 ? 'active' : ''}`}>
                    <img src={imgg} className="d-block w-100 carousel-image" alt="Slide 3" />
                    <div className="carousel-caption d-none d-md-block">
                        <h5>Third slide label</h5>
                        <p>Some representative placeholder content for the third slide.</p>
                    </div>
                    </div>
                </div>

                <button className="carousel-control-prev" type="button" onClick={handlePrev}>
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" onClick={handleNext}>
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        </>
    );
}

export default RecipeCarousel;