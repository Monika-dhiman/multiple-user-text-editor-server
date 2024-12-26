const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const documentSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        nullable: true,
    }
});

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;
