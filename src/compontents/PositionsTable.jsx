import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import PositionsTableRow from "./PositionsTableRow";
import '../css/style.css'
import { useSelector } from "react-redux";



const getReportPlot = (state) => state.mapFlats.app_params.report_plot


function PositionsTable({ cols, data = null, nested = false, current_x = null }) {



    const plot_data = useSelector(getReportPlot);

    if (data === null) {
        return <></>
    }



    const rows = [];
    const mapped = Object.entries(data);
    mapped.map(([k, v]) => {

        rows.push(
            {
                row: [v.name, v.total_count, v.current_position, v.mean, v.min, v.q25, v.q50, v.q75, v.max],
                child: v.full || null,
                active: v.is_active
            }
        )
        return true;
    });
    // let x = null
    if (!nested) {
        cols[0] = plot_data.x_label;
        // x = null
    } else {
        cols[0] = plot_data.hue_label;
        // x = rows.row
    }

    return (

        <Paper
            className={nested ? "p-2 inner-container" : "p-2"}
            sx={{
                display: 'flex',
                // gridArea={cu},

                // height:500,
                overflowX: 'auto',
                overflowY: 'auto'

            }}
        >
            <TableContainer>
                <Table sx={{
                    width: 'max-content'
                }}
                    size={nested ? "small" : "medium"} >
                    <TableHead>
                        <TableRow>
                            {
                                cols.map(function (col, index) {
                                    return (
                                        <TableCell key={'head_' + index}>
                                            {col}
                                        </TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(function (row, row_index) {
                                return (
                                    <PositionsTableRow
                                        nested={nested}
                                        plot_data={plot_data}
                                        current_x={current_x}
                                        cols={cols}
                                        row={row}
                                        row_index={row_index}
                                        key={'PositionsTableRow_' + row_index}
                                    />
                                    // < 

                                    // >
                                    //     <TableRow


                                    //         key={'main_row_' + row_index}>
                                    //         {
                                    //             row.row.map(function (cell, cell_index) {
                                    //                 return (
                                    //                     <TableCell
                                    //                         sx={{
                                    //                             fontWeight: row.active === 1 ? "bold" : ""
                                    //                         }}

                                    //                         key={'cell' + row_index + '_' + cell_index}>
                                    //                         {
                                    //                             getCellContent(cell, cell_index)
                                    //                         }
                                    //                     </TableCell>
                                    //                 )
                                    //             })
                                    //         }
                                    //     </TableRow>

                                    //     <TableRow

                                    //         key={'second_row_' + row_index}>
                                    //         <TableCell key={'second_row_cell' + row_index + '_'}
                                    //             colSpan={9}
                                    //         >
                                    //             вложенная
                                    //         </TableCell>
                                    //     </TableRow>

                                    // </>
                                )
                            })
                        }
                    </TableBody>
                </Table>

            </TableContainer>
        </Paper >
    );
}

export default PositionsTable;