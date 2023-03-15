import React from 'react';
import playStore from '../../../images/appstore.png';
import appStore from '../../../images/appstore.png';
import "./Footer.css"
const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playStore} alt="playstore" />
        <img src={appStore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; Arvind Baloda</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.linkedin.com/in/arvind-baloda-b4b4421b2/">
          Linkedin
        </a>
        <a href="http://youtube.com/">Youtube</a>
        <a href="http://instagram.com/">Instagram</a>
      </div>
    </footer>
  );
};

export default Footer;
