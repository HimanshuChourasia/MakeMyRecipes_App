const comparearr = function comparearrays(arr1,arr2){
    let boolean_present = false ;
    console.log("Compare Items ..."+ arr1.length + "  "+arr2.length);
    if( !(arr1.length >=1 || arr2.length >= 1))
    {
        console.log("Array not found");
        return boolean_present;
    }
    else {
        for (let j = 0; j < arr2.length; j++) {
            for (let i = 0; i < arr1.length ; i++) {
                console.log("Array of arr1"+arr1[i]);
                console.log("Array of arr2"+arr1[j]);
              if (arr1[j] == arr2[i]) {
                console.log("Item present");
                boolean_present = true;
                break;
            } else {
                console.log("Item not found");
                boolean_present = false;
            }

            }
            if (!boolean_present) {
                console.log("Item not found in the arraylist");
                break;
            }
        }
        return boolean_present;

    }


};
module.exports = {
    comparearrays : comparearr
} ;

