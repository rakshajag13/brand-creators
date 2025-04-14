import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import Integrations from "./Integrations";

export const Settings = () => {
    const [value, setValue] = React.useState(0);

    const tabNames = ["Integrations", "Socials"];
    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        // <TabComponent />
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        {
                            tabNames.map((tabName) => <Tab label={tabName} key={tabName} />)
                        }
                    </Tabs>
                </Box>
                {
                    value === 0 && <Integrations />
                }

            </Box>
        </div>
        // <Integrations />

    )
}

