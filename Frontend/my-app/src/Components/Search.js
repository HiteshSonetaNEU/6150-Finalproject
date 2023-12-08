import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "../Styles/Home.css";
import "../Styles/Search.css"

import Header from "./Header.js";
import Footer from "./Footer.js";
import RecipeCards from "./RecipeCards.js";
import Chefs from "./Chefs.js";

function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchval, setSearchval] = useState("");
  const [searchResultChef, setChefs] = useState([]);
  const [searchResultRecipes, setRecipes] = useState([]);
  const [currentUserId, setCurrentUserID] = useState("");
  const [currentUserRole, setCurrentUserRole] = useState("User");

  // const {query} = useParams();

  // useEffect(() => {
  //   if(query) {
  //     setSearchval(query)
  //   }
  // }, [query])

  useEffect(() => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/", {
          withCredentials: true,
        });
        setCurrentUserID(response.data.id);
        setCurrentUserRole(response.data.role);
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
          style={{ width: "4rem", height: "4rem" }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    if(searchval.length < 3) return;
    axios
      .get(`http://localhost:3001/user/search/${searchval}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data !== null) {
          const chefs = response.data.Chefs;
          setChefs(chefs);
          const recipes = response.data.Recipes;
          setRecipes(recipes);
        }

      })
      .catch((error) => {
        console.error(
          "There was a problem with the Axios request:",
          error.response.data
        );
      });

    try {
      // const response = await axios.get(
      //   {
      //     "query": "123",
      //   },
      //   {
      //     withCredentials: true,
      //   }
      // );
      // console.log(response);
      // if (response.statusText === "OK") {
      // }
    } catch (error) {
      console.log(error.response);
    }
  };


  return (
    <>
      <Header />
      <div style={{ margin: "10%" }}>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchval}
            minLength={3}
            onChange={(e) => {
              setSearchval(e.target.value);
            }}
          />
          <button
            className="btn btn-outline-success"
            type="submit"
            onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>

      <div>

        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 3,
            borderColor: "#000000",
          }}
        />

        <h1 className="searchHeaders">Recipes</h1>

        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 3,
            borderColor: "#000000",
          }}
        />
        <div className="searchRecipeCards">
          <RecipeCards userID={currentUserId} currentUserRole={currentUserRole} searchRecipeData={searchResultRecipes} />
          <div style={{ display: (searchResultRecipes.length === 0 ? 'block' : 'none') , textAlign: "center", margin: "25px"}}>No Recipes found</div>
        </div>
      </div>
      <div>

         <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 3,
            borderColor: "#000000",
          }}
        />

        <h1 className="searchHeaders">Chefs</h1>

        <hr
          style={{
            color: "#000000",
            backgroundColor: "#000000",
            height: 3,
            borderColor: "#000000",
          }}
        />
        <Chefs searchChefData={searchResultChef}  />
        <div style={{ display: (searchResultChef.length === 0 ? 'block' : 'none') , textAlign: "center", margin: "25px"}}>No Chefs found</div>
      </div>
      <Footer />
    </>
  );
}

export default Search;
