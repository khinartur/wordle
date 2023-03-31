export function getSolutionChars(solution, tries) {
  const res = {};
  for (const t of tries) {
    if (t.length <= solution.length) {
      continue;
    }
    for (let i = 0; i < t.length; i++) {
      const char = t[i];
      if (solution[i] === char) {
        res[char] = "correct";
      } else if (solution.includes(char) && !res[char]) {
        res[char] = "position";
      }
    }
  }
  return res;
}
