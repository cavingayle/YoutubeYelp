import React from "react";

function AboutUs() {
  return (
    <div className="main-about">
      <h1 className="about-title">About Us</h1>
      <hr />
      <p className="about-body">
        Welcome to Youtube-Yelp!
        <br /> <br /> This site was built using React, Redux, SASS/CSS, Node,
        PostgreSQL, AWS S3, NodeMailer, and Google API.
        <br /> <br />
        - To begin you can click on some of the recently viewed channels, some
        randomized channels or search for a channel of your choice.
        <br /> <br />
        - From the search page you can select a channel that you would like to
        leave a review for yourself or view past reviews for that channel.
        <br /> <br />
        - Once in a channel page you can select different videos that they have
        recently posted or add a review to the channel. <br /> <br />
        - If you click add review it will take you to the login page where you
        will be asked to login or create an account.
        <br /> <br />
        - After logging in you can simply navigate back to that channel and add
        your review!
        <br /> <br />
        Enjoy Youtube-Yelp!
        <br /> <br />
        Created by: Cavin Gayle, Keaton Braithwaite & Ryan Milne || Sept. 2020
      </p>
      <div className="about-img-holder">
        <img
          alt="Cavin Gayle"
          src="https://us.themoneytizer.com/modules/mod_home/img/kgayle.jpg"
        />
        <img
          alt="Keaton Braithwaite"
          src="https://youtube-yelp.s3-us-west-1.amazonaws.com/b8e4a190-6286-43f3-85c3-5b2174335311--8kV9OpUjo5AZn7MmlYK24icZ5Ni5PGN7yw_TRcF9DqdyBsFiWT8bvbhtcZsc9S0WO4TQfPRHeGidLRFioX1wqVRIcj7zsBw7Y-W.png"
        />
        <img
          alt="Ryan Milne"
          src="https://youtube-yelp.s3-us-west-1.amazonaws.com/22e98493-632e-45df-a475-ffc3958fd294-IMG_0562.JPEG"
        />
      </div>
    </div>
  );
}

export default AboutUs;
