var crypto = require('crypto');
/**
 * User
 */
var user = class User{
    /**
     * @param {String} user_id - User_id of the User
     * @param {String} firstName - First Name
     * @param {String} lastName - Last Name of the User
     * @param {String} email_address - email address of the User
     * @param {String} address_1 - Address of the user
     * @param {String} address_2 - Address of the user
     * @param {String} city - city in which user stays
     * @param {String} state - state in which user stays
     * @param {String} zipCode - zipcode in which user stays
     * @param {String} country - country in which user stays
     * @param {String} password - password of the user
     * @param {String} salt - salt (Random number to generate Salt)
     */
    constructor(user_id, firstName, lastName, email_address, address_1, address_2, city, state, zipCode, country,password,salt) {
        this.user_id = user_id ;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email_address = email_address;
        this.address_1 = address_1 || '' ;
        this.address_2 = address_2 || '' ;
        this.city = city || '' ;
        this.state = state || '' ;
        this.zipCode = zipCode || '';
        this.country = country || '' ;
        this.password = password ;
        this.salt = salt ;
    }
    /** return userid  of the user.
     * getuserid().
     */
     getuserid(){
        return this.user_id ;
}

    /** return first name of the user
     * getfirstName()
     */

getfirstName(){
        return this.firstName ;
}


    /** return last name of the user
     * getlastName()
     */


getlastName(){
        return this.lastName ;
}


    /** return  email address of the user
     * getemailaddress()
     */


getemailAddress(){
        return this.email_address;
}


    /** return address of the user
     * getaddress_1()
     */


getaddress_1(){
        return this.address_1 ;
}


    /** return address of the user
     * getaddress_2()
     */


getaddress_2(){
        return this.address_2 ;
}


    /** return city of the user
     * getcity()
     */


getcity(){
        return this.city ;
}


    /** return state of the user
     * getstate()
     */


getstate(){
        return this.state ;
}


    /** return zipcode of the user
     * getzipcode()
     */


getzipCode(){
        return this.zipCode;
}


    /** return country of the user
     * getcountry()
     */


getcountry(){
        return this.country ;
}


    /** return password of the user
     * getpassword()
     */


getPassword(){
        return this.password ;
}


    /** return salt (Random number)
     * getsalt()
     */


getSalt(){
        return this.salt;
}

};

/*Utility to salt hash password */
/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt){
    var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};
var saltHashPassword = function saltHashPassword(userpassword,salt) {
    let result = '' ;
    var passwordData = sha512(userpassword, salt);
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
    result = passwordData.passwordHash;
    return result;
};
/*console.log('Sample salthashpassword calls ');
saltHashPassword('MYPASSWORD',genRandomString(16));
saltHashPassword('MYPASSWORD',genRandomString(16));
console.log('end of sample salthashpassword calls ');*/
module.exports = {
    user:user,
    saltHashPassword:saltHashPassword,
    genRandomString:genRandomString
};