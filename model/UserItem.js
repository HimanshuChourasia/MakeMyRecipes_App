const exportModel = require('./DBModel');
const useritem = exportModel.useritem ;

const addItemRating = function addItemRating(user_id,Item_Code,rating){
    let query = useritem.findOneAndUpdate({user_id:user_id,Item_Code:Item_Code},{$set:{Rating:rating}},{new: true}).exec();
    return query ;
};

const addMadeIt = function addMadeIt(user_id,Item_Code,madeIt){
    let query = useritem.findOneAndUpdate({user_id:user_id,Item_Code:Item_Code},{MadeIt:madeIt}).exec();
    return query ;
};

const addUserItem = function addUserItem(user_id,Item_Code,Item_Name,Catalog_Category,madeIt,rating){
    let query = useritem.findOneAndUpdate({user_id:user_id,Item_Code:Item_Code},{$set:{user_id:user_id,Item_Code:Item_Code,Item_Name:Item_Name,Catalog_Category:Catalog_Category,MadeIt:madeIt,Rating:rating} },{new:true,upsert:true}).exec();
   return query;
};

const useritems = function getUserItems(user_id){
    let query = useritem.find({user_id:user_id}).exec();
   return  query ;
};

const getUserItemByItemCode = function getUserItemByItemCode(user_id,itemcode){
    let query = useritem.find({user_id:user_id,Item_Code:itemcode}).exec();
    return  query ;
};

const getalluseritems = function getalluseritems(){
    let query = useritem.find({}).exec();
    return  query ;
};

const removeItem = function removeUserItem(user_id,itemcode){
    let query = useritem.deleteOne({user_id:user_id,Item_Code:itemcode}).exec();
    return  query ;
};

module.exports = {
    addItemRating:addItemRating,
    addMadeIt:addMadeIt,
    getUserItems:useritems,
    getalluseritems : getalluseritems,
    addUserItem:addUserItem,
    getUserItemByItemCode:getUserItemByItemCode,
    removeItem:removeItem
} ;