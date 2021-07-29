import React from 'react';
import clsx from 'clsx';
import shortPrincipal from '../../utils/short-principal';


const DATA = [
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 1,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 2,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 3,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 4,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 5,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 6,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 7,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 8,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 300,
  },
  {
    principal: "siay4-pltgm-xo7wa-sl2xv-dwrtw-jobvb-2epkw-dpvin-girai-pe7ts-mae",
    attempts: 13,
    score: 8,
    ratio: 61,
    rank: 288,
    user: true,
  },
]

const Leaderboard = () => {
  return (
    <div className='leaderboard-container'>

      <h1 className='leaderboard-title'>Leaderboard</h1>

      <div className='row'>
        <div className='item header'>
          Rank
        </div>
        <div className='item big header'>
          Player
        </div>
        <div className='item header'>
          Wins
        </div>
        <div className='item header'>
          Losses
        </div>
        <div className='item header'>
          Ratio
        </div>
      </div>

      {
        DATA.sort((a, b) => a.rank - b.rank).map(score => (
          <div className='row'>
            <div className={clsx('item', score.user && 'purple')}>
              {score.rank}
            </div>
            <div className={clsx('item', 'big', score.user && 'purple')}>
              {shortPrincipal(score.principal)}
            </div>
            <div className={clsx('item', score.user && 'purple')}>
              {score.score}
            </div>
            <div className={clsx('item', score.user && 'purple')}>
              {score.attempts - score.score}
            </div>
            <div className={clsx('item', score.user && 'purple')}>
              {score.ratio}%
            </div>
          </div>
        ))
      }

    </div>
  );
};

export default Leaderboard;
