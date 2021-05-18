import { UrlShortenService } from "./UrlShortenService";

exports.handler = async function(event: any) {
  const service = new UrlShortenService(process.env);
  const url = event.body.url;
  const id = await service.saveUrl(url);
  console.log({ id, url, saved: true })
  return {
    statusCode: 201,
    headers: { "Content-Type": "text/plain" },
    body: id
  };
};

