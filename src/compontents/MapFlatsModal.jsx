import { AppBar, Box, Dialog, IconButton, Paper, Toolbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { shallowEqual, useSelector } from "react-redux";
import MapFlatsContent from "./MapFlatsContent";
import FlatListMu from "./FlatListMu";


const MapFlatsModal = function ({ map_flats_modal_open, handleMapFlatsModal, dispatch }) {

    const data = useSelector(state => state.mapFlats.app_params.map_flats, shallowEqual);
    const status = useSelector(state => state.mapFlats.app_params.map_flats_status, shallowEqual);

    // const data = {
    //     flats: [],
    //     total_count: 0
    // }


    // console.log(data)


    if (!map_flats_modal_open) {
        return (<></>)
    }


    var loading = false;
    if (status === 'pending') {
        loading = true;
    }


    console.log(loading)
    // console.log(data)
    // console.log(data)

    return (
        <Dialog
            fullScreen
            open={map_flats_modal_open}
            // keepMounted
            onClose={handleMapFlatsModal}
        // TransitionComponent={Transition}
        >
            <AppBar sx={{ position: 'relative' }}>
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={handleMapFlatsModal}
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                </Toolbar>
            </AppBar>
            <Box>
                <Paper
                    className='m-3 p-2'
                >
                    <FlatListMu
                        data={data}
                        isLoading={loading}
                        page={1}
                        dispatch={dispatch}
                        per_page={data.total_count}

                    />
                    {/* <MapFlatsContent status={status} flats={flats}/> */}

                </Paper>
               
            </Box>
        </Dialog>

    );
}

export default MapFlatsModal;