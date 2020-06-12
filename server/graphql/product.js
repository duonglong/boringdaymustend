const product = require('../schemas/product');
const { composeWithMongoose } =  require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');
const authCheck = require('../middlewares/authCheck');
const productTC = composeWithMongoose(product, {
// fill new options ...
});

productTC.addResolver({
    name: 'findOrCreate',
    kind: 'mutation',
    type: productTC.getResolver('createOne').getType(),
    args: productTC.getResolver('createOne').getArgs(),
    resolve: async ({ source, args, context, info }) => {
        const product = await product.findOne(args.record).exec();
        if (!product) product = await product.create(args.record);

        return {
            record: product,
            recordId: product.getRecordIdFn()(product),
        };
    },
});

schemaComposer.Query.addFields({
    productById: productTC.getResolver('findById', [authCheck]),
    productByIds: productTC.getResolver('findByIds', [authCheck]),
    productOne: productTC.getResolver('findOne', [authCheck]),
    productMany: productTC.getResolver('findMany', [authCheck]),
    productCount: productTC.getResolver('count', [authCheck]),
    productConnection: productTC.getResolver('connection', [authCheck]),
    productPagination: productTC.getResolver('pagination', [authCheck]),
});

schemaComposer.Mutation.addFields({
    productCreateOne: productTC.getResolver('createOne', [authCheck]),
    productCreateMany: productTC.getResolver('createMany', [authCheck]),
    productUpdateById: productTC.getResolver('updateById', [authCheck]),
    productUpdateOne: productTC.getResolver('updateOne', [authCheck]),
    productUpdateMany: productTC.getResolver('updateMany', [authCheck]),
    productRemoveById: productTC.getResolver('removeById', [authCheck]),
    productRemoveOne: productTC.getResolver('removeOne', [authCheck]),
    productRemoveMany: productTC.getResolver('removeMany', [authCheck]),
    productFindOrCreate: productTC.getResolver('findOrCreate', [authCheck]),
});

module.exports = productTC;
