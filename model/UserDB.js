const exportModel = require('./DBModel');
const user = exportModel.user ;
const crypto = require('crypto');


var users = function getUsers(){
    let query = user.find({}).exec();
    return query ;

};
const findUserbyEmailId = function getuserbyemail(email) {
    let query = user.find({email_address: email}).exec();
    return query;
};
const userByUserId = function getUserByUserID(user_id){
    let query = user.find({user_id:user_id}).exec();
    query.then(function (user) {
        console.log("User :"+user);
        return user ;
    })
        .catch(function (err) {
            console.log("Error in retrieving User"+err);
            return undefined ;
        });

};


const createuser=function createuser(userobj){
    let userdbobj = new user({
        user_id:userobj.user_id,
        firstName:userobj.firstName,
        lastName:userobj.lastName,
        email_address:userobj.email_address,
        address_1:userobj.address_1,
        address_2:userobj.address_2,
        city:userobj.city,
        state:userobj.state,
        zipCode:userobj.zipCode,
        county:userobj.country,
        password:userobj.password,
        salt:userobj.salt});
    let query = userdbobj.save();
    return query;
};

module.exports = {
    getUsers : users,
    getUserByUserID : userByUserId,
    createuser:createuser,
    findUserbyEmailId:findUserbyEmailId
} ;
