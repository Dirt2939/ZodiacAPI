import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
// Importa tipos específicos do Express pra fazer o Casting
import { ParamsDictionary } from 'express-serve-static-core';
import qs from 'qs';

interface RequestValidators {
    body?: ZodObject;
    query?: ZodObject;
    params?: ZodObject;
}

const validator = (schemas: RequestValidators) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            if (schemas.body) {
                req.body = await schemas.body.parseAsync(req.body);
            }

            if (schemas.params) {
                const validatedParams = await schemas.params.parseAsync(req.params);
                req.params = validatedParams as ParamsDictionary;
            }

            if (schemas.query) {
                const validatedQuery = await schemas.query.parseAsync(req.query);
                req.query = validatedQuery as qs.ParsedQs;
            }

            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const zodError = error as ZodError;

                res.status(400).json({
                    status: 'error',
                    message: 'Falha na validação dos dados',
                    errors: zodError.issues.map(issue => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                });
                return;
            }

            next(error);
        }
    };
};

export default validator;