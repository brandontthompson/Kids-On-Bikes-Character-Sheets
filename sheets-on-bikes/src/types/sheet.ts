import { item } from "./item";
import { statData } from "./stat";
import { strength } from "./strength";

export interface sheet {
  id: string;
  description: {};
  stats: statData;
  strengths: strength;
  backpack: item[];
}
