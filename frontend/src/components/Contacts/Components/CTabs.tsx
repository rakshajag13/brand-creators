import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import ContactList from "./Contacts/ContactList";
import GroupList from "./Groups/GroupList";
import { useTabs } from "hooks/useTabs";

const tabNames = ["Influencers", "Groups"];


export const CTabs = () => {
    const { handleTabChange, activeTab } = useTabs(tabNames);


    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
                        {
                            tabNames.map((tabName) => <Tab label={tabName} key={tabName} />)
                        }
                    </Tabs>
                </Box>
                {
                    activeTab === 0 && <ContactList />
                }
                {
                    activeTab === 1 && <GroupList />
                }

            </Box>
        </div>
    )
}

export default CTabs;