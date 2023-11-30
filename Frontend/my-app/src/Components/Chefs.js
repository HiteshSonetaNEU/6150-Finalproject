import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/Chef.css";
import ChefModal from "./ChefModal.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Button from "react-bootstrap/esm/Button.js";
import chefImage from "../Images/profile/image1.jpg";

function Chefs() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chefAll, setChefAll] = useState([]);
  const [followStatusMap, setFollowStatusMap] = useState({});
  const [currentUserFollowing, setCurrentUserFollowing] = useState({});
  var desc =
    "Creative chef crafting unforgettable culinary experiences with a passion for flavor, precision, and innovation";
  var chefSpec = ["South Indian", "Tamil", "Veg", "Paneer Tikka", "Idli"];
  const [modalShow, setModalShow] = useState(false);
  const [selectedChef, setSelectedChef] = useState(null);

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        // console.log(response);
        if (response.data) {
          // console.log(response.data.following);
          setCurrentUserFollowing(response.data.following);
        }
      } catch (error) {
        // console.log(error);
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

  useEffect(() => {
    const GetAllChefs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/chef/", {
          withCredentials: true,
        });
        setChefAll(response.data);
        // console.log(response.data);
        // const initialFollowStatusMap = {};
        // response.data.forEach((chef) => {
        //   initialFollowStatusMap[chef._id] = "Follow";
        // });

        const initialFollowStatusMap = {};
        response.data.forEach((chef) => {
          initialFollowStatusMap[chef._id] = "Follow";

          if (currentUserFollowing.includes(chef._id)) {
            initialFollowStatusMap[chef._id] = "Unfollow";
          }
        });

        setFollowStatusMap(initialFollowStatusMap);
      } catch (error) {
        console.log(error);
      }
    };

    GetAllChefs();
  }, [currentUserFollowing]);

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

  const follow = async (chefId) => {
    console.log(chefId);

    try {
      const response = await axios.get(
        `http://localhost:3001/user/follow/${chefId}`,
        {
          withCredentials: true,
        }
      );
      // console.log(response);
      // console.log("FOLLOW");
      if (response.data.email) {
        // setFollowStatus("Unfollow");
        setFollowStatusMap((prevMap) => ({
          ...prevMap,
          [chefId]: "Unfollow",
        }));
      }
      // Handle the response data
      // console.log(response.data.email);
    } catch (error) {
      if (error.response.data.error === "User is already following the Chef") {
        // setFollowStatus("Unfollow");
      }
    }
  };

  const unfollow = async (chefId) => {
    // console.log(chefId);

    try {
      const response = await axios.get(
        `http://localhost:3001/user/unfollow/${chefId}`,
        {
          withCredentials: true,
        }
      );
      // console.log("UNFOLLOW");
      // console.log(response);
      if (response.data.email) {
        // setFollowStatus("Unfollow");
        setFollowStatusMap((prevMap) => ({
          ...prevMap,
          [chefId]: "Follow",
        }));
      }
      // Handle the response data
      // console.log(response.data.email);
    } catch (error) {
      if (error.response.data.error === "User is already following the Chef") {
        // setFollowStatus("Unfollow");
      }
    }
  };

  const viewRecepie = async (ChefID, fullName, Desc) => {
    // console.log(ChefID);
    // console.log(fullName);
    // console.log(Desc);

    try {
      const response = await axios.get(
        `http://localhost:3001/recepie/chef/${ChefID}`,
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      setSelectedChef({
        id: ChefID,
        fullName,
        profileDes: Desc,
        recepies: response.data,
      });
      setModalShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => setModalShow(false);

  return (
    <>
      <Header />
      <div className="chefBody">
        <div className="chef-list">
          {chefAll.map((chef, index) => {
            return (
              <div
                className="chefContainer"
                key={chef._id}
                onClick={() => {
                  viewRecepie(chef._id, chef.fullName, chef.profileDes);
                }}
              >
                <img className="chefImage" src={chefImage} />
                <div className="chefInfoContainer">
                  <div className="chefHeader">
                    <h2 className="chefName">{chef.fullName}</h2>
                    <Button
                      type="button"
                      className="btn btn-dark followButton"
                      onClick={() => {
                        if (followStatusMap[chef._id] === "Follow") {
                          follow(chef._id);
                        } else {
                          unfollow(chef._id);
                        }
                      }}
                    >
                      {followStatusMap[chef._id]}
                    </Button>
                  </div>
                  <p>{chef.profileDes || desc}</p>
                  <div className="specList">
                    {chef.specialities.length > 0
                      ? chef.specialities.map((data, index) => (
                          <div key={data} className="chefSpec">
                            {data}
                          </div>
                        ))
                      : chefSpec.map((data, index) => (
                          <div key={data} className="chefSpec">
                            {data}
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
      <ChefModal
        show={modalShow}
        handleClose={handleClose}
        chefData={selectedChef}
      />
    </>
  );
}

export default Chefs;
