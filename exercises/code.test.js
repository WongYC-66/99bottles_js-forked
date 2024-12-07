import {
    CountdownSong,
    BottleNumber,
    BottleNumber0,
    BottleNumber1,
    BottleNumber6,
    BottleVerse,
    VerseFake
} from "./code";

describe('CountdownSong', () => {
    test('verse', () => {
        let expected = `This is verse 3.\n`
        expect(new CountdownSong(VerseFake).verse(3)).toBe(expected);
    });

    test('verses', () => {
        let expected = `This is verse 99.\n
This is verse 98.\n
This is verse 97.\n`
        expect(new CountdownSong(VerseFake).verses(99, 97)).toBe(expected);
    });

    test('song', () => {
        let expected = `This is verse 47.\n
This is verse 46.\n
This is verse 45.\n
This is verse 44.\n
This is verse 43.\n`
        expect(new CountdownSong(VerseFake, 47, 43).song()).toBe(expected);
    });

});

describe('BottleNumber', () => {
    test('for', () => {
        expect(BottleNumber.for(0)).toBeInstanceOf(BottleNumber0);
        expect(BottleNumber.for(1)).toBeInstanceOf(BottleNumber1);
        expect(BottleNumber.for(6)).toBeInstanceOf(BottleNumber6);
        expect(BottleNumber.for(99)).toBeInstanceOf(BottleNumber);
    });
});

describe('BottleVerse', () => {
    test('bottle verse general rule upper bound', () => {
        let expected = `99 bottles of beer on the wall,
99 bottles of beer.
Take one down and pass it around,
98 bottles of beer on the wall.
`
        expect(BottleVerse.lyrics(99)).toBe(expected);
    });

    test('bottle verse general rule lower bound', () => {
        let expected = `3 bottles of beer on the wall,
3 bottles of beer.
Take one down and pass it around,
2 bottles of beer on the wall.
`
        expect(BottleVerse.lyrics(3)).toBe(expected);
    });

    test('verse 7', () => {
        let expected = `7 bottles of beer on the wall,
7 bottles of beer.
Take one down and pass it around,
1 six-pack of beer on the wall.
`
        expect(BottleVerse.lyrics(7)).toBe(expected);
    });

    test('verse 6', () => {
        let expected = `1 six-pack of beer on the wall,
1 six-pack of beer.
Take one down and pass it around,
5 bottles of beer on the wall.
`
        expect(BottleVerse.lyrics(6)).toBe(expected);
    });

    test('verse 2', () => {
        let expected = `2 bottles of beer on the wall,
2 bottles of beer.
Take one down and pass it around,
1 bottle of beer on the wall.
`
        expect(BottleVerse.lyrics(2)).toBe(expected);
    });

    test('verse 1', () => {
        let expected = `1 bottle of beer on the wall,
1 bottle of beer.
Take it down and pass it around,
no more bottles of beer on the wall.
`
        expect(BottleVerse.lyrics(1)).toBe(expected);
    });

    test('verse 0', () => {
        let expected = `No more bottles of beer on the wall,
no more bottles of beer.
Go to the store and buy some more,
99 bottles of beer on the wall.
`
        expect(BottleVerse.lyrics(0)).toBe(expected);
    });
});

