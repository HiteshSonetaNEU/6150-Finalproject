// Footer.js
import React from 'react';
import '../Styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_top">
        <div className="container">
          <div className="row">
            <div className="col-x-2 col-md-6 col-lg-3">
              <div class="footer_widget">
                <h3 class="footer_title">Starters</h3>
                <ul>
                  <li><a href="#">Immune Support</a></li>
                  <li><a href="#">Pantry Staples</a></li>
                  <li><a href="#">High Protein</a></li>
                  <li><a href="#">Vegetarian</a></li>
                </ul>
              </div>
            </div>
            <div className="col-x-2 col-md-6 col-lg-3">
              <div class="footer_widget">
                <h3 class="footer_title">Main Course</h3>
                <ul>
                  <li><a href="#">Immune Support</a></li>
                  <li><a href="#">Pantry Staples</a></li>
                  <li><a href="#">High Protein</a></li>
                  <li><a href="#">Vegetarian</a></li>
                </ul>
              </div>
            </div>
            <div className="col-x-2 col-md-6 col-lg-3">
              <div class="footer_widget">
                <h3 class="footer_title">Desserts</h3>
                <ul>
                  <li><a href="#">Immune Support</a></li>
                  <li><a href="#">Pantry Staples</a></li>
                  <li><a href="#">High Protein</a></li>
                  <li><a href="#">Vegetarian</a></li>
                </ul>
              </div>
            </div>
            <div className="col-x-2 col-md-6 col-lg-3">
            <div class="footer_widget">
                <h3 class="footer_title">Juices & Shakes</h3>
                <ul>
                  <li><a href="#">Immune Support</a></li>
                  <li><a href="#">Pantry Staples</a></li>
                  <li><a href="#">High Protein</a></li>
                  <li><a href="#">Vegetarian</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-right_text">
        <div className="container">
          <div className="footer_border"></div>
          <div className="row align-items-center">
            <div className="col-xl-8 col-md-8">
              <p className="copy_right">Copyright © 2023 All rights reserved</p>
            </div>
            <div className="col-xl-4 col-md-4">
              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
