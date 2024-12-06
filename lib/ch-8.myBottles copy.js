// Ch-8

// 1. remember the line break at Bottles.verse(), diff resposibility, BUT, shall we change to make it more complex? before new requirment comes, leave it as it be
//  - judge by ur experience/pratice, what u do now willbe only opportunity lost due to time spent on this


// new requirement - Your customer wants other songs that are similar to "99 Bottles" but contain different lyrics.

// 2. - how similar, any song that also coutndown
//  - is it open for this? no
//  - how to make it open ? dont know
//  - code smell ? maybe verse()
//  - how? try write conditoinals to make it clearer
// 3. from verse() pesudo, our code smell tell us to refactor verse, like to extract class for each conditionals
//  . steps are same as chapter 5
//   - Choose a class name and create the new class.
//   - Add a property and a constructor method to encapsulate primitive data.
//   - Copy the methods from the old class to the new.
//   - Forward messages from the old class to the new.
//   - One by one, remove arguments from the methods in the new class, and corresponding
//   - parameters from the message sends in the old class.
// 4. so, default is new BottleVerse class {}
//  - copy the verse()
//  - execute in Bottles.verse() to ensure syntax correct
//  - then comment out
//  - return new BottleVerse(number).verse(number)
//  - but this seems redundant to send number twice. 
//  - true, because TTD not yet, coz we follow the slow path to refactor
// 5. so now, we can reduce the duplicate number like in chapter 5, but wishful thinking. 
//  - what we want? we want lyrics.
//  - BottleVerse.new(number).lyrics, add this line to Bottles, but commented
// 6.- Inverting Dependencies
//  - sadly , still not open to new requirement.
//  - Bottles and BottleVerse too coupled. So, without adding conditionals, 
//  - abstraction is Bottles understands an object which can provide lyrics
//  - verse template
//   steps we used:
//    1. Identify the code you want to vary.
//    2. Name the underlying concept.
//    3. Extract the identified code into its own class.
//    4. Inject this new role-playing object back into the object from which it was extracted.
//    5. Forward messages from the original class to the injected object.
//  - definition of Dependency Inversion principle:
//    1. High-level modules should not depend upon low-level modules. Both should depend upon
//      abstractions.
//    2. Abstractions should not depend upon details. Details should depend upon abstractions.
//  - in our case , it means Bottles should depend on the verseTemplate abstraction rather than the
//    BottleVerse concretion.
//  7. we should able to meet new requirement now. but, Law of Demeter(another aesthetic)
//   - return new this.verseTemplate(number).lyrics();
//    - new expects argument
//    - new object returned must have lyrics method
//    - lyrics returns actually lyric
//    - too much dependencies, = vulnerabilities, cant be avoided, but must be minimized
//    - bad example -> return this.bestFriend.pet().preferredToy().durability();
//    - good example -> 'AbCdE'.repeat(2).replace('C', '!').toLowerCase().slice(1) // -> 'b!deabcde'
//    - definition of the Law od Demeter: from within a method, messages should be sent only to:
//       :objects that are passed in as arguments to the method
//       :objects that are directly available to self
//    - From the message-senders point of view, an object may talk to its direct neighbors but not to its neighbor’s neighbors.
//    - so how did this violate LoD ?
//    - new is a sender to class, and it needs verseTemplate with constructor that takes argument
//       to return an object, which responeds to lyrics
//    - possible fix is inject an instance instead of class
//  8. but the rule gets broken here. because impossible to inject instance
//    - we faced dilemma. either
//      - violates LoM
//    - but we cant fix by inject instance because instance need number to create. 
//    - code not that bad with violation, any not confusing to future
//    - best is to test it. bcoz test is a reuse of code, we would find someting there
//    - to setup test, u need to inject a class with constructor, and able to respond to lyrics()
//    - too painful to setup, so u know its bad
//    - If Bottles sent lyrics directly to verseTemplate, everything would be more straightforward.
//    - lets wish this -> // return this.verseTemplate.lyrics(number);
//    - If you want something from an object, just ask it. If it doesn’t know how to comply, teach it. Don’t
//      be trapped by what that other object currently does, but instead, loosen coupling by designing a
//      conversation that embodies what the message sender wants.
//  9. so far so good. let push aesthetic to edge, class BottleVerse looks great
//    - but still a bit coupled, and static lyrics vs instance lyrics, something overlapped
//    - Experienced object-oriented programmers know that applications most easily adapt to the unknown future if they
//         : resist giving instance methods knowledge of concrete class names, and
//         : seek opportunities to move the object creation towards the edges of the application.
//    - so, alert for instance methods that reference class names and perpetually on the lookout for ways to remove those references.
//    - => return new BottleVerse(BottleNumber.for(number)).lyrics();
//    - push object creation to edge
//
//  10.summary:
//  - Put domain behavior on instances.
//  - Be averse to allowing instance methods to know the names of constants.
//  - Seek to depend on injected abstractions rather than hard-coded concretions.
//  - Push object creation to the edges, expecting objects to be created in one place and used in another.
//  - Avoid Demeter violations, using the temptation to create them as a spur to search for deeper abstractions.


