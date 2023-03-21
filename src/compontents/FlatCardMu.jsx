// import PositionsRadar from "./PositionsRadar";
// import FlatImagesCarousel from "./FlatImagesCarousel";
import {
    Button, Card, CardContent, Divider, Stack,
    // Paper,
    // Table, TableBody, TableCell,
    // TableContainer,
    // TableHead, TableRow,
    Typography
} from "@mui/material";
// import Tabs from '@mui/joy/Tabs';
// import TabList from '@mui/joy/TabList';
// import Tab, { tabClasses } from '@mui/joy/Tab';
// import TabPanel from '@mui/joy/TabPanel';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React from "react";
// import React from "react";

import PriceAnalizeTabs from "./PriceAnalyzeTabs";
const FlatCardMu = function ({ flat }) {

    // const positions = flat.positions;



    console.log(flat.id)



    return (


        <Card className='mb-2  mt-4 pt-3'>

            {/* <CardMedia

            // component="img"
            // // height="140"
            // image="https://mui.com/static/images/cards/contemplative-reptile.jpg"
            // alt="green iguana"
            >



            </CardMedia> */}
            {/*<CardActionArea>*/}
            <CardContent>

                <ImageList
                    sx={{ height: 140 }} cols={2} rowHeight={128}
                    // sx={{ width: 500, height: 450 }}
                    // variant="quilted"
                    // cols={4}
                    // rowHeight={121}
                    variant="masonry"
                >
                    {/* <ImageList variant="masonry" > */}

                    {flat.images.map((item, index) => (
                        <ImageListItem key={item.img}>
                            <img
                                key={item.img}
                                src={item.thumb}
                                srcSet={item.thumb}
                                alt={Math.random(10000)}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                    {/* </ImageList> */}
                </ImageList>

                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography>

                {/* {console.log((flat.positions).length)} */}

                {(flat.positions).length > 0 && <PriceAnalizeTabs cat = {flat.cat} districts={flat.districts} positions={flat.positions} />}

                <Stack className="mt-3 mb-3" alignItems={'center'} direction="row" spacing={2}>
                    <Button size="small"
                        divider={<Divider orientation="vertical" flexItem />}
                        color="primary"
                        variant="contained"
                    >
                        Подробнее
                    </Button>
                    <Button size="small"
                        color="primary"
                        variant="contained"
                    >
                        Подробнее
                    </Button>
                    <Button size="small"
                        color="primary"
                        variant="contained"
                    >
                        Подробнее
                    </Button>
                </Stack>

            </CardContent>

            {/*</CardActionArea>*/}
        </Card>



    )


}

const areEqual = (prevProps, nextProps) => {
    // console.log(prevProps)
    // console.log(nextProps)
    if (prevProps.flat.id === nextProps.flat.id) {
        return true                                    // donot re-render
    }
    return false                                     // will re-render
}


export default React.memo(FlatCardMu, areEqual)

// export default FlatCardMu