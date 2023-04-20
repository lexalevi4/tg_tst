import AppBar from "@mui/material/AppBar";

import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";


import CloseIcon from '@mui/icons-material/Close';
import { shallowEqual, useSelector } from "react-redux";
import FlatListMu from "./FlatListMu";

const MapFlatsModal = function ({ map_flats_modal_open, handleMapFlatsModal, dispatch }) {

    const data = useSelector(state => state.mapFlats.app_params.map_flats, shallowEqual);
    const status = useSelector(state => state.mapFlats.app_params.map_flats_status, shallowEqual);

    if (!map_flats_modal_open) {
        return (<></>)
    }

    var loading = false;
    if (status === 'pending') {
        loading = true;
    }

    // console.log(loading)
    return (
        <Dialog
            fullScreen
            open={map_flats_modal_open}
            onClose={handleMapFlatsModal}
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
                </Paper>
            </Box>
        </Dialog>
    );
}

export default MapFlatsModal;