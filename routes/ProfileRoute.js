var express = require('express');
var path = require('path');
const uuidV1 = require('uuid/v1');
const multer = require('multer');
var user_DB = require(path.join(__dirname,'..','/model/UserDB'));
var Item_DB = require(path.join(__dirname,'..','/model/ItemDB'));
var utilites = require(path.join(__dirname,'..','/Utilities/util'));
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dest = path.join(__dirname,'..','/assets/images');
        cb(null, dest);
    },
    filename: function (req, file, cb) {
        console.log(file.originalname);
        cb(null, file.fieldname + '-' + Date.now()+"_"+file.originalname);
    }
});

var upload = multer({ storage: storage });

//var user_DB = require(path.join(__dirname,'..','/model/createUserModels'));
//var Item_DB = require(path.join(__dirname,'..','/model/createModels'));
var User = require(path.join(__dirname,'..','/model/User'));
var Item = require(path.join(__dirname,'..','/model/item'));
var UserItem = require(path.join(__dirname,'..','/model/UserItem'));
var UserProfile = require(path.join(__dirname,'..','/model/UserProfile'));
var {check,body,validationResult } = require('express-validator/check');
var {sanitizeBody} = require('express-validator/filter');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false });
var router = express.Router();
var app = express();

app.use(express.json());

router.get('/signin',function (request,response) {


        response.render(path.join(__dirname, '..', '/views/signIn'), {
            flag: false,
            sessionFailure: false,
            user: undefined,
            errorlist: undefined
        });

});
router.get('/register',function (request,response) {
   response.render(path.join(__dirname, '..', '/views/register'),{user: undefined, errorlist: undefined,onSuccessFlag:false,username:undefined});

});
router.post('/accountCreated',urlencodedParser,[check('fname')
    .not().isEmpty().withMessage('firstname should not be empty')
    .isAlpha().withMessage('First Name should be alphabetical')
    .matches('^([^0-9]*)').withMessage('First Name should be only alphabets')
    .trim().escape(),
    sanitizeBody('fname').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('lname')
            .not().isEmpty().withMessage('lastname should not be empty')
            .isAlpha().withMessage('lastname should be alphabetical')
            .matches('^([^0-9]*)').withMessage('Last Name should be only alphabets')
            .trim().escape(),
        sanitizeBody('lname').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('address_1')
            .not().isEmpty().withMessage('Address should not be empty')
            .matches('[A-Za-z0-9]+').withMessage('Address should  be alphanumeric')
            .escape(),
        sanitizeBody('address_1').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('address_2')
            .matches('[A-Za-z0-9]+').withMessage('Address should  be alphanumeric')
            .escape() ,
        sanitizeBody('address_2').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('email')
            .not().isEmpty().withMessage('Email should not be empty')
            .trim().withMessage('Email should not have Spacing allowed between the characters')
            .escape().withMessage('Email should not have escape sequences allowed')
            .isEmail().normalizeEmail().withMessage('Email should be in proper format')
            .custom(value => {
                return user_DB.findUserbyEmailId(value).then(user => {

                    if (user.length === 1) {
                        return Promise.reject('E-mail already in use');
                    }
                });
            }),
        sanitizeBody('email').blacklist(['*','!','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','/','<','>']),
        check('zipcode')
        .not().isEmpty().withMessage('ZipCode should not be empty')
        .isLength({min:5,max:5}).withMessage('Zipcode should be of 5 digits')
        .isInt().withMessage('zipcode  should be in numeric format'),
        sanitizeBody('zipcode').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
        check('password')
            .not().isEmpty().withMessage('Password should not be empty')
            .trim().withMessage('No Spacing allowed between the characters in password field')
            .escape().withMessage('No escape sequences allowed in password field'),

        check('password2')
            .not().isEmpty().withMessage('Password should not be empty')
            .trim().withMessage('No Spacing allowed between the characters in password field')
            .escape().withMessage('No escape sequences allowed in password field'),

    ],
    function (request,response) {
        const errorsres = validationResult(request);
        if (!errorsres.isEmpty()) {
            console.log("Errors found ..." + errorsres.array());
            response.render(path.join(__dirname, '..', '/views/register'), {
                user: undefined,
                onSuccessFlag:false,
                errorlist: errorsres.array(),
                username:undefined
            });
        }
        else {
            let user_id = uuidV1();
            console.log('UserId....'+user_id);
            let salt = User.genRandomString(16); // generating a salt of 16 length
            let userobj = new User.user(user_id,request.body.fname,
                request.body.lname,
                request.body.email,
                request.body.address_1,
                request.body.address_2,
                request.body.city,
                request.body.state,
                request.body.zipcode,
                request.body.country,
                User.saltHashPassword(request.body.password, salt),
                salt);
            let queryres = user_DB.createuser(userobj);
            queryres.then(function (result) {
                console.log('The result ' + result.length);
                if(result){
                    response.render(path.join(__dirname, '..', '/views/register'), {user: undefined, errorlist: undefined,onSuccessFlag:true,username:result.email_address});
                }
                else {
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503',
                        Error: 'User not inserted'});
                }
            })
                .catch(function (err) {
                    console.log('The error ' + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503',
                        Error: err});
                });


        }
});

