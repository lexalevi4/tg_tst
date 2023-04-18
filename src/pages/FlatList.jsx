import { useGetFlatsQuery } from "../store/PyxiApi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateSearch } from "store/MapFlatsSlice";
import { useEffect } from "react";
import { lazy } from "react";

// import FlatListMu from "compontents/FlatListMu";
const FlatListMu = lazy(() => import('compontents/FlatListMu'));

const FlatList = function () {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateSearch({ field: 'update', value: Date.now() }))
    }, [])
    const search = useSelector(state => state.mapFlats.search, shallowEqual);
    const { data, isLoading, isFetching } = useGetFlatsQuery(search)

    var loading = false
    if (isLoading || isFetching){
        loading = true
    }

    return (
        <FlatListMu data={data}  isLoading={loading} dispatch={dispatch} page={search.page}/>
    )
}
export default FlatList;