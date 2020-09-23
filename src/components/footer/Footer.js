import React from "react";

function Footer(props) {
  return (
    <div className="footer-body">
      <div className='check-out'>
        <h5>Check out our code here!</h5>
       <a href='https://github.com/cavingayle/youtubeyelp'> <i className="fab fa-github fa-2x"></i></a>
      </div>
      <div>
        <h6>This website was built with:</h6>
        <i className="fab fa-react fa-2x"></i>
        <i className="fab fa-js fa-2x"></i>
        <i className="fab fa-node-js fa-2x"></i>
        <i className="fab fa-sass fa-2x"></i>
        <i className="fab fa-css3 fa-2x"></i>
        <i className="fab fa-html5 fa-2x"></i>
        <i className="fab fa-aws fa-2x"></i>
      </div>
    </div>
  );
}
export default Footer;
