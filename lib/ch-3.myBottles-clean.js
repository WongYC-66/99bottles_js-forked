// Ch-3
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