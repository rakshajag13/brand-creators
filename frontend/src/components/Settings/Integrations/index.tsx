import React, { useEffect } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Stack,
    Typography,
} from "@mui/material";
import ShopIcon from "@mui/icons-material/Shop";
import CreateShopifyModal from "./CreateShopifyModal";
import { ShopsToolbar } from "./ShopsToolbar";

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
    const [openShoifyModal, setShopifyModal] = React.useState(false);
    const [shops, setShops] = React.useState<Shop[]>([]);

    const connectShopify = () => {
        setShopifyModal(true);
    };
    const disconnectShopify = (shop: Shop) => {
        deleteShopById(shop.id);
        setIsConnected("Disconnected");
    };
    const getShops = async () => {
        const res = await fetch("http://localhost:4000/api/shops/17");
        const data = await res.json();
        console.log(data);
        setShops(data);
    };

    const deleteShopById = async (shopId: number) => {
        await fetch(`http://localhost:4000/api/shops/${shopId}`, {
            method: "DELETE",
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

    const ShopstatusChip = React.memo(() => {
        if (isConnected === "Connected") {
            return <Chip label="Connected" color="success" />;
        } else if (isConnected === "Disconnected") {
            return <Chip label="Disconnected" color="error" />;
        } else {
            return <Chip label="In Progress" color="warning" />;
        }
    });
    return (
        <Card sx={{
            p: 3,
            m: 2,
            borderRadius: "12px",
            boxShadow: 3,
            backgroundColor: "white",
            width: "360px",
        }}>
            <CardContent>
                {!shops.length ? (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                    >
                        <Button
                            sx={{
                                color: "white",
                                backgroundColor: "black",
                                "&:hover": { backgroundColor: "grey.800" }
                            }}
                            variant="contained"
                            startIcon={<ShopIcon />}
                            onClick={connectShopify}
                        >
                            Connect
                        </Button>
                    </Box>
                ) : (
                    <>
                        {/* Align ShopsToolbar to the right */}
                        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                            <ShopsToolbar onCreateShop={() => setShopifyModal(true)} />
                        </Box>

                        <Stack spacing={3} alignItems="center">
                            {shops.map((shop) => (
                                <Card key={shop.id} sx={{ p: 2, width: "100%", maxWidth: 400, boxShadow: 2 }}>
                                    <Stack
                                        direction="column"
                                        spacing={1.5}
                                        alignItems="center"
                                    >
                                        <Typography>Store: {shop.storeName}</Typography>
                                        <ShopstatusChip />
                                        <Button variant="outlined" onClick={() => disconnectShopify(shop)}>
                                            Disconnect
                                        </Button>
                                    </Stack>
                                </Card>
                            ))}
                        </Stack>
                    </>
                )}
            </CardContent>
            <CreateShopifyModal open={openShoifyModal} onClose={onClose} />
        </Card>

    );
};

export default Integrations;