// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// TODO: Set up relationships for Category
Product.belongsToMany(Tag,{through:ProductTag,foreignKey:"product_id"});
Tag.belongsToMany(Product,{through:ProductTag,foreignKey:"tag_id"});
// Products have many ProductTags
Category.hasMany(Product, {foreignKey:"category_id"});
// ProductTag belongs to Product
Product.belongsTo(Category, { foreignKey: 'category_id',onDelete:"CASCADE" });


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
