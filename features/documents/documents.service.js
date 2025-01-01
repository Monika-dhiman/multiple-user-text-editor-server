const {
  redisClient,
} = require("../../infrastructure/database/redis/redis-connection");
const {
  documentRepository,
} = require("../../infrastructure/repositories/document/document.repository");

const REDIS_KEY_PREFIX = "document:";
const REDIS_TTL = 60 * 60 * 24; // 24 hours
class DocumentService {
  async findOneOrCreateDocument(id) {
    if (id == null) return;

    let document = await redisClient.get(`${REDIS_KEY_PREFIX}${id}`);

    if (document) return JSON.parse(document);

    document = await documentRepository.findDocumentById({ _id: id });
    if (!document) {
      document = await documentRepository.createDocument({ _id: id, data: "" });
    }

    await redisClient.set(
      `${REDIS_KEY_PREFIX}${id}`,
      JSON.stringify(document),
      {
        EX: REDIS_TTL,
      }
    );
    return document;
  }

  async createDocument(id, data) {
    return await documentRepository.createDocument({ _id: id, data });
  }

  async findDocumentById(id) {
    if (id == null) return;
    return documentRepository.findDocumentById({ _id: id });
  }

  async findOneAndUpdateDocument(id, data) {
    let document = null;
    setTimeout(async () => {
      document = await documentRepository.updateDocument(
        { _id: id },
        { data: data }
      );
      redisClient.set(`${REDIS_KEY_PREFIX}${id}`, JSON.stringify(document), {
        EX: REDIS_TTL,
      });
    }, 5000);
  }
}

exports.documentService = new DocumentService();
