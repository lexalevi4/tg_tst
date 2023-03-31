import { useGetFlatsQuery } from "../store/PyxiApi";
import FlatCardMu from "../compontents/FlatCardMu";

// import { retry } from "@reduxjs/toolkit/query";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Paper } from "@mui/material";
// import { useState } from "react";
import { updateSearch } from "store/MapFlatsSlice";
import Loading from "compontents/Loading";


const FlatList = function ({ handlePriceDescModal }) {

    const search = useSelector(state => state.mapFlats.search);
    const { data, isLoading } = useGetFlatsQuery(search)

    const dispatch = useDispatch();
    const handlePage = (event, value) => {
        dispatch(updateSearch({ field: 'page', value: value }))
        window.scrollTo(0, 0)
    }


    if (isLoading) {

        return (<Loading />)
    }

    return (
        <>
            <Paper
                key={'flat_list'}
            >
                {
                    data.flats.map(function (flat) {

                        return (<FlatCardMu handlePriceDescModal={handlePriceDescModal} key={'flat_card_' + flat.id} flat={flat} />)
                    })
                }
            </Paper>
            <Paper            >



                <Pagination
                    className="mt-5 py-2"

                    count={Math.ceil(data.total_count / 10)} page={search.page}
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