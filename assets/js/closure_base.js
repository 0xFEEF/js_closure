

'use strict';

let banana_provider = undefined; //< banana supplier (no banana by def)

function table_scope() {

    let bananas = banana_provider; //< bananas on the table

    function look() { //< our 'look' function
        return bananas;
    }

    // some service functions
    function eat() { //< eat one banana
        if(bananas) bananas--;
    }

    return {look, eat} //< return the interface

}

// the CODE

    let closure0 = table_scope() //< create the closure!

    let bananas = closure0.look() //< undefined (no banana in the SCOPE!)
    console.log("SCOPE0: ", bananas) //< undef

    // SCOPE1 : someone put 3 bananas!
    banana_provider = 3;
    let closure1 = table_scope() //< create the closure for the SCOPE1
    bananas = closure1.look() //< really, 3 bananas exist!
    console.log("SCOPE1: ", bananas) //< display banana cnt

    // SCOPE2 : someone put 10 bananas!
    banana_provider = 10;
    let closure2 = table_scope() //< create the closure for the SCOPE2
    bananas = closure2.look() //< really, 10 bananas exist!
    console.log("SCOPE2: ", bananas) //< display banana cnt (10)

    /*
     So, finally, we have 3 absolutely different closures:
     with NO bananas
     with 3 bananas
     with 10 bananas
     */

    // do eat one banana! (SCOPE2 environment)
    closure2.eat()
    console.log("SCOPE2:(ate one) ", closure2.look()) //< 9 bananas! (one ate)

    null;