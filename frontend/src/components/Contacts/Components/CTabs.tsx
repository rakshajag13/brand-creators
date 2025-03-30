import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import ContactList from "./Contacts/ContactList";

const tabNames = ["Contacts", "Groups"];


export const CTabs = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
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
                    value === 0 && <ContactList />
                }
                {/* {
                    value === 1 && <Groups />
                } */}

            </Box>
        </div>
    )
}

export default CTabs;