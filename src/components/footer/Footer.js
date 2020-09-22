import React from "react";

function Footer(props) {
  return (
    <div className="footer-body">
      <div className='check-out'>
        <h1>Check out our code here!</h1>
       <a href='https://github.com/cavingayle/youtubeyelp'> <i className="fab fa-github fa-2x"></i></a>
      </div>
      <div>
        <h6>This website was built with:</h6>
        <i class="fab fa-react fa-2x"></i>
        <i class="fab fa-js fa-2x"></i>
        <i class="fab fa-node-js fa-2x"></i>
        <i class="fab fa-sass fa-2x"></i>
        <i class="fab fa-css3 fa-2x"></i>
        <i class="fab fa-html5 fa-2x"></i>
        <i class="fab fa-aws fa-2x"></i>
      </div>
    </div>
  );
}
export default Footer;
