import { useState, memo } from 'react';
import Image from 'next/image'

import GoogleMapReact from 'google-map-react';

import { Typography, Rating } from "@mui/material";
import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button'

import LocationOnIcon from '@mui/icons-material/LocationOn';
import CloseIcon from '@mui/icons-material/Close';

function Map(props) {
  console.log("map");
  const { places } = props;
  const [isCard, setIsCard] = useState(false);
  const [cardData, setCardData] = useState(null);

  const temp_image_url = "https://images.unsplash.com/photo-1517713982677-4b66332f98de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";


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
            setCardData(places[child]);
            setIsCard(true);
          }}
      >
        {
            places?.map(place => (
                <Box
                    lat={Number(place.latitude)}
                    lng={Number(place.longitude)}
                    position='relative'
                    cursor='pointer'

                >
                    <LocationOnIcon fontSize="large" />
                </Box>
            ))
        }

        { isCard && (
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
              <Button size="small"  onClick={() => setIsCard(false)}>Close</Button>
            </CardActions>
          </Card> 
        )}
      </GoogleMapReact>
  );
}

export default memo(Map);
