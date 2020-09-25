module.exports = {
  getReviews: async (req, res) => {
    const db = req.app.get("db");

    const { id } = req.params;
    const reviews = await db.Reviews.get_review(id);
    res.status(200).send(reviews);
  },

  addReview: async (req, res) => {
    const { rating, title, review, user_id, channel_id  } = req.body;
    console.log(req.params,req.body)
    const db = req.app.get("db");
    const reviews = await db.Reviews.add_review([
      rating,
      title,
      review,
      channel_id,
      user_id,
    ]);
    if (reviews) {
      res.status(200).send(reviews);
    } else {
      res.status(500).send("Oops");
    }
  },

  getRecentReviews: async (req, res) => {
    const db = req.app.get("db");
    const reviews = await db.Reviews.get_recent_reviews();
    if (reviews) {
      res.status(200).send(reviews);
    } else {
      res.status(404).send("Error");
    }
  },

  // updateRatings: async (req, res) => {
  //   const db = req.app.get('db')
  //   const { rating, channelId} = req.body
  //   const ratings = await db.Reviews.update_rating([rating, channelId])
  //   if (ratings) {
  //     res.status(200).send(ratings)
  //   } else {
  //     res.status(404).send('Error')
  //   }

  // },

  getAvgRating: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const avgRating = await db.Reviews.get_avg_rating([id]);
    res.status(200).send(avgRating);
  },
};
