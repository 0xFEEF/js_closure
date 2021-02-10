

'use strict';

// let banana_provider = undefined; //< banana supplier (no banana by def)

// Factory method: fruits scope
function fruits_scope(fruits = undefined) {

    // let bananas = banana_provider; //< bananas on the table

    function look() { //< our 'look' function
        return fruits;
    }

    // some service functions
    function eat(name) { //< eat one fruit by name
        if(fruits && fruits[name]) fruits[name] = fruits[name] - 1
    }
    function add(name) { //< add one fruit by name
        if(fruits) fruits[name] = fruits[name] ? fruits[name]+1 : 1
    }

    return {look, eat, add} //< return the Factory object

}

// the CODE

let closure0 = fruits_scope() //< create the closure!

let fruits = closure0.look()
console.log("SCOPE0: ", fruits) //< fruits!

// SCOPE1 : someone put 3 bananas and 2 apples
// banana_provider = 3;
let closure1 = fruits_scope({bananas:3, apples:2}) //< create the closure for the SCOPE1
fruits = closure1.look()
console.log("SCOPE1: ", fruits) //< display 3banana & 2apples set

// SCOPE2 : someone put 10 bananas & 5 apples
// banana_provider = 10;
let closure2 = fruits_scope({bananas:10, apples:5}) //< create the closure for the SCOPE2
fruits = closure2.look()
console.log("SCOPE2: ", fruits) //< display fruits set

/*
 So, finally, we have 3 absolutely different closures:
 with NO fruits
 with 3/2
 with 10/5
 */

// do CHANGE the SCOPE2 environment!
closure2.eat('bananas') //< -1 banana
closure2.add('apples')  //< +1 apple
closure2.add('orange')  //< +1 orange (NEW fruit!)
console.log("SCOPE2:(new env.) ", closure2.look())

// DONE!
null;