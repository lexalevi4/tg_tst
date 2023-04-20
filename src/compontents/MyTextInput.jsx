// import { TextField } from "@mui/material";
import { useMemo } from "react";
import  TextField  from "@mui/material/TextField";

function MyTextInput({ handleTextInput, name, value, label }) {
    return (
        useMemo(
            () => {
                return (
                    <TextField
                        className="mx-1"
                        onChange={handleTextInput}
                        name={name}
                        value={value}
                        id={name + "iput"}
                        label={label}
                        variant="standard"
                    />
                )
            },
            [value]
        )
    );
}

export default MyTextInput;