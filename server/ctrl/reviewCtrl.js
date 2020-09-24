module.exports = {
  getReviews: async (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    const reviews = await db.Reviews.get_review(id);
    res.status(200).send(reviews);
  },

  addReview: async (req, res) => {
    const { rating, title, review, user_id } = req.body;
    const { channel_id } = req.params;
    const db = req.app.get("db");
    const reviews = await db.Reviews.add_review([rating, title, review, channel_id, user_id])
    if (reviews) {
      res.status(200).send(reviews)
    } else {
      res.status(500).send('Oops')
    }
    
    },
   
    getRecentReviews: async (req, res) => {
        const db = req.app.get('db')
        const reviews = await db.Reviews.get_recent_reviews()
        if (reviews) {
            res.status(200).send(reviews)
        } else {
          res.status(404).send('Error')
        }
        
  },
    
  updateRatings: async (req, res) => {
    const db = req.app.get('db')
    
    const ratings = await db.Reviews.update_rating([rating, channelId])

    }
};
