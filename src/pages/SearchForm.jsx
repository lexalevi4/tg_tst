import Form from 'react-bootstrap/Form';
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    DropdownButton,
    Dropdown,
    InputGroup,
    Row,
    ToggleButton
} from "react-bootstrap";
import MetroModal from "../compontents/MetroModal";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {updateSearch} from "../store/MapFlatsSlice";
import React from "react";

import '../css/style.css'
import DistrictsModal from "../compontents/DistrictsModal";


const SearchForm = function () {
    const state = useSelector(state => state.mapFlats);
    // console.log(state)
    const params = useSelector(state => state.mapFlats.params, shallowEqual)
    // console.log(params)

    const dispatch = useDispatch();

    //
    // const updateSearchParam = useCallback(async (field, value) => {
    //     await dispatch(updateSearch({field: field, value: value}))
    // }, [dispatch])


    const updateSearchParam = (field, value) => {
         dispatch(updateSearch({field: field, value: value}))
    }


    const handleBtnClick = e => {
        let params = JSON.parse(e.target.dataset.onclickparam)
        updateSearchParam(params.field, params.value)
    };


    const counter = (param) => {
        let count = state.search[param].length
        if (count === 0) {
            return '';
        } else {
            return "\n[" + count + ']'
        }
    }

    const getSearchValue = (param) => {
        let count = state.search[param].length
        // console.log(state.search[param])
        if (count === 0) {
            return '';
        } else {
            return "\n" +
                state.params[param].filter(p => p.val === Number(state.search[param][0]))[0].title
                + ''
        }
    }


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




    const handleupdateCheckbox =  (field, value, reset = false) => {
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
         dispatch(updateSearch({field: field, value: arr}))
    }




    // console.log('form')

    return (
        <>
            <Container>
                <Form>
                    <h3 className='mt-3'>Базовые параметры:</h3>
                    <Row>

                        <Form.Label className='mt-2'>Категория: </Form.Label>
                        <ButtonGroup className="mt-0 mb-2">
                            {
                                params.cats.map(function (item) {
                                    return (
                                        <ToggleButton
                                            key={'cat' + item.val}
                                            type="radio"
                                            // onClick={() => handleUpdateSearchParam('cat', item.val)}
                                            onClick={handleBtnClick}
                                            name='cat'
                                            data-onclickparam={JSON.stringify({value: item.val, field: 'cat'})}
                                            checked={state.search.cat === item.val}
                                            // as='<radio />'
                                            radioGroup='cat'
                                            className='btn-primary'
                                        >
                                            {item.title}
                                        </ToggleButton>
                                    )
                                })
                            }
                        </ButtonGroup>
                    </Row>


                    <Row>

                        <Form.Label className='mt-2'>Количество комнат: </Form.Label>
                        <ButtonGroup className="mt-0 mb-2">
                            {
                                params.rooms.map(function (item) {
                                    return (
                                        <ToggleButton
                                            // className ='reset_0'
                                            key={'rooms_' + item.val}
                                            onClick={() => handleupdateCheckbox('rooms', item.val, false)}
                                            checked={checkParam(item.val, 'rooms')}
                                            id={'rooms_' + item.val}
                                            value={item.val}
                                            // reset={true}
                                            itemProp='0'
                                            // data-o={
                                            //     JSON.stringify({
                                            //         value: item.val,
                                            //         field: 'rooms',
                                            //         reset: false
                                            //     })}
                                            type="checkbox"
                                            name='rooms'
                                            className='btn-primary'>{item.title}</ToggleButton>
                                    )
                                })
                            }
                        </ButtonGroup>
                    </Row>

                    <Row>
                        <Form.Label className='mt-2'>Локация: </Form.Label>
                        <Col>
                            <div className="d-grid gap-2">
                                <Button
                                    type="button"
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#metroModal"
                                    variant='primary'
                                    id='metro_search_button'
                                >Метро{counter('metro')}</Button>
                            </div>
                        </Col>

                        <Col>


                            <DropdownButton
                                // variant="outline-secondary"
                                // variant="secondary"
                                variant="primary"
                                title={"До метро " + getSearchValue('to_metro').replace(/\D/gi, '')}
                                id="to_metro_search_button"
                                // autoClose="outside"

                            >

                                {
                                    params.to_metro.map(function (type) {
                                        return (
                                            <Dropdown.Item
                                                key={'to_metro_' + type.val}
                                                className={checkParam(type.val, 'to_metro') ? 'active' : ''}
                                                onClick={() => handleupdateCheckbox('to_metro', type.val, true)}
                                            >{type.title}
                                            </Dropdown.Item>
                                        )
                                    })
                                }

                            </DropdownButton>


                            {/*<Dropdown as={ButtonGroup} id="to_metro_search_button"*/}


                            {/*>*/}
                            {/*    <Dropdown.Toggle >*/}
                            {/*        title={"До метро " + getSearchValue('to_metro').replace(/\D/gi, '')}*/}
                            {/*    </Dropdown.Toggle>*/}
                            {/*    <Dropdown.Menu>*/}
                            {/*        <span*/}
                            {/*            style={{*/}
                            {/*                marginLeft: '15px'*/}
                            {/*            }}*/}
                            {/*        >Пешком:</span>*/}

                            {/*        <Dropdown.Divider/>*/}

                            {/*        {*/}
                            {/*            params.to_metro.map(function (type) {*/}
                            {/*                return (*/}
                            {/*                    <Dropdown.Item*/}
                            {/*                        key={'price_types' + type.val}*/}
                            {/*                        className={checkParam(type.val, 'to_metro') ? 'active' : ''}*/}
                            {/*                        onClick={() => handleupdateCheckbox('to_metro', type.val, true)}*/}
                            {/*                    >{type.title}*/}
                            {/*                    </Dropdown.Item>*/}
                            {/*                )*/}
                            {/*            })*/}
                            {/*        }*/}



                            {/*    </Dropdown.Menu>*/}
                            {/*</Dropdown>*/}


                        </Col>

                        <Col>
                            <div className="d-grid gap-2">
                                <Button
                                    className="btn btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#districtsModal"
                                    variant='primary'
                                    id='districts_search_button'
                                >
                                    Районы {counter('districts')}</Button>
                            </div>

                        </Col>

                    </Row>

                    <Row>
                        <Form.Label className='mt-2'>Цена: </Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder='от'
                                onChange={(e) => {
                                    let clean = e.target.value.replace(/\D/gi, '');
                                    updateSearchParam('min_price', clean)
                                }
                                }
                                value={state.search.min_price}
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                            />
                            <Form.Control
                                placeholder='до'
                                aria-label="Example text with button addon"
                                aria-describedby="basic-addon1"
                                value={state.search.max_price}
                                onChange={(e) => {
                                    let clean = e.target.value.replace(/\D/gi, '');
                                    updateSearchParam('max_price', clean)
                                }
                                }

                            />

                            <DropdownButton
                                variant="outline-secondary"
                                title={"Тип цены" + counter('price_type')}
                                id="input-group-dropdown-price"
                                autoClose="outside"

                            >

                                {
                                    params.price_type.map(function (type) {
                                        return (
                                            <Dropdown.Item
                                                key={'price_types' + type.val}
                                                className={checkParam(type.val, 'price_type') ? 'active' : ''}
                                                onClick={() => handleupdateCheckbox('price_type', type.val, false)}
                                            >{type.title}
                                            </Dropdown.Item>
                                        )
                                    })
                                }
                                {/*<Dropdown.Item*/}

                                {/*    // price_type*/}

                                {/*    className='active'*/}
                                {/*    href="#">Безнадёга</Dropdown.Item>*/}
                                {/*<Dropdown.Item href="#">Высокие</Dropdown.Item>*/}
                                {/*<Dropdown.Item href="#">Средние</Dropdown.Item>*/}
                                {/*<Dropdown.Item href="#">Ниже среднего</Dropdown.Item>*/}
                                {/*<Dropdown.Item href="#">Дно рынка</Dropdown.Item>*/}

                            </DropdownButton>

                        </InputGroup>

                    </Row>

                    <h3 className='mt-3'>Квартира:</h3>

                    <Row>
                        <Col>
                            <Form.Label className='mt-2'>Общая площадь: </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder='от'
                                    onChange={(e) => {
                                        let clean = e.target.value.replace(/\D/gi, '');
                                        updateSearchParam('min_total_area', clean)
                                    }
                                    }
                                    value={state.search.min_total_area}
                                    // aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                />
                                <Form.Control
                                    placeholder='до'
                                    // aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    value={state.search.max_total_area}
                                    onChange={(e) => {
                                        let clean = e.target.value.replace(/\D/gi, '');
                                        updateSearchParam('max_total_area', clean)
                                    }
                                    }
                                />
                            </InputGroup>

                        </Col>


                        <Col>

                            <Form.Label className='mt-2'>Кухня: </Form.Label>
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder='от'
                                    onChange={(e) => {
                                        let clean = e.target.value.replace(/\D/gi, '');
                                        updateSearchParam('min_kitchen_area', clean)
                                    }
                                    }
                                    value={state.search.min_kitchen_area}
                                    // aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                />
                                <Form.Control
                                    placeholder='до'
                                    // aria-label="Example text with button addon"
                                    aria-describedby="basic-addon1"
                                    value={state.search.max_kitchen_area}
                                    onChange={(e) => {
                                        let clean = e.target.value.replace(/\D/gi, '');
                                        updateSearchParam('max_kitchen_area', clean)
                                    }
                                    }
                                />
                            </InputGroup>

                        </Col>

                    </Row>


                    <Row>
                        <Form.Label className='mt-2'>Этаж: </Form.Label>
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder='от'
                                onChange={(e) => {
                                    let clean = e.target.value.replace(/\D/gi, '');
                                    updateSearchParam('min_floor', clean)
                                }
                                }
                                value={state.search.min_floor}
                                aria-describedby="basic-addon1"
                            />
                            <Form.Control
                                placeholder='до'
                                // aria
                                aria-describedby="basic-addon1"
                                value={state.search.max_floor}
                                onChange={(e) => {
                                    let clean = e.target.value.replace(/\D/gi, '');
                                    updateSearchParam('max_floor', clean)
                                }
                                }
                            />
                            <DropdownButton
                                variant="outline-secondary"
                                // variant="secondary"
                                // variant="primary"
                                title={"Тип этажа " + getSearchValue('floor_types')}
                                id="input-group-dropdown-floor"
                                // autoClose="outside"

                            >

                                {
                                    params.floor_types.map(function (type) {
                                        return (
                                            <Dropdown.Item
                                                key={'floor_types_' + type.val}
                                                className={checkParam(type.val, 'floor_types') ? 'active' : ''}
                                                onClick={() => handleupdateCheckbox('floor_types', type.val, true)}
                                            >{type.title}
                                            </Dropdown.Item>
                                        )
                                    })
                                }

                            </DropdownButton>
                        </InputGroup>

                    </Row>


                    <h3 className='mt-3'>Дом:</h3>
                    <Row>

                        <Col>

                            <InputGroup className="mb-3 mt-3">
                                <ButtonGroup className='w-100 dropdowns-group'
                                    // vertical={true}
                                >
                                    <DropdownButton
                                        className='test-class-button'
                                        autoClose="outside"
                                        style={{
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0
                                        }
                                        }
                                        as={ButtonGroup}
                                        title={"Этажность" + counter('floors_count_type')}
                                        id="floors_count-dropdown">

                                        {
                                            params.floors_count_types.map(function (type) {
                                                return (
                                                    <Dropdown.Item
                                                        key={'floors_count_types_' + type.val}
                                                        className={checkParam(type.val, 'floors_count_type') ? 'active' : ''}
                                                        onClick={() => handleupdateCheckbox('floors_count_type', type.val, false)}
                                                    >{type.title}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }


                                    </DropdownButton>
                                    <DropdownButton
                                        autoClose="outside"

                                        style={{
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0
                                        }
                                        }

                                        as={ButtonGroup}
                                        title={"Материал" + counter('material')}
                                        id="material-dropdown"
                                    >
                                        {
                                            params.material_types.map(function (type) {
                                                return (
                                                    <Dropdown.Item
                                                        key={'material_type' + type.val}
                                                        className={checkParam(type.val, 'material') ? 'active' : ''}
                                                        onClick={() => handleupdateCheckbox('material', type.val, false)}
                                                    >{type.title}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </DropdownButton>

                                    <DropdownButton as={ButtonGroup} autoClose="outside"
                                                    title={"Год" + counter('year_build_type')}
                                                    id="year-dropdown">

                                        {
                                            params.year_types.map(function (type) {
                                                return (
                                                    <Dropdown.Item
                                                        key={'year_type' + type.val}
                                                        className={checkParam(type.val, 'year_build_type') ? 'active' : ''}
                                                        onClick={() => handleupdateCheckbox('year_build_type', type.val, false)}
                                                    >{type.title}
                                                    </Dropdown.Item>
                                                )
                                            })
                                        }
                                    </DropdownButton>
                                </ButtonGroup>
                            </InputGroup>


                        </Col>

                    </Row>

                    <Row className='mt-5 mb-5'>
                        <Col>
                            <Button
                                className='w-100'
                                variant="secondary">
                                Списком
                            </Button>
                        </Col>
                        <Col>
                            <Button
                                className='w-100'
                                variant="primary">
                                На карте
                            </Button>
                        </Col>
                    </Row>


                </Form>

            </Container>

            <MetroModal

                // search={state.search.metro}
            />
            <DistrictsModal

                search={state.search.districts}
            />


        </>
    )

}

export default SearchForm;