router.get('/share',function (request,response) {
    response.render(path.join(__dirname, '..', '/views/createItem'),{user:request.session.theUser,
        errorlist:undefined,
        onSuccessFlag:false,
        itemcode: undefined});
});
router.get('/shareItemUpdate',function (request,response) {
    response.render(path.join(__dirname, '..', '/views/updateItem'),{user:request.session.theUser,
        errorlist:undefined,
        onSuccessFlag:false,
        itemcode: request.query.Item_Code});
});

router.post('/createItem',urlencodedParser,upload.single('itemimage'),[check('itemname')
    .not().isEmpty().withMessage('itemname should not be empty')
    .matches('^([^0-9]*)').withMessage('Item Name should be only alphabets')
    .trim().escape(),
    sanitizeBody('itemname').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
    check('description_0')
        .not().isEmpty().withMessage('Description should not be empty')
        .matches('^([^0-9]*)').withMessage('Description should be only alphabets')
        .trim().escape(),
    sanitizeBody('description_0').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),

    check('directions_0')
        .not().isEmpty().withMessage('Directions should not be empty')
        .matches('[A-Za-z0-9]+').withMessage('Directions should  be alphanumeric')
        .trim().escape(),
    sanitizeBody('directions_0').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
    check('directions_')
        .matches('[A-Za-z0-9]*').withMessage('Directions should  be alphanumeric')
        .trim().escape(),
    sanitizeBody('directions_').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),


    check('itemcode')
        .isAlphanumeric().withMessage('itemcode should be alphanumeric')
        .matches('^(?![0-9])[A-Za-z]+').withMessage('itemcode should contain alphanumeric characters')
        .isLength({max:4}).withMessage('itemcode should be of 4 characters')
        .custom(value => {
            return Item_DB.getItemByItemCode(value).then(user => {

                if (user.length === 1) {
                    return Promise.reject('Item Code already in use');
                }
            });
        }),
        sanitizeBody('itemcode').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),


    check('rating')
        .not().isEmpty().withMessage('Rating should not be empty')
        .isLength({min:1,max:1}).withMessage('Rating should be of 1 digit')
        .isInt().withMessage('Rating  should be in numeric format'),
    sanitizeBody('rating').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>'])

],function (request,response) {
    if (request.session.theUser) {
        const errorsres = validationResult(request);
        if (!errorsres.isEmpty()) {
            console.log("Errors found ..." + errorsres.array());
            response.render(path.join(__dirname, '..', '/views/createItem'), {
                user: request.session.theUser,
                onSuccessFlag:false,
                errorlist: errorsres.array(),
                itemcode:undefined
            });
        }
        else{
            let directions = [] ;
            let ingredients = [] ;
            directions.push(request.body.directions_0);
            ingredients.push(request.body.ingredients_0);
            let ingredients_temp = request.body.ingredients_ ;
            let directions_temp = request.body.directions_;
            let ingredients_final = ingredients.concat(ingredients_temp);
            let directions_final = directions.concat(directions_temp);
            console.log('Directions'+directions_final);
            console.log('Ingredients'+ingredients_final);
            let imageurl = '/assets/images/'+request.file.filename ;
            let itemObj = new Item(request.body.itemcode,
                request.body.itemname,
                request.body.CatalogCategory,
                request.body.description_0,
                request.body.rating,
                directions_final,
                ingredients_final,
                imageurl,
                request.session.theUser.user_id);

            let queryres = Item_DB.createItem(itemObj);
            queryres.then(function (result) {
                if (result){
                   console.log('The result'+result);
                    response.render(path.join(__dirname, '..', '/views/createItem'), {user: request.session.theUser,onSuccessFlag:true,errorlist:undefined,itemcode:request.body.itemcode });
                }
                else {
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503',
                        Error: 'Item not inserted'});
                }
            })
                .catch(function (err) {
                    console.log('The error ' + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503',
                        Error: err});
                });

            //response.render(path.join(__dirname, '..', '/views/createItem'), {user: request.session.theUser,omSuccessFlag:true,errorlist:undefined,itemcode:request.body.itemcode });

        }


    }



    else {
        response.render(path.join(__dirname, '..', '/views/signIn'), {
            flag: false,
            sessionFailure: false,
            user: undefined,
            errorlist: undefined
        });

    }
});

