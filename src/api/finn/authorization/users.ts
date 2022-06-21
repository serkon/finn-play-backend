import { Request, Response } from 'express';

export const User = (req: Request, res: Response) => {
  res.status(200).json({ data: req.user });
};
