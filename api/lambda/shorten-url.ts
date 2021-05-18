import { UrlShortenService } from "./UrlShortenService";

exports.handler = async function(event: any) {
  console.log({ body: event.body });
  const service = new UrlShortenService();
  const id = service.generateId(event.body.url, {
    hash: process.env.hash,
    truncateAt: process.env.truncateAt,
  });
  console.log({id})
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: id
  };
};

