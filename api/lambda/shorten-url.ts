import { UrlShortenService } from "./UrlShortenService";

exports.handler = async function(event: any) {
  const service = new UrlShortenService(process.env);
  const body = JSON.parse(event.body);
  const url = body.url;
  if (!url) {
    return {
      statusCode: 400,
    }
  }
  const id = await service.saveUrl(url);
  console.log({ id, url, saved: true })
  return {
    statusCode: 201,
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ id })
  };
};

