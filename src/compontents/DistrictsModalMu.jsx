import React, { useCallback } from 'react'
import "./../css/style.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateSearch } from "../store/MapFlatsSlice";

import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import FormControlLabel from '@mui/material/FormControlLabel';
import Toolbar from '@mui/material/Toolbar';


import Checkbox from '@mui/material/Checkbox';
import DistrictCheckbox from './DistrictCheckbox';
import { updateDistrict } from 'saga/actions';
import RemoveDoneIcon from '@mui/icons-material/RemoveDone';
import CheckIcon from '@mui/icons-material/Check';



const getParams = (state) => state.mapFlats.params
const getOkrugs = (state) => state.mapFlats.search.okrugs
const getDistricts = (state) => state.mapFlats.search.districts

const DistrictsModalMu = function ({ is_open, handleClose }) {


    const params = useSelector(getParams, shallowEqual);
    const okrugs = useSelector(getOkrugs, shallowEqual);
    const districts = useSelector(getDistricts, shallowEqual);
    const dispatch = useDispatch();


    const dropDistricts = useCallback(() => {
        dispatch(updateSearch({ field: 'okrugs', value: [] }))
        dispatch(updateSearch({ field: 'districts', value: [] }))

    }, [dispatch])


    const checkOkrug = (id) => {
        if (okrugs.indexOf(id) > -1) {
            return true
        } else {
            return false
        }
    }


    const handleClick = useCallback((e) => {
        dispatch(updateDistrict(Number(e.target.value)))
    }, [])




    const handleOkrug = (okrug) => {
        // console.log(okrug);
        let current_okrug = params.districts.filter(d => d.parent === okrug)
        // console.log(current_okrug);
        let okrugs_arr = [];
        let districts_arr = [];
        okrugs.map(function (item, index) {

            okrugs_arr.push(item);
            return true;
        })
        districts.map(function (item, index) {
            districts_arr.push(item);
            return true;
        })
        if (okrugs_arr.indexOf(okrug) > -1) {
            okrugs_arr.splice(okrugs_arr.indexOf(okrug), 1)
            current_okrug.map(function (item) {
                if (districts_arr.indexOf(item.id) > -1) {
                    districts_arr.splice(districts_arr.indexOf(item.id), 1)
                }
                return true;
            })
        } else {
            // console.log('добавляем')
            okrugs_arr.push(okrug)
            current_okrug.map(function (item) {
                if (districts_arr.indexOf(item.id) < 0) {
                    districts_arr.push(Number(item.id))
                }
                return true;
            })
        }
        dispatch(updateSearch({ field: 'okrugs', value: okrugs_arr }))
        dispatch(updateSearch({ field: 'districts', value: districts_arr }))

    }


    const handleOkrugClick = e => {
        let param = Number(e.target.value)
        handleOkrug(param);

    };

    return (


        <Dialog
            fullScreen
            keepMounted
            open={is_open}
            scroll='paper'
            onClose={handleClose}

        >
            <div
                className='m-3 p-2 pt-5 pb-5'
                style={{
                    marginBottom: 80,
                    marginTop: 40
                }}



            >



                {
                    //  is_open && 
                    params.districts.filter(d => d.type === 'Okrug').map(function (okrug, index) {

                        return (
                            <div key={okrug.id}
                                style={{
                                    marginBottom: 20,
                                    marginTop: 30,
                                    marginLeft: 20
                                }}
                            >

                                <FormControlLabel
                                    label={okrug.name + ":"}

                                    control={
                                        <Checkbox
                                            checked={checkOkrug(okrug.id)}
                                            // indeterminate={checked[0] !== checked[1]}
                                            value={okrug.id}
                                            onChange={handleOkrugClick}
                                        />}
                                />
                                {params.districts.filter(d => d.parent === okrug.id).map(function (district) {

                                    return (

                                        <DistrictCheckbox
                                            key={'district_' + district.id}
                                            district={district}
                                            handleClick={handleClick}
                                            // handleDistrictClick={handleDistrictClick}
                                            // checked={checkDistrict(district.id)}
                                            districts={districts}

                                        />

                                        // <Box
                                        //     key={'d_' + district.id}
                                        //     sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                                        //     <FormControlLabel
                                        //         label={district.name}
                                        //         control={
                                        //             <Checkbox
                                        //                 data-onclickparam={district.id}
                                        //                 checked={checkDistrict(district.id)}
                                        //                 value={district.id}
                                        //                 onChange={handleDistrictClick}
                                        //             />
                                        //         }
                                        //     />
                                        // </Box>
                                    )

                                })}





                            </div>
                        )

                    })
                }
            </div>

            <AppBar position="fixed"

                color="primary" sx={{ top: 0, bottom: 'auto' }}>
                <Toolbar
                    style={{
                        justifyContent: 'space-around'
                    }}
                >

                    <Button
                        className='mr-1 w-2/5'
                        // fullWidth
                        variant='contained'
                        startIcon={<RemoveDoneIcon />}
                        onClick={dropDistricts}
                        color="error"
                    >
                        Сбросить
                    </Button>
                    <Button
                        className='ml-1 w-2/5'
                        // fullWidth
                        color="success"
                        variant='contained'
                        onClick={handleClose}
                        startIcon={<CheckIcon />}
                    >
                        Сохранить
                    </Button>


                </Toolbar>
            </AppBar>

        </Dialog>
    )
}


export default DistrictsModalMu