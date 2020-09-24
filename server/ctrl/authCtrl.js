const bcrypt = require("bcrypt");

module.exports = {
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;
    const user = await db.Users.check_user(email);
    if (!user[0]) {
      return res.status(401).send("Incorrect credentials");
    } else {
      const authenticated = bcrypt.compareSync(password, user[0].password);
      if (authenticated) {
        req.session.user = user[0];
        res.status(200).send(req.session.user);
      } else {
        res.status(403).send("Username or Password wrong");
      }
    }
  },
  register: async (req, res) => {
    const db = req.app.get("db");
    const transporter = req.app.get("transporter");
    const {
      username,
      email,
      password,
      first_name,
      last_name,
      profile_pic,
    } = req.body;
    const existingUser = await db.Users.check_user(email);
    if (existingUser[0]) {
      return res.status(409).send("User already exists");
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await db.Users.create_user([
      username,
      email,
      hash,
      first_name,
      last_name,
      profile_pic,
    ]);

    const mailOptions = {
      from: "ryan.test245@gmail.com",
      to: email,
      subject: "Welcome to YouTube Yelp",
      text: `Hi ${first_name}!, Thank you so much for making an account with us! Here is your information! First Name: ${first_name} Last Name: ${last_name} Username: ${username}`,
      html: `<b>Hi ${first_name}! </b><br> Thank you so much for making an account with us! Here is your information! </b><br> First Name: ${first_name} </b><br> Last Name: ${last_name} </b><br> Username: ${username} </b>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Email sent successfully!");
    });


    req.session.user = newUser[0];
    res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  },
  getUser: (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(404).send(`Get User`);
    }
  },
  edit: async (req, res) => {
    const { username, email, profile_pic, first_name, last_name } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");

    const [user] = await db.Users.edit_user({
      username,
      email,
      profile_pic,
      first_name,
      last_name,
      user_id: id,
    });
    req.session.user = user
    res.status(200).send(user);
  },
  pic: async (req,res) => {
    const {profile_pic}= req.body;
    const {user_id} = req.session.user
    const db = req.app.get("db");

    await db.Users.edit_pic({
      profile_pic,
      user_id
    })
    req.session.user.profile_pic = profile_pic
    res.sendStatus(200)
  }
};
