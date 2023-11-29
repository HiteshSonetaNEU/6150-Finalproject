import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/Chef.css";

import Header from "./Header.js";
import Footer from "./Footer.js";
import Button from "react-bootstrap/esm/Button.js";
import chefImage from "../Images/profile/image1.jpg";

function Chefs() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [chefAll, setChefAll] = useState([]);
  var desc = "This chef is very famous for variety of things";
  var chefSpec = ["South Indian", "Tamil", "Veg", "Paneer Tikka", "Idli"];

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        if (response.data.name) {
          // user is logged in
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

  useEffect(() => {
    const GetAllChefs = async () => {
      try {
        const response = await axios.get("http://localhost:3001/user/chef/", {
          withCredentials: true,
        });
        setChefAll(response.data);
        // console.log(chefAll);

        // try {
        //   const response = await axios.get("http://localhost:3001/user/chef/", {
        //     withCredentials: true,
        //   });
        // } catch {
        // }
      } catch (error) {
        console.log(error);
      }
    };

    GetAllChefs();
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

  const follow = () => {
    console.log("A");
  };

  return (
    <>
      <Header />
      <div className="chefBody">
        <div className="chef-list">
          {chefAll.map((chef, index) => {
            return (
              <div className="chefContainer" key={chef._id}>
                <img className="chefImage" src={chefImage} />
                <div className="chefInfoContainer">
                  <div className="chefHeader">
                    <h2 className="chefName">{chef.fullName}</h2>
                    <Button
                      type="button"
                      className="btn btn-dark followButton"
                      onClick={follow}
                    >
                      Follow
                    </Button>
                  </div>
                  {/* <p> {chef.role}</p> */}
                  <p>{desc}</p>
                  <div className="specList">
                    {chefSpec.map((data, index) => {
                      return (
                        <div key={data} className="chefSpec">
                          {data}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Chefs;
