module.exports = {
  getReviews: async (req, res) => {
    const { channel_id } = req.params;
    const db = req.app.get("db");
    const reviews = await db.Reviews.get_review(channel_id);
    res.status(200).send(reviews);
  },

  addReview: async (req, res) => {
    const { rating, title, review, user_id } = req.body;
    const { channel_id } = req.params;
    const db = req.app.get("db");
    db.Reviews
      .add_review([rating, title, review, channel_id, user_id])
      .then((reviews) => res.status(200).send(reviews))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong.",
        });
        console.log(err);
      });
  },
};
