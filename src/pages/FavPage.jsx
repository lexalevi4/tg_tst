import { useGetFavQuery, useGetFlatsQuery } from "../store/PyxiApi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateAppParam, updateSearch } from "store/MapFlatsSlice";
import { useEffect } from "react";
import { lazy } from "react";

// import FlatListMu from "compontents/FlatListMu";
const FlatListMu = lazy(() => import('compontents/FlatListMu'));

const FavPage = function () {
    const dispatch = useDispatch();



    useEffect(() => {
        dispatch(updateSearch({ field: 'update', value: Date.now() }))
        dispatch(updateAppParam({ field: 'stat_plot_open', value: false }))
        dispatch(updateAppParam({ field: 'report_plot_open', value: false }))
        dispatch(updateSearch({ field: 'fav_page', value: 1 }))

    }, [dispatch])
    const search = useSelector(state => state.mapFlats.search, shallowEqual);
    const { data, isLoading, isFetching } = useGetFavQuery(search, search.fav_page)

    var loading = false
    if (isLoading || isFetching) {
        loading = true
    }

    return (
        <FlatListMu data={data} isLoading={loading} dispatch={dispatch} page={search.fav_page} fav={true} />
    )
}
export default FavPage;