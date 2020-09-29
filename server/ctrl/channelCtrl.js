module.exports = {
  addChannel: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    const {title, image} = req.body
    const [check] = await db.Channels.check_for_channel(id)
    console.log('Check Value', check)
    if (!check) {
      const channel = await db.Channels.add_channel([id, title, image])
      console.log('Adding Channel', id)
      res.status(200).send(channel)
    } else {
      res.status(304).send('Already Exists')
    }
    

  },

  getChannel: async (req, res) => {
    const db = req.app.get("db");
    const { id } = req.params;
    console.log('GETTING CHANNEL FOR',id)
    const [channel] = await db.Channels.get_channel(id);
    if (channel) {
      console.log()
      res.status(200).send(channel);

    } else {
      res.status(209).send('Error')
    }
  },
  loadChannels: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.body
    let channel = await db.Channels.load_channel(id)
    res.status(200).send(channel)
  },
  
  getAllChannels: async (req, res) => {
    const db = req.app.get('db')
    const channels = await db.Channels.get_all_channels()
    res.status(200).send(channels)
  },
  getUserProfile: async (req, res) => {
    const db = req.app.get('db')
    const { id } = req.body
    const profile = await db.Users.get_user_profile(id)
    if (profile[0]) {
      res.status(200).send(profile)
    } else {
      res.status(404).send('No profile Exists')
    }
    
  }
};