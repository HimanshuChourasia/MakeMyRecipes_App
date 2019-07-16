/**
 * @module /model
 * @desc Contains utility for connecting to database.
 */


const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const server = '127.0.0.1:27017'; // REPLACE WITH YOUR DB SERVER
const database = 'Recipes';      // REPLACE WITH YOUR DB NAME
/**
 * Database.
 */
class Database {
    /**
     * _connect()
     */
    constructor() {
        this._connect()

    }
    /**
     *  @return {object} - the  database connection object
     */
    _connect() {
        mongoose.connect(`mongodb://${server}/${database}`,{useNewUrlParser:true})
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
                console.log(err)     ;
            })
    }
}

let dbconn = new Database();
const itemSchema = new schema ({
    Item_Code:{type: String,required:true},
    Item_Name:{type:String,required: true},
    Catalog_Category:{type:String,required: true},
    Description:{type:String,required: true},
    Rating:{type:Number,required: true},
    Ingredients:{type:Array,required: true},
    Directions:{type:Array,required: true},
    ImageUrl:{type:String,required: true},
    Owner:{type:String,required: true},
});

const userSchema = new schema ({
    user_id:{type: String,required:true},
    firstName:{type:String,required: true},
    lastName:{type:String,required: true},
    email_address:{type:String,required: true},
    address_1:{type:String,required: true},
    address_2:{type:String,required: true},
    city:{type:String,required: true},
    state:{type:String,required: true},
    zipCode:{type:String,required: true},
    county:{type:String,required: true},
    password:{type:String,required: true},
    salt:{type:String,required:true}
});


const useritemSchema = new schema ({
    user_id:{type: String,required:true},
    Item_Code:{type:String,required: true},
    Item_Name:{type:String,required: true},
    Catalog_Category:{type:String,required: true},
    Rating:{type:Number,required: true},
    MadeIt:{type:Boolean,required: true}
});



const itemModel = mongoose.model('items',itemSchema,'items');
const userModel = mongoose.model('user',userSchema,'user');
const useritemModel = mongoose.model('useritem',useritemSchema,'useritem');
module.exports = {
    item:itemModel,
    user:userModel,
    useritem:useritemModel
} ;