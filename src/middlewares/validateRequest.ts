import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateRequest = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (e) {
            if (e instanceof ZodError) {
                res.status(400).send({message :" Invalid data", data: e.errors});
            }
            next(e);
        }
    };
};