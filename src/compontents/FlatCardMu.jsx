import {
    Box,
    Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem, Rating, Stack,
    Typography
} from "@mui/material";

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import React from "react";

import ExploreIcon from '@mui/icons-material/Explore';
import LaunchIcon from '@mui/icons-material/Launch';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PriceAnalizeTabs from "./PriceAnalyzeTabs";
// import StarIcon from '@mui/icons-material/Star';
import { useState } from "react";
import { Placemark, YMaps, Map, RulerControl, ZoomControl } from "@pbe/react-yandex-maps";
import { red } from '@mui/material/colors';
const FlatCardMu = function ({ flat }) {




    const [anchorEl, setAnchorEl] = useState(null);
    const links_open = Boolean(anchorEl);
    const handleLinksClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleLinksClose = () => {
        setAnchorEl(null);
    };

    const labels = {

        5: 'Высокая',

        4: 'Выше среднего',

        3: 'Средняя',

        2: 'Ниже среднего',

        1: 'Дно рынка',
    };

    const value = flat.price_type;

    const getPriceRating = (val) => {
        if (val === 1) {
            return 5
        }
        if (val === 2) {
            return 4
        }
        if (val === 3) {
            return 3
        }
        if (val === 4) {
            return 2
        }
        if (val === 5) {
            return 1
        }
    }

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

    // const handleClickOpen = () => {
    //     setDelOpen(true);
    // };

    const handleDelClose = () => {
        setDelOpen(false);
    };


    var header = '';

    if (flat.rooms === 200) {
        header = 'Студия'
    }
    else if (flat.rooms > 3) {
        header = '4+к'
    } else {
        header = flat.rooms + "к"
    }
    const okrug = flat.districts.filter(d => d.type === 'Okrug')[0];
    const district = flat.districts.filter(d => d.type !== 'Okrug')[0];
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

    const getRatingColor = (value) => {
        if (value === 5) {
            return red[100]
        }
        if (value === 4) {
            return red[200]
        }
        if (value === 3) {
            return red[300]
        }
        if (value === 2) {
            return red[500]
        }
        if (value === 1) {
            return red[900]
        }


    }








    return (


        <Card className='mb-2  mt-4 pt-3'>

            <CardContent>

                <ImageList
                    sx={{ height: 140 }} cols={2} rowHeight={128}
                    // sx={{ width: 500, height: 450 }}
                    // variant="quilted"
                    // cols={4}
                    // rowHeight={121}
                    variant="masonry"
                >

                    {flat.images.map((item, index) => (
                        <ImageListItem key={flat.id + "_" + index}>
                            <img
                                key={item.img}
                                src={item.thumb}
                                srcSet={item.thumb}
                                alt={Math.random(10000)}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
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

                <Box
                    className='mb-5'
                    sx={{
                        width: 300,
                        display: 'flex',
                        alignItems: 'center',

                    }}
                >
                    <Rating
                        name="text-feedback"

                        value={getPriceRating(flat.price_type)}
                        readOnly
                        icon={<FavoriteIcon fontSize="inherit" style={{
                            color: getRatingColor(flat.price_type)
                        }} />}

                        emptyIcon={<HeartBrokenIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    <Box sx={{ ml: 2 }}><Typography color="text.primary" >{labels[value]}</Typography></Box>
                </Box>

                <Typography variant="subtitle1" component="p">
                    Площадь: {flat.totalArea}/{flat.livingArea}/{flat.kitchenArea} <br /> Этаж: {flat.floor}/{flat.floorsCount}
                </Typography>
                {(flat.positions).length > 0 && <PriceAnalizeTabs cat={flat.cat} districts={flat.districts} positions={flat.positions} />}

                <Stack className="mt-4 flex " justifyContent={"center"} alignItems={'center'} direction="row" spacing={2}>
                    <Button size="small"
                        id={'original_link_' + flat.id}
                        color="primary"
                        variant="contained"
                        style={{
                            textTransform: 'none',
                        }}

                        aria-controls={links_open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={links_open ? 'true' : undefined}
                        onClick={handleLinksClick}


                    >
                        <LaunchIcon />
                        Ссылка
                    </Button>

                    <Menu
                        id={'original_link_menu_' + flat.id}
                        aria-labelledby={'original_link_' + flat.id}
                        anchorEl={anchorEl}
                        open={links_open}
                        onClose={handleLinksClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <MenuItem onClick={handleLinksClose}>Открыть в браузере</MenuItem>
                        <MenuItem onClick={handleLinksClose}>Отправить в чат</MenuItem>

                    </Menu>


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
                <DialogContent className="p-0">
                    <YMaps>
                        <Map defaultState={mapState}
                            width={'80vw'}
                            height={'65vh'}

                        >
                            <Placemark geometry={[flat.lat, flat.lng]} />
                            <RulerControl options={{ float: "right" }} />
                            <ZoomControl options={{ size: "small", float: "right" }} />
                        </Map>
                    </YMaps>
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
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={hideFlat} autoFocus>
                        Да
                    </Button>
                    <Button onClick={handleDelClose}>Нет</Button>
                </DialogActions>
            </Dialog>
        </Card>

    )

}

// const areEqual = (prevProps, nextProps) => {
//     if (prevProps.flat.id === nextProps.flat.id) {
//         return true                                    // donot re-render
//     }
//     return false                                     // will re-render
// }

// export default React.memo(FlatCardMu, areEqual)

export default FlatCardMu