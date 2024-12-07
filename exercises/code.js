const capitalize = str => str[0].toUpperCase() + str.slice(1,)

class CountdownSong {
    constructor(verseTemplate = BottleVerse, max = 999999, min = 0) {
        this.verseTemplate = verseTemplate
        this.max = max
        this.min = min
    }

    song() {
        return this.verses(this.max, this.min)
    }

    verses(upper, lower) {
        let size = upper - lower + 1
        return Array(size)
            .fill()
            .map((_, i) => upper - i)
            .map(i => this.verse(i))
            .join('\n')
    }

    verse(number) {
        return this.verseTemplate.lyrics(number)
    }
}

class BottleVerse {
    static lyrics(number) {
        const bottleNumber = BottleNumber.for(number)

        return (
            `${capitalize(`${bottleNumber}`)} of beer on the wall,\n` +
            `${bottleNumber} of beer.\n` +
            `${bottleNumber.action()}` +
            `${bottleNumber.successor()} of beer on the wall.\n`
        );
    }
}

class BottleNumber {
    static for(number) {
        let bottleNumberClass = this.registry.find(list => list.canSelect(number))
        return new bottleNumberClass(number)
    }
    static canSelect() {
        return true
    }
    static register(list) {
        this.registry.unshift(list)
    }
    constructor(number) {
        this.number = number
    }
    container() {
        return 'bottles'
    }

    pronoun() {
        return 'one'
    }

    quantity() {
        return this.number.toString()
    }

    successor() {
        return BottleNumber.for(this.number - 1)
    }

    action() {
        return `Take ${this.pronoun()} down and pass it around,\n`
    }

    toString() {
        return `${this.quantity()} ${this.container()}`
    }
}

class BottleNumber0 extends BottleNumber {
    static canSelect(number) {
        return number === 0
    }
    quantity() {
        return "no more"
    }
    successor() {
        return BottleNumber.for(99)
    }
    action() {
        return `Go to the store and buy some more,\n`
    }
}

class BottleNumber1 extends BottleNumber {
    static canSelect(number) {
        return number === 1
    }
    container() {
        return 'bottle'
    }
    pronoun() {
        return 'it'
    }
}

class BottleNumber6 extends BottleNumber {
    static canSelect(number) {
        return number === 6
    }
    container() {
        return 'six-pack'
    }
    quantity() {
        return `${1}`
    }
}

class VerseFake {
    static lyrics(number) {
        return (
            `This is verse ${number}.\n`
        );
    }
}

BottleNumber.registry = [BottleNumber]
BottleNumber.register(BottleNumber0)
BottleNumber.register(BottleNumber1)
BottleNumber.register(BottleNumber6)


module.exports = {
    CountdownSong,
    BottleNumber,
    BottleNumber0,
    BottleNumber1,
    BottleNumber6,
    BottleVerse,
    VerseFake,
}
