const productCategory = require('../schemas/product_category');
const { composeWithMongoose } =  require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');

const productCategoryTC = composeWithMongoose(productCategory, {
// fill new options ...
});


schemaComposer.Query.addFields({
    productCategoryById: productCategoryTC.getResolver('findById'),
    productCategoryByIds: productCategoryTC.getResolver('findByIds'),
    productCategoryOne: productCategoryTC.getResolver('findOne'),
    productCategoryMany: productCategoryTC.getResolver('findMany'),
    productCategoryCount: productCategoryTC.getResolver('count'),
    productCategoryConnection: productCategoryTC.getResolver('connection'),
    productCategoryPagination: productCategoryTC.getResolver('pagination'),
});                                                                                         

schemaComposer.Mutation.addFields({
    productCategoryCreateOne: productCategoryTC.getResolver('createOne'),
    productCategoryCreateMany: productCategoryTC.getResolver('createMany'),
    productCategoryUpdateById: productCategoryTC.getResolver('updateById'),
    productCategoryUpdateOne: productCategoryTC.getResolver('updateOne'),
    productCategoryUpdateMany: productCategoryTC.getResolver('updateMany'),
    productCategoryRemoveById: productCategoryTC.getResolver('removeById'),
    productCategoryRemoveOne: productCategoryTC.getResolver('removeOne'),
    productCategoryRemoveMany: productCategoryTC.getResolver('removeMany'),    
});

module.exports = productCategoryTC;
