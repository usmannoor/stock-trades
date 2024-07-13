import { commonPrefix } from '../challenge 1 & challenge 3/challenge-1';

describe('commonPrefix', () => {
  it('should return the correct common prefix lengths sum for each string', () => {
    const testCases: { input: string[]; expected: number[] }[] = [
      {
        input: ['abcabcd'],
        expected: [10],
      },
      {
        input: ['ababaa'],
        expected: [11],
      },
      {
        input: ['aa'],
        expected: [3],
      },
    ];

    for (const { input, expected } of testCases) {
      expect(commonPrefix(input)).toEqual(expected);
    }
  });

  it('should handle an empty array', () => {
    expect(commonPrefix([])).toEqual([]);
  });

  it('should handle strings with no common prefixes', () => {
    const input = ['abcdef', 'ghijk', 'lmnop'];
    const expected = [6, 5, 5];
    expect(commonPrefix(input)).toEqual(expected);
  });

  it('should handle single character strings', () => {
    const input = ['a', 'b', 'c'];
    const expected = [1, 1, 1];
    expect(commonPrefix(input)).toEqual(expected);
  });

  it('should handle strings with common prefix only', () => {
    const input = ['aaa', 'aa', 'a'];
    const expected = [6, 3, 1];
    expect(commonPrefix(input)).toEqual(expected);
  });
});
