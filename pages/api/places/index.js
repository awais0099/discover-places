import axios from "axios";

export default function handler(req, res) {
  if (req.method === 'GET') {
    let { types, bl_latitude, tr_latitude, bl_longitude, tr_longitude, limit } = req.query;
    const options = {
      method: 'GET',
      url: `https://travel-advisor.p.rapidapi.com/${types}/list-in-boundary`,
      params: {
        bl_latitude: Number(bl_latitude),
        tr_latitude: Number(tr_latitude),
        bl_longitude: Number(bl_longitude),
        tr_longitude: Number(tr_longitude),
        limit: limit,
      },
      headers: {
        'X-RapidAPI-Key': '041f896cbcmshb41bd4a54d8e653p1f8996jsnd3e101237724',
        'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
      }
    };

    axios.request(options)
    .then(function (response) {
      const { data } = response.data;
      console.log("data", data);
      res.status(200).json({ message: "Success!", placesData: data });
    }).catch(function (error) {
      console.error("** error: api places.js **");
      let {status} = error.response;
      let {message} = error.response.data;
      res.status(500).json({status: status, message: `Something went wrong: ${message}`, error})
    });
  }
}
