import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// ── Icons ──────────────────────────────────────────────────────
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

// ── Mock data ──────────────────────────────────────────────────
const POST_TAGS = ['Dúvida Técnica', 'Carreira', 'Mercado', 'Compartilhando', 'Networking', 'LinkedIn', 'Discussão'];

const INITIAL_POSTS = [
  {
    id: 1,
    author: { name: 'Mariana Costa', initials: 'MC', role: 'Dev Backend · Iniciante' },
    content: 'Pessoal, estou travada num erro de CORS na minha API Spring Boot. Já configurei o @CrossOrigin mas quando o React faz a requisição ainda aparece o erro. Alguém já passou por isso? Como resolveu?',
    tags: ['Dúvida Técnica', 'Java'],
    likes: 8, liked: false, timestamp: 'há 2 horas',
    comments: [
      { id: 1, author: { name: 'Rafael Torres', initials: 'RT', role: 'Dev Fullstack · Pleno' }, content: 'Já passei por isso! O problema pode ser que você configurou o @CrossOrigin no controller mas não globalmente. Tenta criar uma classe de configuração com WebMvcConfigurer e adicionar o addCorsMappings. Me manda o código que te ajudo.', likes: 5, liked: false },
      { id: 2, author: { name: 'Lucas Andrade', initials: 'LA', role: 'Dev Backend · Pleno' }, content: 'Além do que o Rafael disse, verifica se a porta do frontend está liberada no CORS. Às vezes é um detalhe pequeno que trava tudo.', likes: 3, liked: false },
    ],
  },
  {
    id: 2,
    author: { name: 'Pedro Henrique', initials: 'PH', role: 'Dev Frontend · Júnior' },
    content: 'Consegui meu primeiro emprego como dev! Foram 8 meses de estudos, muitos projetos no GitHub e umas 30 entrevistas. Não desistam — o mercado é difícil mas é possível. Se alguém quiser dicas de como me preparei, é só perguntar.',
    tags: ['Carreira', 'Compartilhando'],
    likes: 47, liked: false, timestamp: 'há 5 horas',
    comments: [
      { id: 1, author: { name: 'Ana Beatriz', initials: 'AB', role: 'Dev Mobile · Plena' }, content: 'Parabéns! Essa sensação é inexplicável. Boa sorte na jornada!', likes: 8, liked: false },
      { id: 2, author: { name: 'Carlos Melo', initials: 'CM', role: 'Dev Backend · Iniciante' }, content: 'Muito inspirador! Estou no mês 4 dos estudos e às vezes bate o desânimo. Pode compartilhar as dicas sim!', likes: 6, liked: false },
    ],
  },
  {
    id: 3,
    author: { name: 'Camila Rocha', initials: 'CR', role: 'Dev Fullstack · Plena' },
    content: 'Opinião: a maioria dos cursos ensina a codar mas não ensina a ser desenvolvedor. Não tem aula sobre code review, trabalho em equipe, boa PR description ou débito técnico — isso a gente aprende na marra. Qual foi o maior aprendizado que você teve no primeiro emprego que nenhum curso te ensinou?',
    tags: ['Mercado', 'Discussão'],
    likes: 34, liked: false, timestamp: 'há 1 dia',
    comments: [
      { id: 1, author: { name: 'Bruno Lima', initials: 'BL', role: 'Dev Backend · Sênior' }, content: 'Código legível vale mais que código "esperto". Escrevi um one-liner genial uma vez e fui chamado pra explicar 3 meses depois — nem eu mesmo entendi.', likes: 15, liked: false },
      { id: 2, author: { name: 'Fernanda Dias', initials: 'FD', role: 'Dev Frontend · Júnior' }, content: 'Que ninguém sabe tudo e perguntar não é fraqueza. Demorei muito pra entender isso e travei muito por medo de parecer "burra".', likes: 12, liked: false },
    ],
  },
  {
    id: 4,
    author: { name: 'Letícia Moura', initials: 'LM', role: 'Dev Frontend · Plena' },
    content: 'Dica de LinkedIn que mudou o jogo pra mim: para de colocar só "Desenvolvedor" como headline e coloca o que você resolve. Ao invés de "Dev Frontend", algo como "Frontend Dev | Interfaces que convertem e retém usuários". Recrutadores buscam problemas pra resolver, não títulos genéricos.',
    tags: ['LinkedIn', 'Networking', 'Carreira'],
    likes: 62, liked: false, timestamp: 'há 2 dias',
    comments: [
      { id: 1, author: { name: 'Marcos Pinto', initials: 'MP', role: 'Dev Fullstack · Júnior' }, content: 'Faz muito sentido! Vou atualizar o meu agora.', likes: 7, liked: false },
      { id: 2, author: { name: 'Sara Costa', initials: 'SC', role: 'Dev Mobile · Plena' }, content: 'Mesma coisa vale pro about — foca no que você entrega, não em tecnologias que usou.', likes: 9, liked: false },
    ],
  },
  {
    id: 5,
    author: { name: 'Gabriel Santos', initials: 'GS', role: 'Dev Backend · Iniciante' },
    content: 'Qual a diferença real entre aprender Java e Python para backend? Eu sei que "depende do objetivo", mas qual vocês recomendam pra quem quer entrar no mercado mais rápido? Estou em dúvida há semanas.',
    tags: ['Dúvida Técnica', 'Carreira'],
    likes: 15, liked: false, timestamp: 'há 2 dias',
    comments: [
      { id: 1, author: { name: 'Ana Lima', initials: 'AL', role: 'Dev Backend · Sênior' }, content: 'Python tem curva de aprendizado menor, você vai codar mais rápido. Java te força a entender OOP e tipagem desde o início — duro no começo mas te faz crescer mais sólido. Fintech e grandes empresas: Java. Startups e dados: Python.', likes: 18, liked: false },
    ],
  },
];

