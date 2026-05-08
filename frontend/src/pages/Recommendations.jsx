import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function HeartIcon({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

const FILTER_KEYS = ['all', 'frontend', 'backend', 'career', 'ai', 'productivity', 'study', 'free', 'paid'];

const INITIAL_TOOLS = [
  {
    id: 1,
    name: 'Evernote',
    description: 'Ferramenta excelente para organização de estudos, anotações, documentação pessoal e planejamento de aprendizado.',
    author: { name: 'Alberto Dumontt', role: 'Backend Engineer', initials: 'AD' },
    tags: ['study', 'productivity'],
    url: 'http://evernote.com/',
    likes: 12,
    liked: false,
  },
];

export default function Recommendations() {
  const { t } = useTranslation();
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [activeTag, setActiveTag] = useState('all');

  const toggleLike = (id) => {
    setTools(prev => prev.map(tool =>
      tool.id === id
        ? { ...tool, liked: !tool.liked, likes: tool.liked ? tool.likes - 1 : tool.likes + 1 }
        : tool
    ));
  };

  const filtered = activeTag === 'all'
    ? tools
    : tools.filter(tool => tool.tags.includes(activeTag));

  return (
    <div className="rec-page">
      <div className="rec-header">
        <h1 className="rec-title">{t('recommendations.title')}</h1>
        <p className="rec-subtitle">{t('recommendations.subtitle')}</p>
      </div>

      <div className="rec-filters">
        {FILTER_KEYS.map(key => (
          <button
            key={key}
            className={`rec-filter-btn${activeTag === key ? ' active' : ''}`}
            onClick={() => setActiveTag(key)}
          >
            {t(`recommendations.tags.${key}`)}
          </button>
        ))}
      </div>

      <div className="rec-grid">
        {filtered.map(tool => (
          <div key={tool.id} className="rec-card">
            <div className="rec-card-top">
              <h3 className="rec-tool-name">
                {tool.url
                  ? <a href={tool.url} target="_blank" rel="noreferrer" className="rec-tool-link">{tool.name} ↗</a>
                  : tool.name
                }
              </h3>
              <button
                className={`rec-like-btn${tool.liked ? ' liked' : ''}`}
                onClick={() => toggleLike(tool.id)}
              >
                <HeartIcon filled={tool.liked} />
                <span>{tool.likes}</span>
              </button>
            </div>

            <p className="rec-tool-desc">{tool.description}</p>

            <div className="rec-tool-tags">
              {tool.tags.map(tag => (
                <span key={tag} className="rec-tool-tag">{t(`recommendations.tags.${tag}`)}</span>
              ))}
            </div>

            <div className="rec-card-footer">
              <div className="rec-author-avatar">{tool.author.initials}</div>
              <div className="rec-author-info">
                <span className="rec-author-name">{tool.author.name}</span>
                <span className="rec-author-role">{tool.author.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
