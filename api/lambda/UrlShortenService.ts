const { DynamoDB } = require('aws-sdk');
export class UrlShortenService {
  private env: any;
  private docClient: any;
  constructor(env: any) {
    this.env = env;
    this.docClient = new DynamoDB.DocumentClient();
  }

  generateId(url: string): string {
    // We are importing here to increase the performance of the other functions
    const crypto = require('crypto');
    const basex = require('base-x');

    // in the future we might add a customer base string.
    const hash = crypto
      .createHash(this.env.hash)
      .update(url + Date.now().toString())
      .digest('hex');
    // we are discarding the final part of the hash as git does.
    // This increases the chance of collision.
    const buffer = Buffer.from(hash.substr(0, Number(this.env.truncateAt)));

    return basex(
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    ).encode(buffer);
  }

  async saveUrl(url: string): Promise<string> {
    const id = this.generateId(url);
    await this.docClient
      .put({
        TableName: this.env.linksTableName,
        Item: {
          id,
          url,
        },
      })
      .promise();
    return id;
  }

  async loadUrl(id: string): Promise<{ id: string; url: string }> {
    const data = await this.docClient
      .get({
        TableName: this.env.linksTableName,
        Key: {
          id,
        },
      })
      .promise();
    return data.Item;
  }
}
