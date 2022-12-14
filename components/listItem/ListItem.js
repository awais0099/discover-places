import Link from 'next/link';
import { Card, CardMedia, CardContent } from "@mui/material";
import {
    Typography,
    Rating,
    Box
} from "@mui/material";


function ListItem(props) {
    const place = {...props.place};
    const temp_image_url = "https://images.unsplash.com/photo-1517713982677-4b66332f98de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80";

  return (
    <Card sx={{marginBottom: "1rem"}}>
        <CardMedia
            component="img"
            height="220"
            alt="place image"
            image={
                !place.photo
                ? temp_image_url
                : !place.photo.images ? temp_image_url : !place.photo.images.medium ? temp_image_url : place.photo.images.medium.url
            }
        />
        <CardContent>
            <Typography variant="h5">{place.name ? place.name: "Name Not Available"}</Typography>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Rating
                    name=''
                    value={Number(place.rating ? place.rating:0)}
                    precision={0.5}
                    readOnly
                />
                <Typography variant="body2">{place.num_reviews ? place.num_reviews: 0} reviews</Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="subtitle2">Price</Typography>
                <Typography variant="body2">{place.price ? place.price:"$0"}</Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Typography variant="subtitle2">Ranking</Typography>
                <Typography variant="body2">{place.ranking ? place.ranking: 0}</Typography>
            </Box>
            <Typography variant="subtitle1" sx={{marginBottom: ".8rem"}} align="right">Open Now</Typography>
            <Typography variant="body2">{place.address ? place.address:"5493 Hauck Lakes Apt. 737 temprary"}</Typography>
            <Typography variant="body2">{place.phone ? place.phone:"xxxxxxxxxx"}</Typography>
            <Typography align="right">
                <Link href={place.website ? place.website:"#"}>website</Link>
            </Typography>
        </CardContent>
    </Card>
  );
}

export default ListItem
