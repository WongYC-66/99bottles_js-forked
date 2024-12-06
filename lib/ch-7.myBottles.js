// Ch-7

// 1. Factories are where conditionals go to die.
// 2. Open the factory
//  - dont use meta programming to generate the class name, u can't find by reference in future
//  - can do key/val hash map ~ its is open, but need naming convention
// 3. how about split the choosing logic to the class, the simplest way to disperse choosing logic. It might be all you need.
// 4. if want factory to be more dynamic when new class appears, 2 options:
//  - 1. The factory could dynamically figure out which classes belong on its list, or  - need some identification
//  - 2. classes who want to be on the list could explicitly ask the factory to put them there. - good , always ON
// 5. lets go for option2 :
//  - 1. holds onto the registry, and
//  - 2. provides a way for candidates to add themselves to it.
// 6. once refactored.
//   - u notice 2 ways to writing it. 
//   - first : BottleNumber.register(BottleNumber0)
//   - second: BottleNumber0.register(BottleNumber0)
//   - Choosing between depending on a class name versus depending on inheritance means placing a
//      bet on which dependency is more stable
//      Is it more likely that the name of the factory will
//      change, or that role players will stop using inheritance? If you think the factory name is more

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
        const bottleNumber = BottleNumber.for(number)

        return (
            capitalize(`${bottleNumber} `) + `of beer on the wall, ` +
            `${bottleNumber} of beer.\n` +
            `${bottleNumber.action()}, ` +
            `${bottleNumber.successor()} of beer on the wall.\n`
        );
    }

    bottleNumberFor(number) {
        // let bottleNumberClass;
        // switch (number) {
        //     case 0:
        //         bottleNumberClass = BottleNumber0
        //         break;
        //     case 1:
        //         bottleNumberClass = BottleNumber1
        //         break;
        //     default:
        //         bottleNumberClass = BottleNumber
        //         break;
        // }

        // split the choosing logic to each class.canHandle()
        // const bottleNumberClass = [
        //     BottleNumber6,
        //     BottleNumber1,
        //     BottleNumber0,
        //     BottleNumber,
        // ].find(candidate => candidate.canHandle(number));

        // use registry to OPEN
        const bottleNumberClass = BottleNumber.registry.find(
            candidate => candidate.canHandle(number)
        );

        return new bottleNumberClass(number)
    }
}

class BottleNumber {
    static for(number) {
        if (number instanceof BottleNumber) {
            return number;
        }
        let bottleNumberClass;
        switch (number) {
            case 0:
                bottleNumberClass = BottleNumber0
                break;
            case 1:
                bottleNumberClass = BottleNumber1
                break;
            case 6:
                bottleNumberClass = BottleNumber6
                break;
            default:
                bottleNumberClass = BottleNumber
                break;
        }

        return new bottleNumberClass(number)
    }

    static register(candidate) {
        BottleNumber.registry.unshift(candidate)
    }

    static canHandle(number) {
        return true;
    }

    constructor(number) {
        this.number = number
    }


    container() {
        return "bottles"
    }

    pronoun() {
        return "one"
    }

    quantity() {
        return this.number.toString()   // remain, the default
    }

    action() {
        return `Take ${this.pronoun()} down and pass it around`
    }

    successor() {
        return BottleNumber.for(this.number - 1)
    }

    toString() {
        return `${this.quantity()} ${this.container()}`
    }
}

class BottleNumber0 extends BottleNumber {
    static canHandle(number) {
        return number === 0;
    }
    quantity() {
        return 'no more'
    }

    action() {
        return `Go to the store and buy some more`
    }

    successor() {
        return BottleNumber.for(99)
    }
}

class BottleNumber1 extends BottleNumber {
    static canHandle(number) {
        return number === 1;
    }
    container() {
        return "bottle"
    }
    pronoun() {
        return "it"
    }
}

class BottleNumber6 extends BottleNumber {
    static canHandle(number) {
        return number === 6;
    }
    container() {
        return "six-pack"
    }
    quantity() {
        return '1'
    }
}

// registry concept
BottleNumber.registry = [BottleNumber];
BottleNumber.register(BottleNumber0);
BottleNumber.register(BottleNumber1);
BottleNumber.register(BottleNumber6);

export { Bottles }