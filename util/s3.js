const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const { config } = require('../config');

require('dotenv').config();

const s3 = new S3Client({
  region: config.aws.s3.region,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = { s3, upload };
