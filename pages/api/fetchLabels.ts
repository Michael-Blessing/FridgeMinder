import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const vision = require('@google-cloud/vision');

  // Creates a client
  const client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_VISION_KEY
  });
  const {base64} = req.body;
  console.log(base64)
  // Performs label detection on the image file
  const [result] = await client.labelDetection(base64);
  const labels = result.labelAnnotations;

  res.status(200).json({labels: labels})
}

