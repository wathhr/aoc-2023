export default function getResult(input: string) {
  const array = input.split('\n');
  let sum = 0;

  const regex = /\d|one|two|three|four|five|six|seven|eight|nine(?=\d|one|two|three|four|five|six|seven|eight|nine)/g;
  for (const string of array) {
    const match = string
      .replaceAll('one', 'one1one')
      .replaceAll('two', 'two2two')
      .replaceAll('three', 'three3three')
      .replaceAll('four', 'four4four')
      .replaceAll('five', 'five5five')
      .replaceAll('six', 'six6six')
      .replaceAll('seven', 'seven7seven')
      .replaceAll('eight', 'eight8eight')
      .replaceAll('nine', 'nine9nine')
      .match(regex);

    const firstNum = match?.[0];
    const lastNum = match?.at(-1);
    if (!firstNum || !lastNum) continue;
    const finalNum = [firstNum, lastNum].map((num) => {
      switch (num) {
        case 'one': return 1;
        case 'two': return 2;
        case 'three': return 3;
        case 'four': return 4;
        case 'five': return 5;
        case 'six': return 6;
        case 'seven': return 7;
        case 'eight': return 8;
        case 'nine': return 9;
        default: return num;
      }
    }).join('');
    sum += parseInt(finalNum);
  }

  return sum;
}
