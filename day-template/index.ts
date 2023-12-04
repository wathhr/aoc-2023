import part1 from '../day-03/part1.ts';
import part2 from '../day-03/part2.ts';

const decoder = new TextDecoder('utf-8');
const input = decoder.decode(await Deno.readFile('./input'));

console.log('part 1:', part1(input));
console.log('part 2:', part2(input));
