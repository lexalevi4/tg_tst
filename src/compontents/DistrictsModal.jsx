import React from 'react'
import "./../css/style.css";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {updateSearch} from "../store/MapFlatsSlice";
import Form from "react-bootstrap/Form";
import {Button, ButtonGroup, Col, Row} from "react-bootstrap";


const DistrictsModal = React.memo(search => {


    // const state = useSelector(state => state.mapFlats, shallowEqual);
    const params = useSelector(state => state.mapFlats.params, shallowEqual);
    const okrugs = useSelector(state => state.mapFlats.search.okrugs, shallowEqual);
    const districts = useSelector(state => state.mapFlats.search.districts, shallowEqual);
    const dispatch = useDispatch();


    // const dropDistricts = useCallback(async (bruch) => {
    //     await dispatch(updateSearch({field: 'okrugs', value: []}))
    //     await dispatch(updateSearch({field: 'districts', value: []}))
    //
    // }, [dispatch])


    const dropDistricts = () => {
        dispatch(updateSearch({field: 'okrugs', value: []}))
        dispatch(updateSearch({field: 'districts', value: []}))

    }


    const checkOkrug = (id) => {
        if (okrugs.indexOf(id) > -1) {
            return true
        } else {
            return false
        }
    }


    const checkDistrict = (id) => {
        if (districts.indexOf(id) > -1) {
            return true
        } else {
            return false
        }
    }


    const handleDistrictClick = e => {
        handleClick(e.target.dataset.onclickparam);
    };


    // const handleClick = useCallback(async (id) => {
    //     // console.log(id);
    //
    //     let arr = [];
    //     districts.map(function (item, index) {
    //         arr.push(item);
    //         return true;
    //     })
    //     if (arr.indexOf(id) > -1) {
    //         await arr.splice(arr.indexOf(id), 1)
    //     } else {
    //         await arr.push(id)
    //     }
    //     await dispatch(updateSearch({field: 'districts', value: arr}))
    //
    //     // await dispatch(updateSearch({field: field, value: value}))
    // }, [dispatch, districts])


    const handleClick = (id) => {
        // console.log(id);
        id = Number(id)

        let arr = [];
        districts.map(function (item, index) {
            arr.push(item);
            return true;
        })
        if (arr.indexOf(id) > -1) {
            arr.splice(arr.indexOf(id), 1)
        } else {
            arr.push(id)
        }
        dispatch(updateSearch({field: 'districts', value: arr}))

        // await dispatch(updateSearch({field: field, value: value}))
    }


    //
    //
    // const handleOkrug = useCallback(async (okrug) => {
    //     // console.log(okrug);
    //     let current_okrug = params.districts.filter(d => d.parent === okrug)
    //     // console.log(current_okrug);
    //     let okrugs_arr = [];
    //     let districts_arr = [];
    //     okrugs.map(function (item, index) {
    //
    //         okrugs_arr.push(item);
    //         return true;
    //     })
    //     districts.map(function (item, index) {
    //         districts_arr.push(item);
    //         return true;
    //     })
    //     if (okrugs_arr.indexOf(okrug) > -1) {
    //         okrugs_arr.splice(okrugs_arr.indexOf(okrug), 1)
    //         current_okrug.map(function (item) {
    //             if (districts_arr.indexOf(item.id) > -1) {
    //                 districts_arr.splice(districts_arr.indexOf(item.id), 1)
    //             }
    //             return true;
    //         })
    //     } else {
    //         // console.log('добавляем')
    //         okrugs_arr.push(okrug)
    //         current_okrug.map(function (item) {
    //             if (districts_arr.indexOf(item.id) < 0) {
    //                 districts_arr.push(item.id)
    //             }
    //             return true;
    //         })
    //     }
    //     await dispatch(updateSearch({field: 'okrugs', value: okrugs_arr}))
    //     await dispatch(updateSearch({field: 'districts', value: districts_arr}))
    //
    //     // return true
    //
    // }, [dispatch, params, okrugs, districts])


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
        dispatch(updateSearch({field: 'okrugs', value: okrugs_arr}))
        dispatch(updateSearch({field: 'districts', value: districts_arr}))

        // return true

    }


    const handleOkrugClick = e => {
        let param = Number(e.target.dataset.onclickparam)

        // console.log(param);
        handleOkrug(param);
        // console.log(params.field);
        // handleBrunch(param)
    };

    return (


        <div className="modal fade" id="districtsModal" tabIndex="-1" aria-labelledby="districtsModalLabel"

             aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="districtsModalLabel">Выбрать районы</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Закрыть"></button>
                    </div>

                    <div className="modal-body">
                        <ButtonGroup

                            vertical
                            className='float-end'
                        >
                            <Button
                                id='close_districts_btn'
                                data-bs-dismiss="modal"
                                variant='primary'
                                // onClick={dropDistricts}
                            >
                                Сохранить
                            </Button>
                            <Button
                                id='drop_districts_btn'
                                className='float-end mt-3'
                                variant='danger'
                                onClick={dropDistricts}
                            >
                                Сбросить
                            </Button>
                        </ButtonGroup>


                        {
                            params.districts.filter(d => d.type === 'Okrug').map(function (okrug, index) {

                                return (
                                    <div key={okrug.id}>

                                        <h3
                                            className={index > 0 ? 'mt-4 mb-4' : 'mb-4'}
                                        >
                                            <Form.Check

                                                onChange={handleOkrugClick}
                                                data-onclickparam={okrug.id}
                                                checked={checkOkrug(okrug.id)}
                                                key={okrug.id}
                                                type='checkbox'
                                                id={'okrug-' + okrug.id}
                                                label={okrug.name + ":"}
                                            />
                                        </h3>
                                        {params.districts.filter(d => d.parent === okrug.id).map(function (district) {
                                            return (
                                                <Form.Check
                                                    key={district.id}
                                                    checked={checkDistrict(district.id)}

                                                    onChange={handleDistrictClick}
                                                    data-onclickparam={district.id}
                                                    type='checkbox'
                                                    id={'district-' + district.id}
                                                    label={district.name}
                                                />
                                            )
                                        })}
                                    </div>
                                )

                            })
                        }
                    </div>

                    <div className="modal-footer">
                        <Row className='w-100'>
                            <Col className='w-50 align-content-center'>
                                <Button
                                    className='w-100'
                                    // className='align-content-center'
                                    id='drop_districts_btn'
                                    // className='float-end mt-3'
                                    variant='danger'
                                    onClick={dropDistricts}
                                >
                                    Сбросить
                                </Button>
                            </Col>
                            <Col className='w-50 align-content-center'>
                                <Button
                                    className='w-100'
                                    id='close_districts_btn_footer'
                                    data-bs-dismiss="modal"
                                    variant='primary'
                                    // onClick={dropDistricts}
                                >
                                    Сохранить
                                </Button>
                            </Col>
                        </Row>
                    </div>

                </div>
            </div>
        </div>
    )
})


export default DistrictsModal