import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BossBattleWebSocketProvider } from '@/context/BossBattleProvider';
import BossBattle from './BossBattle';

const BossBattleWrapper = () => {
  const [searchParams] = useSearchParams();
  
  const gameRoomId = useMemo(() => 
    searchParams.get('roomId') || 'default-room', 
    [searchParams]
  );
  
  const playerId = useMemo(() => 
    searchParams.get('playerId') || `player-${Date.now()}`, 
    [searchParams]
  );

  console.log('BossBattleWrapper: gameRoomId =', gameRoomId, ', playerId =', playerId);

  return (
    <BossBattleWebSocketProvider gameRoomId={gameRoomId} playerId={playerId}>
      <BossBattle />
    </BossBattleWebSocketProvider>
  );
};

export default BossBattleWrapper;
