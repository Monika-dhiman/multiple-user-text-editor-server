const Document = require("../../../domain/documents/documents.entity");
const BaseRepository = require("../base.repositories");

class DocumentRepository extends BaseRepository {
  constructor() {
    super({ model: Document });
  }

  async createDocument(payload, options) {
    return this.create(payload);
  }

  async findAllDocuments(projection = {}, options = {}) {
    return this.find({}, projection, options);
  }

  async findDocumentById(criteria, projection = {}, options = {}) {
    return this.findOne(criteria, projection, options);
  }

  async updateDocument(criteria, payload, options = {}) {
    return this.update(criteria, payload, options);
  }

  async deleteDocument(query, options = {}) {
    return this.delete(query, options);
  }
}

exports.documentRepository = new DocumentRepository();