router.post('/updateItem',urlencodedParser,upload.single('itemimage'),[check('itemname')
    .not().isEmpty().withMessage('itemname should not be empty')
    .matches('^([^0-9]*)').withMessage('Item Name should be only alphabets')
    .trim().escape(),
    sanitizeBody('itemname').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
    check('description_0')
        .not().isEmpty().withMessage('Description should not be empty')
        .matches('^([^0-9]*)').withMessage('Description should be only alphabets')
        .trim().escape(),
    sanitizeBody('description_0').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),

    check('directions_0')
        .not().isEmpty().withMessage('Directions should not be empty')
        .matches('[A-Za-z0-9]*').withMessage('Directions should  be alphanumeric')
        .trim().escape(),
    sanitizeBody('directions_0').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
    check('directions_')
        .matches('[A-Za-z0-9]*').withMessage('Directions should  be alphanumeric')
        .trim().escape(),
    sanitizeBody('directions_').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),


    check('itemcode')
        .isAlphanumeric().withMessage('itemcode should be alphanumeric')
        .matches('^(?![0-9])[A-Za-z]+').withMessage('itemcode should contain alphanumeric characters')
        .isLength({max:4}).withMessage('itemcode should be of 4 characters'),

    sanitizeBody('itemcode').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),


    check('rating')
        .not().isEmpty().withMessage('Rating should not be empty')
        .isLength({min:1,max:1}).withMessage('Rating should be of 1 digit')
        .isInt().withMessage('Rating  should be in numeric format'),



    sanitizeBody('rating').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>'])

],function (request,response) {
    if (request.session.theUser) {
        const errorsres = validationResult(request);
        if (!errorsres.isEmpty()) {
            console.log("Errors found ..." + errorsres.array());
            response.render(path.join(__dirname, '..', '/views/updateItem'), {
                user: request.session.theUser,
                onSuccessFlag:false,
                errorlist: errorsres.array(),
                itemcode:undefined
            });
        }
        else{
            let directions = [] ;
            let ingredients = [] ;
            directions.push(request.body.directions_0);
            ingredients.push(request.body.ingredients_0);
            let ingredients_temp = request.body.ingredients_ ;
            let directions_temp = request.body.directions_;
            let ingredients_final = ingredients.concat(ingredients_temp);
            let directions_final = directions.concat(directions_temp);
            console.log('Directions'+directions_final);
            console.log('Ingredients'+ingredients_final);
            let imageurl = '/assets/images/'+request.file.filename ;
            let itemObj = new Item(request.body.itemcode,
                request.body.itemname,
                request.body.CatalogCategory,
                request.body.description_0,
                request.body.rating,
                ingredients_final,
                directions_final,
                imageurl,
                request.session.theUser.user_id

            );


            let queryres = Item_DB.updateItem(itemObj);
            queryres.then(function (result) {
                if (result){
                    console.log('The result'+result);
                    response.render(path.join(__dirname, '..', '/views/updateItem'), {user: request.session.theUser,onSuccessFlag:true,errorlist:undefined,itemcode:request.body.itemcode });
                }
                else {
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503',
                        Error: 'Item not updated'});
                }
            })
                .catch(function (err) {
                    console.log('The error ' + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503',
                        Error: err});
                });

            //response.render(path.join(__dirname, '..', '/views/createItem'), {user: request.session.theUser,omSuccessFlag:true,errorlist:undefined,itemcode:request.body.itemcode });

        }
        
        
    }



    else {
        response.render(path.join(__dirname, '..', '/views/signIn'), {
            flag: false,
            sessionFailure: false,
            user: undefined,
            errorlist: undefined
        });

    }
});


