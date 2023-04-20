// import { Box, FormControl, InputLabel, NativeSelect } from "@mui/material";

import  Box  from "@mui/material/Box";
import  FormControl  from "@mui/material/FormControl";
import  InputLabel  from "@mui/material/InputLabel";
import  NativeSelect  from "@mui/material/NativeSelect";



import { useMemo } from "react";




function MyNativeSelect({ name, label, value, values, handleChangeSelect }) {
    return (
        useMemo(() => {
            return (
                <>
                    {/* <FormControl variant="standard" sx={{ width: '100%' }} > */}

                    <Box>
                        <InputLabel
                        // component="h2"
                        style={{
                            position:"relative",
                            display:'inline',
                            // left:null
                        }}
                        
                            // className="content-center"
                            
                            id={name + "-standard-label"}>{label}</InputLabel>
                        <FormControl variant="standard" sx={{ width: '90%' }} >
                            
                            {/* </FormControl> */}

                            <NativeSelect
                                // native
                                // labelId={name + "-select-standard-label"}
                                id={name + "-select-standard"}
                                name={name}
                                placeholder={label}
                                value={value}
                                onChange={handleChangeSelect}
                                label={label}
                                // renderValue={
                                //     value !== 0 ? undefined : <em>Placeholder</em>
                                // }
                            // multiple
                            >
                                {/* <option key={0} value={0}>
                                    {' '}
                                </option> */}
                                {
                                    values.map(function (type) {
                                        return (
                                            <option key={type.val} value={type.val}>
                                                {type.title}
                                            </option>
                                        )
                                    })
                                }
                            </NativeSelect>
                        </FormControl>
                    </Box>
                </>
            )
        }, [value])

    );
}

export default MyNativeSelect;