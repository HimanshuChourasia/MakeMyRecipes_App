var fs = require('fs');
var path = require('path');
/**
 * Item
 */
var Item =class Item{
    /**
     * @param {String} Item_Code - Alphanumeric code of the item
     * @param {String} Item_Name-  Name of the item
     * @param {String} Catalog_Category - Name of the catalog category
     * @param {String} Description - Description of the item
     * @param {Number} Rating - Rating of an item
     * @param {String} Ingredients - Ingredients of an item.
     * @param {String} Directions - Directions of an item.
     * @param {String} Imageurl - Image url of an item.
     * @param {String} Owner - Owner owning an item.
     */
    constructor(Item_Code,Item_Name,Catalog_Category,Description,Rating,Ingredients,Directions,ImageUrl,Owner){
        this.Item_Code = Item_Code;
        this.Item_Name = Item_Name;
        this.Catalog_Category = Catalog_Category;
        this.Description = Description || '';
        this.Rating = Rating;
        this.Ingredients = Ingredients;
        this.Directions = Directions;
        this.ImageUrl = ImageUrl ;
        this.Owner = Owner ;


    }
/*
   static getImageUrl (Item_Code){

            let image_name = lookupImage(Item_Code);
            if (image_name != null) {
                let image_path = path.join(__dirname,'..','/assets/images',image_name);
                if(fs.existsSync(image_path)){
                    console.log('File exists ');
                    return '/assets/images/'+image_name;
                }
                else {
                    console.log('File does not exist');
                }
            }
        }*/

    /**
     * @return {String} -  Alphanumeric code of the item
     */
    getItemCode(){
        return this.Item_Code;
    }

    /**
    * @return {String} -  Name of the item
    */

    getItemName(){
        return this.Item_Name;
    }

    /**
     * @return {String} -  Description of the item
     */


    getDirections(){
        return this.Directions;
    }


    /**
     * @return {String} -  Catalog category
     */
    getCatalog(){
        return this.Catalog_Category;
    }


    /**
     * @return {String} - Description of an item
     */

    getDescription(){
        return this.Description;
    }


    /**
     * @return {String} -  Rating of the item
     */

    getRating(){
        return this.Rating;
    }


    /**
     * @return {String} -  Ingredients  of the item
     */

    getIngredients(){
        return this.Ingredients;
    }


    /**
     * @return {String} -  Image url of the item
     */

    getImageUrl(){
        return this.ImageUrl;
    }


    /**
     * @return {String} -  Owner of the item
     */

    getOwner(){
        return this.Owner;
    }


};

/*
var image_code = {
    A001:'food.jpg',
    A002:'recpies_1.jpg',
    A003:'recpies_3.jpg',
    A004:'recpies_4.jpg',
    M001:'main_course_1.jpg',
    M002:'main_course_2.jpg',
    M003:'main_course_3.jpg',
    M004:'main_course_4.jpg',
    M005:'main_course_5.jpg',
    M006:'main_course_6.jpg',
    M007:'main_course_7.jpg',
    M008:'main_course_8.jpg'
};
*/

/*
function lookupImage(item_code) {
    if(image_code[item_code] === undefined){
        return null;
    }else{
            return image_code[item_code];
    }

}
*/
module.exports = Item ;