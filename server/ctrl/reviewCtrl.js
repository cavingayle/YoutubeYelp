module.exports = {
  getReviews: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const reviews = await db.reviews.get_review(id);
    res.status(200).send(reviews);
  },

  addReviews: async (req, res) => {
    const { rating, title, review, user_id } = req.body;
    const { id } = req.params;
    const db = req.app.get("db");
    db.reviews
      .add_review([rating, title, review, user_id, id])
      .then((reviews) => res.status(200).send(reviews))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong.",
        });
        console.log(err);
      });
  },
};
