import React from "react";
import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import ShopIcon from '@mui/icons-material/Shop';



const Integrations = () => {
    const [isConnected, setIsConnected] = React.useState(false);
    const storeName = "test";
    const connectShopify = () => {
        setIsConnected(true);
    };
    const disconnectShopify = () => {
        setIsConnected(false);
    };

    return (<Card style={{
        width: "30%", height: "250px"
    }}>
        < CardContent >
            <Typography variant="h6">Shopify Integration</Typography>
            {!isConnected ? (
                <Button
                    style={{ color: "white", backgroundColor: "black" }}
                    variant="contained"
                    startIcon={<ShopIcon />}
                    onClick={connectShopify}
                >
                    Connect Shopify Store
                </Button>
            ) : (
                <Stack spacing={2}>
                    <Chip label="Connected" color="success" />
                    <Typography>Store: {storeName}</Typography>
                    <Button variant="outlined" onClick={disconnectShopify}>
                        Disconnect
                    </Button>
                </Stack>
            )}
        </CardContent >
    </Card >)

}

export default Integrations;