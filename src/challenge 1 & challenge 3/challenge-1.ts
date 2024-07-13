export function commonPrefix(inputs: string[]): number[] {
  const results: number[] = [];

  for (const str of inputs) {
    const n = str.length;
    let totalCommonLength = 0;

    for (let i = 0; i < n; i++) {
      const suffix = str.substring(i);
      let commonLength = 0;

      for (let j = 0; j < suffix.length; j++) {
        if (str[j] !== suffix[j]) break;
        commonLength++;
      }

      totalCommonLength += commonLength;
    }

    results.push(totalCommonLength);
  }

  return results;
}
