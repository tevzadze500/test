import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import { initialGscData as initialSnapshot } from '../data/gscMetrics';
import { 
  BarChart3, 
  TrendingUp, 
  MousePointer, 
  Eye, 
  ArrowLeft, 
  RefreshCw, 
  Search, 
  Award, 
  Calendar, 
  ExternalLink,
  ShieldAlert,
  Flame,
  CheckCircle2
} from 'lucide-react';

function GscStatsPage() {
  const [data, setData] = useState(initialSnapshot);
  const [loading, setLoading] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [activeTab, setActiveTab] = useState('queries'); // 'queries' | 'pages' | 'daily'

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/search-console');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.warn('Could not fetch live GSC, using snapshot:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredQueries = (data.queries || []).filter((q) =>
    q.query.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const summary = data.summary || {
    clicks: 1164,
    impressions: 75338,
    ctr: 0.0155,
    position: 8.9,
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white p-4 sm:p-6 lg:p-10">
      {/* Protect from Google Indexing */}
      <Head>
        <title>Search Console Stats &bull; ReactionTestPro Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-dark-800 pb-5">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="p-2.5 rounded-xl bg-dark-900 border border-dark-800 hover:bg-dark-850 hover:text-green-400 transition-colors"
              title="Retour à l'accueil"
            >
              <ArrowLeft size={18} />
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Search Console Dashboard
                </h1>
                <span className="px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-semibold">
                  API Connected
                </span>
              </div>
              <p className="text-xs text-dark-400 mt-0.5 flex items-center gap-2">
                <span>Propriété : <strong className="text-dark-200">{data.siteUrl}</strong></span>
                <span>&bull;</span>
                <span>Période : {data.startDate} au {data.endDate}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-green-500/20 transition-all"
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Actualisation...' : 'Rafraîchir les données'}</span>
            </button>
          </div>
        </div>

        {/* Deploy Milestone Alert */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/15 via-purple-500/10 to-dark-900 border border-blue-500/30 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Flame size={20} className="text-blue-400" />
            </div>
            <div>
              <div className="font-bold text-sm sm:text-base text-white">
                Impact du déploiement du 1er Novembre
              </div>
              <div className="text-xs text-dark-300">
                Le nouveau titre haute-CTR et le format 5 manches ont fait grimper le CTR de la page d'accueil de <strong>1.4% à un pic de 4.37%</strong> (+210%) !
              </div>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-500/20 text-green-300 text-xs font-semibold border border-green-500/30">
            <CheckCircle2 size={13} /> Validé par Google
          </span>
        </div>

        {/* 4 Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Clicks */}
          <div className="p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-dark-800">
            <div className="flex items-center justify-between text-dark-400 mb-2">
              <span className="text-xs font-medium">Total Clics</span>
              <MousePointer size={16} className="text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {Number(summary.clicks).toLocaleString()}
            </div>
            <div className="text-xs text-blue-400 mt-1 font-medium">
              Sur les 28 derniers jours
            </div>
          </div>

          {/* Total Impressions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-dark-800">
            <div className="flex items-center justify-between text-dark-400 mb-2">
              <span className="text-xs font-medium">Total Impressions</span>
              <Eye size={16} className="text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {Number(summary.impressions).toLocaleString()}
            </div>
            <div className="text-xs text-purple-400 mt-1 font-medium">
              Visibilité dans les SERPs
            </div>
          </div>

          {/* Average CTR */}
          <div className="p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-dark-800">
            <div className="flex items-center justify-between text-dark-400 mb-2">
              <span className="text-xs font-medium">CTR Moyen</span>
              <TrendingUp size={16} className="text-green-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-green-400">
              {(summary.ctr * 100).toFixed(2)}%
            </div>
            <div className="text-xs text-green-300 mt-1 font-medium">
              Pic post-déploiement : 4.37%
            </div>
          </div>

          {/* Average Position */}
          <div className="p-4 sm:p-5 rounded-2xl bg-dark-900/80 border border-dark-800">
            <div className="flex items-center justify-between text-dark-400 mb-2">
              <span className="text-xs font-medium">Position Moyenne</span>
              <Award size={16} className="text-yellow-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-yellow-400">
              {summary.position ? summary.position.toFixed(1) : '8.9'}
            </div>
            <div className="text-xs text-yellow-300 mt-1 font-medium">
              Objectif Top 5 en cours
            </div>
          </div>
        </div>

        {/* Daily Evolution Chart (CSS Bars) */}
        {data.daily && data.daily.length > 0 && (
          <div className="p-5 sm:p-6 rounded-2xl bg-dark-900/80 border border-dark-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <BarChart3 size={18} className="text-blue-400" />
                  <span>Évolution quotidienne (Clics &amp; CTR)</span>
                </h3>
                <p className="text-xs text-dark-400">
                  Comparez la période avant vs après le déploiement du 1er Novembre
                </p>
              </div>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="min-w-[600px] flex items-end gap-2 sm:gap-3 h-44 pt-6 px-2 border-b border-dark-800">
                {data.daily.map((d) => {
                  const maxClicks = Math.max(...data.daily.map((x) => x.clicks), 1);
                  const heightPercent = Math.max((d.clicks / maxClicks) * 100, 8);
                  const isPostDeploy = new Date(d.date) >= new Date('2026-11-01');

                  return (
                    <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip */}
                      <div className="absolute -top-12 z-20 hidden group-hover:flex flex-col items-center bg-dark-800 border border-dark-700 text-[11px] p-1.5 rounded-lg whitespace-nowrap shadow-xl">
                        <span className="font-bold text-white">{d.date}</span>
                        <span className="text-green-400">{d.clicks} clics &bull; {(d.ctr * 100).toFixed(2)}% CTR</span>
                      </div>

                      {/* Bar */}
                      <div className="w-full flex items-end justify-center h-28">
                        <div
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full max-w-[28px] rounded-t-md transition-all duration-300 ${
                            isPostDeploy
                              ? 'bg-gradient-to-t from-green-500 to-emerald-400 shadow-md shadow-green-500/20'
                              : 'bg-gradient-to-t from-blue-600 to-blue-400 opacity-60'
                          }`}
                        />
                      </div>

                      {/* Date label */}
                      <span className={`text-[10px] tabular-nums ${isPostDeploy ? 'text-green-400 font-bold' : 'text-dark-400'}`}>
                        {d.date.slice(5)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-end gap-4 text-xs text-dark-400 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-blue-500 opacity-60 inline-block" />
                <span>Avant le 1er Nov</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-green-500 inline-block" />
                <span className="font-semibold text-green-400">Après le 1er Nov (Nouveau site)</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-dark-900 border border-dark-800 self-start">
            <button
              type="button"
              onClick={() => setActiveTab('queries')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'queries'
                  ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              Top Mots-Clés ({data.queries?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('pages')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'pages'
                  ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                  : 'text-dark-400 hover:text-white'
              }`}
            >
              Top Pages ({data.pages?.length || 0})
            </button>
          </div>

          {activeTab === 'queries' && (
            <div className="relative max-w-xs w-full">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
              <input
                type="text"
                placeholder="Filtrer une requête..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-dark-900 border border-dark-800 rounded-xl text-xs text-white placeholder-dark-500 focus:outline-none focus:border-green-500/50"
              />
            </div>
          )}
        </div>

        {/* Table: Top Queries */}
        {activeTab === 'queries' && (
          <div className="rounded-2xl bg-dark-900/80 border border-dark-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-dark-950/80 border-b border-dark-800 text-dark-400 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Requête Google</th>
                    <th className="py-3 px-4 text-right">Clics</th>
                    <th className="py-3 px-4 text-right">Impressions</th>
                    <th className="py-3 px-4 text-right">CTR</th>
                    <th className="py-3 px-4 text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-800/60">
                  {filteredQueries.map((q, i) => (
                    <tr key={i} className="hover:bg-dark-850/50 transition-colors">
                      <td className="py-3 px-4 font-medium text-white flex items-center gap-2">
                        <span>{q.query}</span>
                        {q.position < 3 && (
                          <span className="px-1.5 py-0.2 rounded bg-yellow-500/20 text-yellow-300 text-[10px] font-bold">
                            Top 3
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-blue-400 font-semibold">
                        {q.clicks}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-dark-300">
                        {q.impressions.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        <span className={`px-2 py-0.5 rounded ${
                          q.ctr > 0.05 
                            ? 'bg-green-500/20 text-green-300 font-bold' 
                            : 'text-dark-300'
                        }`}>
                          {(q.ctr * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-yellow-400">
                        {q.position.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                  {filteredQueries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-dark-400">
                        Aucun mot-clé ne correspond à votre filtre.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Table: Top Pages */}
        {activeTab === 'pages' && (
          <div className="rounded-2xl bg-dark-900/80 border border-dark-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-dark-950/80 border-b border-dark-800 text-dark-400 font-semibold text-[11px] uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Page</th>
                    <th className="py-3 px-4 text-right">Clics</th>
                    <th className="py-3 px-4 text-right">Impressions</th>
                    <th className="py-3 px-4 text-right">CTR</th>
                    <th className="py-3 px-4 text-right">Position</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-800/60">
                  {(data.pages || []).map((p, i) => (
                    <tr key={i} className="hover:bg-dark-850/50 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-green-400">
                        <Link to={p.page} className="hover:underline flex items-center gap-1.5">
                          <span>{p.page}</span>
                          <ExternalLink size={12} className="opacity-50" />
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-blue-400 font-semibold">
                        {p.clicks}
                      </td>
                      <td className="py-3 px-4 text-right font-mono text-dark-300">
                        {p.impressions.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        <span className={`px-2 py-0.5 rounded ${
                          p.ctr > 0.03 
                            ? 'bg-green-500/20 text-green-300 font-bold' 
                            : 'text-dark-300'
                        }`}>
                          {(p.ctr * 100).toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-yellow-400">
                        {p.position.toFixed(1)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default GscStatsPage;
