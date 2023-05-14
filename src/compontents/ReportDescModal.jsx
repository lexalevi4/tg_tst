

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import CloseIcon from '@mui/icons-material/Close';
import { Divider } from "@mui/material";
import { useEffect } from "react";

const ReportDescModal = function ({ report_desc_modal_open = false, setReportDescModalOpen = null, Transition = null }) {


    const handleReportDescModal = () => {
        setReportDescModalOpen(!report_desc_modal_open);
    }

    useEffect(() => {
        setReportDescModalOpen(false);
    }, [setReportDescModalOpen])

    if (!report_desc_modal_open) {
        return <></>
    }

    return (
        <Dialog
            fullScreen
            open={report_desc_modal_open}
            scroll='paper'
            // keepMounted
            onClose={handleReportDescModal}
        // TransitionComponent={Transition}
        >
            <AppBar position="fixed" color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleReportDescModal}
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
            <Box

                style={{
                    height: '95vh',
                    // display: 'flex',
                    // gridArea={cu},

                    // height:500,
                    // overflowX: 'auto',
                    overflowY: 'auto'
                }}
            >


                <Paper
                    className='m-3 p-2'
                    style={{
                        marginTop: 80
                    }}
                >

                    {/* <Typography>
                        Страница состоит из двух частей:<br /> диаграммы и таблица со значениям.
                    </Typography> */}

                    <Typography className='mt-3' >
                        Верхний график называется <b>боксплот</b> {'(boxplot)'}.<br /> На русский это переводят как {'"ящик с усами"'} или диаграмма размаха.
                    </Typography>





                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/boxplot_1.jpg')} alt='' loading="lazy" />

                    </Paper>
                    <Typography className='mt-3' >
                        Она очень удобна для сравнения нескольких наборов данных.
                    </Typography>
                    <Typography className='mt-3' component={'div'} >
                        Читается она следующим образом:
                        <ul>
                            <li
                                className="mb-2"
                            >
                                Все объявления каждого класса делятся на 4 равные части.</li>
                            <li
                                className="mb-2"
                            >
                                <b>Усы</b> - это 25% самых низких и 25% самых высоких значений.</li>
                            <li
                                className="mb-2"
                            >
                                Внутри <b>ящика</b> остальные 50% объявлений.</li>
                            <li
                                className="mb-2"
                            >
                                <b>Линия посередине ящика</b> - это медиана. Она делит всю выборку пополам. </li>
                            <li
                                className="mb-2"
                            >
                                Внутри ящика объявления тоже поделены этой линией пополам.
                            </li>
                            <li
                                className="mb-2"
                            >
                                Каждый сегмент соответствует 25% выборки.</li>
                            <li
                                className="mb-2"
                            >
                                Внутри сегментов объявления могут быть распределены неравномерно.</li>
                            <li
                                className="mb-2"
                            >
                                <b>Точки</b> - это выборосы. Значения, которые слишком далеко от основной выборки.</li>

                        </ul>
                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/boxplot_2.png')} alt='' loading="lazy" />

                    </Paper>
                    <Divider className='my-5' />
                    <Typography className='mt-10' >
                        <b>Рассмотрим 2 примера с высокой и низкой ценой</b>.
                    </Typography>
                    <Typography className='mt-10' >
                        <b>Пример 1: </b> трёшка в 9-этажном доме до 1980 года постройки выставлена за 18 миллионов.
                    </Typography>

                    <Typography className='mt-3' >

                        Оранжевая, второй слобец.
                    </Typography>
                    <Typography className='mt-3' >
                        Горизонтальная линия показывает текущее значение.

                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example.png')} alt='' loading="lazy" />

                    </Paper>



                    <Typography className='mt-3' >
                        В районе есть 29 таких объявлений.
                    </Typography>
                    <Typography className='mt-3' >
                        Из них половина находится в диапазоне 10-12 миллионов.
                    </Typography>
                    <Typography className='mt-3' >
                        Другая половина, без выбросов, от 12 до 14.
                    </Typography>
                    <Typography className='mt-3' >
                        Выброс совпадает с ценой объявления.
                    </Typography>
                    <Typography className='mt-3' >
                        Внутри района дома схожих годов и этажности, как правило, одинаковые.
                    </Typography>

                    <Typography className='mt-3' >
                        Квартиры в 9-этажках за 18 действительно есть, но они в другом сегменте.
                    </Typography>

                    <Typography className='mt-3' >
                        За эти деньги можно купить любую аналогичную квартиру, и почти все в более новых домах.
                    </Typography>

                    <Divider className='mt-3' />
                    <Typography className='mt-10' >
                        То же самое, но <b>по цене за квадрат</b>.
                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example_2.png')} alt='' loading="lazy" />

                    </Paper>

                    <Divider className='mt-3' />
                    <Typography className='mt-10' >
                        Конкретно тут кухня 10, возможно это является преимуществом.<br /><b> Разобьём по общей площади и кухне:</b>
                    </Typography>

                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example_4.png')} alt='' loading="lazy" />

                    </Paper>
                    <Typography className='mt-3' >
                        Эта квартира площадью 65 квадратов.
                    </Typography>
                    <Typography className='mt-3' >
                        Красные, первый столбец.
                    </Typography>

                    <Typography className='mt-3' >
                        В эту цену укладываются все квартиры аналогичной площади и 75% (более 30 штук) объявлений с аналогичной кухней, но большей площади.
                    </Typography>
                    <Typography className='mt-3' >
                        В своём сегменте следующая квартира на 2 миллиона дешевле, и половина из них выставлены ниже 15 миллионов.
                    </Typography>
                    <Divider className='mt-3' />




                    <Typography className='mt-10' >
                        <b>Пример 2: </b> однокомнатая квартира в 14 этажном доме 2002 года постройки за 11,5.
                    </Typography>

                    <Typography className='mt-3' >

                        Так же, оранжевая, второй слобец.
                    </Typography>
                    <Typography className='mt-3' >
                        Горизонтальная линия показывает текущее значение.

                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example_2_1.png')} alt='' loading="lazy" />

                    </Paper>

                    <Typography className='mt-3' >
                        Здесь всё ровно наоброт. Ни в своём сегменте, ни в соседних особо не разгуляешься.
                    </Typography>
                    <Typography className='mt-3' >
                        Цена так же соответствует выборсу, но уже вниз.
                    </Typography>
                    <Typography className='mt-3' >
                        В основном подобные квартиры выставлены за 13-14 миллионов.
                    </Typography>

                    <Divider className='mt-3' />
                    <Typography className='mt-10' >
                        То же самое, но <b>по цене за квадрат</b>.
                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example_2_2.png')} alt='' loading="lazy" />

                    </Paper>
                    <Typography className='mt-3' >
                        Аналогично.
                    </Typography>



                    <Divider className='mt-3' />
                    <Typography className='mt-10' >
                        <b>Площадь/кухня:</b>
                    </Typography>

                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example_2_3.png')} alt='' loading="lazy" />

                    </Paper>
                    <Typography className='mt-3' >
                        Эта 38 квадратов, кухня 8,6. 
                    </Typography>
                    <Typography className='mt-3' >
                        Зелёные, первый столбец.
                    </Typography>

                    <Divider className='mt-3' />
                    <Typography className='mt-10' >
                        Аналогичные сравнения можно делать по разным параметрам, вплоть до конкретного ЖК.<br />
                        <b>Двушки в новостройках в Раменках:</b>
                    </Typography>


                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example_3.png')} alt='' loading="lazy" />

                    </Paper>
                    <Divider className='mt-3' />
                    <Typography className='mt-10' >
                        <b>Следующий график </b>- это гистограмма, показывает количество объявлений по какому-то параметру.
                    </Typography>

                    <Typography className='mt-3' >
                    <b>Первая квартира за 18 миллионов. </b>
                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example_hist.png')} alt='' loading="lazy" />

                    </Paper>

                    <Divider className='mt-3' />
                    <Typography className='mt-10' >
                    <b> Вторая за 11,5. </b>
                    </Typography>
                    <Typography className='mt-3' >
                       Всего в районе 113 объявлений однокомнаных квартир.
                    </Typography>
                    <Typography className='mt-3' >
                    <b>Наши фиолетовые.</b>
                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/example_hist_4.png')} alt='' loading="lazy" />

                    </Paper>
                    <Divider className='mt-3' />
                    <Typography className='mt-3' >
                        Далее идёт таблица с подробной информацией по всем классам.
                    </Typography>
                    <Typography className='mt-3' >
                        <b> Жирным шрифтом</b> выделен класс этого объявления.
                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/table.png')} alt='' loading="lazy" />

                    </Paper>
                    <Typography className='mt-3' component={'div'} >
                        Столбцы:
                        <ul>
                            <li
                                className="mb-2"
                            >
                                <b>Класс</b>
                            </li>
                            <li
                                className="mb-2"
                            >
                                <b>Количество</b>
                            </li>
                            <li
                                className="mb-2"
                            >
                                <b>Позиция</b> - сколько из них укладываются в ту же цену.
                            </li>
                            <li
                                className="mb-2"
                            >
                                <b>Среднее, минимамальное и максимальное значение в классе</b>
                            </li>
                            <li
                                className="mb-2"
                            >
                                <b>25, 50 и 75%</b> - границы по процентам выборки.
                            </li>


                        </ul>
                    </Typography>

                    <Typography className='mt-3' >
                        Расчитывается на основе объявлений на Циане за прошедший день.
                    </Typography>
                    <Divider className='mt-3' />
                    <Typography className='mt-3' >
                        По клику на класс открываются графики с динамикой средних цен и количества объявлений в классе.
                    </Typography>


                    <Typography className='mt-10' >
                      <b> 
                        Первая за 18. Район Выхино-Жулебино.
                      </b>
                    </Typography>

                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/stat_1.png')} alt='' loading="lazy" />

                    </Paper>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/stat_2.png')} alt='' loading="lazy" />

                    </Paper>
                    <Typography className='mt-10' >
                      <b> 
                        Вторая за 11,5. Район Обручевский.
                      </b>
                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/stat_2_1.png')} alt='' loading="lazy" />

                    </Paper>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/stat_2_2.png')} alt='' loading="lazy" />

                    </Paper>
                    <Typography className='mt-10' >
                      <b> 
                       Трёшки, ЖК Крылья
                      </b>
                    </Typography>
                    <Paper
                        className='m-1 p-2'
                    >
                        <img
                            style={{
                                maxWidth: '100%'
                            }}
                            src={require('../images/report_plot/stat_3.png')} alt='' loading="lazy" />

                    </Paper>


                    {/* <div
                        style={{
                            height: 50
                        }}
                    > </div> */}
                </Paper>

            </Box>
        </Dialog >

    );
}

export default ReportDescModal;