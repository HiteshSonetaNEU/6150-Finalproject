import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { WithContext as ReactTags } from "react-tag-input";

import "../Styles/EditProfile.css";

import Header from "./Header.js";
import Footer from "./Footer.js";

function EditProfile() {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [specialities, setSpecialities] = useState([]);
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");
  const [fullNameErrorMessage, setFullNameErrorMessage] = useState("");

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        if (response.statusText === "OK") {
          setData(response.data);
          // console.log(response.data)
          setSpecialities(
            response.data.specialities.map((speciality, index) => ({
              id: index.toString(),
              text: speciality,
            }))
          );
        }
      } catch (error) {
        console.log(error);
        if (error.response?.data?.message === "Login first") {
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

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSpecialitiesDelete = (i) => {
    setSpecialities((prevSpecialities) => {
      const updatedSpecialities = [...prevSpecialities];
      updatedSpecialities.splice(i, 1); // Remove the speciality at index i
      return updatedSpecialities;
    });
  };

  const handleSpecialitiesAddition = (tagText) => {
    const tagExists = specialities.some((tag) => tag.text === tagText);

    if (!tagExists) {
      setSpecialities((prevSpecialities) => [
        ...prevSpecialities,
        { id: (prevSpecialities.length + 1).toString(), text: tagText },
      ]);
    }
  };

  const handleSpecialitiesChange = (suggestions) => {
    console.log("Change");
    console.log(suggestions);

    if (Array.isArray(suggestions)) {
      setSpecialities((prevSpecialities) => {
        const newTags = suggestions.map((tag, index) => ({
          id: (index + prevSpecialities.length).toString(),
          text: tag.text,
        }));

        return [...prevSpecialities, ...newTags];
      });
    }
  };

  const handlePasswordSave = async () => {
    // console.log(newPassword);
    try {
      const response = await axios.post(
        "http://localhost:3001/user/update",
        {
          password: newPassword,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data);
      alert("Password changed Successfully");
      setNewPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileSave = async () => {
    try {
      console.log(data.name);
      console.log(data.profileDes);
      console.log(specialities.map((tag) => tag.text));

      const response = await axios.post(
        "http://localhost:3001/user/update",
        {
          fullName: data.name,
          profileDes: data.profileDes,
          specialities: specialities.map((tag) => tag.text),
        },
        {
          withCredentials: true,
        }
      );
      // console.log("response = ", response);
      if (response.statusText === "OK") {
        alert("Profile changes successfully");
      }
    } catch (error) {
      console.error("error ", error);
    }
  };

  const validateNewPassword = (input) => {
    var returnVal = false;
    var regExPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (input.trim().length < 1){
      setNewPasswordErrorMessage("New Password should not be empty!");
      returnVal = false;
    }
    else if (input.trim().length < 8){
      setNewPasswordErrorMessage("New Password should be at least 8 characters long!");
      returnVal = false;
    }
    else if (!input.trim().match(regExPassword)) {
      setNewPasswordErrorMessage("New Password should contain at least 1 upper case, 1 lower case,1 number, and 1 special character!");
      returnVal = false;
    }
    else {
      setNewPasswordErrorMessage("");
      returnVal = true;
    }
    return returnVal;
  };

  const validateFullName = (input) => {
    var regExFullName = /^[A-Za-z ]{3,}$/;
    var returnVal = false;
    if (input.trim().length < 1){
      setFullNameErrorMessage("Full Name should not empty")
      returnVal = false;
    }
    else if (input.trim().length < 3){
      setFullNameErrorMessage("Enter valid Full Name with minimum of three characters");
      returnVal = false;
    }
    else if (!input.trim().match(regExFullName)) {
      setFullNameErrorMessage("Full Name should contain only letters and spaces");
      returnVal = false;
    } 
    else {
      setFullNameErrorMessage("");
      returnVal = true;
    }
    return returnVal;
  };

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

      <div className="container editProfileContainer">
        <h2 className="editProfileHeader">Edit Profile</h2>

        
        <div className="mb-3 emailAndRoleField">
            <label htmlFor="existingEmailAndRole" className="form-label">
              <p>
              Email: <i className="emailLabelText">{data.email}</i>
              </p>
              <p className="rolePara">
              Role: <i className="roleLabelText">{data.role}</i>
              </p>
            </label>
        </div>

        <form className="passwordContainer">
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={(e) => {
                validateNewPassword(e.target.value);
                handleNewPasswordChange(e);
              }}
              placeholder="Enter new password"
            />
            {newPasswordErrorMessage && (
                <div className="alert alert-danger alert-small" role="alert">
                  {newPasswordErrorMessage}
                </div>
              )}
          </div>

          <button
            type="button"
            className="btn btn-dark"
            onClick={handlePasswordSave}
          >
            Change Password
          </button>
        </form>

        <form className="saveProfileForm">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={data.name}
              onChange={(e) => {
                validateFullName(e.target.value);
                handleInputChange(e);
              }}
              placeholder="Enter your Full Name"
            />
            {fullNameErrorMessage && (
              <div className="alert alert-danger alert-small" role="alert">
                {fullNameErrorMessage}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="profileDes" className="form-label">
              Profile Description
            </label>
            <input
              type="text"
              className="form-control"
              id="profileDes"
              name="profileDes"
              value={data.profileDes}
              onChange={handleInputChange}
              placeholder="Share something about yourself"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="specialities" className="form-label">
              Specialities
            </label>
            <ReactTags
              autofocus={false}
              key={specialities.length}
              tags={specialities}
              handleDelete={handleSpecialitiesDelete}
              handleAddition={(tag) => handleSpecialitiesAddition(tag.text)}
              handleInputChange={handleSpecialitiesChange}
              placeholder="Enter your specialities"
            />
          </div>

          <button
            type="button"
            className="btn btn-dark"
            onClick={handleProfileSave}
          >
            Save Profile
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default EditProfile;
