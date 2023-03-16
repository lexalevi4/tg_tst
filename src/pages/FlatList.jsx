import {useGetFlatsQuery} from "../store/PyxiApi";
import FlatCard from "../compontents/FlatCard";
import {Container, Row} from "react-bootstrap";
import {retry} from "@reduxjs/toolkit/query";
import {useSelector} from "react-redux";

const FlatList = function () {


    const search = useSelector(state => state.mapFlats.search);
    const {data, isError, isLoading} = useGetFlatsQuery(search)
    // console.log(flats);

    if (isLoading) {

        return (<h1>Loading</h1>)
    }
    console.log(data);

    return (
        <Container>

            {

                data.map(function (flat) {

                    return (<Row key={flat.id}> <FlatCard flat={flat}/></Row>)

                })
            }
        </Container>

    )

}

export default FlatList;