import { capitalize, downTo } from "./helpers.js"

class Bottles {
    constructor(verseTemplate = BottleVerse){   // inject 
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
        // if (99BottlesSong) {
        // const bottleNumber = BottleNumber.for(number)
        // return new BottleVerse(number).verse(number)
        // return new BottleVerse(number).lyrics()     // wishful thinking
        // return new this.verseTemplate(number).lyrics()     // wishful thinking + Dependecncy Inversion
        return this.verseTemplate.lyrics(number); // wishful thinking + follow Law of Demeter

        // return (
        //     capitalize(`${bottleNumber} `) + `of beer on the wall, ` +
        //     `${bottleNumber} of beer.\n` +
        //     `${bottleNumber.action()}, ` +
        //     `${bottleNumber.successor()} of beer on the wall.\n`
        // );

        //  pesudo conditionals to invoke new code smell
        // } else if (unknownSong2Verse){
        //     ...
        //     assemble verse for song 2
        //     ...
        // }
        // } else if (unknownSong3Verse){
        //     ...
        //     assemble verse for song 3
        //     ...
        // }
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
        // return new BottleVerse(number).lyrics()
        return new BottleVerse(BottleNumber.for(number)).lyrics();   // wishful
    }

    // u can do this too, but why bother?
    // This separation can be deferred until someone asks for a
    // change that requires direct access to a BottleVerse object, rather than simply requesting that
    // object’s lyrics.
    // static for(number) {
    //      return new BottleVerse(BottleNumber.for(number));
    // }
    // static lyrics(number) 
    //      return BottleVerse.for(number).lyrics();
    // }

    // constructor(number) {
    constructor(bottleNumber) {
        // this.number = number
        this.bottleNumber = bottleNumber
    }
    // verse(number) {
    lyrics() {
        // const bottleNumber = BottleNumber.for(this.number)
        
        // temporary guard for wishful
        // const bottleNumber = this.number instanceof BottleNumber ?
        //     this.number :
        //     BottleNumber.for(this.number)  

        // const bottleNumber = this.number        // wishful works

        // return (
        //     capitalize(`${bottleNumber} `) + `of beer on the wall, ` +
        //     `${bottleNumber} of beer.\n` +
        //     `${bottleNumber.action()}, ` +
        //     `${bottleNumber.successor()} of beer on the wall.\n`
        // );
        return (
            capitalize(`${this.bottleNumber} `) + `of beer on the wall, ` +
            `${this.bottleNumber} of beer.\n` +
            `${this.bottleNumber.action()}, ` +
            `${this.bottleNumber.successor()} of beer on the wall.\n`
        );
    }
}

// registry concept
BottleNumber.registry = [BottleNumber];
BottleNumber.register(BottleNumber0);
BottleNumber.register(BottleNumber1);
BottleNumber.register(BottleNumber6);

export { Bottles }