router.post('/userprofile',urlencodedParser,[check('uname')
    .not().isEmpty().withMessage('username should not be empty')
    .trim().withMessage('username should not have Spacing allowed between the characters')
    .escape().withMessage('username should not have escape sequences allowed')
    .isEmail().normalizeEmail().withMessage('username should be in email format'),


    check('psw')
        .not().isEmpty().withMessage('Password')
        .trim().withMessage('No Spacing allowed between the characters in password field')
        .escape().withMessage('No escape sequences allowed in password field')

],function (request,response) {
    const errorsres = validationResult(request);
    if (!errorsres.isEmpty()) {
        console.log("Errors found ..." + errorsres.array());
        response.render(path.join(__dirname, '..', '/views/signIn'), {
            flag: false,
            sessionFailure: false,
            user: undefined,
            errorlist:errorsres.array()
        });
    }
    else {

        let user = {};
        let flag = false;

        let queryres = user_DB.getUsers();

        queryres.then(function (result) {
            for (let i = 0; i < result.length; i++) {
                let salt = result[i].salt ;
                let password_gen = User.saltHashPassword(request.body.psw,salt);
                if (result[i].email_address === request.body.uname && result[i].password === password_gen) {
                    console.log('User Found');
                    flag = true;
                    console.log(result[i].user_id);
                    user = new User.user(result[i].user_id, result[i].firstName, result[i].lastName, result[i].email_address, result[i].address_1, result[i].address_2, result[i].city, result[i].state, result.zipCode, result[i].country, result[i].password,result[i].salt);
                    break;
                }
            }
            if (flag) {
                let user_item_flag = false;
                console.log("User id" + user.user_id);
                let user_item_query = UserItem.getUserItems(user.user_id);
                user_item_query.then(function (useritem) {
                    let user_item_list = useritem;
                    if (user_item_list.constructor === Array) {
                        console.log("It is an array");
                    }
                    console.log("User item" + user_item_list);
                    if (user_item_list !== undefined) {
                        user_item_flag = true;
                    }
                    if (request.session.theUser) {
                        console.log('The session already loaded');
                        request.session.theUser = user;
                        request.session.useritems = user_item_list;

                    } else {
                        console.log('Loading new session');
                        request.session.theUser = user;
                        request.session.useritems = user_item_list;
                    }
                    if (user_item_flag) {
                        response.render(path.join(__dirname, '..', '/views/myitems'), {
                            user: request.session.theUser,
                            list: undefined,
                            userlist: request.session.useritems,
                            itempresent: false
                        });
                    } else {
                        response.render(path.join(__dirname, '..', '/views/signIn'), {
                            flag: false,
                            sessionFailure: true,
                            user: undefined
                        });
                    }
                })
                    .catch(function (err) {
                        console.log("Error occurred in retrieving useritem" + err);
                        response.render(path.join(__dirname, '..', '/views/partials/error'), {
                            ErrorCode: '503',
                            Error: err
                        });
                    });
            } else {
                response.render(path.join(__dirname, '..', '/views/signIn'), {
                    flag: true,
                    sessionFailure: false,
                    user: undefined,
                    errorlist:undefined
                });
            }

        })
            .catch(function (err) {
                console.log("Error in retrieving User" + err);
                response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503', Error: err});
            });
    }
});

router.get('/signout',function (request,response) {
   console.log('Clearing the session');
   request.session.destroy() ;
   response.render(path.join(__dirname,'..','/views/index'),{user:undefined});

});

