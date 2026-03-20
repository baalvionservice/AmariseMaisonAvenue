import { Response } from 'express';

export const success = (res: Response, data: any = null, message: string = 'Success') => {
  return res.status(200).json({
    success: true,
    data,
    message,
    error: null
  });
};

export const error = (res: Response, message: string, code: number = 500, details: any = null) => {
  return res.status(code).json({
    success: false,
    data: null,
    error: {
      message,
      code,
      details
    }
  });
};
