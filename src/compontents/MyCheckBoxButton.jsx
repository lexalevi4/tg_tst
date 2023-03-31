import { Button } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { updateSearch } from "store/MapFlatsSlice";

function MyCheckboxButton({ item, state, name }) {


    const dispatch = useDispatch()

    const checked = useMemo(
        () => {
            return state.includes(item.val)
        }, [state, item]
    )


    const handleUpdateCheckbox =
        useCallback(
            (e) => {
                console.log(JSON.parse(e.target.dataset.onclickparam));
                let data = JSON.parse(e.target.dataset.onclickparam);
                let arr = [];
                state.map(function (item) {
                    arr.push(item);
                    return true;
                })
                if (arr.includes(data.value)) {
                    arr.splice(arr.indexOf(data.value), 1)
                } else {
                    if (data.reset) {
                        arr = [data.value]
                    } else {
                        arr.push(data.value)
                    }
                }
                dispatch(updateSearch({ field: data.name, value: arr }))
            }, [state])



    return (
        useMemo(
            () => {
                return (
                    < Button
                        size="small"
                        onClick={handleUpdateCheckbox}
                        // {JSON.stringify({ value: item.val, field: 'cat' })}
                        data-onclickparam={JSON.stringify({ value: item.val, name: name, reset: false })}
                        variant={checked ? 'contained' : 'outlined'}
                    > {item.title}
                    </Button>
                )
            },
            [checked]
        )
    );
}

export default MyCheckboxButton;