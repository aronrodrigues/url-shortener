export class UrlShortenService {
  generateId(
    url: string,
    opts: { hash?: string; truncateAt?: string }
  ): string {
    // We are importing here to increase the performance of the other functions
    const crypto = require("crypto");
    const basex = require("base-x");

    // in the future we might add a customer base string.
    const hash = crypto
      .createHash(opts.hash)
      .update(url + Date.now().toString())
      .digest("hex");
    // we are discarding the final part of the hash as git does.
    // This increases the chance of collision.
    const buffer = Buffer.from(hash.substr(0, Number(opts.truncateAt)));

    return basex(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    ).encode(buffer);
  }
}
