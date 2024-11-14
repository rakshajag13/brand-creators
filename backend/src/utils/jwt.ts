import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { JWT_EXPIRES_IN } from '../config/constants';

export const generateToken = (user: User):string => {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role,
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: JWT_EXPIRES_IN,
        }
    );
    return token;
}