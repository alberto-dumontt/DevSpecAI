import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function BotIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  );
}

const FILTER_KEYS = ['all', 'remote', 'frontend', 'backend', 'fullstack', 'mobile', 'devops', 'junior', 'mid', 'senior'];

const INITIAL_JOBS = [
  {
    id: 1,
    title: 'Backend Developer — Java / Spring Boot',
    advertiser: 'Nubank',
    publishedAt: '2026-05-07',
    description: 'Estamos buscando um desenvolvedor backend com experiência em Java e Spring Boot para atuar em times de alta performance. Você vai trabalhar em sistemas distribuídos, APIs de alto throughput e arquitetura orientada a eventos. Conhecimento em Kafka e Kubernetes é um diferencial.',
    tags: ['backend', 'senior', 'remote'],
    url: 'https://nubank.com.br/carreiras',
  },
  {
    id: 2,
    title: 'Frontend Developer — React',
    advertiser: 'Mercado Livre',
    publishedAt: '2026-05-06',
    description: 'Vaga para desenvolvedor frontend com sólida experiência em React e TypeScript. Você será responsável por construir e evoluir interfaces de alto tráfego usadas por milhões de usuários. Experiência com testes automatizados e performance de renderização são valorizados.',
    tags: ['frontend', 'mid', 'remote'],
    url: 'https://mercadolibre.com/careers',
  },
  {
    id: 3,
    title: 'Desenvolvedor Fullstack Júnior',
    advertiser: 'Conta Simples',
    publishedAt: '2026-05-05',
    description: 'Oportunidade para devs em início de carreira que queiram crescer rápido em um ambiente de fintech. Stack: Node.js no backend e React no frontend. Buscamos alguém curioso, que goste de aprender e não tenha medo de perguntar.',
    tags: ['fullstack', 'junior', 'remote'],
    url: null,
  },
];

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function Jobs() {
  const { t } = useTranslation();
  const [activeTag, setActiveTag] = useState('all');

  const filtered = activeTag === 'all'
    ? INITIAL_JOBS
    : INITIAL_JOBS.filter(job => job.tags.includes(activeTag));

  return (
    <div className="rec-page">
      <div className="rec-header">
        <h1 className="rec-title">{t('jobs.title')}</h1>
        <p className="rec-subtitle">{t('jobs.subtitle')}</p>
      </div>

      <div className="devradar-info">
        <div className="devradar-info-icon">
          <BotIcon />
        </div>
        <div>
          <span className="devradar-info-label">{t('jobs.botLabel')}</span>
          <p className="devradar-info-desc">{t('jobs.botDesc')}</p>
        </div>
      </div>

      <div className="rec-filters">
        {FILTER_KEYS.map(key => (
          <button
            key={key}
            className={`rec-filter-btn${activeTag === key ? ' active' : ''}`}
            onClick={() => setActiveTag(key)}
          >
            {t(`jobs.tags.${key}`)}
          </button>
        ))}
      </div>

      <div className="jobs-list">
        {filtered.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-card-top">
              <div className="job-title-block">
                <h3 className="job-title">
                  {job.url
                    ? <a href={job.url} target="_blank" rel="noreferrer" className="rec-tool-link">{job.title} ↗</a>
                    : job.title
                  }
                </h3>
                <span className="job-advertiser">{job.advertiser}</span>
              </div>
              <span className="job-date">{formatDate(job.publishedAt)}</span>
            </div>

            <p className="job-description">{job.description}</p>

            <div className="job-card-bottom">
              <div className="rec-tool-tags">
                {job.tags.map(tag => (
                  <span key={tag} className="rec-tool-tag">{t(`jobs.tags.${tag}`)}</span>
                ))}
              </div>
              <div className="job-bot-badge">
                <BotIcon />
                <span>DevRadar</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
