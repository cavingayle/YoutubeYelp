module.exports = {
  addChannel: async (req, res) => {
    const { id, genre_id } = req.body;
    const db = req.app.get("db");
    db.Channels
      .add_channel([id, genre_id])
      .then((channel) => res.status(200).send(channel))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong.",
        });
        console.log(err);
      });
  },
};
