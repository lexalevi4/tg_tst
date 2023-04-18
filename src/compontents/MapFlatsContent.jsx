import { Typography } from "@mui/material";
import Loading from "./Loading";

function MapFlatsContent({ flats, status }) {

    if (status === 'pending') {
        return (
            <Loading />
        )
    }
    return (
        <>
            <Typography>
                Тут будут хаты


            </Typography>
        </>



    );
}

export default MapFlatsContent;