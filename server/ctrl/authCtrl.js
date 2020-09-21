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

    res.status(200).send(user);
  },
};
