import React, { useEffect, useState } from 'react';
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

const Leaderboard = ({ actor, principalId }) => {
  const [data, setData] = useState([]);
  const [userOutside, setUserOutside] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(async () => {
    if (!window.ic?.plug?.agent) {
      setActor(false);
      setConnected(false);
      window.location.hash = '/connect';
    } else {
      const leaderboardResult = await actor.leaderboard();

      const userDataResponse = await actor.getSelf();
      const userRank = await actor.getRank();

      const parsedRank = parseInt(userRank[0].toString(), 10);
      userDataResponse.rank = parsedRank;

      if (parsedRank > 9) setUserOutside(true);

      setData(Object.values(leaderboardResult));
      setUserData(userDataResponse);
    }
  }, []);

  return (
    <div className='leaderboard-container'>
      <h1>Leaderboard</h1>
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
        data.map((score, index) => {
          const isCurrentUser = score.principal === principalId;

          return (
            <div className="row" key={`${index}${score.principal}`}>
              <div className={clsx('item', isCurrentUser && 'purple')}>
                {`${index + 1} ${isCurrentUser ? '(You)' : ''}`}
              </div>
              <div className={clsx('item', 'big', isCurrentUser && 'purple')}>
                {shortPrincipal(score.principal)}
              </div>
              <div className={clsx('item', isCurrentUser && 'purple')}>
                {score.score}
              </div>
              <div className={clsx('item', isCurrentUser && 'purple')}>
                {score.attempts - score.score}
              </div>
              <div className={clsx('item', isCurrentUser && 'purple')}>
                {score.ratio}%
              </div>
            </div>
          )
        })
      }
      {
        userOutside && (
          <div className="row">
            <div className={clsx('item', 'purple')}>
              {`${userData.rank + 1} (You)`}
            </div>
            <div className={clsx('item', 'big', 'purple')}>
              {shortPrincipal(userData.principal || "")}
            </div>
            <div className={clsx('item', 'purple')}>
              {userData.score}
            </div>
            <div className={clsx('item', 'purple')}>
              {userData.attempts - userData.score}
            </div>
            <div className={clsx('item', 'purple')}>
              {userData.ratio}%
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Leaderboard;
