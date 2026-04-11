import React from 'react';
import { Trophy, Medal, Award, Zap, Clock } from 'lucide-react';

const Leaderboard = () => {
  // Top 10 reaction times with F1 driver comparisons
  const leaderboardData = [
    { position: 1, name: 'Max Verstappen', time: 150, f1Driver: 'Max Verstappen', country: '🇳🇱' },
    { position: 2, name: 'Lewis Hamilton', time: 155, f1Driver: 'Lewis Hamilton', country: '🇬🇧' },
    { position: 3, name: 'Charles Leclerc', time: 158, f1Driver: 'Charles Leclerc', country: '🇲🇨' },
    { position: 4, name: 'Lando Norris', time: 162, f1Driver: 'Lando Norris', country: '🇬🇧' },
    { position: 5, name: 'Fernando Alonso', time: 165, f1Driver: 'Fernando Alonso', country: '🇪🇸' },
    { position: 6, name: 'Carlos Sainz', time: 168, f1Driver: 'Carlos Sainz', country: '🇪🇸' },
    { position: 7, name: 'George Russell', time: 172, f1Driver: 'George Russell', country: '🇬🇧' },
    { position: 8, name: 'Sergio Pérez', time: 175, f1Driver: 'Sergio Pérez', country: '🇲🇽' },
    { position: 9, name: 'Oscar Piastri', time: 178, f1Driver: 'Oscar Piastri', country: '🇦🇺' },
    { position: 10, name: 'Pierre Gasly', time: 182, f1Driver: 'Pierre Gasly', country: '🇫🇷' },
  ];

  const getMedalIcon = (position) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-400" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-300" />;
      case 3:
        return <Medal className="w-6 h-6 text-amber-600" />;
      default:
        return <Award className="w-6 h-6 text-dark-400" />;
    }
  };

  const getPositionStyle = (position) => {
    switch (position) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-slate-400/20 border-gray-400/50';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/50';
      default:
        return 'bg-dark-800/50 border-dark-700';
    }
  };

  return (
    <section className="max-w-6xl mx-auto mb-12 sm:mb-16">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Trophy className="w-10 h-10 text-yellow-500" />
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Top 10 Fastest Reaction Times
          </h2>
          <Trophy className="w-10 h-10 text-yellow-500" />
        </div>
        <p className="text-base sm:text-lg text-dark-400">
          Compare your reflexes with the world's fastest F1 drivers
        </p>
      </div>

      {/* Leaderboard Container */}
      <div className="bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-4 sm:p-6 overflow-hidden">
        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-700">
                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-300 uppercase tracking-wider">
                  Rank
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-300 uppercase tracking-wider">
                  Driver
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-300 uppercase tracking-wider">
                  Reaction Time
                </th>
                <th className="text-left py-4 px-4 text-sm font-semibold text-dark-300 uppercase tracking-wider">
                  Rating
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {leaderboardData.map((entry) => (
                <tr
                  key={entry.position}
                  className={`${getPositionStyle(entry.position)} border transition-all duration-200 hover:scale-[1.02]`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {getMedalIcon(entry.position)}
                      <span className="text-lg font-bold text-white">
                        #{entry.position}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.country}</span>
                      <span className="text-lg font-semibold text-white">
                        {entry.name}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-green-400" />
                      <span className="text-xl font-bold text-green-400">
                        {entry.time} ms
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm font-semibold">
                      <Clock className="w-4 h-4" />
                      Elite F1 Level
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View - Cards */}
        <div className="md:hidden space-y-3">
          {leaderboardData.map((entry) => (
            <div
              key={entry.position}
              className={`${getPositionStyle(entry.position)} border rounded-xl p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getMedalIcon(entry.position)}
                  <span className="text-lg font-bold text-white">
                    #{entry.position}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-green-400" />
                  <span className="text-xl font-bold text-green-400">
                    {entry.time} ms
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{entry.country}</span>
                <span className="text-lg font-semibold text-white">
                  {entry.name}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs font-semibold">
                <Clock className="w-3 h-3" />
                Elite F1 Level
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
        <p className="text-sm text-dark-300 text-center">
          <strong className="text-blue-400">💡 Can you beat them?</strong> Take the F1 Reaction Test and see how you compare with the world's fastest drivers!
        </p>
      </div>
    </section>
  );
};

export default Leaderboard;
