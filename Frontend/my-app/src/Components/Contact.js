import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../Styles/Home.css";
import "../Styles/Contact.css";

import Header from "./Header.js";
import Footer from "./Footer.js";

import HiteshSonetaImg from "../Images/Contact/hitesh-soneta-photo.jpeg";
import OmSolankiImg from "../Images/Contact/om-solanki-photo.jpeg";
import VishveshPanchalImg from "../Images/Contact/vishvesh-panchal-photo.jpg";
import VrishabShettyImg from "../Images/Contact/vrishab-shetty-photo.jpg";
import ProfVishalChawlaImg from "../Images/Contact/prof-vishal-chawla-photo.jpg";
import JayeshTakImg from "../Images/Contact/jayesh-tak-photo.jpeg";
import SaiSuryaTejaSwamiImg from "../Images/Contact/sai-surya-teja-swami-photo.jpeg";
import SupriyaTripathiImg from "../Images/Contact/supriya-tripathi-photo.jpeg";
import AbhishekVenkataImg from "../Images/Contact/abhishek-venkata-photo.jpeg";

function Contact() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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

      <h1 className="mentorsHeader">FOUNDERS</h1>

      <hr
        style={{
          color: "#000000",
          backgroundColor: "#000000",
          height: 3,
          borderColor: "#000000",
        }}
      />

      <div className="container mt-5">
        <div className="row teamMembersContainer">
          <div className="col-md-3 mb-4">
            <img
              src={HiteshSonetaImg}
              alt={"Team Member Image"}
              className="img-fluid teamMemberImage"
            />
            <div className="mt-3 teamMemberDescContainer">
              <p className="teamMemberDesc teamMemberDescName">
                Hitesh Kamlesh Soneta
              </p>
              <p className="teamMemberDesc">
                <b>
                  <a
                    href="mailto:soneta.h@northeastern.edu"
                    className="teamMemberDescEmail"
                  >
                    soneta.h@northeastern.edu
                  </a>
                </b>
              </p>
              {/* <p className="teamMemberDesc">NUID: <b className="teamMemberDescNUID">001234567</b></p> */}
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <img
              src={OmSolankiImg}
              alt={"Team Member Image"}
              className="img-fluid teamMemberImage"
            />
            <div className="mt-3 teamMemberDescContainer">
              <p className="teamMemberDesc teamMemberDescName">
                Omkumar Dhirenbhai Solanki
              </p>
              <p className="teamMemberDesc">
                <b>
                  <a
                    href="mailto:solanki.o@northeastern.edu"
                    className="teamMemberDescEmail"
                  >
                    solanki.o@northeastern.edu
                  </a>
                </b>
              </p>
              {/* <p className="teamMemberDesc">NUID: <b className="teamMemberDescNUID">001234567</b></p> */}
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <img
              src={VishveshPanchalImg}
              alt={"Team Member Image"}
              className="img-fluid teamMemberImage"
            />
            <div className="mt-3 teamMemberDescContainer">
              <p className="teamMemberDesc teamMemberDescName">
                Vishvesh Ashwinbhai Panchal
              </p>
              <p className="teamMemberDesc">
                <b>
                  <a
                    href="mailto:panchal.vis@northeastern.edu"
                    className="teamMemberDescEmail"
                  >
                    panchal.vis@northeastern.edu
                  </a>
                </b>
              </p>
              {/* <p className="teamMemberDesc">NUID: <b className="teamMemberDescNUID">001234567</b></p> */}
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <img
              src={VrishabShettyImg}
              alt={"Team Member Image"}
              className="img-fluid teamMemberImage"
            />
            <div className="mt-3 teamMemberDescContainer">
              <p className="teamMemberDesc teamMemberDescName">
                Vrishab Loknath Shetty
              </p>
              <p className="teamMemberDesc">
                <b>
                  <a
                    href="mailto:shetty.vr@northeastern.edu"
                    className="teamMemberDescEmail"
                  >
                    shetty.vr@northeastern.edu
                  </a>
                </b>
              </p>
              {/* <p className="teamMemberDesc">NUID: <b className="teamMemberDescNUID">001234567</b></p> */}
            </div>
          </div>
        </div>
      </div>

      <hr
        style={{
          color: "#000000",
          backgroundColor: "#000000",
          height: 0.5,
          borderColor: "#000000",
        }}
      />

      <h1 className="mentorsHeader">MENTORS</h1>

      <hr
        style={{
          color: "#000000",
          backgroundColor: "#000000",
          height: 3,
          borderColor: "#000000",
          marginBottom: "2%",
        }}
      />

      <div className="myy">
        <img
          src={ProfVishalChawlaImg}
          alt={"Professor Image"}
          className="profImage"
        />
      </div>
      <div className="profDescContainer">
        <p className="profDesc profDescName">Professor Vishal Chawla</p>
        <p className="profDesc">
          <b>
            <a
              href="mailto:soneta.h@northeastern.edu"
              className="profDescEmail"
            >
              soneta.h@northeastern.edu
            </a>
          </b>
        </p>
      </div>

      <hr
        style={{
          color: "#000000",
          backgroundColor: "#000000",
          height: 0.5,
          borderColor: "#000000",
          marginTop: "2%",
        }}
      />

      <div className="container mt-5">
        <div className="row teamMembersContainer">
          <div className="col-md-3 mb-4">
            <img
              src={JayeshTakImg}
              alt={"TA Image"}
              className="img-fluid teamMemberImage"
            />
            <div className="mt-3 teamMemberDescContainer">
              <p className="teamMemberDesc teamMemberDescName">Jayesh Tak</p>
              <p className="teamMemberDesc">
                <b>
                  <a
                    href="mailto:tak.j@northeastern.edu"
                    className="teamMemberDescEmail"
                  >
                    tak.j@northeastern.edu
                  </a>
                </b>
              </p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <img
              src={SaiSuryaTejaSwamiImg}
              alt={"TA Image"}
              className="img-fluid teamMemberImage"
            />
            <div className="mt-3 teamMemberDescContainer">
              <p className="teamMemberDesc teamMemberDescName">
                Sai Surya Teja Swami
              </p>
              <p className="teamMemberDesc">
                <b>
                  <a
                    href="mailto:swami.s@northeastern.edu"
                    className="teamMemberDescEmail"
                  >
                    swami.s@northeastern.edu
                  </a>
                </b>
              </p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <img
              src={SupriyaTripathiImg}
              alt={"TA Image"}
              className="img-fluid teamMemberImage"
            />
            <div className="mt-3 teamMemberDescContainer">
              <p className="teamMemberDesc teamMemberDescName">
                Supriya Tripathi
              </p>
              <p className="teamMemberDesc">
                <b>
                  <a
                    href="mailto:tripathi.su@northeastern.edu"
                    className="teamMemberDescEmail"
                  >
                    tripathi.su@northeastern.edu
                  </a>
                </b>
              </p>
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <img
              src={AbhishekVenkataImg}
              alt={"TA Image"}
              className="img-fluid teamMemberImage"
            />
            <div className="mt-3 teamMemberDescContainer">
              <p className="teamMemberDesc teamMemberDescName">
                Venkata Abhishek Tiruchunapalli
              </p>
              <p className="teamMemberDesc">
                <b>
                  <a
                    href="mailto:tiruchunapalli.a@northeastern.edu"
                    className="teamMemberDescEmail"
                  >
                    tiruchunapalli.a@northeastern.edu
                  </a>
                </b>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Contact;
