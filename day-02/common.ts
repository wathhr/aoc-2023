export type Games = {
  red?: number,
  green?: number,
  blue?: number,
}[][];

export const parseGames = (input: string): Games => input
  .split('\n')
  .filter(Boolean)
  .map((game) => {
    game = game.replace(/Game\s+\d+:\s+/, '');

    const array: Games[number] = [];

    const hands = game.split('; ');
    for (const hand of hands) {
      const sets = hand.split(', ');
      array.push(Object.fromEntries(sets.map((set) => {
        const setArray = set.split(' ');
        // @ts-ignore idk how to make this not give a type error 🧌
        setArray[0] = parseInt(setArray[0]);
        return setArray.reverse();
      })));
    }

    return array;
  });
