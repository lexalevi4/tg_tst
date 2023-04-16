import { useSelector } from "react-redux";
import { action } from "store";
import { updateAppParam, updateSearch } from "store/MapFlatsSlice";
import Loading from "./Loading";
import NotFound from "./NotFound";
import { Pagination, Paper, Typography } from "@mui/material";
import FlatCardMu from "./FlatCardMu";
import PriceDescModal from "./PriceDescModal";
import ReportPlotModal from "./ReportPlotModal";


function FlatListMu({ data, isFetching, isLoading, dispatch, search }) {
    const per_page = 10;

    const handlePage = (event, value) => {
        dispatch(updateSearch({ field: 'page', value: value }))
        window.scrollTo(0, 0)
    }

    const price_desc_modal_open = useSelector(state => state.mapFlats.app_params.price_desc_modal_open);

    const cancelGetReportPlot = () => { action('CancelGetReportPlot') };
    const handleReportPlotClose = () => {
        dispatch(updateAppParam({ field: 'report_plot_open', value: false }))
        dispatch(cancelGetReportPlot)
        dispatch(updateAppParam({ field: 'report_plot', value: { id: Math.random(), status: 'none' } }))

    };

    const handlePriceDescModal = () => {
        dispatch(updateAppParam({ field: 'price_desc_modal_open', value: !price_desc_modal_open }))
    }


    if (isLoading || isFetching) {

        return (<Loading />)
    }

    if (data.flats.length === 0) {
        return (<NotFound />)
    }

    return (
        <>
            <Paper
                key={'flat_list'}
            >
                <Paper
                    className="p-2 text-right"
                >
                    <Typography variant="body2" color="text.secondary">
                        Показано: {(((search.page - 1) * per_page) + 1)}- {(((search.page - 1) * per_page) + data.flats.length)} из {data.total_count}
                    </Typography>
                </Paper>
                {
                    data.flats.map(function (flat) {

                        return (<FlatCardMu handlePriceDescModal={handlePriceDescModal} key={'flat_card_' + flat.id} flat={flat} />)
                    })
                }
            </Paper>
            <Paper            >
                <Pagination
                    className="mt-5 py-2"

                    count={Math.ceil(data.total_count / per_page)} page={search.page}
                    onChange={handlePage}
                />
                <div
                    style={{
                        marginBottom: 80
                    }}
                >
                </div>
            </Paper>



            <PriceDescModal
                keepMounted={true}
                price_desc_modal_open={price_desc_modal_open}
                handlePriceDescModal={handlePriceDescModal}
            // Transition={Transition}
            />
            <ReportPlotModal
                keepMounted={true}
                handleReportPlotClose={handleReportPlotClose}
            // Transition={Transition}
            />
        </>
    )
}



export default FlatListMu;