import { FormControl, InputLabel, Select } from "@mui/material";
import { useMemo } from "react";

function MyMultiSelect({ name, label, value, values, handleChangeMultiple }) {
    return (
        useMemo(() => {
            return (
                <>
                    {/* <FormControl variant="standard" sx={{ width: '100%' }} > */}

                        <InputLabel id={name + "-standard-label"}>{label}</InputLabel>
                    {/* </FormControl> */}
                    <FormControl variant="standard" sx={{ width: '100%' }} >
                        <Select
                            native
                            labelId={name + "-select-standard-label"}
                            id={name + "-select-standard"}
                            name={name}
                            value={value}
                            onChange={handleChangeMultiple}
                            label={label}
                            multiple
                        >
                            {
                                values.map(function (type) {
                                    return (
                                        <option key={type.val} value={type.val}>
                                            {type.title}
                                        </option>
                                    )
                                })
                            }
                        </Select>
                    </FormControl>

                </>
            )
        }, [value])

    );
}

export default MyMultiSelect;