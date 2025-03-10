import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { shopifySchema } from 'components/schemas/shopify.schema';
import { ShopifyData } from 'types/shopify';

interface CreateShopifyModalProps {
    open: boolean;
    onClose: () => void;
    onShopifyConnection: ({ storeName, status }: { storeName: string, status: string }) => void;
}

const CreateShoifyModal = ({ open, onClose, onShopifyConnection }: CreateShopifyModalProps) => {
    const handleOnSubmit = (data: ShopifyData) => {
        console.log(data);
        onShopifyConnection({ storeName: data.storeName, status: "connected" });
        onClose();
        reset();
    };
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ShopifyData>({
        resolver: zodResolver(shopifySchema),
        mode: "onSubmit",
        defaultValues: {
            storeName: "",
            storePublicUrl: "",
            storeShopifyUrl: ""
        },
    });

    return (

        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Connect to Shopify</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <Controller
                        name='storeName'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoFocus
                                label="Name of Store"
                                fullWidth
                                variant="standard"
                                error={!!errors.storeName}
                                helperText={errors.storeName?.message}
                            />
                        )}
                    />
                    <Controller
                        name='storePublicUrl'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoFocus
                                placeholder='https://www.test.com'
                                label="Public Url"
                                fullWidth
                                variant="standard"
                                error={!!errors.storePublicUrl}
                                helperText={errors.storePublicUrl?.message}
                            />
                        )}
                    />
                    <Controller
                        name='storeShopifyUrl'
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                autoFocus
                                placeholder='shop.myshpify.com'
                                label="Shopify Url"
                                fullWidth
                                variant="standard"
                                error={!!errors.storeShopifyUrl}
                                helperText={errors.storeShopifyUrl?.message}
                            />
                        )}
                    />
                    <DialogActions>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button type="submit">Connect</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}


export default CreateShoifyModal;
