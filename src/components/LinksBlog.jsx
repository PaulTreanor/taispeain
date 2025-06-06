import { useState } from 'react';

const mockLinks = [
  {
    id: 1,
    title: "The Future of Web Development",
    url: "https://example.com/future-web-dev",
    author: "Jane Doe",
    date: "2024-01-15",
    comment: "Fascinating insights into where the web is heading. The section on distributed computing really resonated with my recent experiments."
  },
  {
    id: 2,
    title: "Understanding Celtic Typography",
    url: "https://example.com/celtic-typography",
    author: "Seán Ó Briain",
    date: "2024-01-12",
    comment: "Beautiful exploration of traditional Irish letterforms. Makes me want to redesign everything with proper respect for our heritage."
  },
  {
    id: 3,
    title: "Building Sustainable Software",
    url: "https://example.com/sustainable-software",
    author: "Tech Collective",
    date: "2024-01-10",
    comment: "Practical advice on reducing digital carbon footprints. Their metrics for measuring code efficiency are surprisingly actionable."
  },
  {
    id: 4,
    title: "The Philosophy of Simple Design",
    url: "https://example.com/simple-design",
    author: "Maria Santos",
    date: "2024-01-08",
    comment: "Minimalism done right. The author's approach to constraint-based creativity mirrors traditional Irish storytelling techniques beautifully."
  },
  {
    id: 5,
    title: "Modern Gaeilge Resources",
    url: "https://example.com/gaeilge-resources",
    author: "Conradh na Gaeilge",
    date: "2024-01-05",
    comment: "Excellent compilation of digital tools for Irish learners. The pronunciation guides are particularly well done for online formats."
  }
];

export default function LinksBlog() {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ga-IE', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="links-container">
      <header className="site-header">
        <h1 className="irish-title">Naisc</h1>
        <p className="tagline">Curated links & thoughts</p>
      </header>
      
      <main className="links-main">
        {mockLinks.map((link) => (
          <article key={link.id} className="link-entry">
            <div className="link-meta">
              <time className="link-date">{formatDate(link.date)}</time>
            </div>
            <div className="link-content">
              <h2 className="link-title">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.title}
                </a>
              </h2>
              <div className="link-author">le {link.author}</div>
              <p className="link-comment">{link.comment}</p>
            </div>
          </article>
        ))}
      </main>
      
      <style jsx>{`
        .links-container {
          max-width: 680px;
          margin: 0 auto;
          padding: 2rem 1rem;
          line-height: 1.6;
        }
        
        .site-header {
          border-bottom: 2px solid var(--gold);
          margin-bottom: 3rem;
          padding-bottom: 1.5rem;
        }
        
        .site-header h1 {
          font-size: 3rem;
          font-weight: 400;
          margin: 0;
          letter-spacing: 0.05em;
        }
        
        .tagline {
          margin: 0.5rem 0 0 0;
          color: var(--stone);
          font-style: italic;
          font-size: 1.1rem;
        }
        
        .link-entry {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 1rem;
          margin-bottom: 2.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid var(--sage-green);
        }
        
        .link-entry:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        
        .link-meta {
          text-align: right;
          padding-top: 0.2rem;
        }
        
        .link-date {
          font-size: 0.85rem;
          color: var(--deep-blue);
          font-weight: 600;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .link-content {
          min-width: 0;
        }
        
        .link-title {
          margin: 0 0 0.3rem 0;
          font-size: 1.2rem;
          font-weight: 600;
          line-height: 1.3;
        }
        
        .link-title a {
          color: var(--forest-green);
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: border-color 0.2s ease;
        }
        
        .link-title a:hover {
          border-bottom-color: var(--gold);
        }
        
        .link-author {
          font-size: 0.9rem;
          color: var(--sage-green);
          margin-bottom: 0.8rem;
          font-style: italic;
          font-weight: 600;
        }
        
        .link-comment {
          margin: 0;
          font-size: 0.95rem;
          color: var(--stone);
          line-height: 1.5;
        }
        
        @media (max-width: 600px) {
          .links-container {
            padding: 1.5rem 1rem;
          }
          
          .link-entry {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
          
          .link-meta {
            text-align: left;
          }
          
          .site-header h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}