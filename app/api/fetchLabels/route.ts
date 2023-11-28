// annonateImages in worse and only for fetchLabels
export async function POST(req: Request) {
  const body = await req.json();
  const base64DataUri = body.base64;
  const base64 = base64DataUri.split(",")[1];
  try {
    const vision = require("@google-cloud/vision");
    const client = new vision.ImageAnnotatorClient();
    const request = {
      image: {
        content: base64,
      },
    };

    const [result] = await client.labelDetection(request);
    console.log(result);
    const labels = result.labelAnnotations;

    return Response.json({ labels: labels });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(error);
  }
}
