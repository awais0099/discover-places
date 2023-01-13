import { useState, memo } from 'react';
import Image from 'next/image'

import GoogleMapReact from 'google-map-react';

import { Box, Typography, Rating } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';

const AnyReactComponent = ({ text }) => <div sx={{position: 'relative', cursor: 'pointer'}}><LocationOnIcon fontSize='large'/></div>;
const CardOnTheMap = ({ cardData, isCard,onClick }) => (
          <Card sx={{
            maxWidth: 145,
            position: "absolute",
            top: -128,
            left: 112,
          }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={
                !cardData.photo
                ? temp_image_url
                : !cardData.photo.images ? temp_image_url : !cardData.photo.images.medium ? temp_image_url : cardData.photo.images.medium.url
            }
            />
            <CardContent>
              <Typography>{cardData.name}</Typography>
              <Rating
                name=''
                value={Number(cardData.rating ? cardData.rating:0)}
                precision={0.5}
                readOnly
              />
            </CardContent>
            <CardActions>
              <Button size="small"  onClick={() => onClick()}>Close</Button>
            </CardActions>
          </Card> 
        );

function Map(props) {
  console.log("map");
  const { places } = props;
  const [isCard, setIsCard] = useState(false);
  const [cardData, setCardData] = useState(null);

  const temp_image_url = "https://images.unsplash.com/photo-1517713982677-4b66332f98de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

// check card-data
  console.log(cardData);

  return(
      <GoogleMapReact
          bootstrapURLKeys={{key: "AIzaSyDy-WW7-mLEN7xlHLqd0yLy5SS37dkQT2Q"}}
          zoom={2}
          center={props.coordinates}
          defaultCenter={props.coordinates}
          onClick={() => {}}
          onChange={(e) => {
              props.setCoordinatesState(e);
              props.setBoundsState(e);
          }}
          onChildClick={(child) => {
            console.log({child});
            const clickedMapsIcon = places.filter(place => {
              if (place.location_id === child) {
                return place;
              }
            });
            // console.log(clickedMapsIcon);
            setIsCard(true);
            setCardData(...clickedMapsIcon);

          }}
      >
        {
            places?.map(place => (
              <AnyReactComponent
                key={place.location_id}
                lat={place.latitude}
                lng={place.longitude}
                text="My Marker"
              />
            ))
        }

        { isCard && <CardOnTheMap cardData={cardData} isCard={isCard} onClick={() => setIsCard(false)} />}
      </GoogleMapReact>
  );
}

export default memo(Map);
