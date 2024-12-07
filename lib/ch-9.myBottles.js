// Ch-9
// 1. test not only can tell u right or wrong, it helps refactoring too.
//    - if hard to test, its bad design
//    - it let future reader understand domain well too
// 2. now our test is no longer unit test, but instead a integration test xD
// 3. unit test for every class, and for every class's public API
// 4. some test feel like circular and waste of time. e.g expect(new BottleNumber1(1).pronoun()).toBe('it');
//  - no adding value , waste of time/money
//  - then dont do it, treat as exception, have "foregoing test", let this be tested at other unit test
//  - since we refactor so nicely and tiny, it should be easy to test
//  - 100% test coverage  means 100% of the public methods should have their own personal tests
// 5. consider size and complexity, visibility for a test
// 6. since BottleNumbers only work and claled by BottleVerse, no other dependant
//  - make a integral test for BottleVerse, test those bottleNumbers
//  - because bottleNumbers are small/simple/invisible from outside of BottleVerse/not used by other
// 7. Add test for BottleNumber.for factory
//  - all code needs to be tested, some tests aren’t worth writing.
// 8. BottleVerse need its own unit test bcoz code complexity + public visibility
//  - at least 1 test for static lyrics
//  - what do test? refactor the integrated test to BottleVerse, slowly, 
//  - now, u miss something - a oppoturnity yot tell future reader, 
// 9. revealing intention - verse general rule upper bound /  verse general rule lower bound'
//      - this is a verse test
//      - a rule exists
//      - it applies to most verses
//      - it involves a range
//      - one test is for the upper bound
//      - the other test is for the lower bound
//   - create verse 6 and verse 7 test
// 10. next, Bottles
//  - whats Bottles responsbility? looks like a Song, or better CountDownSong
//  - rename test and its unit test to new class name
//  - but current test so coupled with 99bottles beer
//  - story told by these tests is not the story of CountdownSong. Tests should explain the essence of a class.
//  - use a more simple test to tell its a countdown
// 11. create VerseFake for the test
//  - test the CountdownSong.verse()
//  - case of 2,1,0 are redundant 
//  - add test  case for .verse() method
//  - improve  a couple verses -> verses
// 12. lastly .song() method
//  - current test test line 99 to line 0, crippingly restrictive, maybe?
//  - inject the 99 and 0 instead of hardcoded it, inversion!
//  - add test
// 13. almost done. 1 last thing. Does ur test communicating with future?
//  - try to use some prime number . 
//  - about role of API, javascript dont hv type checking.
//    whatu could do:
//    1. Tell everyone to implement the correct API in their role players.
//    Say "Hey, everyone should make their verse template objects respond to lyrics(number)"
//    at regular intervals.
//    2. Programmatically verify that all players of a role respond to messages in that role’s API.
//    Test that each player responds to lyrics.
//    3. Programmatically verify that all players of a role respond to its API, including defining the
//    correct number of parameters.
//    Test that each player responds to lyrics, and that lyrics has one parameter.
//    4. Programmatically verify that all players of a role respond to its API, define the correct
//    number of parameters, receive arguments of the correct types, and return the expected
//    type.
//    Test that each player responds to lyrics(arg), that arg is a number, and that the result is
//    a string.
//    5. Switch to a language with compiler guaranteed interfaces.
//  - often until step 2 would suffice.
//  - add testPlaysVerseRole(BottleVerse);
//  - duck typing for VerseFake test
// 14. lastly, check any obsolete contents?
//      - constructor(verseTemplate = BottleVerse, max = 99, min = 0){
//      - we dont neet default now, all test has that covered
//      - but max and min, we could tell future user how is the range.
//     - make it max 99999 min 0

import { capitalize, downTo } from "./helpers.js"

// class Bottles {
//     constructor(verseTemplate = BottleVerse){   // inject 
//         this.verseTemplate = verseTemplate
//     }
//     song() {
//         return this.verses(99, 0)
//     }

//     verses(starting, ending) {
//         return downTo(starting, ending)
//             .map(i => this.verse(i))
//             .join('\n')
//     }

//     verse(number) {
//         return this.verseTemplate.lyrics(number); 
//     }
// }

class CountdownSong {
    // constructor(verseTemplate = BottleVerse, max = 99, min = 0){   // inject 
    constructor(verseTemplate, max = 9999999, min = 0){   // future reader know the range
        this.verseTemplate = verseTemplate
        this.max = max
        this.min = min
    }
    song() {
        return this.verses(this.max, this.min)
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

class VerseFake{
    static lyrics(number){
        return `This is verse ${number}.\n`     // break many rules 
        // 1. naming rule should not contains TestDouble, Dummy, Stub, Spy, Mock, Fake, and Temporary Test Stub
        // 2. domain bhaviour should appear only at instance method
        // but rules is to help us save money, we broke the rule to save money :)
    }
}


// registry concept
BottleNumber.registry = [BottleNumber];
BottleNumber.register(BottleNumber0);
BottleNumber.register(BottleNumber1);
BottleNumber.register(BottleNumber6);

export { 
    // Bottles, 
    CountdownSong, 
    BottleNumber, 
    BottleVerse, 
    BottleNumber0, 
    BottleNumber1, 
    BottleNumber6,
    VerseFake 
}