// Ch-5
// new requirement: users have requested that you alter the 99 Bottles code to output "1
// six-pack" in each place where it currently says "6 bottles."

// 1. is it open for requirement now ? sadly No, but is improved
// 2. code smell, u notice the method(5 flock) has same pattern , right?, if-else x5
//  - any methods have same shape?
//  - Squint Test
//  - do any methods take same argument? (5flock + 1)
//  - but, verse(number) vs other 5flocks(number), there is a difference
//  - in verse, u can have number and number's successor, so they are different
//  - instead, verse take a "verse number", and pass "bottle Number" to 5 flocks method
//  - if we gonna break the code into classes, wheres the dividing line? - after verse, before 5 flocks
//  - do the tests in the conditionals has common? - yes, test number equal something
//  - how many branches for the conditionals?   - 2
//  - do the methods have other code rather than conditionals? - no
//  - these 5 flock methods, depend on number or depend on the class as a whole? - more on number
//  - so 5 flockes method, are a category, another 3 methods is 2nd category
// 3. there’s a big difference between a conditional that selects the correct object and one
// that supplies behavior. The first is acceptable and generally unavoidable. The second suggests
// that you are missing objects in your domain.
// 4. from previous, certain methods depend on the argument passed in rather than depend on class, so a new class maybe? 
// Primitive Obsession - cure is new class babe
//  - what name ? BottleNumber / ContainerNumber
//  - Container number seems another level of abstraction above, so not adopted.
//  - create new class BottleNumber{}
//  - copied same shit to new class, prove syntax correct
//  - gradually parsed and replace the original class.
//  - resist the urge to modify ugly , keep replacing for 5 methods in original
// 5. removing arguments of BottleNumber 5-flocks
//  - do it slowly, replace with this.number
//  - can add "guard" to check if the original has passed in argument, to be deleted later
//  - once confirmed the original class didnt pass in any argument, can remove the number argument
//  - steps are correctly, just that action() is still passing argument when u refactor pronoun()
//  - step summary: 
//     1. Alter the method definition to replace occurrences of the argument with references to the
//      property of the same name.
//     2. Change every sender of the message to remove the parameter.
//     3. Add a temporary guard clause to the method body.
//     4. Delete the argument and guard clause from the method definition.
// 6. how many time we creating new instance of BottleNumber ? 9*100 = 900
//  - caching it
//  - but bottleNumber.successor is violation of Liskov Substitution, succesor is not returning a BottleNumber instance, but a number...
//  - temporarily fix this by nextBottleNumber

import { capitalize, downTo } from "./helpers.js"

class Bottles {
    song() {
        return this.verses(99, 0)
    }

    verses(starting, ending) {
        return downTo(starting, ending)
            .map(i => this.verse(i))
            .join('\n')
    }

    verse(number) {
        const bottleNumber = new BottleNumber(number)   // caching
        const nextBottleNumber = new BottleNumber(bottleNumber.successor())  // caching

        // A violation of Liskov
        // return (
        //     `${capitalize(bottleNumber.quantity())} ${bottleNumber.container()} of beer on the wall, ` +
        //     `${bottleNumber.quantity()} ${BottleNumber.container()} of beer.\n` +
        //     `${bottleNumber.action()}, ` +
        //     `${bottleNumber.successor.quantity()} ${bottleNumber.successor()} of beer on the wall.\n`
        // );

        return (
            `${capitalize(bottleNumber.quantity())} ${bottleNumber.container()} of beer on the wall, ` +
            `${bottleNumber.quantity()} ${bottleNumber.container()} of beer.\n` +
            `${bottleNumber.action()}, ` +
            `${nextBottleNumber.quantity()} ${nextBottleNumber.container()} of beer on the wall.\n`
        );


        return (
            `${capitalize(this.quantity(number))} ${this.container(number)} of beer on the wall, ` +
            `${this.quantity(number)} ${this.container(number)} of beer.\n` +
            `${this.action(number)}, ` +
            `${this.quantity(this.successor(number))} ${this.container(number - 1)} of beer on the wall.\n`
        );
    }

    container(number) {
        return new BottleNumber(number).container();
        // if (number === 1) {       // dont use one-liner now, will refactor later again
        //     return "bottle"
        // } else {
        //     return "bottles"
        // }
    }

    pronoun(number) {
        return new BottleNumber(number).pronoun();
        // if (number === 1) {       // dont use one-liner now, will refactor later again
        //     return "it"
        // } else {
        //     return "one"
        // }
    }

    quantity(number) {
        return new BottleNumber(number).quantity();
        // if (number === 0) {
        //     return 'no more'
        // } else {
        //     return number.toString()
        // }
    }

    action(number) {
        return new BottleNumber(number).action();
        // if (number === 0) {
        //     return `Go to the store and buy some more`
        // } else {
        //     return `Take ${this.pronoun(number)} down and pass it around`
        // }
    }

    successor(number) {
        return new BottleNumber(number).successor();
        // if (number === 0) {
        //     return 99;
        // } else {
        //     return number - 1;
        // }
    }
}

class BottleNumber {
    constructor(number) {
        this.number = number
    }

    container() {
        // if(arguments.length !== 0){
        //     throw("wrong number of arguments")
        // }
        if (this.number === 1) {       // dont use one-liner now, will refactor later again
            return "bottle"
        } else {
            return "bottles"
        }
    }

    pronoun() {
        // if(arguments.length !== 0){
        //     throw("wrong number of arguments")
        // }
        if (this.number === 1) {       // dont use one-liner now, will refactor later again
            return "it"
        } else {
            return "one"
        }
    }

    // quantity(number) {
    quantity() {
        // if(arguments.length !== 0){
        //     throw new Error("wrong number of arguments")
        // }
        if (this.number === 0) {
            return 'no more'
        } else {
            return this.number.toString()
        }
    }

    action() {
        // if(arguments.length !== 0){
        //     throw("wrong number of arguments")
        // }
        if (this.number === 0) {
            return `Go to the store and buy some more`
        } else {
            return `Take ${this.pronoun()} down and pass it around`
        }
    }

    successor() {
        // if(arguments.length !== 0){
        //     throw("wrong number of arguments")
        // }
        if (this.number === 0) {
            return 99;
        } else {
            return this.number - 1;
        }
    }
}


export { Bottles }