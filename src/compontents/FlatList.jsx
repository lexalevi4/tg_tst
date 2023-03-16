import React from 'react'
import {useSelector} from "react-redux";
import FlatCard from "./FlatCard";

const FlatList = function () {
    const flats = useSelector(state => state.mapFlats);
    if (flats.status === "loading") {
        return (
            <h2>Loaling</h2>
        )
    }

    if (flats.status === "rejected") {
        return (
            <h2>Error</h2>
        )
    }

    return (
        <>
            {
                flats.flats.map((flat) => (
                    <FlatCard key={flat.id} flat={flat}/>
                ))
            }
        </>
    )
}


export default FlatList