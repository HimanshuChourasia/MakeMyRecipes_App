var express = require('express');
var path = require('path');
var Item_DB = require(path.join(__dirname,'..','/model/createModels'));
var user_DB = require(path.join(__dirname,'..','/model/UserDB'));
var ItemDB = require(path.join(__dirname,'..','/model/ItemDB'));
var User = require(path.join(__dirname,'..','/model/User'));
var UserItem = require(path.join(__dirname,'..','/model/UserItem'));
var Item = require(path.join(__dirname,'..','/model/item'));
var bodyParser = require('body-parser');
var {check,validationResult,query } = require('express-validator/check');
var {sanitizeQuery} = require('express-validator/filter');
var urlencodedParser = bodyParser.urlencoded({extended: false });
var router = express.Router();
var app = express();
var list = {} ;
var categories = {} ;
var category_not_present = false ;
var catalog_category = "" ;
var item_not_present = false ;
var specfic_category_present = false;
app.set('view engine','ejs');
router.get('/',function (request,response) {
    console.log(request.url);
    response.render(path.join(__dirname,'..','/views/index'),{user:request.session.theUser});

});
router.get('/index',function (request,response) {
    console.log(request.url);
    response.render(path.join(__dirname,'..','/views/index'),{user:request.session.theUser});

});

router.get('/categories',[
    query('catalog_category')
        .not().escape().trim().withMessage('Category must not contain escape sequences and spaces')
    .matches('[^A-Za-zé]+').withMessage('Category should only contain alphabets'),
    //sanitizeQuery('catalog_category').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>','[',']','\\'])
    sanitizeQuery('catalog_category').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>']),
],function (request,response) {
    catalog_category = request.query.catalog_category;
    console.log("Catalog_Category"+catalog_category);
    const errorsres = validationResult(request);
    if (!errorsres.isEmpty()) {
        console.log("Errors found ..." + errorsres.array());
        response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'400',Error:errorsres.array()});

    }
    else {

        catalog_category = request.query.catalog_category;
        console.log("Catalog_Category"+catalog_category);
        let queryres = ItemDB.getCategories();
        queryres.then(function (res1) {

            if (catalog_category === 'ALL' || catalog_category === undefined) {
                category_not_present = false;
                specfic_category_present = false;
                item_not_present = false;
                let queryres = ItemDB.getItems();
                queryres.then(function (result) {

                    response.render(path.join(__dirname, '..', '/views/categories'), {
                        user: request.session.theUser,
                        item: result,
                        cat: res1,
                        category_not_present: category_not_present,
                        category: catalog_category,
                        item_not_present: item_not_present,
                        specific_category: specfic_category_present
                    });
                })

                    .catch(function (err) {
                        console.log("Error retrieving Item data" + err);
                        response.render(path.join(__dirname, '..', '/views/partials/error'), {
                            ErrorCode: '503',
                            Error: err
                        });
                    });

            } else if (res1.indexOf(catalog_category) > -1) {
                category_not_present = false;
                specfic_category_present = true;
                item_not_present = false;
                let queryres = ItemDB.getItemsFromParticularCategory(catalog_category);
                queryres.then(function (result) {

                    response.render(path.join(__dirname, '..', '/views/categories'), {
                        user: request.session.theUser,
                        item: result,
                        cat: catalog_category,
                        category_not_present: category_not_present,
                        category: catalog_category,
                        item_not_present: item_not_present,
                        specific_category: specfic_category_present
                    });
                })
                    .catch(function (err) {
                        console.log("Error retrieving specific category Item data" + err);
                        response.render(path.join(__dirname, '..', '/views/partials/error'), {
                            ErrorCode: '503',
                            Error: err
                        });
                    });

            } else {
                category_not_present = true;
                specfic_category_present = false;
                item_not_present = false;
                let queryres = ItemDB.getItems();
                queryres.then(function (result) {

                    response.render(path.join(__dirname, '..', '/views/categories'), {
                        user: request.session.theUser,
                        item: result,
                        cat: res1,
                        category_not_present: category_not_present,
                        category: catalog_category,
                        item_not_present: item_not_present,
                        specific_category: specfic_category_present
                    });

                })
                    .catch(function (err) {
                        console.log("Error retrieving Item data" + err);
                        response.render(path.join(__dirname, '..', '/views/partials/error'), {
                            ErrorCode: '503',
                            Error: err
                        });
                    });

            }


        })
            .catch(function (err) {
                console.log("Error retrieving Categories data" + err);
                response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503', Error: err});
            });


    }
});


router.get('/item',[
    query('Item_Code')
        .not().escape().trim().withMessage('Item Code must be not contain special characters')
        .isLength({min:5}).withMessage('Item Code should be of 5 characters')
        .matches('^(?![0-9])[A-Za-z]+').withMessage('itemcode should contain alphanumeric characters'),
    sanitizeQuery('Item_Code').blacklist(['*','!','@','$','#','%','^','&','(',')','_','-','+','~','`','|',',',';',':','"','.','/','<','>'])


    ],function (request,response) {
    console.log('Item Code '+request.query.Item_Code);
    const errorsres = validationResult(request);
    if (!errorsres.isEmpty()) {
        console.log("Errors found ..." + errorsres.array());
        response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'400',Error:errorsres.array()});

    }
    else {
        var item_code = request.query.Item_Code;
        let queryres = ItemDB.getCategories();
        queryres.then(function (res1) {

            let queryres = ItemDB.getItemByItemCode(item_code);
            queryres.then(function (result) {

                if (result.length >= 1) {
                    console.log("DB contains Item");
                    item_not_present = false;
                    response.render(path.join(__dirname, '..', '/views/item'), {
                        Item: result,
                        item_not_present: item_not_present,
                        user: request.session.theUser
                    });
                } else {
                    console.log("DB contains  Not Item");
                    category_not_present = false;
                    catalog_category = 'ALL';
                    item_not_present = true;
                    specfic_category_present = false;
                    let queryres = ItemDB.getItems();
                    queryres.then(function (result) {

                        response.render(path.join(__dirname, '..', '/views/categories'), {
                            user: request.session.theUser,
                            item: result,
                            cat: res1,
                            category_not_present: category_not_present,
                            category: catalog_category,
                            item_not_present: item_not_present,
                            specific_category: specfic_category_present
                        });
                    })

                        .catch(function (err) {
                            console.log("Error retrieving Item data" + err);
                            response.render(path.join(__dirname, '..', '/views/partials/error'), {
                                ErrorCode: '503',
                                Error: err
                            });
                        });


                }
            })
                .catch(function (err) {
                    console.log("Error retrieving a particular Item data" + err);
                    response.render(path.join(__dirname, '..', '/views/partials/error'), {
                        ErrorCode: '503',
                        Error: err
                    });
                });


        })
            .catch(function (err) {
                console.log("Error retrieving Categories data" + err);
                response.render(path.join(__dirname, '..', '/views/partials/error'), {ErrorCode: '503', Error: err});
            });

    }
});




router.get('/myitems',function (request,response) {
    if (request.session.theUser){
        let user = {} ;


                let user_item_flag = false ;
                console.log("User id"+request.session.theUser.user_id);
                let user_item_query= UserItem.getUserItems(request.session.theUser.user_id);
                user_item_query.then(function (useritem) {
                    let  user_item_list = useritem ;
                    if (user_item_list.constructor === Array){
                        console.log("It is an array");
                    }
                    console.log("User item"+user_item_list);
                    if (user_item_list !== undefined){
                        user_item_flag = true ;
                    }

                    if (user_item_flag){
                        response.render(path.join(__dirname,'..','/views/myitems'),{user:request.session.theUser ,list:undefined,userlist:request.session.useritems,itempresent: false});
                    }
                    else {
                        response.render(path.join(__dirname,'..','/views/signIn'),{flag:false,sessionFailure:true,user:undefined});
                    }
                })
                    .catch(function (err) {
                        console.log("Error occurred in retrieving useritem"+err);
                        response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'503',Error:err});
                    });
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
router.get('/about',function (request,response) {
    response.render(path.join(__dirname,'..','/views/about'),{user:request.session.theUser});
});
router.get('/contact',function (request,response) {
    response.render(path.join(__dirname,'..','/views/contact'),{user:request.session.theUser});
});
router.get('/feedback',function (request,response) {
    response.render(path.join(__dirname,'..','/views/feedback'),{user:request.session.theUser});
});
router.get('/*',function (request,response) {
    response.render(path.join(__dirname,'..','/views/partials/error'),{ErrorCode:'404',Error:undefined});
});
module.exports = router;