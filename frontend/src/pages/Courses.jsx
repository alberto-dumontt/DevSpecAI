import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function HeartIcon({ filled }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

const FILTER_KEYS = ['all', 'frontend', 'backend', 'devops', 'ai', 'career', 'free', 'paid'];

const INITIAL_COURSES = [
  {
    id: 1,
    name: 'CS50x — Introduction to Computer Science',
    description: 'The best free computer science course available. Covers algorithms, data structures, C, Python, SQL, and web development. A solid foundation for any developer.',
    platform: 'edX / Harvard',
    author: { name: 'Alberto Dumontt', role: 'Backend Engineer', initials: 'AD' },
    tags: ['backend', 'free'],
    url: 'https://cs50.harvard.edu/x/',
    likes: 24,
    liked: false,
    comments: [
      { id: 1, author: { name: 'Lucas Andrade', initials: 'LA' }, content: 'Fiz esse curso no começo da carreira e mudou minha forma de pensar. As semanas de C são pesadas mas valem cada segundo.', likes: 6, liked: false },
      { id: 2, author: { name: 'Ana Lima', initials: 'AL' }, content: 'O projeto final é desafiador mas muito gratificante. Recomendo muito para quem quer entender o que acontece "por baixo do capô".', likes: 3, liked: false },
    ],
  },
];

export default function Courses() {
  const { t } = useTranslation();
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [openComments, setOpenComments] = useState(new Set());
  const [commentInputs, setCommentInputs] = useState({});

  const toggleLike = (id) => {
    setCourses(prev => prev.map(course =>
      course.id === id
        ? { ...course, liked: !course.liked, likes: course.liked ? course.likes - 1 : course.likes + 1 }
        : course
    ));
  };

  const toggleCommentLike = (courseId, commentId) => {
    setCourses(prev => prev.map(course =>
      course.id === courseId
        ? { ...course, comments: course.comments.map(c =>
            c.id === commentId
              ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
              : c
          )}
        : course
    ));
  };

  const toggleComments = (id) => {
    setOpenComments(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const addComment = (courseId) => {
    const text = (commentInputs[courseId] || '').trim();
    if (!text) return;
    setCourses(prev => prev.map(course =>
      course.id === courseId
        ? { ...course, comments: [...course.comments, { id: Date.now(), author: { name: 'You', initials: 'EU' }, content: text, likes: 0, liked: false }] }
        : course
    ));
    setCommentInputs(prev => ({ ...prev, [courseId]: '' }));
  };

  const [activeTag, setActiveTag] = useState('all');

  const filtered = activeTag === 'all'
    ? courses
    : courses.filter(course => course.tags.includes(activeTag));

  return (
    <div className="rec-page">
      <div className="rec-header">
        <h1 className="rec-title">{t('courses.title')}</h1>
        <p className="rec-subtitle">{t('courses.subtitle')}</p>
      </div>

      <div className="rec-filters">
        {FILTER_KEYS.map(key => (
          <button
            key={key}
            className={`rec-filter-btn${activeTag === key ? ' active' : ''}`}
            onClick={() => setActiveTag(key)}
          >
            {t(`courses.tags.${key}`)}
          </button>
        ))}
      </div>

      <div className="rec-grid">
        {filtered.map(course => (
          <div key={course.id} className="rec-card">
            <div className="rec-card-top">
              <h3 className="rec-tool-name">
                {course.url
                  ? <a href={course.url} target="_blank" rel="noreferrer" className="rec-tool-link">{course.name} ↗</a>
                  : course.name
                }
              </h3>
              <button
                className={`rec-like-btn${course.liked ? ' liked' : ''}`}
                onClick={() => toggleLike(course.id)}
              >
                <HeartIcon filled={course.liked} />
                <span>{course.likes}</span>
              </button>
            </div>

            {course.platform && (
              <span className="rec-course-platform">{course.platform}</span>
            )}

            <p className="rec-tool-desc">{course.description}</p>

            <div className="rec-tool-tags">
              {course.tags.map(tag => (
                <span key={tag} className="rec-tool-tag">{t(`courses.tags.${tag}`)}</span>
              ))}
            </div>

            <div className="rec-card-footer">
              <div className="rec-author-avatar">{course.author.initials}</div>
              <div className="rec-author-info">
                <span className="rec-author-name">{course.author.name}</span>
                <span className="rec-author-role">{course.author.role}</span>
              </div>
              <button
                className={`post-action-btn rec-comment-toggle${openComments.has(course.id) ? ' active' : ''}`}
                onClick={() => toggleComments(course.id)}
              >
                <CommentIcon />
                <span>{course.comments.length}</span>
              </button>
            </div>

            {openComments.has(course.id) && (
              <div className="comments-section">
                {course.comments.length === 0 && (
                  <p className="comments-empty">{t('community.noComments')}</p>
                )}
                {course.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-avatar">{comment.author.initials}</div>
                    <div className="comment-body">
                      <div className="comment-meta">
                        <span className="comment-author-name">{comment.author.name}</span>
                      </div>
                      <p className="comment-content">{comment.content}</p>
                      <button
                        className={`comment-like-btn${comment.liked ? ' liked' : ''}`}
                        onClick={() => toggleCommentLike(course.id, comment.id)}
                      >
                        <HeartIcon filled={comment.liked} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
                <div className="comment-input-row">
                  <div className="comment-avatar">EU</div>
                  <input
                    type="text"
                    className="comment-input"
                    placeholder={t('community.addComment')}
                    value={commentInputs[course.id] || ''}
                    onChange={e => setCommentInputs(prev => ({ ...prev, [course.id]: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter') addComment(course.id); }}
                  />
                  <button
                    className="btn-comment-send"
                    onClick={() => addComment(course.id)}
                    disabled={!(commentInputs[course.id] || '').trim()}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
