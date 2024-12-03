// Ch-3
// new requirement: users have requested that you alter the 99 Bottles code to output "1
// six-pack" in each place where it currently says "6 bottles."


// 1. adding the case of 6 / 7 is reproducing conditionals, how about future change?
// 2. now we do refactor by SOLID principle. principle of O - Open-Closed Principle, does current code
//   open to accept change for new requirment ? No!
// 3. recognize code smells to refactor - so many duplication!
// 4. how to refactor? one-line change, test, if failed, undo.
// Flocking Rules
//   1. Select the things that are most alike.
//   2. Find the smallest difference between them.
//   3. Make the simplest change that will remove that difference.
// 5. naming concepts : bottle vs bottles
//  - make a table to think the name, normally 1 level abstraction above
//  -     Number |   xxx ?
//  -        1   |   bottle  
//  -        6   |   six-pack 
//  -        n   |   bottles 
//  - Dont use unit, too many levels above abstract
//  - lets call it container atm.


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
        switch (number) {
            case 0:
                return (
                    'No more bottles of beer on the wall, ' +
                    'no more bottles of beer.\n' +
                    'Go to the store and buy some more, ' +
                    '99 bottles of beer on the wall.\n'
                );
            case 1:
                return (
                    '1 bottle of beer on the wall, ' +
                    '1 bottle of beer.\n' +
                    'Take it down and pass it around, ' +
                    'no more bottles of beer on the wall.\n'
                );

            // after refactor, case 2 same as default, obsolete
            // case 2:
            //     return (
            //         `${number} ${this.container(number)} of beer on the wall, ` +
            //         `${number} ${this.container(number)} of beer.\n` +
            //         `Take one down and pass it around, ` +
            //         `${number - 1} ${this.container(number - 1)} of beer on the wall.\n`
            //     );

            // BAD, the conditionals are reproducing. STOP THIS NOW
            // case 6:
            //     return '1 six-pack of beer on the wall, ' +
            //         '1 six-pack of beer.\n' +
            //         'Take one down and pass it around, ' +
            //         '5 bottles of beer on the wall.\n';
            // case 7:
            //     return '7 bottles of beer on the wall, ' +
            //         '7 bottles of beer.\n' +
            //         'Take one down and pass it around, ' +
            //         '7 bottles of beer on the wall.\n';

            default:
                return (
                    `${number} ${this.container(number)} of beer on the wall, ` +
                    `${number} ${this.container(number)} of beer.\n` +
                    `Take one down and pass it around, ` +
                    `${number - 1} ${this.container(number - 1)} of beer on the wall.\n`
                );
        }

    }

    container(number) {
        if(number === 1){       // dont use one-liner now, will refactor later again
            return "bottle"
        } else {
            return "bottles"
        }
    }
}

export { Bottles }