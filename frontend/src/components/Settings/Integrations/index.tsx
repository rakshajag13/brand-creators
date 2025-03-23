import React, { useEffect } from "react";
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from "@mui/material";
import ShopIcon from '@mui/icons-material/Shop';
import CreateShopifyModal from "./CreateShopifyModal";
import { Shop } from "@mui/icons-material";
import { ShopsToolbar } from "./ShopsToolbar";
import { styled } from '@mui/material/styles';

interface Shop { id: number; storeName: string; storeUrl: string; clientId: number; }

const Integrations = () => {
    const [isConnected, setIsConnected] = React.useState(false);
    const [openShoifyModal, setShopifyModal] = React.useState(false);
    const [shops, setShops] = React.useState<Shop[]>([]);


    const connectShopify = () => {
        setShopifyModal(true);
    };
    const disconnectShopify = () => {
        setIsConnected(false);
    };
    const getShops = async () => {
        const res = await fetch("http://localhost:4000/api/shop/17");
        const data = await res.json();
        console.log(data);
        setShops(data);
    }
    const onClose = () => {
        getShops();
        setShopifyModal(false)
    }
    useEffect(() => {
        getShops();
    }, [])

    return (
        // <Card style={{
        //     width: "30%", height: "250px"
        // }}>
        //     <ShopsToolbar
        //         onCreateShop={() => setShopifyModal(true)}
        //     />
        //     < CardContent >
        //         {!shops.length ? (
        //             <Button
        //                 style={{ color: "white", backgroundColor: "black" }}
        //                 variant="contained"
        //                 startIcon={<ShopIcon />}
        //                 onClick={connectShopify}
        //             >
        //                 Connect Shopify Store
        //             </Button>
        //         ) : (

        //             shops.map(shop => {
        //                 return (
        //                     <Stack direction="row" spacing={2} style={{ width: "100%", display: "flex", gap: "1.5rem", alignItems: "center", justifyContent: "space-between", flexDirection: "column" }}>
        //                         <Typography>Store: {shop.storeName}</Typography>
        //                         <Chip label="Connected" color="success" />
        //                         <Button variant="outlined" onClick={disconnectShopify}>
        //                             Disconnect
        //                         </Button>
        //                     </Stack>
        //                 );
        //             })

        //         )}
        //     </CardContent >
        //     <CreateShopifyModal
        //         open={openShoifyModal}
        //         onClose={onClose} />

        // </Card >
        <Card sx={{ width: "30%", height: "250px", p: 2 }}>
            {/* Align ShopsToolbar to the right */}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <ShopsToolbar onCreateShop={() => setShopifyModal(true)} />
            </Box>

            <CardContent>
                {!shops.length ? (
                    <Button
                        sx={{ color: "white", backgroundColor: "black" }}
                        variant="contained"
                        startIcon={<ShopIcon />}
                        onClick={connectShopify}
                    >
                        Connect Shopify Store
                    </Button>
                ) : (
                    shops.map((shop) => (
                        <Stack
                            key={shop.id} // Add a unique key
                            direction="column"
                            spacing={2}
                            sx={{ width: "100%", gap: "1.2rem", alignItems: "center" }}
                        >
                            <Typography>Store: {shop.storeName}</Typography>
                            <Chip label="Connected" color="success" />
                            <Button variant="outlined" onClick={disconnectShopify}>
                                Disconnect
                            </Button>
                        </Stack>
                    ))
                )}
            </CardContent>

            <CreateShopifyModal open={openShoifyModal} onClose={onClose} />
        </Card>

    )

}

export default Integrations;