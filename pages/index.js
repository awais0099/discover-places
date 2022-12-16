import Link from 'next/link';

import { useCallback, useState } from "react";
import { useEffect } from "react";

import axios from "axios";// import GoogleMapReact from 'google-map-react';

import { Autocomplete } from '@react-google-maps/api';

import {
  Grid,
  Button,
  Typography,
  TextField,
  Stack,
  Rating,
  Box
} from "@mui/material";

import { Menu, MenuItem } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import List from "../components/List/List.js";
import TopButtons from "../components/TopButtons/TopButtons.js";
import Map from "../components/Map/Map.js";


function Home() {
  console.log("home");
  const [coordinates, setCoordinates] = useState({});
  const [isFindingLocation, setIsFindingLocation] = useState(false);
  const [bounds, setBounds] = useState(null);
  const [places, setPlaces] = useState([]);
  const [types, setTypes] = useState("restaurants");
  const [ratingValue, setRatingValue] = useState(2.5);
  const [ratingFilter, setRatingFilter] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);

  useEffect(() => {
    console.log("set rating");
    if (places) {
      const filteredData = places.filter(place => {
        if (place.rating) {
          if (place.rating == ratingValue) {
            return place;
          }
        }
      });

      if (filteredData.length > 0) {
        setPlaces(filteredData);
      }
    }
  }, [ratingValue]);

  // when the page load, get current user location
  const success = (position) => {
    setCoordinates({ lat: position.coords.latitude, lng: position.coords.longitude });
    setIsFindingLocation(false);
  };

  const error = () => {
    console.log("geolocation error");
  };

  useEffect(() => {
    setIsFindingLocation(true);
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }, []);
  // get current user location end

  useEffect(() => {
    console.log({ bounds });
    
    if (bounds) {
      setIsLoadingPlaces(true);
      axios.request({
        method: 'GET',
        url: '/api/places/',
        params: {
          types: types,
          bl_latitude: bounds?.sw.lat,
          tr_latitude: bounds?.ne.lat,
          bl_longitude: bounds?.sw.lng,
          tr_longitude: bounds?.ne.lng,
          limit: '8',
        }
      }).then((response) => {
        return response.data;
      }).then((data) => {
        let { message, placesData } = data;
        setPlaces(placesData);
        setIsLoadingPlaces(false);
        setErrorMessage('');
      }).catch((error) => {
        console.log("**error: page index.js:sending request to places api **");
        const { data } = error.response;
        setErrorMessage(data.message);
      })
    }

  }, [types, coordinates, bounds]);

  console.log({places});

  const handleRestaurantsBtnClick = useCallback(() => {
    console.log("restaurent button click");
    setTypes("restaurants");
  }, []);

  const handleAttractionsBtnClick = useCallback(() => {
    setTypes("attractions");
    console.log("attraction button click");
  }, []);

  const handleHotelsBtnClick = useCallback(() => {
    console.log("hotels button click");
    setTypes("hotels");
  }, []);

  const handleSelectRating = useCallback((newvalue) => {
    setRatingValue(newvalue);
  }, []);

  const setCoordinatesState = useCallback((e) => {
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
  }, []);

  const setBoundsState = (e) => {
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
  }


  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={4} sx={{ height: "100vh", overflowY: "scroll" }}>
          <Grid container direction="column" justifyContent="center" sx={{ paddingInline: "1rem" }}>
            <Grid item>
              { errorMessage && <Typography variant='body1'>{errorMessage}</Typography> }
            </Grid>
            <Grid item xs sm md sx={{ marginTop: "1rem" }}>
              {
                isLoadingPlaces
                ? <Box>loading...</Box>
                :<List places={places} ratingValue={ratingValue} />
              }
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8} sx={{ position: "relative", height: "100vh" }}>
          {isFindingLocation
            ? <Typography variant='h5' sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50,-50)" }}>loading...</Typography>
            : <Map coordinates={coordinates} places={places} setCoordinatesState={setCoordinatesState} setBoundsState={setBoundsState} />
          }
          <Grid container>
            <Grid container item direction="row" justifyContent="center" spacing={1} xs={12} sm={12} md={12} sx={{ position: "absolute", top: '1rem' }}>
              <TopButtons
                onRestaurantBtnClick={handleRestaurantsBtnClick}
                onAttractionBtnClick={handleAttractionsBtnClick}
                onHotelBtnClick={handleHotelsBtnClick}
                onSelectRating={handleSelectRating}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
