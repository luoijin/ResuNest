import { Clock3, FileText, RotateCcw, Trash2 } from 'lucide-react'

const formatDate = (timestamp) => new Intl.DateTimeFormat(undefined, {
  dateStyle: 'medium',
  timeStyle: 'short'
}).format(new Date(timestamp))

const AnalysisHistory = ({ entries, onRestore, onRemove, onClear }) => {
  if (!entries.length) return null

  return (
    <section className="analysis-history" aria-labelledby="analysis-history-title">
      <div className="analysis-history-heading">
        <div>
          <span className="analysis-history-eyebrow"><Clock3 size={14} /> Your activity</span>
          <h2 id="analysis-history-title">Recent analyses</h2>
          <p>Reopen a saved skill profile and its job matches.</p>
        </div>
        <button type="button" className="history-clear-btn" onClick={onClear}>
          <Trash2 size={15} /> Clear history
        </button>
      </div>

      <div className="analysis-history-grid">
        {entries.map((entry) => (
          <article className="analysis-history-card" key={entry.id}>
            <button
              type="button"
              className="history-remove-btn"
              onClick={() => onRemove(entry.id)}
              aria-label={`Remove ${entry.label} from history`}
              title="Remove from history"
            >
              <Trash2 size={15} />
            </button>
            <div className="history-card-topline">
              <span className="history-file-icon"><FileText size={16} /></span>
              <div>
                <h3 title={entry.label}>{entry.label}</h3>
                <time dateTime={entry.createdAt}>{formatDate(entry.createdAt)}</time>
              </div>
            </div>

            <div className="history-section">
              <span className="history-label">Extracted skills</span>
              <div className="history-skills">
                {entry.skills.slice(0, 5).map((skill) => <span key={skill}>{skill}</span>)}
                {entry.skills.length > 5 && <span>+{entry.skills.length - 5}</span>}
              </div>
            </div>

            <div className="history-section">
              <span className="history-label">Top matches</span>
              <div className="history-matches">
                {entry.matches.slice(0, 3).map((match) => (
                  <span key={`${entry.id}-${match.id}`}>{match.job_title}<strong>{match.matchScore}%</strong></span>
                ))}
              </div>
            </div>

            <button type="button" className="history-open-btn" onClick={() => onRestore(entry)}>
              <RotateCcw size={15} /> View analysis
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

export default AnalysisHistory
