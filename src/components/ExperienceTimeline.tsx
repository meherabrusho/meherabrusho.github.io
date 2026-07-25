import { experience } from '@/data/experience';

export default function ExperienceTimeline() {
  return (
    <div className="relative">
      {/* Vertical timeline line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/60 via-blue-500/40 to-transparent hidden sm:block" />

      <div className="space-y-10">
        {experience.map((exp, idx) => (
          <div key={exp.role} className="relative flex gap-6 group">
            {/* Timeline dot */}
            <div className="hidden sm:flex flex-col items-center pt-1">
              <div
                className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                  idx === 0
                    ? 'bg-purple-500/10 dark:bg-purple-500/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                    : 'bg-gray-100 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700 group-hover:border-purple-400 dark:group-hover:border-purple-600'
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors ${
                    idx === 0
                      ? 'bg-purple-600 dark:bg-purple-500'
                      : 'bg-gray-400 dark:bg-gray-500 group-hover:bg-purple-500'
                  }`}
                />
              </div>
              <div
                className={`hidden md:block absolute left-1/2 -ml-[0.5px] top-6 w-px h-full bg-gradient-to-b ${
                  idx === 0
                    ? 'from-purple-500 to-gray-200 dark:to-gray-800'
                    : 'from-gray-200 dark:from-gray-800 to-gray-200 dark:to-gray-800 group-hover:from-purple-300 dark:group-hover:from-purple-800'
                }`}
              />
            </div>

            {/* Content card */}
            <div
              className={`flex-1 glass-card rounded-2xl p-6 md:p-8 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:shadow-purple-500/5 dark:group-hover:shadow-purple-500/5 ${
                idx === 0
                  ? 'border-purple-200/60 dark:border-purple-800/40 ring-1 ring-purple-500/10'
                  : ''
              }`}
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {exp.company}
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="text-sm font-mono text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {exp.period}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Highlights */}
              <ul className="space-y-2.5">
                {exp.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400/60 dark:bg-purple-500/50 flex-shrink-0" />
                    <span className="ml-3 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {highlight}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Current role badge */}
              {idx === 0 && (
                <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border border-green-200/60 dark:border-green-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Current Role
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
