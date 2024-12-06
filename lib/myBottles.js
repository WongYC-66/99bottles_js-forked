// Ch-8

// 1. remember the line break at BottleNumber.for

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
}

class BottleNumber {
    static register(candidate) {
        BottleNumber.registry.unshift(candidate)
    }
    static for(number) {
        const bottleNumberClass = BottleNumber.registry.find(
            candidate => candidate.canHandle(number)
        );
        return new bottleNumberClass(number)
    }

    static canHandle() {
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