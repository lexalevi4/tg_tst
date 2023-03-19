
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import '../css/style.css'
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
    // Box,
    Button,
    // Fade,
    // Box,

    Paper,
    // Popper,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead, TableRow, 
    //  Typography,

} from "@mui/material";

import { updateAppParam } from 'store/MapFlatsSlice';
import HelpIcon from '@mui/icons-material/Help';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

const PriceAnalizeTabs = function ({ positions,flat_id }) {
    // console.log(positions)

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
                    positions_town_price_values[index] = { pos: item.current_position, count: item.count };
                }
                if (item.depth === 'okrug') {
                    positions_okrug_price_values[index] = { pos: item.current_position, count: item.count };
                }
                if (item.depth === 'district') {
                    positions_district_price_values[index] = { pos: item.current_position, count: item.count };
                }
            }
            if (item.param === 'price_per_meter') {
                if (item.depth === 'town') {
                    positions_town_price_per_meter_values[index] = { pos: item.current_position, count: item.count };
                }
                if (item.depth === 'okrug') {
                    positions_okrug_price_per_meter_values[index] = { pos: item.current_position, count: item.count };
                }
                if (item.depth === 'district') {
                    positions_district_price_per_meter_values[index] = { pos: item.current_position, count: item.count };
                }
            }

            return true;
        })

        return true;

    })


    return (

        <>

            <Button
                // aria-describedby={id}

                // className='ml-5 mr-5 '
                className='m-2 '
                size="small"
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
                    <Tab>За квадрат</Tab>
                    <Tab>За квартиру</Tab>
                </TabList>

                <hr />
                <TabPanel value={0} className='mb-3'>
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
                                    {positions_town_price_per_meter_values.map(function (item, index) {
                                        // console.log(item)
                                        return (

                                            <TableCell sx={{ width: 100 }} key={Math.random(0, 100000) + "_positions_town_price_per_meter" + index}>{(item?.pos || null) + "% / " + (item?.count || null)}</TableCell>
                                        )
                                    })}
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Округ</TableCell>
                                    {positions_okrug_price_per_meter_values.map(function (item, index) {
                                        return (
                                            <TableCell key={Math.random(0, 100000) + "_positions_okrug_price_per_meter" + index}>{item.pos + "% / " + item.count}</TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Район</TableCell>
                                    {positions_district_price_per_meter_values.map(function (item, index) {
                                        return (
                                            <TableCell key={Math.random(0, 100000) + "_positions_district_price_per_meter" + index}>{item.pos + "% / " + item.count}</TableCell>
                                        )
                                    })}
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>

                </TabPanel>

                <TabPanel className='mb-3' value={1}>

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
                                                    return (<p  key={'1_head_' + index + item}
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

                                            <TableCell sx={{ width: 100 }} key={Math.random(0, 100000) + "_positions_town_price" + index}>{(item?.pos || null) + "% / " + (item?.count || null)}</TableCell>
                                        )
                                    })}
                                </TableRow>

                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Округ</TableCell>
                                    {positions_okrug_price_values.map(function (item, index) {
                                        return (
                                            <TableCell key={Math.random(0, 100000) + "_positions_okrug_price" + index}>{item.pos + "% / " + item.count}</TableCell>
                                        )
                                    })}
                                </TableRow>
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell>Район</TableCell>
                                    {positions_district_price_values.map(function (item, index) {
                                        return (
                                            <TableCell key={Math.random(0, 100000) + "_positions_district_price" + index}>{item.pos + "% / " + item.count}</TableCell>
                                        )
                                    })}
                                </TableRow>

                            </TableBody>
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