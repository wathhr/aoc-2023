export default function getResult(input: string) {
  const array = input.split('\n');

  let sum = 0;

  for (const string of array) {
    const firstNum = string.match(/\d/g)?.[0];
    const lastNum = string.match(/\d/g)?.at(-1);
    if (!firstNum || !lastNum) continue;
    const finalNum = `${firstNum}${lastNum}`;
    sum += parseInt(finalNum);
  }

  return sum;
}
