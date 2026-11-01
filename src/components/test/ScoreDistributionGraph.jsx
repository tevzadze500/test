import React from 'react';

/**
 * Interactive SVG Bell Curve showing the human reaction time distribution
 * and placing the user's score with a pin and percentile.
 */
export default function ScoreDistributionGraph({ score, average = 250, stdDev = 35 }) {
  if (!score || typeof score !== 'number') return null;

  // Gaussian PDF: f(x) = exp(-0.5 * ((x - mu) / sigma)^2)
  const minX = 120;
  const maxX = 400;
  const width = 600;
  const height = 180;
  const padX = 30;
  const padBottom = 30;
  const padTop = 30;

  const chartWidth = width - padX * 2;
  const chartHeight = height - padTop - padBottom;

  const getX = (val) => {
    const clamped = Math.max(minX, Math.min(maxX, val));
    return padX + ((clamped - minX) / (maxX - minX)) * chartWidth;
  };

  const getGaussianY = (x) => {
    const z = (x - average) / stdDev;
    const yVal = Math.exp(-0.5 * z * z); // peak at 1.0 when x === average
    return padTop + chartHeight - yVal * chartHeight;
  };

  // Generate path points along the curve
  const steps = 60;
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const val = minX + (i / steps) * (maxX - minX);
    const px = getX(val);
    const py = getGaussianY(val);
    points.push({ x: px, y: py, val });
  }

  const pathD = points.reduce(
    (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`,
    ''
  );

  const fillD = `${pathD} L ${points[points.length - 1].x.toFixed(1)} ${padTop + chartHeight} L ${points[0].x.toFixed(1)} ${padTop + chartHeight} Z`;

  const userX = getX(score);
  const userY = getGaussianY(score);

  // Percentile calculation
  let percentileRank = 50;
  if (score < 170) percentileRank = 99;
  else if (score < 190) percentileRank = 95;
  else if (score < 210) percentileRank = 88;
  else if (score < 230) percentileRank = 78;
  else if (score < 250) percentileRank = 60;
  else if (score < 275) percentileRank = 45;
  else if (score < 310) percentileRank = 28;
  else percentileRank = 12;

  const medianX = getX(average);

  return (
    <div className="w-full bg-dark-900/60 border border-dark-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 mt-4">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div>
          <h4 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
            <span>Human Benchmark Distribution</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
              Top {100 - percentileRank}%
            </span>
          </h4>
          <p className="text-xs text-dark-400 mt-0.5">
            Your score vs. typical adult visual reaction times
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
            <span className="text-white font-medium">You ({score} ms)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-dark-500 inline-block" />
            <span className="text-dark-400">Median ({average} ms)</span>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible select-none"
          aria-label="Bell curve of reaction times"
        >
          <defs>
            <linearGradient id="bellGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.45" />
              <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#1e293b" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="35%" stopColor="#22c55e" />
              <stop offset="65%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          {/* Background baseline */}
          <line
            x1={padX}
            y1={padTop + chartHeight}
            x2={width - padX}
            y2={padTop + chartHeight}
            stroke="#334155"
            strokeWidth="1.5"
          />

          {/* Area fill under curve */}
          <path d={fillD} fill="url(#bellGradient)" />

          {/* Outline curve */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#curveStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Median line (250 ms) */}
          <line
            x1={medianX}
            y1={padTop}
            x2={medianX}
            y2={padTop + chartHeight}
            stroke="#64748b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <text
            x={medianX}
            y={padTop - 6}
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="10.5"
            fontWeight="600"
          >
            Median 250ms
          </text>

          {/* User Score Pin */}
          <line
            x1={userX}
            y1={userY}
            x2={userX}
            y2={padTop + chartHeight}
            stroke="#4ade80"
            strokeWidth="2.5"
          />
          <circle
            cx={userX}
            cy={userY}
            r="6"
            fill="#4ade80"
            stroke="#0f172a"
            strokeWidth="2.5"
            className="animate-pulse"
          />
          {/* User score tag */}
          <g transform={`translate(${Math.max(padX + 35, Math.min(width - padX - 35, userX))}, ${Math.max(14, userY - 14)})`}>
            <rect
              x="-36"
              y="-12"
              width="72"
              height="20"
              rx="6"
              fill="#22c55e"
              className="shadow-lg shadow-green-500/30"
            />
            <text
              x="0"
              y="2"
              textAnchor="middle"
              fill="#090d16"
              fontSize="11"
              fontWeight="bold"
            >
              {score} ms
            </text>
          </g>

          {/* Axis Labels */}
          <text x={getX(150)} y={height - 8} textAnchor="middle" fill="#64748b" fontSize="10.5">
            150 ms (Fast)
          </text>
          <text x={getX(250)} y={height - 8} textAnchor="middle" fill="#64748b" fontSize="10.5">
            250 ms
          </text>
          <text x={getX(350)} y={height - 8} textAnchor="middle" fill="#64748b" fontSize="10.5">
            350 ms (Slow)
          </text>
        </svg>
      </div>

      {/* Speed categories summary strip */}
      <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t border-dark-800 text-[11px] text-center text-dark-400">
        <div><strong className="text-purple-400 block">&lt; 180 ms</strong> Pro Gamer</div>
        <div><strong className="text-green-400 block">180–230 ms</strong> Fast Adult</div>
        <div><strong className="text-blue-400 block">230–280 ms</strong> Average</div>
        <div><strong className="text-yellow-400 block">&gt; 280 ms</strong> Slow / Laggy</div>
      </div>
    </div>
  );
}
