import { TableCell, TableRow, Button, useTheme } from "@mui/material";
import { useDispatch } from "react-redux";
import { getStatPlot, stopStatPlot } from "saga/actions";
import { updateAppParam } from "store/MapFlatsSlice";
// import { Button } from "react-bootstrap";
import PositionsTable from "./PositionsTable";



// const getReportPlotData = (state) => state.mapFlats.app_params.report_plot




const PositionsTableRow = function ({ row, row_index, cols, nested = false, plot_data = {}, current_x = null }) {



    const dispatch = useDispatch();

    const statPlotHandler = function (e) {
        // console.log(JSON.parse(e.target.dataset.onclickparam))

        dispatch(updateAppParam({field:'stat_plot_request',value:JSON.parse( e.target.dataset.onclickparam)}))
        console.log(1)
        dispatch(getStatPlot)
        console.log(2)

    }

    
    
const getCellContent = function (cell, index, active = false, row_data = {}, nested) {


    // stopStatPlot
        // active ? <b>{{ cell }}</b> : cell
    
        // console.log(row_data)
        if (index === 0) {
            const value = cell;
            if (active) {
    
                // cell = (
                //     // <b>
                //         {cell}
                //     {/* </b> */}
                // )
            }
            return (
                <Button
    
                    // disabled={cell_index > 0}
    
                    // style={{
                    //     color: color
                    // }}
                    sx={{
                        minWidth:0
                    }}
                    style={{
                        textTransform: 'none',
                        fontWeight: active ? 'bold' : null,
                        minWidth:0
    
                    }}
                    className='p-0'
                    size="small"
                    onClick={statPlotHandler}
                    data-onclickparam={JSON.stringify(
                        {
                            x: row_data.plot_data.x,
                            hue: row_data.plot_data.hue,
                            dataset: row_data.plot_data.dataset,
                            param: row_data.plot_data.param,
                            value: cell,
                            districts: row_data.plot_data.districts,
                            okrugs: row_data.plot_data.okrugs,
                            rooms: row_data.plot_data.rooms,
                            current_x: row_data.current_x,
                        }
                    )
                    }
                >
                    {
                        cell
                    }
                </Button>
            )
        }
    
        if (index === 2) {
            return cell + '%'
        }
        if (index < 3) {
            return cell
        }
        return Intl.NumberFormat('ru-RU', {
            style: 'currency',
            currency: 'RUB',
            currencyDisplay: 'symbol', maximumFractionDigits: 0
        }).format(cell)
    
    
    }


    // const theme = useTheme()
    // console.log(theme.palette)
    // const link_color = theme.palette.primary.main
    // console.log(link_color)

    const row_data = {
        current_x: current_x,
        plot_data: plot_data
    }

    return (

        <>

            <TableRow>
                {
                    row.row.map(function (cell, cell_index) {
                        return (
                            <TableCell
                                // align="left"
                                sx={{
                                    // alignContent: 'flex-start',
                                    minWidth: null,
                                    // alignItems:'flex-start',
                                    fontWeight: row.active === 1 ? "bold" : ""
                                }}

                                key={'cell' + row_index + '_' + cell_index}>

                                {
                                    getCellContent(cell, cell_index, row.active, row_data, nested)
                                }
                            </TableCell>
                        )
                    })
                }
            </TableRow>
            {
                row.child && (
                    <TableRow

                        key={'second_row_' + row_index}>
                        <TableCell key={'second_row_cell' + row_index + '_'}
                            colSpan={9}
                        >
                            <PositionsTable data={row.child} cols={cols} nested={true} current_x={row.row[0]} />
                        </TableCell>
                    </TableRow>
                )

            }


        </>
    );
}

export default PositionsTableRow;