import { Typography } from "@mui/material";
import ListItem from "../listItem/ListItem.js";

function List(props) {
	const {places, ratingValue} = props;
	return (
		<>
			<ListItem />
			{places 
				? places.map((place) => <ListItem place={place} key={place.id} />)
				: <Typography variant="h5">loading...</Typography> 
			}
		</>
	);
}

export default List;
