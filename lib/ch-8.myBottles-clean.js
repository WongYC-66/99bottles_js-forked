// Ch-8

import { capitalize, downTo } from "./helpers.js"

class Bottles {
    constructor(verseTemplate = BottleVerse){ 
        this.verseTemplate = verseTemplate
    }
    song() {
        return this.verses(99, 0)
    }

    verses(starting, ending) {
        return downTo(starting, ending)
            .map(i => this.verse(i))
            .join('\n')
    }

    verse(number) {
        return this.verseTemplate.lyrics(number);
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
        return this.number.toString()
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

class BottleVerse {
    static lyrics(number){
        return new BottleVerse(BottleNumber.for(number)).lyrics();   // wishful
    }

    constructor(bottleNumber) {
        this.bottleNumber = bottleNumber
    }
    lyrics() {
        return (
            capitalize(`${this.bottleNumber} `) + `of beer on the wall, ` +
            `${this.bottleNumber} of beer.\n` +
            `${this.bottleNumber.action()}, ` +
            `${this.bottleNumber.successor()} of beer on the wall.\n`
        );
    }
}

BottleNumber.registry = [BottleNumber];
BottleNumber.register(BottleNumber0);
BottleNumber.register(BottleNumber1);
BottleNumber.register(BottleNumber6);

export { Bottles }