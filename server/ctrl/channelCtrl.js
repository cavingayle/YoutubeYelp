module.exports = {
  addChannel: async (req, res) => {
    const { youtube_id} = req.body;
    const db = req.app.get("db");
    db.Channels.add_channel([youtube_id])
      .then((channel) => res.status(200).send(channel))
      .catch((err) => {
        res.status(500).send({
          errorMessage: "Oops! Something Went Wrong.",
        });
        console.log(err);
      });
  },

  getChannels: async (req, res) => {
    const { genre_id } = req.params;
    const db = req.app.get("db");
    const channels = await db.Channels.get_channels(genre_id);
    res.status(200).send(channels);
  },
  loadChannels: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.body
    let [channel] = await db.Channels.load_channel(id)
    if (channel) {
      res.status(200).send(channel)
    }
    res.status(404).send('Error')
  }
};