import { Button, Dialog, DialogActions, DialogContent, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from "@mui/material";
import { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

function FlatParamsTable({ flat }) {

    const to_metro = useSelector(state => state.mapFlats.params.to_metro, shallowEqual);
    const material_types = useSelector(state => state.mapFlats.params.material_types, shallowEqual);
    const plans = useSelector(state => state.mapFlats.params.plans, shallowEqual);

    const [descOpen, setDescOpen] = useState(false);

    const handleDescOpen = () => {
        setDescOpen(!descOpen);
    }

    return (
        <>

            <TableContainer component={Paper}  >
                <Table
                    // sx={{
                    //     width: 'max-content'
                    // }}

                    size="small" aria-label="a dense table"

                >
                    {/* <TableHead>
                            <TableRow>
                                <TableCell
                                    className='pre_line'
                                >
                                    Параметр
                                </TableCell>

                                <TableCell
                                    className='pre_line'
                                >
                                    Значение
                                </TableCell>


                            </TableRow>

                        </TableHead> */}
                    <TableBody>

                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                До метро
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                {(
                                    flat.metro_type === 5
                                )
                                    ?
                                    "транспортом"
                                    :
                                    to_metro.filter(item => item.val === flat.metro_type)[0].title.toLowerCase() + " пешком"
                                }


                            </TableCell>


                        </TableRow>


                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                Площадь
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                {flat.totalArea} / {flat.livingArea} / {flat.kitchenArea}


                            </TableCell>


                        </TableRow>

                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                Этаж
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                {flat.floor}/{flat.floorsCount}


                            </TableCell>


                        </TableRow>


                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                Материал
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                {

                                    material_types.filter(item => item.val === Number(flat.material_type))[0]?.title

                                }

                            </TableCell>


                        </TableRow>

                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                Год постройки
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                {(
                                    flat.buildYear > 0
                                )
                                    ?
                                    flat.buildYear
                                    :
                                    "не указано"
                                }

                            </TableCell>


                        </TableRow>

                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                Планировка
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                {
                                    (Number(flat.plan) > 0
                                        ?
                                        plans.filter(item => item.val === Number(flat.plan))[0]?.title
                                        :
                                        "")
                                }

                            </TableCell>


                        </TableRow>

                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                {"С/У (разд/совм)"}
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                {flat.separateWcsCount}/{flat.combinedWcsCount}

                            </TableCell>


                        </TableRow>

                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                {"Балконы/Лоджии"}
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                {flat.balconiesCount}/{flat.loggiasCount}

                            </TableCell>


                        </TableRow>



                        <TableRow>
                            <TableCell
                                className='pre_line'
                            >
                                {"Текстовое описание"}
                            </TableCell>

                            <TableCell
                                className='pre_line'
                            >

                                <Button
                                    className='p-0'
                                    onClick={handleDescOpen}
                                    // size="small"
                                    style={{
                                        textTransform: 'none',
                                    }}
                                >
                                    Показать
                                </Button>

                            </TableCell>


                        </TableRow>



                    </TableBody>


                </Table>

            </TableContainer >

            <Dialog
                open={descOpen}
                onClose={() => setDescOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent className="p-1">
                    <Paper
                        className="p-1"
                        style={{
                            width: '80vw',
                            height: '65vh',
                            overflowY: 'auto'
                        }}
                    >
                        <Typography>
                            {flat.description?.split('\n').map(function (item) {
                                return (
                                    <>
                                        {item}
                                        < br />
                                    </>
                                )
                            })}

                        </Typography>
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleDescOpen}
                        autoFocus
                    >
                        Закрыть
                    </Button>

                </DialogActions>
            </Dialog >


        </>
    );
}

export default FlatParamsTable;