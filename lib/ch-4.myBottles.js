// Ch-4
// new requirement: users have requested that you alter the 99 Bottles code to output "1
// six-pack" in each place where it currently says "6 bottles."


// 1. flocking rules again, do horizontal refactoring for "it" and "one". Make the simplest change that will remove that difference.
// 2. naming concepts : 
//  -     Number |   xxx ?
//  -       99   |   '99'
//  -       50   |   '50' 
//  -        1   |   '1' 
//  -        0   |   'no more 
//  - Quantity it is.
// 3. refactor quanttiy and remove redundant case 1
// 4. refactor case 0 / default, 1st line, use capitalize(this.quantity(number))
// 5. refactor case 0 / default, 2nd line, use this.quantity(number)
// 6. refactor case 0 / default, 3rd line, define new method i.e. action()
// 7. refactor case 0 / default, 4th line, 
//  - whats this 99 and number - 1
//  - make a switch case in quantity() ?
//  - the test case would pass, but not correct abstraction
//  - case 0 : 99, default: number - 1
//  - case 50: 49
//  - case 1 : 0
//  - see the pattern, its like a succesor
//  - dont disturb quantity() method, as it only take a number and output string.
//  - so create a successor method
//  - refactor it
// 8. now case 0, and default identical, redundant.

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
        return (
            `${capitalize(this.quantity(number))} ${this.container(number)} of beer on the wall, ` +
            `${this.quantity(number)} ${this.container(number)} of beer.\n` +
            `${this.action(number)}, ` +
            `${this.quantity(this.successor(number))} ${this.container(number - 1)} of beer on the wall.\n`
        );

        switch (number) {
            case 0:
                return (
                    `${capitalize(this.quantity(number))} ${this.container(number)} of beer on the wall, ` +
                    `${this.quantity(number)} ${this.container(number)} of beer.\n` +
                    `${this.action(number)}, ` +
                    // `${this.quantity(number - 1)} ${this.container(number - 1)} of beer on the wall.\n`
                    `${this.quantity(this.successor(number))} ${this.container(number - 1)} of beer on the wall.\n`
                );

            // after refactor, same as default, redunddant
            // case 1:
            //     return (
            //         `${number} ${this.container(number)} of beer on the wall, ` +
            //         `${number} ${this.container(number)} of beer.\n` +
            //         `Take ${this.pronoun(number)} down and pass it around, ` +
            //         `${this.quantity(number - 1)} ${this.container(number - 1)} of beer on the wall.\n`
            //     );

            default:
                return (
                    `${capitalize(this.quantity(number))} ${this.container(number)} of beer on the wall, ` +
                    `${this.quantity(number)} ${this.container(number)} of beer.\n` +
                    `${this.action(number)}, ` +
                    `${this.quantity(this.successor(number))} ${this.container(number - 1)} of beer on the wall.\n`
                );
        }

    }

    container(number) {
        if (number === 1) {       // dont use one-liner now, will refactor later again
            return "bottle"
        } else {
            return "bottles"
        }
    }

    pronoun(number) {
        if (number === 1) {       // dont use one-liner now, will refactor later again
            return "it"
        } else {
            return "one"
        }
    }

    quantity(number) {
        if (number === 0) {
            return 'no more'
        } else {
            return number.toString()
        }

        // dont do this, wrong conditionals, not correct abstraction,3 conditional branches is bad, think harder!
        // switch (number) {
        //     case -1:
        //         return '99';
        //     case 0:
        //         return 'no more';
        //     default:
        //         return number.toString();
        // }
    }

    action(number) {
        if (number === 0) {
            return `Go to the store and buy some more`
        } else {
            return `Take ${this.pronoun(number)} down and pass it around`
        }
    }

    successor(number) {
        if (number === 0) {
            return 99;
        } else {
            return number - 1;
        }
    }
}

export { Bottles }