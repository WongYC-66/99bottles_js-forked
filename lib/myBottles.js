// solution #4 Shameless Green HAHAHA

import { capitalize, downTo } from "./helpers.js"

class Bottles {
    song() {
        return this.verses(99, 0)
    }

    verses(high, low) {
        return downTo(high, low)
            .map(num => this.verse(num))
            .join('\n')
    }

    verse(num) {
        switch (num) {
            case 0:
                return 'No more bottles of beer on the wall, ' +
                    'no more bottles of beer.\n' +
                    'Go to the store and buy some more, ' +
                    '99 bottles of beer on the wall.\n';
            case 1:
                return '1 bottle of beer on the wall, ' +
                    '1 bottle of beer.\n' +
                    'Take it down and pass it around, ' +
                    'no more bottles of beer on the wall.\n';
            case 2:
                return '2 bottles of beer on the wall, ' +
                    '2 bottles of beer.\n' +
                    'Take one down and pass it around, ' +
                    '1 bottle of beer on the wall.\n';
            case 3:
                return '3 bottles of beer on the wall, ' +
                    '3 bottles of beer.\n' +
                    'Take one down and pass it around, ' +
                    '2 bottles of beer on the wall.\n';
            default:
                return `${num} bottles of beer on the wall, ` +
                    `${num} bottles of beer.\n` +
                    `Take one down and pass it around, ` +
                    `${num - 1} bottles of beer on the wall.\n`;
        }

    }
}

export { Bottles }