router.post('/myitems',urlencodedParser,[
    //body('itemcode').isEmpty().withMessage('itemcode should not be empty')
      body('itemcode').isAlphanumeric().withMessage('itemcode should be alphanumeric')
          .matches('^(?![0-9])[A-Za-z]+').withMessage('itemcode should contain alphanumeric characters')
        .isLength({max:4}).withMessage('itemcode should be of 4 characters'),
    sanitizeBody('itemcode').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
    body('rating').not().withMessage('rating should not be empty')
        .isAlpha().withMessage('rating should be  a number')

        .isLength({max:1,min:1}).withMessage('rating should be of 1 character'),
    sanitizeBody('rating').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
    body('madeit').not().withMessage('madeit should not be empty')
        .isInt().withMessage('madeit should be alphabetical')
        .escape().trim().withMessage('madeit should not contain escape sequences and spaces')
        .isLength({max:5}).withMessage('madeit should not be more than 5 characters'),
    sanitizeBody('madeit').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
    body('itemName').not().withMessage('itemName should not be empty')
        .matches('[0-9]+').withMessage('itemName should be alphabetical')

        .isLength({max:20}).withMessage('itemName should not be more than 20 characters'),
    sanitizeBody('itemName').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
    body('category').not().withMessage('category should not be empty')
        .matches('[0-9]+').withMessage('category should be alphabetical')
        .escape().trim().withMessage('category should not contain escape sequences and spaces')
        .isLength({max:20,min:2}).withMessage('category should not be more than 20 characters'),
    sanitizeBody('category').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>'])

],function (request,response) {
    console.log('Item Code from Form'+request.body.itemcode);
    const errorsres = validationResult(request);
    if (!errorsres.isEmpty()) {
        console.log("Errors found ..." + errorsres.array());
        response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'400',Error:errorsres.array()});
    }
else {
        let already_present = false;
        if (request.session.theUser) {
            console.log('In session ');
            let queryres = user_DB.getUsers();
            queryres.then(function (result) {
                console.log("Users found:" + result);
                for (let i = 0; i < result.length; i++) {
                    if (result[i].user_id === request.session.theUser.user_id) {
                        console.log('Profile found');
                        break;
                    }
                }
                console.log('request body parameters :Item Code' + request.body.itemcode);
                let rating = request.body.rating;
                rating = parseInt(rating, 10);
                let madeitboolean = false;
                let madeit = request.body.madeit;
                if (madeit === 'on') {
                    madeitboolean = true;
                }

                let queryresult = UserItem.addUserItem(request.session.theUser.user_id, request.body.itemcode, request.body.itemName, request.body.category, madeitboolean, rating);
                queryresult.then(function (result) {
                    console.log("UserItem added" + result);
                    console.log("Item added");
                    let user_item_list = UserItem.getUserItems(request.session.theUser.user_id);
                    user_item_list.then(function (result) {
                        console.log("Updated Useritem list" + result);
                        if (request.session.useritems.length < result.length) {
                            console.log("New item  " + "old value " + request.session.useritems.length + " New value" + result.length);
                            request.session.useritems = result;
                            response.render(path.join(__dirname, '..', '/views/myitems'), {
                                user: request.session.theUser,
                                list: undefined,
                                userlist: request.session.useritems,
                                itempresent: already_present
                            });
                        } else {
                            already_present = true;
                            response.render(path.join(__dirname, '..', '/views/myitems'), {
                                user: request.session.theUser,
                                list: undefined,
                                userlist: request.session.useritems,
                                itempresent: already_present
                            });
                        }
                    })
                        .catch(function (err) {
                            console.log("Error retrieving userItems " + err);
                            response.render(path.join(__dirname, '..', '/views/partials/error'), {
                                ErrorCode: '503',
                                Error: err
                            });
                        });


                })
                    .catch(function (err) {
                        console.log("Error adding userItem" + err);
                        response.render(path.join(__dirname, '..', '/views/partials/error'), {
                            ErrorCode: '503',
                            Error: err
                        });
                    });

            })
                .catch(function (err) {
                    console.log("Error retrieving user in myitems " + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });


        } else {
            response.render(path.join(__dirname,'..','/views/signIn'),{flag: false,
                sessionFailure: false,
                user: undefined,
                errorlist: undefined}) ;

        }
    }
});

