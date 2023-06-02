module.exports = {
  config: {
    aws: {
      s3: {
        bucket_name: process.env.S3_BUCKET_NAME,
        region: process.env.S3_BUCKET_REGION,
      },
    },
  },
};
