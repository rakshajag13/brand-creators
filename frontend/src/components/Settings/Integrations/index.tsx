import React from "react";
import { Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import ShopIcon from '@mui/icons-material/Shop';
import CreateShopifyModal from "./CreateShopifyModal";

const Integrations = () => {
    const [isConnected, setIsConnected] = React.useState(false);
    const [openShoifyModal, setShopifyModal] = React.useState(false);
    const [storeName, setStoreName] = React.useState("");

    const connectShopify = () => {
        setShopifyModal(true);
    };
    const disconnectShopify = () => {
        setIsConnected(false);
    };

    const onShopifyConnection = ({ storeName, status }: { storeName: string, status: string }) => {
        setStoreName(storeName);
        setIsConnected(true);
    }
    return (<Card style={{
        width: "30%", height: "250px"
    }}>
        < CardContent >
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
        <CreateShopifyModal
            open={openShoifyModal}
            onClose={() => setShopifyModal(false)}
            onShopifyConnection={onShopifyConnection} />
    </Card >)

}

export default Integrations;