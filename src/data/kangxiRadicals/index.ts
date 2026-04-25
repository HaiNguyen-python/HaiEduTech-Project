// Combined Kangxi Radicals dataset (214 entries).
// Source files split by stroke count to keep modules small.
import { radicalsPart1 } from "./part1";
import { radicalsPart2 } from "./part2";
import { radicalsPart3, radicalsPart4 } from "./part3-4";
import type { KangxiRadical } from "./types";

export const KANGXI_RADICALS: KangxiRadical[] = [
  ...radicalsPart1,
  ...radicalsPart2,
  ...radicalsPart3,
  ...radicalsPart4,
].sort((a, b) => a.number - b.number);

export * from "./types";
