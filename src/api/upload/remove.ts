import { Request, Response } from "express";

export default (req: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  const md5 = req.body.md5;
  const fileName = req.body.fileName;
  console.log("Remove Done");
  return res.json({ status: true, name: fileName, md5 });
};
