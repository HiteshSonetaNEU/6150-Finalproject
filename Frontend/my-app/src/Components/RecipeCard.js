import React from "react";

import '../Styles/RecipeCard.css'
import imgX from '../Images/Home/bhindi-masala.jpg';

var RecipeCard = ({recipe}) => {

    return (
        <>
            {/* <!-- Modal --> */}
        <div className="modal fade" id={`modal${recipe._id}`} tabIndex="-1" aria-labelledby={recipe.title} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{recipe.title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div className="imageModal">
                    {/* Replace the image source with your actual image source */}
                    <img src={imgX} alt={recipe.title} />
                    <div className="accordion" id={`accordion${recipe._id}`}>
                        <div className="accordion-item">
                        <h2 className="accordion-header" id={`heading${recipe._id}`}>
                            <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse${recipe._id}`}
                            aria-expanded="true"
                            aria-controls={`collapse${recipe._id}`}
                            >
                            Recipe
                            </button>
                        </h2>
                        <div
                            id={`collapse${recipe._id}`}
                            className="accordion-collapse collapse show"
                            aria-labelledby={`heading${recipe._id}`}
                            data-bs-parent={`#accordion${recipe._id}`}
                        >
                            <div className="accordion-body">
                            <ul>
                                <li>1. Boil and mash mixed vegetables (potatoes, peas, cauliflower, and capsicum).</li>
                                <li>2. In a pan, sauté onions, tomatoes, and garlic with pav bhaji masala.</li>
                                <li>3. Add the mashed vegetables and cook until well combined.</li>
                                <li>4. Toast pav (bread) with butter on a griddle until golden.</li>
                                <li>5. Serve the bhaji with buttered pav, garnished with chopped onions and lemon wedges.</li>
                            </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                    </button>
                </div>
                </div>
            </div>
            </div>


            <div className="col-sm-3">
            <div className="card" style={{ width: '18rem' }}>
                <img src={imgX} className="card-img-top" alt="..." />
                <div className="card-body">
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">
                    {recipe.description}
                </p>
                <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target={"#modal"+recipe._id}
                    className="btn btn-dark"
                >
                    View
                </button>
                </div>
            </div>
            </div>
        </>
    );       
}

export default RecipeCard;