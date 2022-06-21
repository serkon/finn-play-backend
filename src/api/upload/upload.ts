import { Request, Response } from "express";
import { FileArray, UploadedFile } from "express-fileupload";

export default (req: Request, res: Response) => {
  try {
    res.setHeader("Content-Type", "application/json");
    if (!req.files) {
      return res.status(400).json({ status: false, message: "No files were uploaded." });
    }
    const file: UploadedFile = (req.files as FileArray).file as UploadedFile;
    file.mv("./uploads/" + file.name, (err): any => {
      if (err) {
        console.log("Error oluştu", err);
        return res.status(500).json({ status: false, message: err });
        // return res.status(500).send(err);
      }
    });
    req.socket.on("connect", function () {
      // code to handle connection connect
      console.log("Operation canceled by the user.");
    });
    req.on("abort", function () {
      // code to handle connection abort
      console.log("Operation aborted by the user.");
    });
    console.log("Upload Done");
    return res.json({ status: true, file: file, id: 12313123 });
  } catch (error) {
    return res.status(500).json({ status: false, message: error });
  }
};
