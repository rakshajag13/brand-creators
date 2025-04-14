import React, { useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
    Divider,
} from "@mui/material";
import ShopIcon from "@mui/icons-material/Shop";
import CreateShopifyModal from "./CreateShopifyModal";
import { ShopsToolbar } from "./ShopsToolbar";
import "./Integrations.css"; // Import the CSS file

interface Shop {
    id: number;
    storeName: string;
    storeUrl: string;
    clientId: number;
    apiKey: string;
    apiSecret: string;
    accessToken: string;
    createdAt: Date;
    updateAt: Date;
}
type ConnectionStatus = "Connected" | "Disconnected" | "InProgress";

const Integrations = () => {
    const [isConnected, setIsConnected] =
        React.useState<ConnectionStatus>("Disconnected");
    const [openShopifyModal, setShopifyModal] = React.useState(false);
    const [shops, setShops] = React.useState<Shop[]>([]);

    const connectShopify = () => {
        setShopifyModal(true);
    };
    const disconnectShopify = (shop: Shop) => {
        deleteShopById(shop.id);
        setIsConnected("Disconnected");
    };
    const getShops = async () => {
        const res = await fetch(`http://localhost:4000/api/shops`, { credentials: "include" });
        const data = await res.json();
        setShops(data);
    };

    const deleteShopById = async (shopId: number) => {
        await fetch(`http://localhost:4000/api/shops/${shopId}`, {
            method: "DELETE",
            credentials: "include",
        });
        getShops();
    };
    const setShopStatus = React.useCallback(() => {
        const [shop] = shops;
        if (!shop) {
            setIsConnected("Disconnected");
            return;
        }
        shop.apiKey && shop.apiSecret && shop.accessToken
            ? setIsConnected("Connected")
            : setIsConnected("InProgress");
    }, [shops]);

    const onClose = () => {
        getShops();
        setShopifyModal(false);
    };
    useEffect(() => {
        getShops();
    }, []); // Only run once when the component mounts

    useEffect(() => {
        setShopStatus();
    }, [shops, setShopStatus]); // Runs only when shops or setShopStatus change

    const ShopStatusChip = React.memo(() => {
        if (isConnected === "Connected") {
            return <Chip label="Connected" color="success" />;
        } else if (isConnected === "Disconnected") {
            return <Chip label="Disconnected" color="error" />;
        } else {
            return <Chip label="In Progress" color="warning" />;
        }
    });

    return (
        <Card className="integrations-card">
            <CardContent>
                {!shops.length ? (
                    <Box className="no-shops-box">
                        <Typography variant="h6" className="no-shops-text">
                            No shops connected yet
                        </Typography>
                        <Button
                            className="connect-shopify-button"
                            variant="contained"
                            startIcon={<ShopIcon />}
                            onClick={connectShopify}
                        >
                            Connect Shopify
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Box className="connected-shops-header">
                            <Typography variant="h5" className="connected-shops-title">
                                Connected Shops
                            </Typography>
                            <ShopsToolbar onCreateShop={() => setShopifyModal(true)} />
                        </Box>
                        <Divider className="divider" />
                        <Stack spacing={3}>
                            {shops.map((shop) => (
                                <Card key={shop.id} className="shop-card">
                                    <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Box>
                                            <Typography variant="h6" className="shop-name">
                                                {shop.storeName}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                className="shop-url"
                                            >
                                                {shop.storeUrl}
                                            </Typography>
                                            <ShopStatusChip />
                                        </Box>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() => disconnectShopify(shop)}
                                        >
                                            Disconnect
                                        </Button>
                                    </Stack>
                                </Card>
                            ))}
                        </Stack>
                    </>
                )}
            </CardContent>
            <CreateShopifyModal open={openShopifyModal} onClose={onClose} />
        </Card>
    );
};

export default Integrations;
