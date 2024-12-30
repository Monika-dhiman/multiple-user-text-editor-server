const {
  documentRepository,
} = require("../../infrastructure/repositories/document/document.repository");

class DocumentService {
  async findOneOrCreateDocument(id) {
    if (id == null) return;
    const document = await documentRepository.findDocumentById({ _id: id });
    if (document) return document;
    return await documentRepository.createDocument({ _id: id, data: "" });
  }
  async createDocument(id, data) {
    return await documentRepository.createDocument({ _id: id, data });
  }
  async findDocumentById(id) {
    if (id == null) return;
    return documentRepository.findDocumentById({ _id: id });
  }
  async findOneAndUpdateDocument(id, data) {
    return await documentRepository.updateDocument({ _id: id }, data);
  }
}

exports.documentService = new DocumentService();
