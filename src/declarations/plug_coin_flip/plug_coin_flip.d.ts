import type { Principal } from '@dfinity/agent';
export type Profile = Profile_2;
export interface Profile_2 {
  'principal' : string,
  'attempts' : number,
  'score' : number,
  'ratio' : number,
};
export default interface _SERVICE {
  'coinFlip' : (arg_0: boolean) => Promise<boolean>,
  'get' : (arg_0: string) => Promise<Profile>,
  'getSelf' : () => Promise<Profile>,
  'leaderboard' : () => Promise<Array<Profile>>,
};