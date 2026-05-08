import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const MYSTERY_WIDTHS = [62, 48, 75];

function BrandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="6" fill="#1a1a1a"/>
      <path d="M11 8L5 16L11 24" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="18.5" y1="7" x2="14.5" y2="25" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M21 8L27 16L21 24" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function Sidebar({ open, onClose }) {
  const { t } = useTranslation();

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}

      <aside className={`sidebar${open ? ' sidebar--open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-brand-inner">
            <div className="sidebar-brand-top">
              <BrandIcon />
              <span className="sidebar-brand-name">dev for devs</span>
            </div>
            <span className="sidebar-brand-rel">1:n · one to many</span>
          </div>
          <button className="sidebar-close-btn" onClick={onClose} aria-label="Fechar menu">
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            {t('nav.home')}
          </NavLink>
        </nav>

        <span className="sidebar-nav-label">{t('nav.toolsLabel')}</span>

        <nav className="sidebar-nav">
          <NavLink
            to="/spec"
            className={({ isActive }) => `sidebar-link sidebar-link--tool${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            {t('nav.devspecai')}
          </NavLink>
        </nav>

        <span className="sidebar-nav-label">{t('nav.studyLabel')}</span>

        <nav className="sidebar-nav">
          <NavLink
            to="/roadmaps"
            className={({ isActive }) => `sidebar-link sidebar-link--tool${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            {t('nav.roadmaps')}
          </NavLink>
        </nav>

        <span className="sidebar-nav-label">{t('community.navLabel')}</span>

        <nav className="sidebar-nav">
          <NavLink
            to="/community"
            className={({ isActive }) => `sidebar-link sidebar-link--tool${isActive ? ' active' : ''}`}
            onClick={onClose}
          >
            {t('community.navItem')}
          </NavLink>
        </nav>

        <div className="sidebar-future">
          <span className="sidebar-future-label">{t('nav.comingSoon')}</span>
          {MYSTERY_WIDTHS.map((w, i) => (
            <div key={i} className="sidebar-ghost-item">
              <span className="ghost-dot" />
              <span className="ghost-bar" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>

        <div className="sidebar-footer">
          <LanguageSwitcher />
        </div>
      </aside>
    </>
  );
}
