

// import MetroModal from "../compontents/MetroModal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateAppParam, updateSearch } from "../store/MapFlatsSlice";
import React, { useCallback, useEffect, useState } from "react";

// import '../css/style.css'
// import DistrictsModal from "../compontents/DistrictsModal";
// import { Sheet } from '@mui/joy';
// import { Button, ButtonGroup, Divider, FormControl, FormLabel, Grid, Paper, Stack } from '@mui/material';

import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";


import MetroModalMu from "compontents/MetroModalMu";
import DistrictsModalMu from "compontents/DistrictsModalMu";
import MyMultiSelect from "compontents/MyMultiSelect";
import MyNativeSelect from "compontents/MyNativeSelect";
import MyTextInput from "compontents/MyTextInput";
import { Typography } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SearchFormMu = function () {

    const state = useSelector(state => state.mapFlats);
    const params = useSelector(state => state.mapFlats.params, shallowEqual)
    // const search = useSelector(state => state.mapFlats.search, shallowEqual)
    const cat =useSelector(state => state.mapFlats.search.cat, shallowEqual) 
    const rooms =useSelector(state => state.mapFlats.search.rooms, shallowEqual) 
    // const metro =useSelector(state => state.mapFlats.search.metro, shallowEqual) 
    const to_metro =useSelector(state => state.mapFlats.search.to_metro, shallowEqual) 
    // const districts =useSelector(state => state.mapFlats.search.districts, shallowEqual) 
    const min_price =useSelector(state => state.mapFlats.search.min_price, shallowEqual) 
    const max_price =useSelector(state => state.mapFlats.search.max_price, shallowEqual) 
    const price_type =useSelector(state => state.mapFlats.search.price_type, shallowEqual) 
    const min_total_area =useSelector(state => state.mapFlats.search.min_total_area, shallowEqual) 
    const max_total_area =useSelector(state => state.mapFlats.search.max_total_area, shallowEqual) 
    const min_kitchen_area =useSelector(state => state.mapFlats.search.min_kitchen_area, shallowEqual) 
    const max_kitchen_area =useSelector(state => state.mapFlats.search.max_kitchen_area, shallowEqual) 
    const min_floor =useSelector(state => state.mapFlats.search.min_floor, shallowEqual) 
    const max_floor =useSelector(state => state.mapFlats.search.max_floor, shallowEqual) 
    const floor_types =useSelector(state => state.mapFlats.search.floor_types, shallowEqual) 
    const floors_count_type =useSelector(state => state.mapFlats.search.floors_count_type, shallowEqual) 
    const material =useSelector(state => state.mapFlats.search.material, shallowEqual) 
    const year_build_type =useSelector(state => state.mapFlats.search.year_build_type, shallowEqual) 
    const plan =useSelector(state => state.mapFlats.search.plan, shallowEqual) 
    const isApartment =useSelector(state => state.mapFlats.search.isApartment, shallowEqual) 
    const src =useSelector(state => state.mapFlats.search.src, shallowEqual) 
    const isByHomeowner =useSelector(state => state.mapFlats.search.isByHomeowner, shallowEqual) 


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

    const updateSearchParam = (field, value) => {
        dispatch(updateSearch({ field: field, value: value }))
    }


    // useEffect(() => {

    // }, [])

    useEffect(() => {
        dispatch(updateAppParam({ field: 'stat_plot_open', value: false }))
        dispatch(updateAppParam({ field: 'report_plot_open', value: false }))

    }, [])

    const counter = (param) => {
        let count = state.search[param].length
        if (count === 0) {
            return '';
        } else {
            return "\n[" + count + ']'
        }
    }


    const handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        dispatch(updateSearch({ field: event.target.name, value: value }))
    }




    const handleupdateCheckbox = (field, value, reset = false) => {

        // console.log(value)
        let arr = [];
        state.search[field].map(function (item, index) {
            arr.push(item);
            return true;
        })
        if (arr.includes(value)) {
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


    const handleChangeSelect = (e) => {
        // console.log(e.target.value)
        updateSearchParam(e.target.name, e.target.value)
    }


    const handleTextInput = (e) => {
        let clean = e.target.value.replace(/\D/gi, '');
        updateSearchParam(e.target.name, clean)
    }


    return (

        <>
            <Paper
                className="p-2 m-2"
                style={{
                    marginBottom: 80
                }}
            >
                <FormControl
                    sx={{
                        // marginTop: '15px',
                        width: '100%',
                        display: 'flex'

                    }}
                >
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
                            // fullWidth
                            size="small"
                            onClick={() => updateSearchParam('cat', 1)}
                            variant={cat === 1 ? 'contained' : 'outlined'}
                        >
                            Вторичка
                        </Button>
                        <Button
                            onClick={() => updateSearchParam('cat', 2)}
                            variant={cat === 2 ? 'contained' : 'outlined'}
                            // fullWidth
                            size="small"
                        >Аренда</Button>
                        <Button
                            // fullWidth
                            size="small"
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
                        aria-label="outlined primary button group">
                        {
                            params.rooms.map(function (item) {
                                return (
                                    < Button
                                        size="small"
                                        key={'rooms' + item.val}
                                        onClick={() => handleupdateCheckbox('rooms', item.val, false)}
                                        variant={rooms.includes(item.val) ? 'contained' : 'outlined'}
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
                        className="mb-1"
                    >Локация</FormLabel >
                    <Grid container spacing={2}
                        className='items-end'

                    >
                        <Grid item xs={4} md={4}>
                            <Button
                                fullWidth
                                size="small"
                                onClick={open_metro_modal}
                                variant="contained"
                            >Метро{counter('metro')}</Button>
                        </Grid>
                        <Grid item xs={4} md={4}
                            className="pr-2"
                        >
                            <Stack
                                sx={
                                    { minWidth: 120, Width: '100%' }
                                }
                            >
                                <MyNativeSelect
                                    name={'to_metro'}
                                    // label={<>До метро <DirectionsRunIcon /></>}
                                    label={'Метро пешком'}
                                    handleChangeSelect={handleChangeSelect}
                                    value={to_metro}
                                    values={params.to_metro}
                                />
                            </Stack>
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
                        // marginTop: '15px',
                        width: '100%',
                        display: 'flex'

                    }}
                >
                    <FormLabel
                    // className="mb-3 mt-2"
                    >Цена
                    </FormLabel >
                </FormControl>

                <Stack
                    className='items-end'
                    direction="row"
                    spacing={2}
                    sx={{
                        display: 'flex'
                    }}
                >
                    <MyTextInput
                        name={'min_price'}
                        label="Цена от"
                        handleTextInput={handleTextInput}
                        value={min_price}
                    />
                    <MyTextInput
                        name={'max_price'}
                        label="Цена до"
                        handleTextInput={handleTextInput}
                        value={max_price}
                    />

                    <Stack
                        sx={
                            { minWidth: 120, maxWidth: '30%' }
                        }
                    >

                        <MyMultiSelect
                            name={'price_type'}
                            label={'Тип цены'}
                            handleChangeMultiple={handleChangeMultiple}
                            value={price_type}
                            values={params.price_type}

                        />
                    </Stack>

                </Stack>


                <Divider className="m-3" />
                <Grid
                    // className="mt-4" 
                    container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Stack
                            divider={<Divider orientation="vertical" flexItem />}
                            direction="row" spacing={2}
                            sx={{
                                display: 'flex'

                            }}
                        >
                            <FormControl>
                                <FormLabel
                                    align='left'
                                >
                                    Общая площадь
                                </FormLabel>

                                <Stack
                                    direction="row" spacing={2}
                                    className="mt-1"
                                    sx={{
                                        display: 'flex'
                                    }}
                                >

                                    <MyTextInput
                                        name={'min_total_area'}
                                        label="От"
                                        handleTextInput={handleTextInput}
                                        value={min_total_area}
                                    />
                                    <MyTextInput
                                        name={'max_total_area'}
                                        label="До"
                                        handleTextInput={handleTextInput}
                                        value={max_total_area}
                                    />

                                </Stack>

                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    align='left'
                                >
                                    Кухня
                                    {/* (м<sup>2</sup>) */}
                                </FormLabel>


                                <Stack
                                    className="mt-1"
                                    direction="row" spacing={2}
                                    sx={{
                                        display: 'flex'

                                    }}
                                >

                                    <MyTextInput
                                        name={'min_kitchen_area'}
                                        label="От"
                                        handleTextInput={handleTextInput}
                                        value={min_kitchen_area}
                                    />
                                    <MyTextInput
                                        name={'max_kitchen_area'}
                                        label="До"
                                        handleTextInput={handleTextInput}
                                        value={max_kitchen_area}
                                    />

                                </Stack>

                            </FormControl>
                        </Stack>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Divider
                        // className="mt-1" 
                        />
                    </Grid>

                    <Grid
                        item xs={12} md={12}>
                        <FormControl>

                            <FormLabel
                                align='left'
                            >
                                Этаж
                            </FormLabel>
                            <Stack

                                className="items-end"
                                // className="mt-2"
                                direction="row" spacing={2}
                                sx={{
                                    display: 'flex'

                                }}
                            >
                                <Stack
                                    className='w-3/5'
                                    direction="row"
                                // sx={{ width: '50%' }}
                                >
                                    <MyTextInput

                                        name={'min_floor'}
                                        label="От"
                                        handleTextInput={handleTextInput}
                                        value={min_floor}
                                    />


                                    <MyTextInput
                                        name={'max_floor'}
                                        label="До"
                                        handleTextInput={handleTextInput}
                                        value={max_floor}
                                    />
                                </Stack>
                                <Stack
                                    className='w-2/5'
                                // sx={{ width: '50%' }}
                                >
                                    {/* <InputLabel id={"floor_types-standard-label"}>{'Тип этажа'}</InputLabel> */}
                                    <MyNativeSelect
                                        name={'floor_types'}
                                        label={'Тип этажа'}
                                        handleChangeSelect={handleChangeSelect}
                                        value={floor_types}
                                        values={params.floor_types}
                                    />
                                </Stack>

                            </Stack>
                        </FormControl>
                    </Grid>



                </Grid>

                <Grid item xs={12} md={12}>
                    <Divider className="m-3" />
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>



                        <Stack
                            // divider={<Divider orientation="vertical" flexItem />}
                            direction="row" spacing={2}
                            // fullWidth
                            sx={{
                                display: 'flex'

                            }}
                        >
                            <Stack
                                className='ml-0'
                                sx={{ width: '33%' }}
                            >
                                <MyMultiSelect
                                    name={'floors_count_type'}
                                    label={'Этажность'}
                                    handleChangeMultiple={handleChangeMultiple}
                                    value={floors_count_type}
                                    values={params.floors_count_types}
                                />
                            </Stack>
                            <Stack
                                className='ml-0'
                                sx={{ width: '33%' }}
                            >

                                <MyMultiSelect
                                    name={'material'}
                                    label={'Материал'}
                                    handleChangeMultiple={handleChangeMultiple}
                                    value={material}
                                    values={params.material_types}
                                />

                            </Stack>


                            <Stack
                                className='ml-0'
                                sx={{ width: '33%' }}
                            >
                                <MyMultiSelect

                                    className='ml-0'
                                    name={'year_build_type'}
                                    label={'Год'}
                                    handleChangeMultiple={handleChangeMultiple}
                                    value={year_build_type}
                                    values={params.year_types}
                                />
                            </Stack>
                        </Stack>
                    </Grid>
                </Grid>


                <Grid item xs={12} md={12}>
                    <Divider className="m-3" />
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>



                        <Stack
                            // divider={<Divider orientation="vertical" flexItem />}
                            direction="row" spacing={2}
                            // fullWidth
                            sx={{
                                display: 'flex'

                            }}
                        >
                            <Stack
                                className='ml-0'
                                sx={{ width: '50%' }}
                            >
                                <MyMultiSelect
                                    name={'plan'}
                                    label={'Планировка'}
                                    handleChangeMultiple={handleChangeMultiple}
                                    value={plan}
                                    values={params.plans}
                                />
                            </Stack>
                            <Stack
                                className='ml-0'
                                sx={{ width: '50%' }}
                            >

                                <MyNativeSelect
                                    name={'isApartment'}
                                    label={'Апартаменты'}
                                    handleChangeSelect={handleChangeSelect}
                                    value={isApartment}
                                    values={params.isApartment}
                                />

                            </Stack>

                        </Stack>
                    </Grid>
                </Grid>



                <Grid item xs={12} md={12}>
                    <Divider className="m-3" />
                </Grid>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>



                        <Stack
                            // divider={<Divider orientation="vertical" flexItem />}
                            direction="row" spacing={2}
                            // fullWidth
                            sx={{
                                display: 'flex'

                            }}
                        >
                            <Stack
                                className='ml-0'
                                sx={{ width: '50%' }}
                            >
                                <MyMultiSelect
                                    name={'src'}
                                    label={'Источник'}
                                    handleChangeMultiple={handleChangeMultiple}
                                    value={src}
                                    values={params.srcs}
                                />
                            </Stack>
                            <Stack
                                className='ml-0'
                                sx={{ width: '50%' }}
                            >

                                <MyNativeSelect
                                    name={'isByHomeowner'}
                                    label={'От собственников'}
                                    handleChangeSelect={handleChangeSelect}
                                    value={isByHomeowner}
                                    values={params.isByHomeowner}
                                />

                            </Stack>

                        </Stack>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Divider className="m-3" />
                </Grid>
                <Typography >
                    Выберете в меню список или карту, фильтр применяется автоматически.<br />

                </Typography>


            </Paper>

            <MetroModalMu is_open={metro_open} handleClose={close_metro_modal} />
            <DistrictsModalMu is_open={districts_open} handleClose={close_districts_modal} />


        </>


    )

}

export default SearchFormMu;