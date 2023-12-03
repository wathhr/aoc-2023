import { Games, parseGames } from './common.ts';

export default function getResult(input: string) {
  const games = parseGames(input);

  let sum = 0;

  for (const game of games) {
    const minimum: Required<Games[number][number]> = {
      red: 0,
      green: 0,
      blue: 0,
      ...game.reduce((biggest, current) => {
        const obj: Games[number][number] = biggest;
        if ((current.blue ?? 0) > (biggest.blue ?? 0)) obj.blue = current.blue;
        if ((current.green ?? 0) > (biggest.green ?? 0)) obj.green = current.green;
        if ((current.red ?? 0) > (biggest.red ?? 0)) obj.red = current.red;

        return obj;
      }, {
        red: 0,
        blue: 0,
        green: 0,
      }),
    };

    sum += minimum.red * minimum.green * minimum.blue;
  }

  return sum;
}
