import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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
import GalleryModal from './GalleryModal';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
// import SwipeVerticalIcon from '@mui/icons-material/SwipeVertical';
// import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

import '../css/style.css'
import { shallowEqual, useSelector } from 'react-redux';

const FlatCardMu = function ({ flat, metro = null }) {


    const to_metro = useSelector(state => state.mapFlats.params.to_metro, shallowEqual);
    const material_types = useSelector(state => state.mapFlats.params.material_types, shallowEqual);

    const [anchorEl, setAnchorEl] = useState(null);


    const [assessment, setAssessment] = useState(null)

    const handleAssessment = (e) => {
        setAssessment(e);
    }

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


    const mapState = {
        center: [flat.lat, flat.lng],
        zoom: 14,
    };

    const [available, setAvailable] = useState(true);
    const [isFav, setIsFav] = useState(flat.is_fav);


    const [delOpen, setDelOpen] = useState(false);

    const [mapOpen, setMapOpen] = useState(false);

    const [gallery_modal_open, SetGalleryModalOpen] = useState(false);

    const handleGalleryModal = () => {
        SetGalleryModalOpen(!gallery_modal_open)
    }


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





    const handleFav = () => {


        if (window.Telegram.WebApp.initData !== null && window.Telegram.WebApp.initData !== '') {
            fetch('https://pyxi.pro/tg-web-app/fav', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    flat_id: flat.id,
                    tg_data: window.Telegram.WebApp.initData || null
                })
            }).then(
                setIsFav(!isFav)
            )
        } else {
            setIsFav(!isFav)
        }




    }


    const openLink = () => {
        window.Telegram.WebApp.openLink(flat.link)
        handleLinksClose()
    }

    const SendLinkToChat = () => {

        console.log('send_to_chat')

        // fetch('https://pyxi.pro/tg-web-app/send-link-to-chat', {
        //     method: 'post',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         // search: data.search,
        //         flat_id: flat.id,
        //         flat_link: flat.link,
        //         tg_data: window.Telegram.WebApp.initData || null
        //     })
        // })

        handleLinksClose()
    }

    // console.log(metro)


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
                                onClick={handleGalleryModal}
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
                    {
                        (flat.isApartments) && (<span> <br /> Апартаменты</span>)
                    }


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
                    className='mb-3'

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
                {/* <Box> */}



                <Typography color="text.primary" className='mt-0 mb-5' >

                    Согласны?
                    &nbsp;
                    {/* <br/ > */}
                    <Button size="small"

                        onClick={() => setAssessment(1)}
                        className='mr-1'
                        color="success"
                        variant={assessment === 1 ? "contained" : "outlined"}
                        style={{
                            // minWidth:0,
                            textTransform: 'none',
                        }}
                    >
                        <ThumbUpAltIcon />
                        {/* &nbsp; */}
                        {/* Да */}
                    </Button>

                    {/* <Button size="small"

                    onClick={() => setAssessment(3)}
                    color="warning"
                    variant={assessment === 3 ? "contained" : "outlined"}
                    style={{
                        textTransform: 'none',
                    }}
                >
                    <ThumbsUpDownIcon />&nbsp;
                    
                </Button> */}
                    <Button size="small"
                        onClick={() => setAssessment(2)}
                        className='mr-1'
                        color="error"
                        variant={assessment === 2 ? "contained" : "outlined"}
                        style={{
                            textTransform: 'none',
                        }}
                    >
                        <ThumbDownAltIcon />
                        {/* &nbsp; */}
                        {/* Нет */}
                    </Button>

                </Typography>

                {/* </Box> */}
                <Typography variant="body1" component="p">
                    {flat.metro.map(function (station) {
                        let range = 0;
                        if (station.range < 1) {
                            range = Math.ceil(station.range * 1000) + " м.";
                        } else {
                            range = Math.round(station.range * 100) / 100 + ' км';
                        }

                        let brunch = '';




                        // console.log(brunch.)



                        return (<>
                            {
                                metro[station.id].colors.map(function (color) {
                                    return (<span style={{ backgroundColor: '#' + color }} className='metro_brunch_round'> </span>)
                                })
                            }
                            {metro[station.id].metro} {range} <br /></>)
                    })}




                </Typography>
                {(
                    flat.metro_type === 5
                )
                    ?
                    <Typography variant="subtitle1" className='mt-5' component="p">Метро транспортом</Typography>
                    :
                    <Typography variant="subtitle1" className='mt-5' component="p">Метро {to_metro.filter(item => item.val === flat.metro_type)[0].title.toLowerCase()} пешком</Typography>
                }

                <Typography variant="subtitle1" component="p"  >
                    Площадь: {flat.totalArea}/{flat.livingArea}/{flat.kitchenArea} <br /> Этаж: {flat.floor}/{flat.floorsCount}
                    {(
                        flat.material_type < 6 && flat.material_type > 0
                    )
                        ?
                        <span> {material_types.filter(item => item.val === flat.material_type)[0]?.title}</span>
                        :
                        ''
                    }


                </Typography>


                <Typography variant="subtitle1" component="p"  >
                    Год постройки: 
                    {(
                        flat.buildYear > 0
                    )
                        ?
                        <span> {flat.buildYear}</span>
                        :
                        <span> не указано</span>
                    }


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
                        <MenuItem onClick={openLink}>Открыть в браузере</MenuItem>
                        <MenuItem onClick={SendLinkToChat}>Отправить в чат</MenuItem>

                    </Menu>


                    <Button size="small"
                        color={!isFav ? "success" : 'secondary'}
                        variant="outlined"
                        data-onclickparam={flat.id}
                        onClick={handleFav}
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

            <GalleryModal
                gallery_modal_open={gallery_modal_open}
                handleGalleryModal={handleGalleryModal}
                images={flat.images}
            />






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
