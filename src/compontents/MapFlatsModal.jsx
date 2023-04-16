import { AppBar, Box, Dialog, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useGetClusterFlatsQuery, useGetFlatByIdQuery } from "store/PyxiApi";
import { shallowEqual, useSelector } from "react-redux";


const MapFlatsModal = function ({ map_flats_modal_open, handleMapFlatsModal, mapSearch }) {

    const search = useSelector(state => state.mapFlats.search, shallowEqual);
    console.log(mapSearch)
    const { data, isLoading, isError, isFetching } = useGetClusterFlatsQuery({ cluster: mapSearch, main: search })

    console.log(data)


    if (!map_flats_modal_open) {
        return (<></>)
    }


    return (
        <Dialog
            fullScreen
            open={map_flats_modal_open}
            // keepMounted
            onClose={handleMapFlatsModal}
        // TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleMapFlatsModal}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
            <Box>
                <Paper
                    className='m-3 p-2'
                >
                    <Typography >
                        В ячейках таблицы указаны два числа.
                    </Typography>
                    <Typography className='mt-3' >
                        Например: <b>22.1% / 140</b>
                    </Typography>
                    <Typography className='mt-3' >
                        <b>Первое число в %, это - позиция объявления в классе</b>.
                    </Typography>

                    <Typography className='mt-3' >
                        Показывает сколько объектов этого класса можно купить за ту же цену.
                    </Typography>

                    <Typography className='mt-3' >
                        <b> Второе число - это количество объявлений в классе.</b>
                    </Typography>
                    <hr />
                    <Typography className='mt-3' >
                        <b>22.1% / 140</b><br /> означает, что в классе 140 объявлений, и только 22% из них доступны в ту же цену.
                    </Typography>

                    <Typography className='mt-3' >
                        <b>100% / 95</b><br /> означает, что в классе 95 объявлений, и дороже нет ни одного.
                    </Typography>

                    <Typography className='mt-3' >
                        <b>0% / 38</b><br /> означает, что в классе 38 объявлений, и этот самый дешёвый из них.
                    </Typography>
                    <hr />
                    <Typography className='mt-3' >
                        <b>Тип цены</b> определяется на основе позиции по цене за квадрат по району.
                    </Typography>
                    <Typography className='mt-3' component={'div'} >
                        <ul className='mb-5' >
                            <li>Низкие цены - 5 и более позиций 0% при количестве больше 5 объявлений.</li>
                            <li>Ниже среднего - 5 и более позиций до 20% при количестве больше 5 объявлений.</li>
                            <li>Средние - 5 и более позиций до 50% при количестве больше 5 объявлений.</li>
                            <li>Выше среднего - 5 и более позиций до 80% при количестве больше 5 объявлений.</li>
                            <li>Высокие цены - Все остальные.</li>
                        </ul>
                    </Typography>
                    <hr />
                    <Typography className='mt-3' >
                        Расчитывается на основе объявлений на Циане за прошедший день на момент публикации или изменения цены.
                    </Typography>
                    <Typography className='mt-3' >
                        Обновляется раз в неделю.
                    </Typography>
                </Paper>
                <div
                    style={{
                        height: 100
                    }}
                > </div>
            </Box>
        </Dialog>

    );
}

export default MapFlatsModal;