import multer from "multer";

const DIR = "./imageUpload/";
const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    //reject file
    cb({ message: "Unsupported file format" }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 },
  fileFilter: fileFilter,
}).array("files", 5);

export default upload;
