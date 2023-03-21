import { AppBar, Box, Dialog, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const PriceDescModal = function ({ price_desc_modal_open, handlePriceDescModal, Transition }) {
    return (
        <Dialog
            fullScreen
            open={price_desc_modal_open}
            keepMounted
            onClose={handlePriceDescModal}
            TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handlePriceDescModal}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>
                    {/* <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                Sound
                            </Typography>
                            <Button autoFocus color="inherit" onClick={handleReportPlotOpen}>
                                save
                            </Button> */}
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
                        Расчитывается на основе объявлений на Циане за прошедший день на момент публикации или изменения цены.
                    </Typography>
                    <Typography className='mt-3' >
                        Обновляется раз в неделю.
                    </Typography>
                </Paper>
            </Box>
        </Dialog>

    );
}

export default PriceDescModal;