router.post('/itemfeedback',urlencodedParser,[
    body('itemcode').isAlphanumeric().withMessage('itemcode should be alphanumeric')
        .matches('^(?![0-9])[A-Za-z]+').withMessage('itemcode should contain alphanumeric characters')
        .isLength({max:4}).withMessage('itemcode should be of 4 characters'),
    sanitizeBody('itemcode').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),

    ],function (request,response) {
    const errorsres = validationResult(request);
    if (!errorsres.isEmpty()) {
        console.log("Errors found ..." + errorsres.array());
        response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'400',Error:errorsres.array()});
    }
    else {

        let item_not_present = false;
        if (request.session.theUser) {
            console.log('Session already loaded');
            let item_code = request.body.itemcode;


            let queryres = UserItem.getUserItemByItemCode(request.session.theUser.user_id, item_code);
            queryres.then(function (result) {
                if (result.length >= 1) {
                    console.log("UserItem found " + result);
                    let query = Item_DB.getItemByItemCode(result[0].Item_Code);
                    query.then(function (result) {
                        console.log("Item found in ItemDB");
                        response.render(path.join(__dirname, '..', '/views/feedback'), {
                            Item: result,
                            item_not_present: item_not_present,
                            user: request.session.theUser
                        });
                    })
                        .catch(function (err) {
                            response.render(path.join(__dirname, '..', '/views/partials/error'), {
                                ErrorCode: '503',
                                Error: err
                            });
                        });


                } else {
                    console.log("UserItem  not found " + result);
                    response.render(path.join(__dirname, '..', '/views/myitems'), {
                        user: request.session.theUser,
                        list: list,
                        userlist: request.session.useritems
                    });
                }
            })
                .catch(function (err) {
                    console.log("Error while retrieving userItem by UserItemCode " + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });


        } else {
            console.log('Session not present');
            let queryres = UserItem.getalluseritems();
            queryres.then(function (result) {
                console.log("All useritems" + result);
                response.render(path.join(__dirname, '..', '/views/myitems'), {
                    user: request.session.theUser,
                    list: result,
                    userlist: request.session.useritems,
                    itempresent: false
                });
            })
                .catch(function (err) {
                    console.log("Error while retrieving useritems" + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });


        }
    }
});

router.post('/updateRatingItem',urlencodedParser,[
    body('rating').not().withMessage('rating should not be empty')
        .isAlpha().withMessage('rating should be  a number')
        .escape().trim().withMessage('rating should not contain escape sequences and spaces')
        .isLength({max:1,min:1}).withMessage('rating should be of 1 character'),
    sanitizeBody('rating').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>'])
],function (request,response) {
    const errorsres = validationResult(request);
    if (!errorsres.isEmpty()) {
        console.log("Errors found ..." + errorsres.array());
        response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'400',Error:errorsres.array()});
    }
    else {

        let already_present = false;
        if (request.session.theUser) {
            console.log('In session ');
            console.log('request body parameters :Rating' + request.body.rating);
            let rating = request.body.rating;


            console.log('Rating from the view' + rating);

            if (isNaN(rating)) {
                console.log('In NaN ');
                let queryres = UserItem.getUserItems(request.session.theUser.user_id);
                queryres.then(function (result) {
                    for (let i = 0; i < result.length; i++) {
                        if (user_list[i].ItemCode === request.body.itemcode) {
                            rating = user_list[i].Rating;
                            console.log('Rating default value' + rating);
                            break;
                        }
                    }
                })
                    .catch(function (err) {
                        console.log("Error retrieving User's UserItems " + err);
                        response.render(path.join(__dirname, '..', '/views/partials/error'), {
                            ErrorCode: '503',
                            Error: err
                        });
                    });


            }

            rating = parseInt(rating, 10);
            console.log('Rating' + rating);

            let queryres = UserItem.addItemRating(request.session.theUser.user_id, request.body.itemcode, rating);
            queryres.then(function (result) {
                console.log("User Item updated " + result);
                let query = UserItem.getUserItems(request.session.theUser.user_id);
                query.then(function (result) {
                    console.log("Updated useritems " + result);
                    request.session.useritems = result;
                    response.render(path.join(__dirname, '..', '/views/myitems'), {
                        user: request.session.theUser,
                        list: undefined,
                        userlist: request.session.useritems,
                        itempresent: already_present
                    });
                })
                    .catch(function (err) {
                        console.log("Error retrieving a user's useritems " + err);
                        response.render(path.join(__dirname, '..', '/views/partials/error'), {
                            ErrorCode: '503',
                            Error: err
                        });
                    });
            })
                .catch(function (err) {
                    console.log("Error updating Item Rating " + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });


        } else {
            let queryres = UserItem.getalluseritems();
            queryres.then(function (result) {
                console.log("All useritems" + result);
                response.render(path.join(__dirname, '..', '/views/myitems'), {
                    user: request.session.theUser,
                    list: result,
                    userlist: request.session.useritems,
                    itempresent: false
                });
            })
                .catch(function (err) {
                    console.log("Error while retrieving useritems" + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });

        }
    }
});