// ── Component ──────────────────────────────────────────────────
export default function Community() {
  const { t } = useTranslation();

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [openComments, setOpenComments] = useState(new Set());
  const [commentInputs, setCommentInputs] = useState({});
  const [composerText, setComposerText] = useState('');
  const [composerTags, setComposerTags] = useState([]);

  const togglePostLike = (postId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 }
        : p
    ));
  };

  const toggleCommentLike = (postId, commentId) => {
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comments: p.comments.map(c =>
            c.id === commentId
              ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
              : c
          )}
        : p
    ));
  };

  const toggleComments = (postId) => {
    setOpenComments(prev => {
      const next = new Set(prev);
      next.has(postId) ? next.delete(postId) : next.add(postId);
      return next;
    });
  };

  const addComment = (postId) => {
    const text = (commentInputs[postId] || '').trim();
    if (!text) return;
    setPosts(prev => prev.map(p =>
      p.id === postId
        ? { ...p, comments: [...p.comments, { id: Date.now(), author: { name: 'Você', initials: 'EU', role: '' }, content: text, likes: 0, liked: false }] }
        : p
    ));
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const publishPost = () => {
    if (!composerText.trim()) return;
    setPosts(prev => [{
      id: Date.now(),
      author: { name: 'Você', initials: 'EU', role: '' },
      content: composerText.trim(),
      tags: composerTags,
      likes: 0, liked: false,
      timestamp: 'agora',
      comments: [],
    }, ...prev]);
    setComposerText('');
    setComposerTags([]);
  };

  const toggleComposerTag = (tag) => {
    setComposerTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div className="community-page">
      <div className="community-header">
        <h1 className="community-title">{t('community.title')}</h1>
        <p className="community-subtitle">{t('community.subtitle')}</p>
      </div>

      {/* ── Composer ── */}
      <div className="composer-card">
        <div className="composer-top">
          <div className="post-avatar composer-avatar">EU</div>
          <textarea
            className="composer-textarea"
            placeholder={t('community.composerPlaceholder')}
            value={composerText}
            onChange={e => setComposerText(e.target.value)}
            rows={3}
          />
        </div>
        <div className="composer-bottom">
          <div className="composer-tags-row">
            <span className="composer-tags-label">{t('community.tagsLabel')}</span>
            <div className="composer-tags">
              {POST_TAGS.map(tag => (
                <button
                  key={tag}
                  className={`composer-tag-btn${composerTags.includes(tag) ? ' selected' : ''}`}
                  onClick={() => toggleComposerTag(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <button
            className="btn-publish"
            onClick={publishPost}
            disabled={!composerText.trim()}
          >
            {t('community.publish')}
          </button>
        </div>
      </div>

      {/* ── Feed ── */}
      <div className="feed">
        {posts.map(post => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <div className="post-avatar">{post.author.initials}</div>
              <div className="post-author-info">
                <span className="post-author-name">{post.author.name}</span>
                {post.author.role && <span className="post-author-role">{post.author.role}</span>}
              </div>
              <span className="post-timestamp">{post.timestamp}</span>
            </div>

            <p className="post-content">{post.content}</p>

            {post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map(tag => (
                  <span key={tag} className="post-tag">{tag}</span>
                ))}
              </div>
            )}

            <div className="post-actions">
              <button
                className={`post-action-btn${post.liked ? ' liked' : ''}`}
                onClick={() => togglePostLike(post.id)}
              >
                <HeartIcon filled={post.liked} />
                <span>{post.likes}</span>
              </button>
              <button
                className={`post-action-btn${openComments.has(post.id) ? ' active' : ''}`}
                onClick={() => toggleComments(post.id)}
              >
                <CommentIcon />
                <span>{post.comments.length}</span>
              </button>
            </div>

            {openComments.has(post.id) && (
              <div className="comments-section">
                {post.comments.length === 0 && (
                  <p className="comments-empty">{t('community.noComments')}</p>
                )}
                {post.comments.map(comment => (
                  <div key={comment.id} className="comment">
                    <div className="comment-avatar">{comment.author.initials}</div>
                    <div className="comment-body">
                      <div className="comment-meta">
                        <span className="comment-author-name">{comment.author.name}</span>
                        {comment.author.role && <span className="comment-author-role">{comment.author.role}</span>}
                      </div>
                      <p className="comment-content">{comment.content}</p>
                      <button
                        className={`comment-like-btn${comment.liked ? ' liked' : ''}`}
                        onClick={() => toggleCommentLike(post.id, comment.id)}
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
                    value={commentInputs[post.id] || ''}
                    onChange={e => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter') addComment(post.id); }}
                  />
                  <button
                    className="btn-comment-send"
                    onClick={() => addComment(post.id)}
                    disabled={!(commentInputs[post.id] || '').trim()}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
