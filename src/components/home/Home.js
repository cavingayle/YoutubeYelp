
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


import Search from "../search/Search";
import Spinner from "../spinner/Spinner";
import Searchbar from "../searchbar/Searchbar";


function Home(props) {
  const [reviews, setReviews] = useState([]);
  const [randomChannels, setRandomChannels] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get("/api/recent").then((res) => {
      setReviews(res.data.slice(0,4))
getRandomChannels()
    });
  },[]);

 
  const getRandomChannels = () => {
    setLoading(true)
    axios.get('/api/channels/').then(res => {
      setRandomChannels(res.data.map((a) => ({sort: Math.random(), value: a}))
      .sort((a, b) => a.sort - b.sort)
        .map((a) => a.value).slice(0, 4))
    setLoading(false)
    })
  }



  // filtering the reviews data to remove duplicates 
  const reviewsFilt = reviews.filter( (rev, ind, self) => 
  ind === self.findIndex(t =>(
  t.channel_id === rev.channel_id
  ))
  )




  console.log('RANDOM CHANNELS',randomChannels)

  if (loading === true) {
    return (
      <div>
        <Spinner/>
      </div>
    );
  }

  return (
    <div>
      <header>
        <div>Youtube Yelp</div>
        <Searchbar />
      </header>
      <div>
        <div className="genre">Channels To Checkout</div>
        {randomChannels.map(chan => (
          <Link to={`/channel/${chan.youtube_id}`}><div >
            <h2>{chan.title}</h2>
            <div><img src={chan.image} alt="" width='300'/></div>
            </div></Link>
        ))}
        <span></span>
        <div className="recentactivity">
          {reviewsFilt.map((rev,i) => {
            return (
              <Link to={`/channel/${rev.youtube_id}`}> <div key={i}>
                <h2>
                {rev.channel_title}

                </h2>
                <div><img src={rev.image} alt={rev.channel_title} width='300'/></div>
              </div></Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}


export default Home


const categories = [
  {
  image: 'https://live.staticflickr.com/5170/5312401831_636e1e53ae_b.jpg',
  query: 'animation',
  title: 'Animation'
  },
  {
  image: 'https://ichef.bbci.co.uk/images/ic/640x360/p08m7l9v.jpg',
  query: 'conspiracy',
  title: 'Conspiracy'
  },
  {
  image: 'https://cdn1.vectorstock.com/i/1000x1000/60/65/stage-curtains-with-shining-microphone-standup-vector-16646065.jpg',
  query: 'comedy',
  title: 'Comedy'
  },
  {
  image: 'https://i.pinimg.com/originals/a1/ca/35/a1ca35caefda4532ec52a5a988abbe15.jpg',
  query: 'beauty',
  title: 'Beauty / Fashion'
  },
  {
  image: 'https://www.multiview.com/wp-content/uploads/2019/01/vlogs_825x340.jpg',
  query: 'vloggers',
  title: 'Daily Vloggers'
  },
  {
  image: 'https://mamaneedsaproject.com/wp-content/uploads/2020/01/DIY-Wood-Shelf-Brackets-Featured-Image.jpg',
  query: 'diy',
  title: 'DIY'
  },
  {
  image: 'https://leadingedgeplanning.com/wp-content/uploads/2016/08/Family-Silhouette_2.jpg',
  query: 'family',
  title: 'Family'
  },
  {
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ4KU8Gi-4YZWaPaw3U_PWqP9TfMUDlGENlOQ&usqp=CAU',
  query: 'gaming',
  title: 'Gaming'
  },
  {
  image: 'https://hdwallsource.com/img/2014/6/free-fitness-wallpaper-42312-43308-hd-wallpapers.jpg',
  query: 'health',
  title: 'Health & Fitness'
  },
  {
  image: 'https://cdn.psychologytoday.com/sites/default/files/styles/amp_metadata_content_image_min_1200px_wide/public/field_blog_entry_images/2019-07/studentlearning.jpg?itok=NXM5cWGS',
  query: 'learning',
  title: 'Learning'
  },
  {
  image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRKKvTirq3z1iDRWBJpwBgfMiKIGSL44qGK3w&usqp=CAU',
  query: 'financial',
  title: 'Financial'
  },
  {
  image: 'https://research.fb.com/wp-content/uploads/2018/05/music-hero2.jpg',
  query: 'music',
  title: 'Music & Dance'
  },
  {
  image: 'https://sport.one/content/images/2018/01/2222-18.jpg',
  query: 'sports',
  title: 'Sports'
  },
  {
  image: 'https://www.energy.gov/sites/prod/files/styles/open_graph_image/public/2017/05/f34/Travel%20%28Air%29%20Alt%20Thumbnail_v2.jpg?itok=qGpRDVlt',
  query: 'travel',
  title: 'Travel'
  },
  {
  image: 'https://m.economictimes.com/thumb/msid-74211022,width-1200,height-900,resizemode-4,imgsize-743396/quantum-computing.jpg',
  query: 'tech',
  title: 'Tech'
  },
  {
  image: 'https://static01.nyt.com/images/2007/02/18/business/smallbusiness/20eep-span.jpg',
  query: 'pranks',
  title: 'Pranks/Challenges'
  },
  {
  image: 'https://cdn.pixabay.com/photo/2015/12/19/12/40/kids-1099709__340.jpg',
  query: 'kids',
  title: 'Kids'
  },
  {
  image: 'https://live.staticflickr.com/3284/2536005489_426b7d2a7c_b.jpg',
  query: 'food',
  title: 'Food'
  },
  {
  image: 'https://api.ndla.no/image-api/raw/id/41749',
  query: 'Political',
  title: 'Political'
  },

  ]