

// import MetroModal from "../compontents/MetroModal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../store/MapFlatsSlice";
import React, { useMemo, useState } from "react";

// import '../css/style.css'
// import DistrictsModal from "../compontents/DistrictsModal";
// import { Sheet } from '@mui/joy';
import { Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material';

import MetroModalMu from "compontents/MetroModalMu";
import DistrictsModalMu from "compontents/DistrictsModalMu";
// import Divider from '@mui/material/Divider';

const SearchFormMu = function () {

    const state = useSelector(state => state.mapFlats);
    // console.log(state)
    const params = useSelector(state => state.mapFlats.params, shallowEqual)
    const search = useSelector(state => state.mapFlats.search, shallowEqual)
    // console.log(params)

    const dispatch = useDispatch();

    const [metro_open, set_metro_open] = useState(false);
    const open_metro_modal = function () {
        set_metro_open(true);
    }
    const close_metro_modal = function () {
        set_metro_open(false);
    }


    const [districts_open, set_districts_open] = useState(false);
    const open_districts_modal = function () {
        set_districts_open(true);
    }
    const close_districts_modal = function () {
        set_districts_open(false);
    }

    //
    // const updateSearchParam = useCallback(async (field, value) => {
    //     await dispatch(updateSearch({field: field, value: value}))
    // }, [dispatch])


    const updateSearchParam = (field, value) => {
        dispatch(updateSearch({ field: field, value: value }))
    }


    // const handleBtnClick = e => {
    //     let params = JSON.parse(e.target.dataset.onclickparam)
    //     updateSearchParam(params.field, params.value)
    // };


    const counter = (param) => {
        let count = state.search[param].length
        if (count === 0) {
            return '';
        } else {
            return "\n[" + count + ']'
        }
    }

    // const getSearchValue = (param) => {
    //     let count = state.search[param].length
    //     // console.log(state.search[param])
    //     if (count === 0) {
    //         return '';
    //     } else {
    //         return "\n" +
    //             state.params[param].filter(p => p.val === Number(state.search[param][0]))[0].title
    //             + ''
    //     }
    // }


    const checkParam = (e, param) => {
        if (state.search[param].indexOf(e) > -1) {
            return true
        } else {
            return false
        }
    }


    // const handleupdateCheckbox = useCallback(async (field, value, reset = false) => {
    //     let arr = [];
    //     // if (!reset) {
    //     await state.search[field].map(function (item, index) {
    //         arr.push(item);
    //         return true;
    //     })
    //     // }
    //     if (arr.indexOf(value) > -1) {
    //         await arr.splice(arr.indexOf(value), 1)
    //     } else {
    //         if (reset) {
    //             arr = [value]
    //         } else {
    //             await arr.push(value)
    //         }
    //     }
    //     await dispatch(updateSearch({field: field, value: arr}))
    // }, [dispatch, state.search])




    const handleupdateCheckbox = (field, value, reset = false) => {

        console.log(value)
        let arr = [];
        // if (!reset) {
        state.search[field].map(function (item, index) {
            arr.push(item);
            return true;
        })
        // }
        if (arr.indexOf(value) > -1) {
            arr.splice(arr.indexOf(value), 1)
        } else {
            if (reset) {
                arr = [value]
            } else {
                arr.push(value)
            }
        }
        dispatch(updateSearch({ field: field, value: arr }))
    }


    // const handleChange = function (event) {

    //     console.log(event)
    // }






    // const NumericFormatCustom = React.forwardRef(function NumericFormatCustom(
    //     props,
    //     ref,
    // ) {
    //     const { onChange, ...other } = props;

    //     return (
    //         <NumericFormat
    //             {...other}
    //             getInputRef={ref}
    //             onValueChange={(values) => {
    //                 onChange({
    //                     target: {
    //                         name: props.name,
    //                         value: values.value,
    //                     },

    //                 });
    //             }}
    //             thousandSeparator
    //             valueIsNumericString
    //         // prefix="₽ "
    //         />
    //     );
    // });

    // NumericFormatCustom.propTypes = {
    //     name: PropTypes.string.isRequired,
    //     onChange: PropTypes.func.isRequired,
    // };





    // console.log('form')

    return (
        useMemo(() => {

            return (
                <>
                    <Paper

                        className="p-2 m-2"
                        style={{
                            // display: 'flex',
                            marginBottom: 80
                        }}
                    >


                        {/* <h2 className='mt-1 mb-3'>Базовые параметры:</h2> */}
                        <Typography
                            variant="h5"
                            className="mb-3"
                        >
                            Базовые параметры:
                        </Typography>
                        <FormControl>
                            <FormLabel>Категория</FormLabel >
                            <ButtonGroup
                                fullWidth
                                sx={{
                                    marginTop: '15px',
                                    width: '100%',
                                    display: 'flex'

                                }}

                                variant="contained" aria-label="outlined primary button group">
                                <Button
                                >
                                    Вторичка
                                </Button>
                                <Button>Аренда</Button>
                                <Button

                                    disabled
                                >Новостройки</Button>
                            </ButtonGroup>

                        </FormControl>
                        <Divider className="m-3" />
                        <FormControl

                            sx={{
                                marginTop: '15px',
                                width: '100%',
                                display: 'flex'

                            }}
                        >
                            <FormLabel>Количество комнат</FormLabel >

                            <ButtonGroup
                                fullWidth
                                sx={{
                                    marginTop: '15px',
                                    width: '100%',
                                    display: 'flex'

                                }}

                                // variant="contained"
                                aria-label="outlined primary button group">


                                {
                                    params.rooms.map(function (item) {

                                        return (
                                            < Button
                                                // selected
                                                key={'rooms' + item.val}
                                                onClick={() => handleupdateCheckbox('rooms', item.val, false)}
                                                variant={checkParam(item.val, 'rooms') ? 'contained' : 'outlined'}
                                            // variant="outlined"
                                            > {item.title}
                                            </Button>
                                        )
                                    })
                                }




                            </ButtonGroup>
                        </FormControl>


                        <Divider className="m-3" />




                        <FormControl

                            sx={{
                                marginTop: '15px',
                                width: '100%',
                                display: 'flex',
                                align: "justify"

                            }}
                        >
                            <FormLabel

                                className="mb-4"
                            >Локация</FormLabel >

                            <Grid container spacing={2}>
                                <Grid item xs={4} md={4}>

                                    <Button
                                        fullWidth
                                        size="small"
                                        onClick={open_metro_modal}
                                        variant="contained"
                                    >Метро{counter('metro')}</Button>

                                </Grid>

                                <Grid item xs={4} md={4}>

                                    <Button
                                        fullWidth
                                        size="small"
                                        variant="contained"
                                    >До метро</Button>

                                </Grid>

                                <Grid item xs={4} md={4}>

                                    <Button
                                        fullWidth
                                        size="small"
                                        onClick={open_districts_modal}
                                        variant="contained"
                                    >Районы{counter('districts')}</Button>

                                </Grid>

                            </Grid>





                        </FormControl>

                        <Divider className="m-3" />

                        <FormControl

                            sx={{
                                marginTop: '15px',
                                width: '100%',
                                display: 'flex'

                            }}
                        >

                            <FormLabel
                                className="mb-3 mt-2"

                            >Цена</FormLabel >
                            <Stack
                                direction="row" spacing={2}
                                sx={{
                                    display: 'flex'

                                }}
                            >
                                <TextField
                                    // InputProps={{
                                    //     inputComponent: NumericFormatCustom,
                                    // }}
                                    name={'min_price'}
                                    value={search.min_price}
                                    onChange={(e) => {
                                        let clean = e.target.value.replace(/\D/gi, '');
                                        updateSearchParam('min_price', clean)
                                    }
                                    }

                                    id="min_price" label="От" variant="standard" />
                                <TextField

                                    name={'max_price'}
                                    value={search.max_price}
                                    onChange={(e) => {
                                        let clean = e.target.value.replace(/\D/gi, '');
                                        updateSearchParam('max_price', clean)
                                    }
                                    }


                                    id="max_price-basic" label="До" variant="standard" />

                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120, maxWidth: '30%' }}>
                                    <InputLabel id="demo-simple-select-standard-label">Тип цены</InputLabel>


                                    <Select
                                        labelId="demo-simple-select-standard-label"
                                        id="demo-simple-select-standard"
                                        value={search.price_type}
                                        // onChange={(e) => handleupdateCheckbox('price_type', e.target.value, false)}
                                        // onClick={(e) => handleupdateCheckbox('price_type', e.target.value[0], false)}
                                        label="Тип цены"
                                        multiple
                                    >

                                        {
                                            params.price_type.map(function (type) {
                                                return (
                                                    <MenuItem
                                                        onClick={() => handleupdateCheckbox('price_type', type.val, false)}
                                                        value={type.val}>{type.title}</MenuItem>
                                                )
                                            })

                                        }

                                    </Select>

                                </FormControl>

                            </Stack>

                        </FormControl>
                    </Paper>

                    <MetroModalMu is_open={metro_open} handleClose={close_metro_modal} />
                    <DistrictsModalMu is_open={districts_open} handleClose={close_districts_modal} />


                </>
            )
        }, [search])

    )

}

export default SearchFormMu;