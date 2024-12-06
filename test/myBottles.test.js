import {
  // Bottles, 
  CountdownSong,
  BottleNumber,
  BottleVerse,
  BottleNumber0,
  BottleNumber1,
  BottleNumber6,
  VerseFake
} from "../lib/myBottles.js"


const testPlaysVerseRole = rolePlayer => {
  test('plays verse role', () => {
    expect(rolePlayer).toHaveProperty('lyrics', expect.any(Function));
  });
};

describe('CountdownSong', () => {
  test('verse', () => {
    const expected =
      "This is verse 500.\n"
    expect(new CountdownSong(VerseFake).verse(500)).toBe(expected);
  });

  test('verses', () => {
    const expected =
      "This is verse 99.\n" +
      "\n" +
      "This is verse 98.\n" +
      "\n" +
      "This is verse 97.\n"
    expect(new CountdownSong(VerseFake).verses(99, 97)).toBe(expected);
  });

  test('song', () => {
    const expected =
      "This is verse 47.\n" +
      "\n" +
      "This is verse 46.\n" +
      "\n" +
      "This is verse 45.\n" +
      "\n" +
      "This is verse 44.\n" +
      "\n" +
      "This is verse 43.\n"
    expect(new CountdownSong(VerseFake, 47, 43).song()).toBe(expected);
  });
});

describe('BottleNumber', () => {
  test('returns correct class for given number', () => {
    // 0,1,6 are special
    expect(BottleNumber.for(0).constructor).toBe(BottleNumber0)
    expect(BottleNumber.for(1).constructor).toBe(BottleNumber1)
    expect(BottleNumber.for(6).constructor).toBe(BottleNumber6)

    // Other numbers get the default
    expect(BottleNumber.for(3).constructor).toBe(BottleNumber)
    expect(BottleNumber.for(7).constructor).toBe(BottleNumber)
    expect(BottleNumber.for(43).constructor).toBe(BottleNumber)

  })
})

describe('BottleVerse', () => {

  testPlaysVerseRole(BottleVerse);

  test('verse general rule upper bound', () => { // unsuprising name , but not perfect, not revealing intention
    const expected =
      '99 bottles of beer on the wall, ' +
      '99 bottles of beer.\n' +
      'Take one down and pass it around, ' +
      '98 bottles of beer on the wall.\n';
    expect(BottleVerse.lyrics(99)).toBe(expected);
  });

  test('verse general rule lower bound', () => {
    const expected =
      '3 bottles of beer on the wall, ' +
      '3 bottles of beer.\n' +
      'Take one down and pass it around, ' +
      '2 bottles of beer on the wall.\n';
    expect(BottleVerse.lyrics(3)).toBe(expected);
  });

  test('verse 7', () => {
    const expected =
      '7 bottles of beer on the wall, ' +
      '7 bottles of beer.\n' +
      'Take one down and pass it around, ' +
      '1 six-pack of beer on the wall.\n';
    expect(BottleVerse.lyrics(7)).toBe(expected);
  });

  test('verse 6', () => {
    const expected =
      '1 six-pack of beer on the wall, ' +
      '1 six-pack of beer.\n' +
      'Take one down and pass it around, ' +
      '5 bottles of beer on the wall.\n';
    expect(BottleVerse.lyrics(6)).toBe(expected);
  });

  test('verse 2', () => {
    const expected =
      '2 bottles of beer on the wall, ' +
      '2 bottles of beer.\n' +
      'Take one down and pass it around, ' +
      '1 bottle of beer on the wall.\n';
    expect(BottleVerse.lyrics(2)).toBe(expected);
  });

  test('verse 1', () => {
    const expected =
      '1 bottle of beer on the wall, ' +
      '1 bottle of beer.\n' +
      'Take it down and pass it around, ' +
      'no more bottles of beer on the wall.\n';
    expect(BottleVerse.lyrics(1)).toBe(expected);
  });

  test('verse 0', () => {
    const expected =
      'No more bottles of beer on the wall, ' +
      'no more bottles of beer.\n' +
      'Go to the store and buy some more, ' +
      '99 bottles of beer on the wall.\n';
    expect(BottleVerse.lyrics(0)).toBe(expected);
  });
})

describe('VerseFake', () => {
  testPlaysVerseRole(VerseFake);
});