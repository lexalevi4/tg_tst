// import PositionsRadar from "./PositionsRadar";
// import FlatImagesCarousel from "./FlatImagesCarousel";
import {
    Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Stack,
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
import ExploreIcon from '@mui/icons-material/Explore';
import LaunchIcon from '@mui/icons-material/Launch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PriceAnalizeTabs from "./PriceAnalyzeTabs";
import { useState } from "react";
import { Placemark, YMaps, Map, RulerControl, ZoomControl } from "@pbe/react-yandex-maps";
const FlatCardMu = function ({ flat }) {

    // const positions = flat.positions;

    const mapState = {
        center: [flat.lat, flat.lng],
        zoom: 14,
    };

    const [available, setAvailable] = useState(true);
    const [isFav, setIsFav] = useState(false);



    // console.log(flat.rooms)

    const [delOpen, setDelOpen] = useState(false);

    const [mapOpen, setMapOpen] = useState(false);

    const handleClickOpen = () => {
        setDelOpen(true);
    };

    const handleDelClose = () => {
        setDelOpen(false);
    };


    var header = '';

    if (flat.rooms == 200) {
        header = 'Студия'
    }
    else if (flat.rooms > 3) {
        header = '4+к'
    } else {
        header = flat.rooms + "к"
    }
    const okrug = flat.districts.filter(d => d.type == 'Okrug')[0];
    const district = flat.districts.filter(d => d.type != 'Okrug')[0];
    // console.log(okrug.name)
    header = header + ", " + okrug.name.replace(/ \(.+/gi, '') + ', ' + district.name;




    if (!available) {
        return (<></>)
    }



    const hideFlat = function () {
        setDelOpen(false);
        setAvailable(false)
    }


    const favContent = () => {
        if (isFav) {
            return (<><HeartBrokenIcon /> Удалить</>)
        } else {
            return (<><FavoriteBorderIcon /> Добавить</>)
        }

    };
    // if (isFav) {
    //     favContent = (<HeartBrokenIcon /> + 'Удалить')
    // }else{
    //     favContent = (<FavoriteBorderIcon /> + 'Добавить')
    // }

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

                <Typography gutterBottom variant="h6" component="div">
                    {header}
                    <br />
                    <Button
                        onClick={() => setMapOpen(true)}
                        color='success'

                        className="px-0"
                        style={{
                            textTransform: 'none',
                            minWidth: '30px',
                            paddingBottom: '11px'

                        }}
                    >
                        <ExploreIcon size='8px' />
                    </Button>
                    {flat.address}

                </Typography>
                <Typography variant="h6" component="p">
                    <Typography variant="h6" component="span">
                        {Intl.NumberFormat('ru-RU', {
                            style: 'currency',
                            currency: 'RUB',
                            currencyDisplay: 'symbol', maximumFractionDigits: 0
                        }).format(flat.price)}
                    </Typography> /
                    <Typography variant="h6" component="span" color="text.secondary">
                        {' ' +
                            Intl.NumberFormat('ru-RU', {
                                style: 'currency',
                                currency: 'RUB',
                                currencyDisplay: 'symbol', maximumFractionDigits: 0
                            }).format(
                                Math.round(flat.price_per_meter))
                        } / m<sup>2</sup>
                    </Typography>
                </Typography>
                <Typography variant="subtitle1" component="p">
                    Площадь: {flat.totalArea}/{flat.livingArea}/{flat.kitchenArea} <br /> Этаж: {flat.floor}/{flat.floorsCount}
                </Typography>
                {/* <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000
                    species, ranging across all continents except Antarctica
                </Typography> */}

                {/* {console.log((flat.positions).length)} */}

                {(flat.positions).length > 0 && <PriceAnalizeTabs cat={flat.cat} districts={flat.districts} positions={flat.positions} />}

                <Stack className="mt-4 flex " justifyContent={"center"} alignItems={'center'} direction="row" spacing={2}>
                    <Button size="small"
                        // divider={<Divider orientation="vertical" flexItem />}
                        color="primary"
                        variant="contained"
                        style={{
                            textTransform: 'none',
                        }}
                    >
                        <LaunchIcon />
                        Ссылка
                    </Button>
                    <Button size="small"
                        color={!isFav ? "success" : 'secondary'}
                        variant="outlined"
                        data-onclickparam={flat.id}
                        onClick={() => setIsFav(!isFav)}
                        style={{
                            textTransform: 'none',
                        }}
                    >



                        {favContent()}
                        {/* <FavoriteBorderIcon />
                        Добавить */}
                    </Button>
                    <Button size="small"
                        onClick={() => setDelOpen(true)}
                        color="error"
                        variant="contained"
                        style={{
                            textTransform: 'none',
                        }}
                    >
                        <DeleteForeverIcon />
                        Скрыть
                    </Button>
                </Stack>

            </CardContent>

            <Dialog
                open={mapOpen}
                onClose={() => setMapOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/* <DialogTitle id="alert-dialog-title">
                    {"Объект на карте"}
                </DialogTitle> */}
                <DialogContent className="p-0">
                    {/* <DialogContentText  id="alert-dialog-description"> */}
                        <YMaps>
                            <Map defaultState={mapState}
                                width={'80vw'}
                                height={'65vh'}

                            >
                                <Placemark geometry={[flat.lat, flat.lng]} />
                                <RulerControl options={{ float: "right" }} />
                                <ZoomControl options={{ size: "small",float: "right" }} />
                            </Map>
                        </YMaps>
                    {/* </DialogContentText> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMapOpen(false)} autoFocus>
                        Закрыть
                    </Button>

                </DialogActions>
            </Dialog>

            <Dialog
                open={delOpen}
                onClose={handleDelClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Добавить объект в чёрный список?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Он будет скрыт во всех будущих поисках.
                        {/* <br /><br /> */}
                        {/* Восстановить можно через избранное. */}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideFlat} autoFocus>
                        Да
                    </Button>
                    <Button onClick={handleDelClose}>Нет</Button>
                </DialogActions>
            </Dialog>


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