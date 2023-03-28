import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React, {  useMemo } from "react";

function DistrictCheckbox({ district, handleClick, districts }) {

    const checked = useMemo(
        () => {
            return districts.includes(district.id)
        }, [districts,district]
    )

    return (
        useMemo(() => (
            <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                {console.log('district_checkbox')}
                <FormControlLabel
                    label={district.name}
                    control={
                        <Checkbox
                            data-onclickparam={district.id}
                            checked={checked}
                            value={district.id}
                            onChange={handleClick}
                        />
                    }
                />
            </Box>

        ), [checked,district]))
}

export default DistrictCheckbox;