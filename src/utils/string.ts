import { swap } from "./utils";

  export const swappingStrings = (string: string[], count?: number): { resultArray: string[]; numberOfSteps: number } => {
    let stepCounter = 0;
    const arrayOfChars: string[] = [...string];
    let startIdx = 0;
    let endIdx = arrayOfChars.length - 1;
    while (endIdx >= startIdx) {
      if (count && count === stepCounter) break;
      swap(arrayOfChars, startIdx, endIdx);
      startIdx++;
      endIdx--;
      stepCounter++;
    }
    return { resultArray: arrayOfChars, numberOfSteps: stepCounter };
  };
