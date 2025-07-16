import React, { useState } from 'react';
import { Menu, Trophy, Medal, Award } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';

const Leaderboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 5;

  // Enhanced leaderboard data with avatars
  const teamLeaderboard = [
    { rank: 1, team: 'Kangaroo', dmg: 100, correct: 9, avatar: '/src/assets/Placeholder/Team1.jpg' },
    { rank: 2, team: 'Koala', dmg: 85, correct: 8, avatar: '/src/assets/Placeholder/Team2.jpg' },
    { rank: 3, team: 'Shellfish', dmg: 68, correct: 7, avatar: '/src/assets/Placeholder/Team3.jpg' }
  ];

  const individualLeaderboard = [
    { rank: 1, player: 'Sovitep', dmg: 100, correct: 9, avatar: '/src/assets/Placeholder/Profile1.jpg' },
    { rank: 2, player: 'Visoth', dmg: 90, correct: 8, avatar: '/src/assets/Placeholder/Profile2.jpg' },
    { rank: 3, player: 'Roth', dmg: 75, correct: 7, avatar: '/src/assets/Placeholder/Profile3.jpg' },
    { rank: 4, player: 'Alice', dmg: 65, correct: 6, avatar: '/src/assets/Placeholder/Profile4.jpg' },
    { rank: 5, player: 'Bob', dmg: 55, correct: 5, avatar: '/src/assets/Placeholder/Profile5.jpg' },
    { rank: 6, player: 'Charlie', dmg: 45, correct: 4, avatar: '/src/assets/Placeholder/Profile6.jpg' },
    { rank: 7, player: 'David', dmg: 35, correct: 3, avatar: '/src/assets/Placeholder/Profile7.jpg' }
  ];

  const allTimeLeaderboard = [
    { rank: 1, player: 'Python', dmg: 300, correct: 25, lastPlayed: '12/15/2024', avatar: '/src/assets/Placeholder/Profile1.jpg' },
    { rank: 2, player: 'Sovitep', dmg: 180, correct: 15, lastPlayed: '12/14/2024', avatar: '/src/assets/Placeholder/Profile2.jpg' },
    { rank: 3, player: 'Visoth', dmg: 90, correct: 8, lastPlayed: '12/13/2024', avatar: '/src/assets/Placeholder/Profile3.jpg' },
    { rank: 4, player: 'Alice', dmg: 85, correct: 7, lastPlayed: '12/12/2024', avatar: '/src/assets/Placeholder/Profile4.jpg' },
    { rank: 5, player: 'Bob', dmg: 75, correct: 6, lastPlayed: '12/11/2024', avatar: '/src/assets/Placeholder/Profile5.jpg' },
    { rank: 6, player: 'Charlie', dmg: 65, correct: 5, lastPlayed: '12/10/2024', avatar: '/src/assets/Placeholder/Profile6.jpg' }
  ];

  // Podium helpers
  const getPodiumColor = (rank) => {
    if (rank === 1) return "bg-yellow-500"; // Gold
    if (rank === 2) return "bg-gray-400";   // Silver
    if (rank === 3) return "bg-amber-600";  // Bronze
    return "bg-gray-500";
  };

  const getPodiumIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-4 h-4 text-white" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-white" />;
    if (rank === 3) return <Award className="w-4 h-4 text-white" />;
    return null;
  };

  const getRowBackground = (rank) => {
    if (rank === 1) return "bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-500";
    if (rank === 2) return "bg-gray-400 dark:bg-gray-600 hover:bg-gray-400";
    if (rank === 3) return "bg-amber-600 dark:bg-amber-800 hover:bg-amber-600";
    return "";
  };

  const getTextColor = (rank) => {
    return rank <= 3 ? "text-white" : "text-gray-900 dark:text-white";
  };

  // Pagination for individual leaderboard
  const totalPages = Math.ceil(individualLeaderboard.length / PAGE_SIZE);
  const paginatedIndividual = individualLeaderboard.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // Top 3 for podium
  const podiumPlayers = individualLeaderboard.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">


          
     

        {/* Podium Section */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6 text-center">
            <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" /> Top Players
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
              Top 3 players by damage and accuracy
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-center gap-6 py-4">
              {podiumPlayers.map((player, idx) => {
                let height = player.rank === 1 ? 120 : player.rank === 2 ? 80 : 60;
                return (
                  <div key={player.rank} className={`flex flex-col items-center ${idx === 0 ? "order-2" : idx === 1 ? "order-1" : "order-3"}`}>
                    <div className="mb-2 relative">
                      <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-gray-200 dark:border-gray-700 shadow-lg">
                        <AvatarImage src={player.avatar} alt={player.player} />
                        <AvatarFallback>{player.player[0]}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${getPodiumColor(player.rank)} flex items-center justify-center shadow-lg border-2 border-white`}>
                        {getPodiumIcon(player.rank)}
                      </div>
                    </div>
                    <div className="font-bold text-lg mb-1 text-gray-900 dark:text-white">{player.player}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{player.dmg} DMG</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">{player.correct} Correct</div>
                    <div className={`w-20 md:w-24 h-6 rounded-t-lg ${getPodiumColor(player.rank)} text-white flex items-center justify-center font-bold text-sm shadow-lg`} style={{ height: `${height}px` }}>
                      {player.rank === 1 ? "1st" : player.rank === 2 ? "2nd" : "3rd"}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Live Team Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Live Team Leaderboard</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Team rankings by damage and accuracy</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead className="text-right">DMG</TableHead>
                  <TableHead className="text-right">Correct</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamLeaderboard.map((team) => (
                  <TableRow key={team.rank} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <TableCell className="text-center font-bold">
                      {team.rank <= 3 ? (
                        <div className={`inline-flex items-center justify-center w-8 h-6 rounded-full text-white text-sm font-bold ${getPodiumColor(team.rank)}`}>
                          {team.rank}
                        </div>
                      ) : (
                        <span className="text-gray-900 dark:text-white">{team.rank}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Avatar className="w-7 h-7 border border-gray-200 dark:border-gray-700">
                        <AvatarImage src={team.avatar} alt={team.team} />
                        <AvatarFallback>{team.team[0]}</AvatarFallback>
                      </Avatar>
                      {team.team}
                    </TableCell>
                    <TableCell className="text-right">{team.dmg}</TableCell>
                    <TableCell className="text-right">{team.correct}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Live Individual Leaderboard with Pagination */}
        <Card className="relative min-h-[400px]">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Live Individual Leaderboard</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Individual player rankings</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">DMG</TableHead>
                  <TableHead className="text-right">Correct</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedIndividual.map((player) => (
                  <TableRow key={player.rank} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <TableCell className="text-center font-bold">
                      {player.rank <= 3 ? (
                        <div className={`inline-flex items-center justify-center w-8 h-6 rounded-full text-white text-sm font-bold ${getPodiumColor(player.rank)}`}>
                          {player.rank}
                        </div>
                      ) : (
                        <span className="text-gray-900 dark:text-white">{player.rank}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Avatar className="w-7 h-7 border border-gray-200 dark:border-gray-700">
                        <AvatarImage src={player.avatar} alt={player.player} />
                        <AvatarFallback>{player.player[0]}</AvatarFallback>
                      </Avatar>
                      {player.player}
                    </TableCell>
                    <TableCell className="text-right">{player.dmg}</TableCell>
                    <TableCell className="text-right">{player.correct}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="absolute left-0 bottom-0 w-full flex justify-center pb-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage > 1 ? currentPage - 1 : 1); }}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, idx) => (
                      <PaginationItem key={idx}>
                        <PaginationLink
                          href="#"
                          isActive={currentPage === idx + 1}
                          onClick={(e) => { e.preventDefault(); setCurrentPage(idx + 1); }}
                        >
                          {idx + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages); }}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </CardContent>
        </Card>

        {/* All Time Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">All Time Leaderboard</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">Overall player statistics across all events</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16 text-center">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead className="text-right">DMG</TableHead>
                  <TableHead className="text-right">Correct</TableHead>
                  <TableHead className="text-right">Last Played</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTimeLeaderboard.map((player) => (
                  <TableRow key={player.rank} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <TableCell className="text-center font-bold">
                      {player.rank <= 3 ? (
                        <div className={`inline-flex items-center justify-center w-8 h-6 rounded-full text-white text-sm font-bold ${getPodiumColor(player.rank)}`}>
                          {player.rank}
                        </div>
                      ) : (
                        <span className="text-gray-900 dark:text-white">{player.rank}</span>
                      )}
                    </TableCell>
                    <TableCell className="font-medium flex items-center gap-2">
                      <Avatar className="w-7 h-7 border border-gray-200 dark:border-gray-700">
                        <AvatarImage src={player.avatar} alt={player.player} />
                        <AvatarFallback>{player.player[0]}</AvatarFallback>
                      </Avatar>
                      {player.player}
                    </TableCell>
                    <TableCell className="text-right">{player.dmg}</TableCell>
                    <TableCell className="text-right">{player.correct}</TableCell>
                    <TableCell className="text-right text-gray-600 dark:text-gray-400">{player.lastPlayed}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        
      </div>
    </div>
  );
};

export default Leaderboard;