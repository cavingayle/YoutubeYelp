import axios from "axios";

const initialState = {
  channels: [],
  reviews: [],
  userId: 0,
  username: "",
  email: "",
  profile_pic: "",
  first_name: "",
  last_name: "",
};

// ACTION STRINGS -- WILL NEED PROMISE MIDDLEWARE IN STORE
const GET_CHANNELS = "GET_CHANNELS";
const ADD_CHANNEL = "ADD_CHANNEL";
const GET_REVIEWS = "GET_REVIEW";
const POST_REVIEW = "POST_REVIEW";

//Auth
const SET_USER_ID = "SET_USER_ID";
const LOGOUT = "LOGOUT";

// Actions Builders

export const getChannelsYT = (query) => {
  let data = axios
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=channel&key=${process.env.REACT_APP_API_KEY}`
    )
    .then((res) => res)
    .catch((err) =>
      axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&type=channel&key=${process.env.REACT_APP_API_KEY_TWO}`
      )
    );
  return {
    type: GET_CHANNELS,
    payload: data,
  };
};

// sending the youtube id and the genre id bbut not sure if the genre id will bbe needed
export const addChannel = (youtubeId, genreId) => {
  let data = axios.post("/api/channel").then((res) => res.data);

  return {
    type: ADD_CHANNEL,
    payload: data,
  };
};

// REVIEW

export const getReviews = (id) => {
  let data = axios.get("/api/reviews/").then((res) => res.data);
  // app.get("/api/reviews", reviewCtrl.getReviews);

  return {
    type: GET_REVIEWS,
    payload: data,
  };
};

export const postReview = () => {
  let data = axios.post("/api/reviews/").then((res) => res.data);
  // should send bback the reviews and set the reviews to result

  return {
    type: POST_REVIEW,
    payload: data,
  };
};

//Auth Action Builder

export function setUser(user) {
  return {
    type: SET_USER_ID,
    payload: user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}

// Reducer

export default function reducer(state = initialState, action) {
  const { type, payload } = action;
  console.log(type);
  switch (type) {
    case GET_CHANNELS + "_PENDING":
      return state;
    case GET_CHANNELS + "_FULFILLED":
      return { ...state, channels: payload.data.items };
    case GET_CHANNELS + "_REJECTED":
      return initialState;
    case GET_REVIEWS + "FULFILLED":
      return { ...state, reviews: payload };
    case SET_USER_ID:
      return {
        ...state,
        userId: payload.user_id,
        username: payload.username,
        email: payload.email,
        profile_pic: payload.profile_pic,
        first_name: payload.first_name,
        last_name: payload.last_name,
      };
    case POST_REVIEW + "FULFILLED":
      return { ...state, reviews: payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
