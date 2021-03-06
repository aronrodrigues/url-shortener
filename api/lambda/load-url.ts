import { UrlShortenService } from "./UrlShortenService";

exports.handler = async function(event: any) {
  const { id } = event.pathParameters;
  const service = new UrlShortenService(process.env);
  const data = await service.loadUrl(id);
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", },
    body: JSON.stringify(data)
  };
};

