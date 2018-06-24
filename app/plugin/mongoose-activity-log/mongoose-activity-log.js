var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ActivityLog = require('./../../model/activity-log.js');

function mongooseActivityLogPlugin(schema, options) {
    schema.add({
        modifiedBy: {}
    });

    schema.post('save', function(doc, next) {
        var refrenceDocument = Object.assign({}, this._doc);
        delete refrenceDocument.modifiedBy;
        var ALog = new ActivityLog({
            collectionType: options.schemaName,
            referenceDocument: refrenceDocument,
            action: options.createAction || 'created',
            loggedBy: this.modifiedBy,
            createdAt: Date.now()
        });
        ALog.save(function(err, aLog) {
            return next();
        });
    });

    schema.post('findOneAndUpdate', function(doc, next) {
        var ALog = new ActivityLog({
            collectionType: options.schemaName,
            referenceDocument: doc,
            action: options.updateAction || 'updated',
            loggedBy: doc.modifiedBy,
            createdAt: Date.now()
        });
        ALog.save(function(err, aLog) {
            return next();
        });
    });

    // create logs for delete action
    schema.post('findOneAndRemove', function(doc, next) {
        var ALog = new ActivityLog({
            collectionType: options.schemaName,
            referenceDocument: doc,
            action: options.deleteAction || 'deleted',
            loggedBy: this.modifiedBy,
            createdAt: Date.now()
        });
        ALog.save(function(err, aLog) {
            return next();
        });
    });

}

module.exports = mongooseActivityLogPlugin;
