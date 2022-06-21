import { Request, Response } from 'express';

export const Logout = async (req: Request, res: Response) => {
  try {
    return res.status(200).json({ data: true });
  } catch (error: any) {
    return res.status(401).json({
      message: 'An error occurred while logout',
    });
  }
};
