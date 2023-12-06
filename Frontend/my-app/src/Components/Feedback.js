import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/Feedback.css";

import Header from "./Header.js";
import Footer from "./Footer.js";
import UserFeedback from "./UserFeedback.js";
// import VerticalModalPopup from "./VerticalModalPopup.js";

function Feedback() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const [changeRangeColor, setRangeColor] = useState('');
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [addressErrorMessage, setAddressErrorMessage] = useState("");
  const [cityErrorMessage, setCityErrorMessage] = useState("");
  const [stateErrorMessage, setStateErrorMessage] = useState("");
  const [zipErrorMessage, setZipErrorMessage] = useState("");
  const [ratingErrorMessage, setRatingErrorMessage] = useState("");
  const [commentsErrorMessage, setCommentsErrorMessage] = useState("");
  const [rangeValueForColor, setRangeValueForColor] = useState(0);
  const rangeTextColor = {
    color: `rgb(${255 - rangeValueForColor * 25}, ${rangeValueForColor * 25 - 90}, 0)`,
  };
  // const [popupModalShow, setPopupModalShow] = React.useState(false);
  const [userRole, setUserRole] = useState("");
  const [allFeedbacks, setAllFeedbacks] = useState([]);

  // function showPopup({popupData}) {
  //   return <VerticalModalPopup data={popupData} show={popupModalShow} onHide={() => setPopupModalShow(false)} />;
  // };

  const onSubmitFeedback = async (e) => {
    e.preventDefault();
    // console.log(fullName);
    // console.log(email);
    // console.log(address);
    // console.log(city);
    // console.log(state);
    // console.log(zip);
    // console.log(comments);
    // console.log(rating);
    const Address = address;
    const comment = comments;
    const rate = rating;
    try {
      const response = await axios.post("http://localhost:3001/feedback/create",{
        fullName,
        email,
        Address,
        city,
        state,
        zip,
        comment,
        rate,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
      );
      if(response){
        console.log(response);
        if(response.status == 201){
          console.log("Feedback created in database successfully");
          alert("Feedback submitted");
          window.location.reload(true);
        }
        // setPopupModalShow(true);
        // showPopup("Feedback submitted!");
      }

    } catch (error) {
      console.log("Error in submitting the feedback!");
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()){
      console.log('Form validation passed');
      onSubmitFeedback(e);
    }
    else{
      console.log('Form validation failed');
    }
  };

  useEffect( () => {
    const GetAllFeedbacks = async () => {
      try {
        console.log(userRole);
        // if(userRole === "Admin"){
          const response = await axios.get("http://localhost:3001/feedback/get", {
            withCredentials: true,
          });
          if(response.data){
            setAllFeedbacks(response.data);
          }
          // console.log("allFeedbacks - " + allFeedbacks[5].comment);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    GetAllFeedbacks();
  }, [
    fullNameErrorMessage,
    emailErrorMessage,
    addressErrorMessage,
    cityErrorMessage,
    stateErrorMessage,
    zipErrorMessage,
    ratingErrorMessage,
    commentsErrorMessage,
    allFeedbacks,
  ]
  );

  const validateFullName = (input) => {
    if(!/^[a-zA-Z ]*$/.test(input)){
      setFullNameErrorMessage("Please enter a valid Full Name");
      return false;
    }
    else{
      setFullNameErrorMessage("");
      return true;
    }
  };

  const validateEmail = (input) => {
    // console.log(input, email);
    if(input.length == 0){
      setEmailErrorMessage("Email cannot be empty");
      return false;
    }
    else if(!/^[a-zA-Z0-9._-]+@northeastern\.edu$/.test(input)){
      setEmailErrorMessage("Please enter a valid email address");
      return false;
    }
    else{
      setEmailErrorMessage("");
      return true;
    }
  };

  const validateAddress = (input) => {
    if(!/^[a-zA-Z0-9\s,'-]*$/.test(input)){
      setAddressErrorMessage("Please enter a valid address");
      return false;
    }
    else{
      setAddressErrorMessage("");
      return true;
    }
  };

  const validateCity = (input) => {
    if(!/^[a-zA-Z]*(?:[\s-][a-zA-Z]+)*$/.test(input)){
      setCityErrorMessage("Please enter a valid city");
      return false;
    }
    else{
      setCityErrorMessage("");
      return true;
    }
  };

  const validateState = (input) => {
    if(!/^[a-zA-Z]*(?:[\s-][a-zA-Z]+)*$/.test(input)){
      setStateErrorMessage("Please enter a valid state");
      return false;
    }
    else{
      setStateErrorMessage("");
      return true;
    }
  };

  const validateZip = (input) => {
    if(input && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(input)){
      setZipErrorMessage("Please enter a valid zipcode");
      return false;
    }
    else{
      setZipErrorMessage("");
      return true;
    }
  };

  const updateRating = (value) => {
    console.log("updateRating called: "+ value);
    validateRating(value);
    setRating(value);
  };
  
  const validateRating = (input) => {
    console.log(input);
    if(!input){
      setRatingErrorMessage("Rating cannot be missed");
      return false;
    }
    else{
      setRatingErrorMessage("");
      return true;
    }
  };

  const validateComments = (input) => {
    if(!input){
      setCommentsErrorMessage("Feedback comments cannot be empty");
      return false;
    }
    else{
      setCommentsErrorMessage("");
      return true;
    }
  };

  const validateForm = () => {
    let isValid = true;

    if(!validateFullName(fullName)){
      isValid = false;
    }
    if(!validateEmail(email)){
      isValid = false;
    }
    if(!validateAddress(address)){
      isValid = false;
    }
    if(!validateCity(city)){
      isValid = false;
    }
    if(!validateState(state)){
      isValid = false;
    }
    if(!validateZip(zip)){
      isValid = false;
    }
    if(!validateRating(rating)){
      isValid = false;
    }
    if(!validateComments(comments)){
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        if (response.data.name) {
          // user is logged in
          setUserRole(response.data.role);
          // console.log(response.data.role);
        }
      } catch (error) {
        console.log(error);
        // user is not logged in
        if (error.response.data.message === "Login first") {
          navigate("/login");
        }
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    checkLoggedInStatus();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="spinner-border text-primary"
          role="status"
          style={{ width: "4rem", height: "4rem" }}
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      {
        (userRole !== "Admin") ? 
        (
      <div className="feedback-form-body">
        <form className="row g-3 feedbackForm" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="inputFullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputFullName"
              value={fullName}
              onChange={(e) => {setFullName(e.target.value); validateFullName(e.target.value);}}
            />
            <span className="formErrors">{fullNameErrorMessage}</span>
          </div>

          <div className="col-md-12">
            <label htmlFor="inputEmail" className="form-label">
              Email<span className="field-compulsion">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              value={email}
              onChange={(e) => {setEmail(e.target.value); validateEmail(e.target.value);}}
              onInput={(e) => {validateEmail(e.target.value);}}
            />
            <span className="formErrors">{emailErrorMessage}</span>
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="Street, Apartment, etc."
              value={address}
              onChange={(e) => {setAddress(e.target.value); validateAddress(e.target.value);}}
            />
            <span className="formErrors">{addressErrorMessage}</span>
          </div>

          <div className="col-md-4">
            <label htmlFor="inputCity" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="inputCity"
              value={city}
              onChange={(e) => {setCity(e.target.value); validateCity(e.target.value);}}
            />
            <span className="formErrors">{cityErrorMessage}</span>
          </div>

          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label">
              State
            </label>
            <input
              type="text"
              className="form-control"
              id="inputState"
              value={state}
              onChange={(e) => {setState(e.target.value); validateState(e.target.value);}}
            />
            <span className="formErrors">{stateErrorMessage}</span>
          </div>

          <div className="col-md-4">
            <label htmlFor="inputZip" className="form-label">
              Zip
            </label>
            <input
              type="text"
              className="form-control"
              id="inputZip"
              value={zip}
              onChange={(e) => {setZip(e.target.value); validateZip(e.target.value);}}
            />
            <span className="formErrors">{zipErrorMessage}</span>
          </div>

          <div className="col-md-6">
            <label htmlFor="customRange3" className="form-label">
              Rate your experience<span className="field-compulsion">*</span>
            </label>
            <div className="d-flex align-items-center">
              <input
                type="range"
                className="form-range flex-grow-1"
                min="0"
                max="10"
                step="1"
                id="customRange3"
                value={rating}
                onChange={(e) => {updateRating(e.target.value); setRangeColor('blue'); setRangeValueForColor(e.target.value); }}
              />
              <span className={changeRangeColor + 'ms-2 ratingValue'} style={rangeTextColor}>{rating}</span>
            </div>
            <span className="formErrors">{ratingErrorMessage}</span>
          </div>

          <div className="col-12">
            <label className="form-label">
              Share your comments on our recipes<span className="field-compulsion">*</span>
            </label>
            <textarea
              className="form-control"
              aria-label="With textarea"
              id="myFeedbackComments"
              value={comments}
              onChange={(e) => {setComments(e.target.value); validateComments(e.target.value);}}
            ></textarea>
            <span className="formErrors">{commentsErrorMessage}</span>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button className="btn btn-dark" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
        )
        :
        (
          <div>
            <h2 className="allFeedbacksHeader">All Feedbacks</h2>
              <div className="allUserFeedbacksContainer">
                {
                  allFeedbacks.map((feedback) => (
                    <UserFeedback key={feedback._id} feedback={feedback} />
                  ))
                }
              </div>
          </div>
        )
      }
      <Footer />
    </>
  );
}

export default Feedback;
