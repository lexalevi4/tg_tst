import { useGetFlatsQuery } from "../store/PyxiApi";
import FlatCardMu from "../compontents/FlatCardMu";

// import { retry } from "@reduxjs/toolkit/query";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Pagination, Paper, Typography } from "@mui/material";
// import { useState } from "react";
import { updateSearch } from "store/MapFlatsSlice";
import Loading from "compontents/Loading";
import { useEffect } from "react";
import NotFound from "compontents/NotFound";


const FlatList = function ({ handlePriceDescModal }) {



    const per_page = 11;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateSearch({ field: 'update', value: Date.now() }))
    }, [])

    const search = useSelector(state => state.mapFlats.search, shallowEqual);
    const { data, isLoading, isFetching } = useGetFlatsQuery(search)

    const handlePage = (event, value) => {
        dispatch(updateSearch({ field: 'page', value: value }))
        window.scrollTo(0, 0)
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
        </>
    )
}



export default FlatList;