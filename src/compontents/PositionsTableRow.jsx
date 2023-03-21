import { TableCell, TableRow } from "@mui/material";
import PositionsTable from "./PositionsTable";


const getCellContent = function (cell, index) {
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

const PositionsTableRow = function ({ row, row_index, cols }) {

    // console.log(row.child)
    return (

        <>

            <TableRow>
                {
                    row.row.map(function (cell, cell_index) {
                        return (
                            <TableCell
                                sx={{
                                    fontWeight: row.active === 1 ? "bold" : ""
                                }}

                                key={'cell' + row_index + '_' + cell_index}>
                                {
                                    getCellContent(cell, cell_index)
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
                            <PositionsTable data={row.child} cols={cols} nested={true} />
                        </TableCell>
                    </TableRow>
                )

            }


        </>
    );
}

export default PositionsTableRow;