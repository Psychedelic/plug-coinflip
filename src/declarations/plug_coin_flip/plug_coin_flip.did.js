export default ({ IDL }) => {
  const Profile_2 = IDL.Record({
    'principal' : IDL.Text,
    'attempts' : IDL.Nat32,
    'score' : IDL.Nat32,
    'ratio' : IDL.Nat32,
  });
  const Profile = Profile_2;
  return IDL.Service({
    'coinFlip' : IDL.Func([IDL.Bool], [IDL.Bool], []),
    'get' : IDL.Func([IDL.Text], [Profile], ['query']),
    'getSelf' : IDL.Func([], [Profile], ['query']),
    'leaderboard' : IDL.Func([], [IDL.Vec(Profile)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };