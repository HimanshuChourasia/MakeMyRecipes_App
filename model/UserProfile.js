var userItem = require('./UserItem');
var userprofile = class UserProfile{
    constructor(user_id,useritem_list){
        this.user_id = user_id ;
        this.useritem_list = useritem_list ;
    }
     addItem(useritemcode,userrating,usermadeit,usercategory,useritemname){

        if (this.checkItem(useritemcode)) {
            return this.useritem_list;
        }
        else {
            let useritem = new userItem(useritemcode,userrating,usermadeit,usercategory,useritemname);
            this.useritem_list.push(useritem);
            return this.useritem_list;
        }
    }

     checkItem(uitem){
        let flag  = false ;
        for (let i = 0 ; i < this.useritem_list.length ; i++){
            if (this.useritem_list[i].getUserItemCode() === uitem){
                flag = true ;
            }
            if (flag) {
                break ;
            }
        }
        return flag ;
    }
    removeItem(Useritem){
        let objectpresent = false ;
        for (let i = 0 ; i < this.useritem_list.length ; i++){
            if (this.useritem_list[i].getUserItemCode() === Useritem){
                console.log('Object found removing the object');
                objectpresent = true ;
                this.useritem_list.splice(i,1);
                break;
            }
        }
        if (objectpresent === false){
            console.log('Error removing object not found');
            return this.useritem_list ;
        }
        else
        {
            console.log('Object removed successfully');
            return this.useritem_list ;
        }
    }

    updateItem(useritemcode,userrating,usermadeit,usercategory,useritemname){
        let objectpresentflag = false;
        for (let i = 0 ; i < this.useritem_list.length ; i++){

            if (this.useritem_list[i].getUserItemCode() === useritemcode){
                console.log('Object found');
                objectpresentflag = true ;
                this.removeItem(useritemcode);
                let useritem = new userItem(useritemcode,userrating,usermadeit,usercategory,useritemname);
                this.useritem_list.push(useritem);
                break ;
            }

        }
        if (objectpresentflag === false){
            console.log('Object not found');
            return this.useritem_list ;
        }
        else {
            return this.useritem_list ;
        }
    }

    getItems(){
        return this.useritem_list ;
    }

    emptyProfile(){
        this.useritem_list = [] ;
        return this.useritem_list ;
    }





};
module.exports = userprofile ;