router.post('/updateMadeItItem',urlencodedParser,[
        body('madeit').not().withMessage('madeit should not be empty')
            .isInt().withMessage('madeit should be alphabetical')
            .escape().trim().withMessage('madeit should not contain escape sequences and spaces')
            .isLength({max:3}).withMessage('madeit should not be more than 3 characters'),

    ],
    function (request,response) {
    const errorsres = validationResult(request);
    if (!errorsres.isEmpty()) {
        console.log("Errors found ..." + errorsres.array());
        response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'400',Error:errorsres.array()});
    }
    else {

        let already_present = false;
        if (request.session.theUser) {
            console.log('In session ');
            let madeitboolean = false;
            let madeit = request.body.madeit;
            if (madeit === 'on') {
                madeitboolean = true;
            }
            let queryres = UserItem.addMadeIt(request.session.theUser.user_id, request.body.itemcode, madeitboolean);
            queryres.then(function (result) {
                console.log("User Item updated " + result);
                let query = UserItem.getUserItems(request.session.theUser.user_id);
                query.then(function (result) {
                    console.log("Updated useritems " + result);
                    request.session.useritems = result;
                    response.render(path.join(__dirname, '..', '/views/myitems'), {
                        user: request.session.theUser,
                        list: undefined,
                        userlist: request.session.useritems,
                        itempresent: already_present
                    });
                })
                    .catch(function (err) {
                        console.log("Error retrieving a user's useritems " + err);
                        response.render(path.join(__dirname, '..', '/views/partials/error'), {
                            ErrorCode: '503',
                            Error: err
                        });
                    });
            })
                .catch(function (err) {
                    console.log("Error updating Item MadeIt " + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });


        } else {
            let queryres = UserItem.getalluseritems();
            queryres.then(function (result) {
                console.log("All useritems" + result);
                response.render(path.join(__dirname, '..', '/views/myitems'), {
                    user: request.session.theUser,
                    list: result,
                    userlist: request.session.useritems,
                    itempresent: false
                });
            })
                .catch(function (err) {
                    console.log("Error while retrieving useritems" + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });

        }
    }
});




