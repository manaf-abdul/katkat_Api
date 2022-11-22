import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"
import path from "path"
import dotenv from 'dotenv'
dotenv.config()

const { Access_Key_ID, Secret_Access_Key, BUCKET_NAME } = process.env;
const s3 = new aws.S3({ accessKeyId: Access_Key_ID, secretAccessKey: Secret_Access_Key, Bucket: BUCKET_NAME });

const getFileKey = (file, folder) => {
  if (!file) return false;
  const name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + path.extname(file.originalname);
  return `netflix/${folder}/${name}`;
};

const s3Storagemovies = multerS3({
  s3: s3,
  bucket: BUCKET_NAME,
  acl: "public-read",
  metadata: (req, file, callBack) => callBack(null, { fieldName: file.fieldname }),
  contentType: multerS3.AUTO_CONTENT_TYPE,
  serverSideEncryption: "AES256",
  cacheControl: "max-age=31536000",
  key: (req, file, cb) => cb(null, getFileKey(file,"Movies-Video"))
});
export const s3StorageMovies= multer({ storage: s3Storagemovies});
// ,limits:{fieldSize: 25 * 1024 * 1024}  


const s3Storageimages = multerS3({
  s3: s3,
  bucket: BUCKET_NAME,
  acl: "public-read",
  metadata: (req, file, callBack) => callBack(null, { fieldName: file.fieldname }),
  contentType: multerS3.AUTO_CONTENT_TYPE,
  serverSideEncryption: "AES256",
  cacheControl: "max-age=31536000",
  key: (req, file, cb) => cb(null, getFileKey(file,"blog"))
});
export const s3StorageImages= multer({ storage: s3Storageimages });

const s3Storagecategory = multerS3({
  s3: s3,
  bucket: BUCKET_NAME,
  acl: "public-read",
  metadata: (req, file, callBack) => callBack(null, { fieldName: file.fieldname }),
  contentType: multerS3.AUTO_CONTENT_TYPE,
  serverSideEncryption: "AES256",
  cacheControl: "max-age=31536000",
  key: (req, file, cb) => cb(null, getFileKey(file,"category"))
});
export const s3StorageCategory= multer({ storage: s3Storagecategory });

