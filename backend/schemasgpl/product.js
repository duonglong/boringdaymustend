const product = require('../schemas/product');
const { composeWithMongoose } =  require('graphql-compose-mongoose');
const { schemaComposer } = require('graphql-compose');

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
    productById: productTC.getResolver('findById'),
    productByIds: productTC.getResolver('findByIds'),
    productOne: productTC.getResolver('findOne'),
    productMany: productTC.getResolver('findMany'),
    productCount: productTC.getResolver('count'),
    productConnection: productTC.getResolver('connection'),
    productPagination: productTC.getResolver('pagination'),
});

schemaComposer.Mutation.addFields({
    productCreateOne: productTC.getResolver('createOne'),
    productCreateMany: productTC.getResolver('createMany'),
    productUpdateById: productTC.getResolver('updateById'),
    productUpdateOne: productTC.getResolver('updateOne'),
    productUpdateMany: productTC.getResolver('updateMany'),
    productRemoveById: productTC.getResolver('removeById'),
    productRemoveOne: productTC.getResolver('removeOne'),
    productRemoveMany: productTC.getResolver('removeMany'),
    productFindOrCreate: productTC.getResolver('findOrCreate'),
});

module.exports = productTC;
