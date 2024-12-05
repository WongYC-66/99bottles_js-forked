// Ch-6
// new requirement: users have requested that you alter the 99 Bottles code to output "1
// six-pack" in each place where it currently says "6 bottles."

// openness
// 1. sadly, still not open to six-pack requirement
//   - if we dont wan openness, we could modify BottleNumber class, adding conditionals.
// 2. lets fix  data clump, add factory, fix liskov violation, and meet six-pack.
//  - notice quantity and container, appears together twice!.
//  - add toString method to BottleNumber to combine them
// 3. in verse(), there a empty-line before return. HUH ? its means diff responsibility
// 4. look at 5-flocks method, u notice conditionals still exist, to refactor,
//   got 2 popular wayL
//   a. Replace Conditional with State/Strategy / composition   - tho, modern recommended thi
//   b. Replace Conditional with Polymorphism / Inheritance     - we picked this
// how to choose? experience / practice
// 5. Lets do polymorphism by dismembering the conditionals
//  - BottleNumber class seems special about number 0 and number 1
//  - starts with 0
//  - create class BottleNumber0
//  - copy a method obssesed by num 0, e.g. quantity()
//  - remove unrelated conditions 
//  - now, our Bottles.verse() facing dilemma, too coupled with BottleNumber, cant use BottleNumber0
// 6. to choose the right role-playing class for specific condition,
//   - only 1 place, "factory"
//   - now refactor to isolate the creation of bottle class. i.e bottleNumberFor(number)
//   - refactor verse()
//   - once ok, remove the true branch for BottleNumber.quantity()
// 7. the is the power of polymophilism, 1 subclass handle the conditionals, continue for the rest.
//   steps:
//      1. Create a subclass to stand in for the value upon which you switch.
//          a. Copy one method that switches on that value into the subclass.
//          b. In the subclass, remove everything but the true branch of the conditional.
//              i. At this point, create a factory if it does not yet exist, and
//              ii. Add this subclass to the factory if not yet included.
//          c. In the superclass, remove everything but the false branch of the conditional.
//          d. Repeat steps a-c until all methods that switch on the value are dispersed.
//      2. Iterate until a subclass exists for every different value upon which you switch.
// 8. finished the BottleNumber0
// 9. now do BottleNumber1, remember to add this class to factory for the test
// 10. great, how many variant / which number most alike / which num diff / whats the rule to determine number next.
//      -  3, 2-99, 0 and 1 diff, successor to determine, but.. kinda wrong here coz successor is a primitive e.g. Number, instead of class
// 11. lets fix successor()
//   - successor now must able to reach the factory, so we put a static for() at BottleNumber class
//   - refactor the factory at Bottles class
//   - make it liskov, make succesor() return an class instance
// 12. ok now. its open, for 6-pack requirement.
//   - before that, now is TDD mode, add test case for this.
//   - after that implement BottleNumber6 with this test
//   - do quantity() and container()
//   - wow so easy to add this requirement, now hardwork is paid off.

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
        // data clump here :(, means you are missing a concept., looks fine here, but over time, it will grow, here or everywhre
        // const bottleNumber = new BottleNumber(number)
        // const nextBottleNumber = new BottleNumber(bottleNumber.successor())

        // DONT DO THIS, its counterproductive
        // const bottleNumber =
        //     new (number === 0 ? BottleNumber0 : BottleNumber)(number);
        // const succ = bottleNumber.successor();
        // const nextBottleNumber =
        //     new (succ === 0 ? BottleNumber0 : BottleNumber)(number);

        // Do this instead
        // const bottleNumber = this.bottleNumberFor(number)
        // const nextBottleNumber = this.bottleNumberFor(bottleNumber.successor())

        const bottleNumber = BottleNumber.for(number)
        // const nextBottleNumber = BottleNumber.for(bottleNumber.successor())
        // const nextBottleNumber = bottleNumber.successor()       // an improvement, liskov , but only used once, so no need.


        return (
            // `${capitalize(bottleNumber.quantity())} ${bottleNumber.container()} of beer on the wall, ` +
            capitalize(`${bottleNumber} `) + `of beer on the wall, ` +

            // `${bottleNumber.quantity()} ${bottleNumber.container()} of beer.\n` +
            // `${bottleNumber.toString()} of beer.\n` +
            `${bottleNumber} of beer.\n` +

            `${bottleNumber.action()}, ` +

            // `${nextBottleNumber.quantity()} ${nextBottleNumber.container()} of beer on the wall.\n`
            // `${nextBottleNumber.toString()} of beer on the wall.\n`
            // `${nextBottleNumber} of beer on the wall.\n`
            `${bottleNumber.successor()} of beer on the wall.\n`
        );
    }

    bottleNumberFor(number) {
        // too coupled
        // if (number === 0) {
        //     return new BottleNumber0(number)
        // } else {
        //     return new BottleNumber(number)
        // }



        let bottleNumberClass;
        // if (number === 0) {
        //     bottleNumberClass = BottleNumber0
        // } else {
        //     bottleNumberClass = BottleNumber
        // }

        // add bottleNumber1 in
        switch (number) {
            case 0:
                bottleNumberClass = BottleNumber0
                break;
            case 1:
                bottleNumberClass = BottleNumber1
                break;
            default:
                bottleNumberClass = BottleNumber
                break;
        }

        return new bottleNumberClass(number)
    }
}

class BottleNumber {
    static for(number) {     // good name, instead of bottleNumberFor too coupled
        // temporarily guarded
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

    constructor(number) {
        this.number = number
    }

    container() {
        // if (this.number === 1) {
        // return "bottle"
        // } else {
        return "bottles"
        // }
    }

    pronoun() {
        // if (this.number === 1) {
        // return "it"
        // } else {
        return "one"
        // }
    }

    quantity() {
        // if (this.number === 0) {
        // return 'no more'
        // } else {
        return this.number.toString()   // remain, the default
        // }
    }

    action() {
        // if (this.number === 0) {
        // return `Go to the store and buy some more`
        // } else {
        return `Take ${this.pronoun()} down and pass it around`
        // }
    }

    successor() {
        // if (this.number === 0) {
        // return 99;
        // } else {
            // return this.number - 1;
        // }
            
        // 
        return BottleNumber.for(this.number - 1)
    }

    // solving data clump
    toString() {
        return `${this.quantity()} ${this.container()}`
    }
}

class BottleNumber0 extends BottleNumber {
    quantity() {
        // if (this.number === 0) {
        return 'no more'
        // } else {
        // return this.number.toString()
        // }
    }

    action() {
        return `Go to the store and buy some more`
    }

    successor() {
        // return 99;
        return BottleNumber.for(99)
    }
}

class BottleNumber1 extends BottleNumber {
    container() {
        return "bottle"
    }
    pronoun() {
        return "it"
    }
}

class BottleNumber6 extends BottleNumber {
    container() {
        return "six-pack"
    }
    quantity(){
        return '1'
    }
    // don do this, this will mislead future programmer
    // toString(){
    //     return '1 six-pack'
    // }
}


export { Bottles }