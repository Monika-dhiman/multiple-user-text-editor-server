const Document = require("../../../domain/document.entity");
const BaseRepository = require("../base.repositories");

class DocumentsRepository extends BaseRepository {
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

module.exports = new DocumentsRepository();
