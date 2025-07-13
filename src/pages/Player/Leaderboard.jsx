import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Medal, Award } from "lucide-react";

// Sample leaderboard data with avatar
const leaderboardData = [
    { rank: 1, username: "Player1", dmg: 12000, correctPercent: 95, avatar: "/src/assets/Placeholder/Profile1.jpg" },
    { rank: 2, username: "Player2", dmg: 11000, correctPercent: 90, avatar: "/src/assets/Placeholder/Profile2.jpg" },
    { rank: 3, username: "Player3", dmg: 9500, correctPercent: 88, avatar: "/src/assets/Placeholder/Profile3.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
    { rank: 4, username: "Player4", dmg: 9000, correctPercent: 85, avatar: "/src/assets/Placeholder/Profile4.jpg" },
    { rank: 5, username: "Player5", dmg: 8500, correctPercent: 80, avatar: "/src/assets/Placeholder/Profile5.jpg" },
];

const PAGE_SIZE = 20;
const Leaderboard = () => {
    const [data] = useState(leaderboardData);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(data.length / PAGE_SIZE);
    const paginatedData = data.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

    // Top 3 only
    const podiumPlayers = data.slice(0, 3);

    return (
        <div className="container mx-auto p-3 sm:p-6 max-w-4xl">
            {/* Podium Section */}
            <Card className="mb-8">
                <CardHeader className="pb-3 sm:pb-6 text-center">
                    <CardTitle className="text-xl sm:text-2xl font-bold flex items-center justify-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-500" /> Podium
                    </CardTitle>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        Top 3 players by overall damage and accuracy
                    </p>
                </CardHeader>
                <CardContent>
                    {/* Desktop Podium */}
                    <div className="flex items-end justify-center gap-6 py-4">
                        {podiumPlayers.map((player, idx) => {
                            // Height for podium effect
                            let height = player.rank === 1 ? 120 : player.rank === 2 ? 80 : 60;
                            return (
                                <div key={player.rank} className={`flex flex-col items-center ${idx === 0 ? "order-2" : idx === 1 ? "order-1" : "order-3"}`}>
                                    <div className="mb-2 relative">
                                        <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-gray-200 dark:border-gray-700 shadow-lg">
                                            <AvatarImage src={player.avatar} alt={player.username} />
                                            <AvatarFallback>{player.username[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full ${getPodiumColor(player.rank)} flex items-center justify-center shadow-lg border-2 border-white`}>
                                            {getPodiumIcon(player.rank)}
                                        </div>
                                    </div>
                                    <div className="font-bold text-lg mb-1">{player.username}</div>
                                    <div className="text-xs text-muted-foreground mb-1">{player.dmg.toLocaleString()} DMG</div>
                                    <div className="text-xs text-muted-foreground mb-2">{player.correctPercent}% Correct</div>
                                    <div className={`w-20 md:w-24 h-6 rounded-t-lg ${getPodiumColor(player.rank)} text-white flex items-center justify-center font-bold text-sm shadow-lg`} style={{ height: `${height}px` }}>
                                        {player.rank === 1 ? "1st" : player.rank === 2 ? "2nd" : "3rd"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    {/* Mobile Podium (commented out, using normal leaderboard for all devices) */}
                    {/**
                    <div className="block sm:hidden space-y-3">
                        {podiumPlayers.map((player) => (
                            <div key={player.rank} className="flex items-center space-x-4 bg-background rounded-lg p-4 shadow-md border">
                                <div className="relative">
                                    <Avatar className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700">
                                        <AvatarImage src={player.avatar} alt={player.username} />
                                        <AvatarFallback>{player.username[0]}</AvatarFallback>
                                    </Avatar>
                                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full ${getPodiumColor(player.rank)} flex items-center justify-center shadow-lg border-2 border-white`}>
                                        {getPodiumIcon(player.rank)}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="font-bold text-lg">{player.username}</div>
                                    <div className="text-xs text-muted-foreground">{player.dmg.toLocaleString()} DMG</div>
                                    <div className="text-xs text-muted-foreground">{player.correctPercent}% Correct</div>
                                </div>
                                <div className={`${getPodiumColor(player.rank)} text-white px-3 py-1 rounded-full text-sm font-bold`}>{player.rank === 1 ? "1st" : player.rank === 2 ? "2nd" : "3rd"}</div>
                            </div>
                        ))}
                    </div>
                    */}
                </CardContent>
            </Card>

            {/* Leaderboard Table */}
            <Card>
                <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-2xl sm:text-3xl font-bold">Leaderboard</CardTitle>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">
                        See the top players by overall damage and answer accuracy
                    </p>
                </CardHeader>
                <CardContent>
                    <div className="max-w-screen overflow-x-auto">
                        <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-16 text-center">Rank</TableHead>
                                    <TableHead className="resizable">Username</TableHead>
                                    <TableHead className="text-right">DMG</TableHead>
                                    <TableHead className="text-right">Correct %</TableHead>
                                    {/* <TableHead className="text-right">asd %</TableHead>
                                    <TableHead className="text-right">asd %</TableHead>
                                    <TableHead className="text-right">asd %</TableHead>
                                    <TableHead className="text-right">asd %</TableHead>
                                    <TableHead className="text-right">asd %</TableHead> */}
                                </TableRow>
                            </TableHeader>
                            <TableBody>

                                {paginatedData.map((player) => {
                                    let bgClass = "";
                                    let textClass = "";
                                    if (player.rank === 1) {
                                        bgClass = "bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-500 transition-colors"; // Gold
                                        textClass = "text-white";
                                    } else if (player.rank === 2) {
                                        bgClass = "bg-gray-400 dark:bg-gray-600 hover:bg-gray-400 transition-colors"; // Silver
                                        textClass = "text-white";
                                    } else if (player.rank === 3) {
                                        bgClass = "bg-amber-600 dark:bg-amber-800 hover:bg-amber-600 transition-colors"; // Bronze
                                        textClass = "text-white";
                                    }

                                    return (
                                        <TableRow key={player.rank} className={bgClass}>
                                            <TableCell className={`text-center font-bold ${textClass}`}>
                                                {player.rank}
                                            </TableCell>
                                            <TableCell className={`font-medium flex items-center gap-2 ${textClass}`}>
                                                <Avatar className="w-7 h-7 border border-gray-200 dark:border-gray-700">
                                                    <AvatarImage src={player.avatar} alt={player.username} />
                                                    <AvatarFallback>{player.username[0]}</AvatarFallback>
                                                </Avatar>
                                                {player.username}
                                            </TableCell>
                                            <TableCell className={`text-right ${textClass}`}>{player.dmg.toLocaleString()}</TableCell>
                                            <TableCell className={`text-right ${textClass}`}>{player.correctPercent}%</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination className="mt-4">
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={e => { e.preventDefault(); setPage(page > 1 ? page - 1 : 1); }}
                                        disabled={page === 1}
                                    />
                                </PaginationItem>
                                {[...Array(totalPages)].map((_, idx) => (
                                    <PaginationItem key={idx}>
                                        <PaginationLink
                                            href="#"
                                            isActive={page === idx + 1}
                                            onClick={e => { e.preventDefault(); setPage(idx + 1); }}
                                        >
                                            {idx + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={e => { e.preventDefault(); setPage(page < totalPages ? page + 1 : totalPages); }}
                                        disabled={page === totalPages}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default Leaderboard;
