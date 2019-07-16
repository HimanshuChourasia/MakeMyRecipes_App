const exportModel = require('./DBModel');
const item = exportModel.item ;
/**
* Returns  aa new created item
*
* @param {object} Item - Item object
*
 */
const createItem =function createitem(Item) {
    const DBitem = new item({
        Item_Code:Item.Item_Code,
        Item_Name:Item.Item_Name,
        Catalog_Category:Item.Catalog_Category,
        Description:Item.Description,
        Rating:Item.Rating,
        Ingredients:Item.Ingredients ,
        Directions:Item.Directions,
        ImageUrl:Item.ImageUrl,
        Owner:Item.Owner
    });
  let query = DBitem.save() ;
    return query ;
};

/**
 * Returns  aa new created item
 *
 * @param {object} Item - Item object
 */

const updateItem = function updateItem(Item) {
    let query = item.findOneAndUpdate({Item_Code:Item.Item_Code},{$set:{
            Item_Name:Item.Item_Name,
            Catalog_Category:Item.Catalog_Category,
            Description:Item.Description,
            Rating:Item.Rating,
            Ingredients:Item.Ingredients,
            Directions:Item.Directions,
            ImageUrl:Item.ImageUrl
        }}).exec();

    return query ;
};

/**
 * Returns  a  created item
  * @param {object} ItemCode - ItemCode
  */

const getItemByItemCode = function getItemByItemCode(itemCode) {

    let query = item.find({Item_Code: itemCode}).exec();
    return query;
};


/**
 * Returns  a categories
  */

const getCategories = function getCategories() {
    let query = item.distinct('Catalog_Category').exec();
    return query;
};

/**
 * Returns  a items from a category
 *
 * @param {String} catalog_category - catalog_category
 *
 */

const getItemsFromParticularCategory = function getItemsFromParticularCategory(catalog_category) {
    let query = item.find({Catalog_Category:catalog_category}).exec();
  return query;
};

/**
 * Returns  a items
 *
  */

const getItems = function getItems() {
    let query = item.find({}).exec();
    return query;
};



module.exports = {
    createItem :createItem ,
    updateItem:updateItem,
    getCategories : getCategories,
     getItemByItemCode : getItemByItemCode ,
    getItemsFromParticularCategory : getItemsFromParticularCategory,
    getItems : getItems

};