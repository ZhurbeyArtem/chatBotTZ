import { Document } from 'mongoose';

export default interface Animal extends Document {
    size?: {
        width?: number,
        height?: number
    };
    url: string;
};
