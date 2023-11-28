// annonateImages in worse and only for objectLocalization
export async function POST(req: Request) {
  const body = await req.json();
  const base64DataUri = body.base64;
  const base64 = base64DataUri.split(",")[1];
  try {
    const vision = require("@google-cloud/vision").v1p3beta1;
    const client = new vision.ImageAnnotatorClient();
    const request = {
      image: {
        content: base64,
      },
    };

    const [result] = await client.objectLocalization(request);
    console.log(result);
    const objects = result.localizedObjectAnnotations;

    return Response.json({ objects: objects });
  } catch (error) {
    console.error("Error fetching data:", error);
    return Response.json(error);
  }
}
