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

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        if (response.statusText === "OK") {
          setData(response.data);
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
        <h2>Edit Profile</h2>

        <div className="mb-3 roleField">
            <label htmlFor="existingRole" className="form-label">
              Role: <i className="roleLabelText">{data.role}</i>
            </label>
        </div>

        <form className="passwordContainer">
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label" placeholder="Enter new password">
              New Password
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>

          <button
            type="button"
            className="btn btn-dark"
            onClick={handlePasswordSave}
          >
            Change Password
          </button>
        </form>

        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label" placeholder="Enter your Full Name">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={data.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="profileDes" className="form-label" placeholder="Share something about yourself">
              Profile Description
            </label>
            <input
              type="text"
              className="form-control"
              id="profileDes"
              name="profileDes"
              value={data.profileDes}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="specialities" className="form-label">
              Specialities
            </label>
            <ReactTags
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
