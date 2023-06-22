import { words } from "@/constants/words";

export default function randomWords(
  length: number,
  difficulty: "easy" | "medium" | "hard",
  capitalize: boolean = false
): string[] {
  const result = [];
  let range: [number, number] = [1, 15];
  let prob: number[] = [];
  if (difficulty === "easy") {
    range = [1, 9];
    prob = [0.012, 0.031, 0.07, 0.12, 0.19, 0.21, 0.21, 0.166];
  } else if (difficulty === "medium") {
    range = [1, 12];
    prob = [
      0.007, 0.019, 0.0414, 0.0714, 0.114, 0.124, 0.124, 0.124, 0.124, 0.124,
      0.124,
    ];
  } else {
    prob = [
      0.005, 0.0124, 0.028, 0.048, 0.0762, 0.083, 0.083, 0.083, 0.083, 0.083,
      0.083, 0.083, 0.083, 0.083, 0.083,
    ];
  }
  let count = 0;
  count = 0.4 * length;
  for (let i = 0; i < count; i++) {
    const random = Math.floor(Math.random() * words.common.length);
    result.push(words.common[random]);
  }
  for (let j = range[0]; j <= range[1]; j++) {
    count = Math.ceil(prob[j - 1] * length);
    if (count <= 2) {
      count = 4;
    }
    for (let i = 0; i < count; i++) {
      const random = Math.floor(Math.random() * words[`${j}`].length);
      if (words[`${j}`][random] === "I" && !capitalize) continue;
      result.push(words[`${j}`][random]);
    }
  }
  shuffle(result);

  if (capitalize) {
    const nCap = 0.4 * result.length;
    for (let i = 0; i < nCap; i++) {
      const random = Math.floor(Math.random() * result.length);
      result[random] =
        result[random].charAt(0).toUpperCase() + result[random].slice(1);
    }
  }

  return result;

  function shuffle(array: string[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
}
