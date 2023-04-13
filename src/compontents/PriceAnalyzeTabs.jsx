import React from 'react';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import '../css/style.css'
import {
    Button,
    Paper,
    Table, TableBody, TableCell,
    TableContainer,
    TableFooter,
    TableHead, TableRow,
} from "@mui/material";

import { updateAppParam } from 'store/MapFlatsSlice';
import HelpIcon from '@mui/icons-material/Help';
import { useDispatch, useSelector } from 'react-redux';


const PriceAnalizeTabs = function ({ positions, districts, cat }) {
    // console.log( districts.filter(d => d.type === 'Okrug'))

    const dispatch = useDispatch();
    // const search = useSelector(state => state.mapFlats.search);
    const price_desc_modal_open = useSelector(state => state.mapFlats.app_params.price_desc_modal_open);

    // console.log(price_desc_modal_open);

    const handlePriceDescModal = () => {
        dispatch(updateAppParam({ field: 'price_desc_modal_open', value: !price_desc_modal_open }))
    }

    // const [open, setOpen] = useState(null)
    // const [anchorEl, setAnchorEl] = useState(null);

    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    //     setOpen((previousOpen) => !previousOpen);
    // };

    // const canBeOpen = open && Boolean(anchorEl);
    // const id = canBeOpen ? 'transition-popper' : undefined;


    const positions_labels = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_district_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_district_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_okrug_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_okrug_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_town_price_values = [null, null, null, null, null, null, null, null, null, null, null]
    const positions_town_price_per_meter_values = [null, null, null, null, null, null, null, null, null, null, null]


    const positions_values = {
        year_build_type: 'Год',
        floors_type: 'Этажность',
        material_type_str: 'Материал',
        area_type: 'Площадь',
        kitchen_type: 'Кухня',

    }

    // console.log(positions)


    const positions_order = [
        ['', ''],
        ['year_build_type', ''],
        ['year_build_type', 'floors_type'],
        ['year_build_type', 'material_type_str'],
        ['year_build_type', 'area_type'],
        ['floors_type', ''],
        ['floors_type', 'area_type'],
        ['floors_type', 'material_type_str'],
        ['area_type', ''],
        ['area_type', 'material_type_str'],
        ['area_type', 'kitchen_type'],

    ];

    positions_order.map((item, index) => {
        var current_pos = positions.filter(function (e) {
            return (e.hue === item[1] && e.x === item[0])
        })
        current_pos.map((item) => {
            // console.log(item)
            // if (positions_labels[index] !== null) {
            if (index === 0) {
                positions_labels[index] = ['Вся выборка']
            } else {
                // positions_labels[index] = [positions_values[item.x] + ": " + item.x_value]
                // if (item.hue !== '') {
                //     positions_labels[index].push(positions_values[item.hue] + ": " + item.hue_value)
                // }
                positions_labels[index] = [positions_values[item.x] + ":", item.x_value]
                if (item.hue !== '') {
                    positions_labels[index].push(positions_values[item.hue] + ":")
                    positions_labels[index].push(item.hue_value)
                }

            }
            // }
            if (item.param === 'price') {
                if (item.depth === 'town') {
                    positions_town_price_values[index] = item;
                }
                if (item.depth === 'okrug') {
                    positions_okrug_price_values[index] = item;
                }
                if (item.depth === 'district') {
                    positions_district_price_values[index] = item;
                }
            }
            if (item.param === 'price_per_meter') {
                if (item.depth === 'town') {
                    positions_town_price_per_meter_values[index] = item;
                }
                if (item.depth === 'okrug') {
                    positions_okrug_price_per_meter_values[index] = item;
                }
                if (item.depth === 'district') {
                    positions_district_price_per_meter_values[index] = item;
                }
            }

            return true;
        })

        return true;

    })




    const positionClickHandler = function (e) {
        // console.log(e)
        let params = JSON.parse(e.target.dataset.onclickparam)
        console.log(params)
        dispatch(updateAppParam({ field: 'report_plot_request', value: params }))
        dispatch(updateAppParam({ field: 'report_plot', value: { id: params.id, status: 'none' } }))
        dispatch(updateAppParam({ field: 'report_plot_open', value: true }))

    }

    return (

        <>

            <Button
            style={{
                textTransform: 'none',
            }}
                // aria-describedby={id}

                // className='ml-5 mr-5 '
                className='m-2 '
                // size="small"
                color="primary"
                // variant="contained"
                // type="button" 
                // endIcon={}
                onClick={handlePriceDescModal}>
                <HelpIcon size='8px' />Анализ цены:

            </Button>


            <Tabs
                size="sm"
                aria-label="Pricing plan"
                defaultValue={0}
                sx={(theme) => ({
                    // width: 343,
                    '--Tabs-gap': '0px',
                    borderRadius: 'lg',
                    boxShadow: 'sm',
                    overflow: 'auto',
                    border: `1px solid ${theme.vars.palette.divider}`,
                })}
            >




                <TabList
                    sx={{
                        '--ListItem-radius': '0px',
                        borderRadius: 0,
                        [`& .${tabClasses.root}`]: {
                            fontWeight: 'lg',
                            flex: 1,
                            bgcolor: 'background.body',
                            position: 'relative',
                            [`&.${tabClasses.selected}`]: {
                                color: 'primary.500',
                            },
                            [`&.${tabClasses.selected}:before`]: {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                bottom: -1,
                                width: '100%',
                                height: 2,
                                bgcolor: 'primary.400',
                            },
                            [`&.${tabClasses.focusVisible}`]: {
                                outlineOffset: '-3px',
                            },
                        },
                    }}

                >
                    <Tab>За квартиру</Tab>
                    <Tab>За квадрат</Tab>
                    
                </TabList>

                <hr />
                

                <TabPanel className='mb-3' value={0}>

                    <TableContainer component={Paper}  >

                        <Table
                            sx={{
                                width: 'max-content'
                            }}

                            size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        className='pre_line'

                                    >Глубина</TableCell>
                                    {positions_labels.map(function (label, index) {
                                        return (
                                            <TableCell key={'1_head_' + index} className='pre_line' >{
                                                label.map(function (item, index) {
                                                    return (<p key={'1_head_' + index + item}
                                                        className='mt-0 mb-0'
                                                    >{item}</p>)
                                                })}
                                            </TableCell>

                                        )
                                    })}


                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Вся Москва</TableCell>
                                    {positions_town_price_values.map(function (item, index) {
                                        // console.log(item)
                                        return (

                                            <TableCell sx={{ width: 100 }} key={Math.random(0, 100000) + "_positions_town_price" + index}>
                                                <Button
                                                    className='p-0'
                                                    size="small"
                                                    onClick={positionClickHandler}
                                                    data-onclickparam={JSON.stringify(
                                                        {
                                                            report_id: item.report_id,
                                                            param: item.param,
                                                            x: item.x,
                                                            // x_value: item.x_value,
                                                            hue: item.hue,
                                                            // hue_value: item.hue_value,
                                                            district: null,
                                                            okrug: null,
                                                        }
                                                    )
                                                    }

                                                    style={{
                                                        // textDecoration: 'underline',
                                                        // color: '#1976d2'

                                                    }}
                                                >
                                                    {item.current_position + "% / " + item.count}
                                                </Button>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Округ</TableCell>
                                    {positions_okrug_price_values.map(function (item, index) {
                                        return (
                                            <TableCell key={Math.random(0, 100000) + "_positions_okrug_price" + index}>
                                                <Button
                                                    className='p-0'
                                                    size="small"
                                                    onClick={positionClickHandler}
                                                    data-onclickparam={JSON.stringify(
                                                        {
                                                            report_id: item.report_id,
                                                            param: item.param,
                                                            x: item.x,
                                                            // x_value: item.x_value,
                                                            hue: item.hue,
                                                            // hue_value: item.hue_value,
                                                            district: null,
                                                            okrug: (districts.filter(d => d.type === 'Okrug'))[0].id,
                                                        }
                                                    )
                                                    }

                                                    style={{
                                                        // textDecoration: 'underline',
                                                        // color: '#1976d2'

                                                    }}
                                                >
                                                    {item.current_position + "% / " + item.count}
                                                </Button>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Район</TableCell>
                                    {positions_district_price_values.map(function (item, index) {
                                        return (
                                            <TableCell key={Math.random(0, 100000) + "_positions_district_price" + index}>
                                                <Button
                                                    className='p-0'
                                                    size="small"
                                                    onClick={positionClickHandler}
                                                    data-onclickparam={JSON.stringify(
                                                        {
                                                            report_id: item.report_id,
                                                            param: item.param,
                                                            x: item.x,
                                                            // x_value: item.x_value,
                                                            hue: item.hue,
                                                            // hue_value: item.hue_value,
                                                            district: (districts.filter(d => d.type !== 'Okrug'))[0].id,
                                                            okrug: null,
                                                        }
                                                    )
                                                    }

                                                    style={{
                                                        // textDecoration: 'underline',
                                                        // color: '#1976d2'

                                                    }}
                                                >
                                                    {item.current_position + "% / " + item.count}
                                                </Button>

                                            </TableCell>
                                        )
                                    })}
                                </TableRow>

                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell
                                        colSpan={11}
                                    ></TableCell>
                                </TableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>

                </TabPanel>

                <TabPanel value={1} className='mb-3'>
                    <TableContainer component={Paper}  >

                        <Table
                            sx={{
                                width: 'max-content'
                            }}
                            size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        className='pre_line'
                                    >Глубина</TableCell>
                                    {positions_labels.map(function (label, index) {
                                        return (
                                            // 
                                            // })
                                            <TableCell key={'0_head_' + index} className='pre_line' >{
                                                label.map(function (item, index) {
                                                    return (<p key={'0_head_' + index + item}
                                                        className='mt-0 mb-0 '
                                                    >{item}</p>)
                                                })}
                                            </TableCell>

                                        )
                                    })}


                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell><span

                                    >Вся Москва</span></TableCell>
                                    {positions_town_price_per_meter_values.map(function (item, index) {
                                        // console.log(item)
                                        return (

                                            <TableCell sx={{ width: 100 }} key={Math.random(0, 100000) + "_positions_town_price_per_meter" + index}>


                                                <Button
                                                    className='p-0'
                                                    size="small"
                                                    onClick={positionClickHandler}
                                                    data-onclickparam={JSON.stringify(
                                                        {
                                                            report_id: item.report_id,
                                                            param: item.param,
                                                            x: item.x,
                                                            // x_value: item.x_value,
                                                            hue: item.hue,
                                                            // hue_value: item.hue_value,
                                                            district: null,
                                                            okrug: null,
                                                        }
                                                    )
                                                    }

                                                    style={{
                                                        // textDecoration: 'underline',
                                                        // color: '#1976d2'

                                                    }}
                                                >
                                                    {item.current_position + "% / " + item.count}
                                                </Button>


                                            </TableCell>
                                        )
                                    })}
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Округ</TableCell>
                                    {positions_okrug_price_per_meter_values.map(function (item, index) {
                                        return (
                                            <TableCell key={Math.random(0, 100000) + "_positions_okrug_price_per_meter" + index}>

                                                <Button
                                                    className='p-0'
                                                    size="small"
                                                    onClick={positionClickHandler}
                                                    data-onclickparam={JSON.stringify(
                                                        {
                                                            report_id: item.report_id,
                                                            param: item.param,
                                                            x: item.x,
                                                            // x_value: item.x_value,
                                                            hue: item.hue,
                                                            // hue_value: item.hue_value,
                                                            district: null,
                                                            okrug: (districts.filter(d => d.type === 'Okrug'))[0].id,
                                                        }
                                                    )
                                                    }

                                                    style={{
                                                        // textDecoration: 'underline',
                                                        // color: '#1976d2'

                                                    }}
                                                >
                                                    {item.current_position + "% / " + item.count}
                                                </Button>


                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Район</TableCell>
                                    {positions_district_price_per_meter_values.map(function (item, index) {
                                        return (
                                            <TableCell key={Math.random(0, 100000) + "_positions_district_price_per_meter" + index}>

                                                <Button
                                                    className='p-0'
                                                    size="small"
                                                    onClick={positionClickHandler}
                                                    data-onclickparam={JSON.stringify(
                                                        {
                                                            report_id: item.report_id,
                                                            param: item.param,
                                                            x: item.x,
                                                            // x_value: item.x_value,
                                                            hue: item.hue,
                                                            // hue_value: item.hue_value,
                                                            district: (districts.filter(d => d.type !== 'Okrug'))[0].id,
                                                            okrug: null,
                                                        }
                                                    )
                                                    }

                                                    style={{
                                                        // textDecoration: 'underline',
                                                        // color: '#1976d2'

                                                    }}
                                                >
                                                    {item.current_position + "% / " + item.count}
                                                </Button>

                                            </TableCell>
                                        )
                                    })}
                                </TableRow>

                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell
                                        colSpan={11}
                                    ></TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>

                </TabPanel>

            </Tabs>

        </>

    )
}

// const areEqual = (prevProps, nextProps) => {
//     // console.log(prevProps)
//     // console.log(nextProps)
//     if (prevProps.flat_id === nextProps.flat_id) {
//         return true                                    // donot re-render
//     }
//     return false                                     // will re-render
// }


// export default React.memo(PriceAnalizeTabs, areEqual)

export default PriceAnalizeTabs