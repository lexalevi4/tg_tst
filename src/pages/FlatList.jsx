import { useGetFlatsQuery } from "../store/PyxiApi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateSearch } from "store/MapFlatsSlice";
import { useEffect } from "react";
import FlatListMu from "compontents/FlatListMu";

const FlatList = function () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateSearch({ field: 'update', value: Date.now() }))
    }, [])
    const search = useSelector(state => state.mapFlats.search, shallowEqual);
    const { data, isLoading, isFetching } = useGetFlatsQuery(search)
    return (
        <FlatListMu data={data} isFetching={isFetching} isLoading={isLoading} dispatch={dispatch} search={search}/>
    )
}
export default FlatList;