router.post('/deleteItem',urlencodedParser,[
    body('itemcode').isAlphanumeric().withMessage('itemcode should be alphanumeric')
        .matches('^(?![0-9])[A-Za-z]+').withMessage('itemcode should contain alphanumeric characters')
        .isLength({max:4}).withMessage('itemcode should be of 4 characters'),
    sanitizeBody('itemcode').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),

],function (request,response) {
    const errorsres = validationResult(request);
    if (!errorsres.isEmpty()) {
        console.log("Errors found ..." + errorsres.array());
        response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'400',Error:errorsres.array()});
    }
    else {

        let already_present = false;
        if (request.session.theUser) {
            console.log('In session ');
            let itemnotpresent = true;


            console.log('request query parameters :itemcode' + request.body.itemcode);
            let queryres = UserItem.getUserItems(request.session.theUser.user_id);
            queryres.then(function (result) {
                console.log("User Items " + result);
                let itemcode = request.body.itemcode;

                for (let i = 0; i < result.length; i++) {
                    if (result[i].Item_Code === itemcode) {
                        itemnotpresent = false;
                        break;
                    }
                }
                if (itemnotpresent === false) {
                    let query = UserItem.removeItem(request.session.theUser.user_id, itemcode);
                    query.then(function (result) {
                        console.log("Item deleted " + Object.keys(result) + "   " + Object.entries(result));
                        if (result.deletedCount >= 1) {
                            let queryres = UserItem.getUserItems(request.session.theUser.user_id);
                            queryres.then(function (result) {
                                console.log("All User Items" + result);
                                request.session.useritems = result;
                                response.render(path.join(__dirname, '..', '/views/myitems'), {
                                    user: request.session.theUser,
                                    list: undefined,
                                    userlist: request.session.useritems,
                                    itempresent: already_present
                                });
                            })
                                .catch(function (err) {
                                    console.log("Error retrieving User's UserItems Data " + err);
                                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                                        ErrorCode: '503',
                                        Error: err
                                    });
                                })
                        } else {
                            response.render(path.join(__dirname, '..', '/views/myitems'), {
                                user: request.session.theUser,
                                list: undefined,
                                userlist: request.session.useritems,
                                itempresent: already_present
                            });
                        }
                    })
                        .catch(function (err) {
                            console.log("Error deleting an UserItem " + err);
                            response.render(path.join(__dirname, '..', '/views/partials/error'), {
                                ErrorCode: '503',
                                Error: err
                            });
                        });


                } else {
                    response.render(path.join(__dirname, '..', '/views/myitems'), {
                        user: request.session.theUser,
                        list: undefined,
                        userlist: request.session.useritems,
                        itempresent: already_present
                    });
                }

            })
                .catch(function (err) {
                    console.log("Error retrieving all User Items" + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });


        } else {
            let queryres = UserItem.getalluseritems();
            queryres.then(function (result) {
                console.log("All useritems" + result);
                response.render(path.join(__dirname, '..', '/views/myitems'), {
                    user: request.session.theUser,
                    list: result,
                    userlist: request.session.useritems,
                    itempresent: false
                });
            })
                .catch(function (err) {
                    console.log("Error while retrieving useritems" + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });


        }
    }
});
router.get('/rate',function (request,response) {
   let item_not_present = false ;
   if (request.session.theUser){
      console.log('Session already loaded');
      let item_code = request.query.itemcode ;
      let queryres = UserItem.getUserItemByItemCode(request.session.theUser.user_id,item_code) ;
      queryres.then(function (result) {
         if (result.length >= 1){
            console.log("UserItem found "+ result);
            let query = Item_DB.getItemByItemCode(result[0].Item_Code);
            query.then(function (result) {
               console.log("Item found in ItemDB");
               response.render(path.join(__dirname,'..','/views/feedback'),{Item:result,item_not_present :item_not_present,user:request.session.theUser});
            })
                .catch(function (err) {
                   console.log("Error retrieving item in ItemDB"+ err);
                   response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'503',Error:err});
                });


         }
         else {
            console.log("UserItem  not found "+ result);
            let queryres = Item_DB.getItemByItemCode(item_code);
            queryres.then(function (result) {
               console.log("Result from getItemByItemCode " + result.length);
               if (result.length >= 1) {
                  console.log("DB contains Item");
                  item_not_present = false;
                  response.render(path.join(__dirname, '..', '/views/item'), {
                     Item: result,
                     item_not_present: item_not_present,
                     user: request.session.theUser
                  });
               }
               else {
                  item_not_present = true ;
                  response.render(path.join(__dirname,'..','/views/item'),{Item:result,item_not_present :item_not_present,user:request.session.theUser});
               }
            })
                .catch(function (err) {
                   console.log("Error retrieving Item data"+err);
                   response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'503',Error:err});
                });





         }
      })
          .catch(function (err) {
             console.log("Error while retrieving userItem by UserItemCode "+ err);
             response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'503',Error:err});
          });


   }
   else {
      console.log('Session not present');
      response.render(path.join(__dirname,'..','/views/signIn'),{flag: false,
          sessionFailure: false,
          user: undefined,
          errorlist: undefined}) ;

   }
});
router.get('/*',function (request,response) {
   response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'404',Error:undefined});
});

module.exports = router ;