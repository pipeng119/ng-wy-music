import { getRandomInt } from './number';

export function inArray(array: any[], target: any): boolean {
  return array.indexOf(target) !== -1;
}

export function shuffle<T>(arr: T[]): T[] {
  const result = arr.slice();
  for (let i = 0; i < result.length; i++) {
    // 去0和i之间的随机数
    const j = getRandomInt([0, i]);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
