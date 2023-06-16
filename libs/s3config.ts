import { S3Client } from "@aws-sdk/client-s3";

export let contactS3 = new S3Client({
  credentials: {
    accessKeyId: String(process.env.AWS_S3_ACCESS),
    secretAccessKey: String(process.env.AWS_S3_SECRET),
  },
  region: String(process.env.AWS_S3_REGION),
});
