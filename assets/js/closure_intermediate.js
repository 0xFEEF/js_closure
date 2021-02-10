
'use strict';

// Factory method: fruits scope (spoiled feature)
function fruits_scope(fruits = undefined, spoiled_cb = undefined) {

    let idTmr = null;

    function look() { //< our 'look' function
        return fruits;
    }

    // some service functions
    function eat(name) { //< eat one fruit by name
        if(fruits && fruits[name]) fruits[name] = fruits[name] - 1
    }
    function add(name) { //< add one fruit by name
        if(fruits) fruits[name] = fruits[name] ? fruits[name]+1 : 1
        if(!idTmr) {setSpoiledTimeout()} //< !!!
    }

    // private methods
    if(fruits) {
        setSpoiledTimeout();
    }
    function setSpoiledTimeout() {
        idTmr = setInterval( (arg) =>{
            let freshCnt = 0;
            for(let fruit in fruits) {
                if(fruits[fruit] && fruits.hasOwnProperty(fruit)) {
                    fruits[fruit] = fruits[fruit] - 1;
                    freshCnt += fruits[fruit]; //< total count
                    if(spoiled_cb) spoiled_cb (fruit, fruits[fruit]);
                }
            }
            if(freshCnt ===0) { //< if ALL fruits spoiled!
                clearInterval(idTmr); idTmr = null;
                spoiled_cb("all spoiled", -1)
            }
        }, 4000, undefined)
    }

    return {look, eat, add} //< return the Factory object

}

// the CODE

// SCOPE1 : someone put 3 bananas and 2 apples
let closure1 = fruits_scope({bananas:3, apples:2},
    (fruit, num)=>{console.log("SCOPE1.T", fruit, num)}
    )

// SCOPE2 : someone put 2 bananas & 1 apples
let closure2 = fruits_scope({bananas:2, apples:1},
    (fruit, num)=>{
        console.log("SCOPE2.T", fruit, num)
        if(num===-1) { //< if all fruits expired!
            // for example, if all expired - add new one (for scope2 only)
            closure2.add('bananas');
            closure2.add('apples');
        }
    }
    )

// DONE!
null;