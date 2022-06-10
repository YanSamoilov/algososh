
//Вычисление чисел Фибоначчи.
export const fiboCalc = (num: number, memo: Record<number, number> = {}): number => {
    if (num in memo) {
      return memo[num];
    }
    if (num <= 2) {
      return 1
    }
    memo[num] = fiboCalc(num - 1, memo) + fiboCalc(num - 2, memo);
    return memo[num];
  }
