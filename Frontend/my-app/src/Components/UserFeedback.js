import React, { useState } from "react";
import "../Styles/UserFeedback.css";

const UserFeedback = ({feedback}) => {

  return (
    <>
        <div className="list-group">
            <a className="list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{feedback.fullName}</h5>
                    <small><b>{feedback.email}</b></small>
                </div>
                <div className="d-flex w-100 justify-content-between">
                <p>
                    <small><b>Address: </b></small>
                    <small>{feedback.Address}</small>
                </p>
                </div>
                <div className="d-flex w-100 justify-content-between">
                <p>
                    <small><b>City: </b></small>
                    <small>{feedback.city}</small>
                </p>
                <p>
                    <small><b>State: </b></small>
                    <small>{feedback.state}</small>
                </p>
                <p>
                    <small><b>Zip: </b></small>
                    <small>{feedback.zip}</small>
                </p>
                </div>
                <div className="d-flex w-100 justify-content-between">
                <p>
                    <small><b>Rating: </b></small>
                    <small>{feedback.rate}</small>
                </p>
                </div>
                <div className="d-flex w-100 justify-content-between">
                <p>
                    <small><b>Comments: </b></small>
                    <small>{feedback.comment}</small>
                </p>
                </div>
            </a>
        </div>
    </>
  );
};

export default UserFeedback;