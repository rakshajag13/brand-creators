// import React from "react";
// import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid2, Link, styled, TextField, Typography } from "@mui/material";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { CreateContact } from "types/auth";
// import { zodResolver } from "@hookform/resolvers/zod";

// const FormContainer = styled(Box)({
//     width: '100%',
//     maxWidth: 400,
//     display: 'flex',
//     flexDirection: 'column',
//     gap: '1rem',
//     padding: '2rem',
//     boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//     borderRadius: '8px',
//     backgroundColor: '#fff',
// });
// interface CreateContactModalProps {
//     open: boolean;
//     onSubmit: () => void;
// }

// export const contactSchema = z.object({
//     email: z.string().email('Invalid email format'),
//     firstName: z.string().min(2, 'First name must be at least 2 characters'),
//     lastName: z.string().min(2, 'Last name must be at least 2 characters'),
//     phone: z.string().optional(),
//     role: z.enum(['ADMIN', 'CLIENT', 'CREATOR']),
// });
// export const CreateContactModal: React.FC<CreateContactModalProps> = (props) => {
//     const { register, handleSubmit, control, formState: { errors } } = useForm<CreateContact>({
//         resolver: zodResolver(contactSchema),
//         mode: "onSubmit",
//         defaultValues: { email: "", firstName: "", lastName: "", phone: "", role: "CREATOR" }
//     });
//     const handleClose = () => {
//         props.onSubmit();
//     }
//     return (
//         <Dialog
//             open={props.open}
//             fullWidth
//             maxWidth="sm"

//         >
//             <DialogTitle style={{ fontWeight: 501 }}>Create Contact</DialogTitle>
//             <DialogContent>
//                 <form onSubmit={handleClose} >
//                     <FormContainer>
//                         <Controller
//                             name="firstName"
//                             control={control}
//                             render={({ field }) => (
//                                 <TextField
//                                     label="First Name"
//                                     variant="outlined"
//                                     fullWidth
//                                     {...field}
//                                     error={!!errors.firstName}
//                                     helperText={errors.firstName?.message}
//                                 />
//                             )}
//                         />

//                         <Controller
//                             name="lastName"
//                             control={control}
//                             render={({ field }) => (
//                                 <TextField
//                                     label="Last Name"
//                                     variant="outlined"
//                                     fullWidth
//                                     {...field}
//                                     error={!!errors.lastName}
//                                     helperText={errors.lastName?.message}
//                                 />
//                             )}
//                         />

//                         <Controller
//                             name="email"
//                             control={control}
//                             render={({ field }) => (
//                                 <TextField
//                                     label="Email"
//                                     variant="outlined"
//                                     fullWidth
//                                     {...field}
//                                     error={!!errors.email}
//                                     helperText={errors.email?.message}
//                                 />
//                             )}
//                         />

//                         <Controller
//                             name="phone"
//                             control={control}
//                             render={({ field }) => (
//                                 <TextField
//                                     label="Phone"
//                                     variant="outlined"
//                                     fullWidth
//                                     {...field}
//                                 />
//                             )}
//                         />


//                     </FormContainer>
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={handleClose}>Cancel</Button>
//                 <Button
//                     type="submit"
//                 >
//                     Create
//                 </Button>
//             </DialogActions>
//         </Dialog>
//     )
// }
import React from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, styled } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { CreateContact } from "types/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const FormContainer = styled(Box)({
    width: '100%',
    maxWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    padding: '2rem',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    backgroundColor: '#fff',
});

export const contactSchema = z.object({
    email: z.string().email('Invalid email format'),
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    phone: z.string().optional(),
    role: z.enum(['ADMIN', 'CLIENT', 'CREATOR']),
});
interface CreateContactModalProps {
    open: boolean;
    onSubmit: () => void;
    onClose: () => void
}

export const CreateContactModal: React.FC<CreateContactModalProps> = ({ open, onSubmit, onClose }) => {
    const { control, handleSubmit, formState: { errors } } = useForm<CreateContact>({
        resolver: zodResolver(contactSchema),
        mode: "onSubmit",
        defaultValues: { email: "", firstName: "", lastName: "", phone: "", role: "CREATOR" }
    });




    const onFormSubmit = (data: CreateContact) => {
        // Perform submission logic here
        onSubmit();

    };

    const handleClose = () => {

        onSubmit();
    };

    return (
        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
            onClose={handleClose}
        >
            <DialogTitle style={{ fontWeight: 501 }}>Create Contact</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <FormContainer>
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="First Name"
                                    variant="outlined"
                                    fullWidth
                                    {...field}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Last Name"
                                    variant="outlined"
                                    fullWidth
                                    {...field}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    {...field}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    label="Phone"
                                    variant="outlined"
                                    fullWidth
                                    {...field}
                                />
                            )}
                        />
                    </FormContainer>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Create</Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
};