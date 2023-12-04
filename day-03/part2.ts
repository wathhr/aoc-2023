const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

export default function getResult(input: string) {
  const matrix = input.split('\n').map(line => line.split(''));
  const alreadyAdded = new Set<`${number}:${number}`>();

  let sum = 0;

  for (let y = 0; y < matrix.length; y++) {
    const line = matrix[y];
    for (let x = 0; x < line.length; x++) {
      const character = line[x];
      // if it's not a `*`, skip
      if (character !== '*') continue;

      // check the characters (marked with C) around the `*`
      // . . . . .
      // . C C C .
      // . C * C .
      // . C C C .
      // . . . . .
      const checkCoords = new Set<{ x: number, y: number; }>([
        { x: x - 1, y: y - 1 },
        { x: x - 1, y },
        { x: x - 1, y: y + 1 },
        { x, y: y - 1 },
        { x, y: y + 1 },
        { x: x + 1, y: y - 1 },
        { x: x + 1, y: y },
        { x: x + 1, y: y + 1 },
      ].filter(({ x, y }) => matrix[y]?.[x]));

      const numbers = [];
      for (const coord of checkCoords) {
        try {
          const char = matrix[coord.y][coord.x];
          if (!digits.includes(char)) continue;

          numbers.push(getFullNumber({ x: coord.x, y: coord.y }));
        } catch (e) {
          console.log('skipping:', e);
        }
      }

      // skip if not a gear (has 2 numbers around it)
      if (numbers.length !== 2) continue;

      sum += numbers[0] * numbers[1];
    }
  }

  function getFullNumber({ x, y }: { x: number, y: number; }) {
    let numberString = matrix[y][x];
    let firstDigit = x;

    const checkColumns: number[] = [x - 1, x + 1];
    for (const column of checkColumns) {
      const char = matrix[y][column];
      if (!digits.includes(char)) continue;

      if (column < x) {
        numberString = char + numberString;
        firstDigit = column;
        checkColumns.push(column - 1);
      } else {
        numberString += char;
        checkColumns.push(column + 1);
      }
    }

    if (alreadyAdded.has(`${y}:${firstDigit}`)) throw `${y + 1}:${firstDigit + 1} is already accounted for`;
    alreadyAdded.add(`${y}:${firstDigit}`);

    return parseInt(numberString);
  }

  return sum;
}
