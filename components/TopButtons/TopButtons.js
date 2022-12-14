import { useState, memo } from "react";
import { Button, Box } from "@mui/material";
import { Menu, MenuItem } from '@mui/material';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function TopButtons(props) {
    console.log("top button");
    // for menu
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleChooseRatingClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // for menu end


    return (
        <>
            <Box>
                <Button
                    id="choose-rating"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleChooseRatingClick}
                    variant="contained"
                    endIcon={<KeyboardArrowDownIcon />}
                    sx={[
                        { width: "11rem", backgroundColor: "#fff", color: '#111211', height: "2.5rem" },
                        {
                            '&:hover': {
                                backgroundColor: 'grey',
                                color: 'white'
                            }
                        }
                    ]}
                >Choose Rating</Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'choose-rating',
                    }}
                >
                    <MenuItem>All Ratings</MenuItem>
                    <MenuItem onClick={() => { handleClose(); props.onSelectRating(2.0) }}>2.0 **</MenuItem>
                    <MenuItem onClick={() => { handleClose(); props.onSelectRating(3.0) }}>3.0 ***</MenuItem>
                    <MenuItem onClick={() => { handleClose(); props.onSelectRating(4.0) }}>4.0 ****</MenuItem>
                    <MenuItem onClick={() => { handleClose(); props.onSelectRating(5.0) }}>5.0 *****</MenuItem>
                </Menu>
            </Box>
            <Button variant="contained" sx={[
                { margin: "0rem 1rem", backgroundColor: "#fff", color: '#111211', width: "8.5rem" },
                {
                    '&:hover': {
                        backgroundColor: 'grey',
                        color: 'white'
                    }
                }
            ]}
                onClick={() => props.onRestaurantBtnClick()}
            >
                Restaurants
            </Button>
            <Button variant="contained" sx={[
                { margin: "0rem 1rem", backgroundColor: "#fff", color: '#111211', width: "8.5rem" },
                {
                    '&:hover': {
                        backgroundColor: 'grey',
                        color: 'white'
                    }
                }
            ]}
                onClick={() => props.onAttractionBtnClick()}
            >
                Attractions
            </Button>
            <Button variant="contained" sx={[
                { margin: "0rem 1rem", backgroundColor: "#fff", color: '#111211', width: "8.5rem" },
                {
                    '&:hover': {
                        backgroundColor: 'grey',
                        color: 'white'
                    }
                }
            ]}
                onClick={() => props.onHotelBtnClick()}
            >
                Hotels
            </Button>
        </>
    );
}

export default memo(TopButtons);
