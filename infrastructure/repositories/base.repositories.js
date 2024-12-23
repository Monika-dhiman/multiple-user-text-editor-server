class BaseRepository {
    constructor({ model }) {
        this.model = model;
    }

    /**
       * Create a new record in the database.
       * @param {object} payload - The data object representing the record to be created.
       * @returns {Promise} - A promise that resolves with the created record.
       */
    create(payload, options = {}) {
        return new this.model(payload).save(options);
    }

    /**
     * count the number of records for a given query
     * 
     * @param {object} query -  The query criteria to search for records.
     * @returns 
     */
    count(query = {}) {
        return this.model.countDocuments(query);
    }

    /**
       * Find records in the database based on the specified query.
       * @param {object} query - The query criteria to search for records.
       * @param {object} projection - The fields to include or exclude in the result set.
       * @param {object} options - Additional options for the find operation.
       * @returns {Promise} - A promise that resolves with the found records.
       */
    find(query = {}, projection = {}, options = {}) {
        return this.model.find(query, projection, options);
    }

    /**
       * Find a single record in the database based on the specified query.
       * @param {object} query - The query criteria to search for a single record.
       * @param {object} projection - The fields to include or exclude in the result set.
       * @param {object} options - Additional options for the findOne operation.
       * @returns {Promise} - A promise that resolves with the found record.
       */
    findOne(query = {}, projection = {}, options = {}) {
        return this.model.findOne(query, projection, options);
    }

    /**
       * Find a record in the database by its ID.
       * @param {string} id - The ID of the record to find.
       * @param {object} criteria - Additional criteria to include in the query.
       * @param {object} projection - The fields to include or exclude in the result set.
       * @param {object} options - Additional options for the findById operation.
       * @returns {Promise} - A promise that resolves with the found record.
       */
    findById(id, criteria = {}, projection = {}, options = {}) {
        return this.model.findOne({ ...criteria, _id: { $eq: id } }, projection, options);
    }

    /**
       * Update records in the database based on the specified query.
       * @param {object} query - The query criteria to identify records to update.
       * @param {object} payload - The payload object representing the updates to be applied.
       * @param {object} options - Additional options for the update operation.
       * @returns {Promise} - A promise that resolves with the result of the update operation.
       */
    update(query = {}, payload, options = {}) {
        options.lean = true;
        options.new = true;
        options.runValidators = true;
        return this.model.findOneAndUpdate(query, payload, options);
    }

    /**
       * Delete records from the database based on the specified query.
       * @param {object} query - The query criteria to identify records to delete.
       * @returns {Promise} - A promise that resolves with the result of the delete operation.
       */
    delete(query = {}) {
        return this.model.deleteOne(query);
    }
}

module.exports = BaseRepository;