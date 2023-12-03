import { Games, parseGames } from './common.ts';

export default function getResult(input: string) {
  const games = parseGames(input);

  const maxValues = {
    red: 12,
    green: 13,
    blue: 14,
  } as const satisfies Games[number][number];

  let num = 0;

  for (let i = 0; i < games.length; i++) {
    const id = i + 1;
    const game = games[i];

    const result = game
      .filter((hand) => {
        if ((hand.blue ?? 0) > maxValues.blue) return false;
        if ((hand.green ?? 0) > maxValues.green) return false;
        if ((hand.red ?? 0) > maxValues.red) return false;
        return true;
      });

    if (result.length === game.length) num += id;
  }
  return num;
}
