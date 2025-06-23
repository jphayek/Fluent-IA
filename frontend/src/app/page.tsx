'use client';

import React, { useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Données d'exemple pour la recherche
  const sampleData = [
    'Intelligence Artificielle',
    'Machine Learning',
    'Deep Learning',
    'Natural Language Processing',
    'Computer Vision',
    'Neural Networks',
    'Data Science',
    'Python Programming',
    'TensorFlow',
    'PyTorch',
    'React Development',
    'Next.js Framework',
    'TypeScript',
    'Node.js',
    'API Development'
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    setTimeout(() => {
      if (query.trim() === '') {
        setResults([]);
      } else {
        const filteredResults = sampleData.filter(item =>
          item.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filteredResults);
      }
      setIsSearching(false);
    }, 300);
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h2 style={styles.heroTitle}>
          Découvrez le pouvoir de
          <span style={styles.titleGradient}>
            l'Intelligence Artificielle
          </span>
        </h2>
        <p style={styles.heroSubtitle}>
          Explorez, apprenez et maîtrisez les technologies IA les plus avancées avec notre plateforme intuitive
        </p>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <div style={styles.searchWrapper}>
            <div style={styles.searchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher des technologies, cours, ou concepts IA..."
              style={styles.searchInput}
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
            {isSearching && (
              <div style={styles.loadingIcon}>
                <div style={styles.spinner}></div>
              </div>
            )}
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div style={styles.resultsContainer}>
              {results.map((result, index) => (
                <div
                  key={index}
                  style={styles.resultItem}
                  onClick={() => setSearchQuery(result)}
                >
                  <div style={styles.resultContent}>
                    <div style={styles.resultDot}></div>
                    <span style={styles.resultText}>{result}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Query Display */}
        {searchQuery && (
          <div style={styles.queryDisplay}>
            <p style={styles.queryText}>
              Résultats pour : <span style={styles.queryHighlight}>"{searchQuery}"</span>
            </p>
          </div>
        )}
      </div>

      {/* Features Grid */}
      <div style={styles.featuresGrid}>
        <div style={styles.featureCard}>
          <div style={styles.featureIconBlue}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
            </svg>
          </div>
          <h3 style={styles.featureTitle}>IA Rapide</h3>
          <p style={styles.featureDescription}>
            Traitement ultra-rapide avec des algorithmes optimisés pour une performance maximale
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIconPurple}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 style={styles.featureTitle}>Précis</h3>
          <p style={styles.featureDescription}>
            Résultats d'une précision exceptionnelle grâce à nos modèles d'apprentissage avancés
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.featureIconGreen}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </div>
          <h3 style={styles.featureTitle}>Adaptable</h3>
          <p style={styles.featureDescription}>
            Interface intuitive qui s'adapte à vos besoins et préférences d'utilisation
          </p>
        </div>
      </div>

      {/* CTA Section */}
      <div style={styles.ctaSection}>
        <h3 style={styles.ctaTitle}>Prêt à commencer ?</h3>
        <p style={styles.ctaSubtitle}>
          Rejoignez des milliers d'utilisateurs qui font confiance à Fluent IA
        </p>
        <button style={styles.ctaButton}>
          Démarrer maintenant
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #faf5ff 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: '100%', // Ajouté pour full width
    margin: 0, // Supprimé les marges
    padding: '4rem 0', // Modifié le padding horizontal
  },
  hero: {
    textAlign: 'center' as const,
    marginBottom: '4rem',
    padding: '0 1.5rem', // Ajouté du padding pour le contenu
    maxWidth: '1200px', // Limiter la largeur du contenu pour la lisibilité
    margin: '0 auto 4rem auto', // Centrer le contenu
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '1.5rem',
    lineHeight: '1.2',
  },
  titleGradient: {
    background: 'linear-gradient(135deg, #2563eb, #9333ea)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    display: 'block',
  },
  heroSubtitle: {
    fontSize: '20px',
    color: '#6b7280',
    marginBottom: '3rem',
    maxWidth: '600px',
    margin: '0 auto 3rem auto',
    lineHeight: '1.6',
  },
  searchContainer: {
    position: 'relative' as const,
    maxWidth: '600px',
    margin: '0 auto 2rem auto',
  },
  searchWrapper: {
    position: 'relative' as const,
  },
  searchIcon: {
    position: 'absolute' as const,
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    pointerEvents: 'none' as const,
  },
  searchInput: {
    width: '100%',
    padding: '16px 16px 16px 48px',
    fontSize: '18px',
    border: 'none',
    borderRadius: '16px',
    background: 'white',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box' as const,
  },
  loadingIcon: {
    position: 'absolute' as const,
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid #e5e7eb',
    borderTop: '2px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  resultsContainer: {
    position: 'absolute' as const,
    width: '100%',
    marginTop: '8px',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    border: '1px solid #e5e7eb',
    zIndex: 40,
    maxHeight: '320px',
    overflowY: 'auto' as const,
  },
  resultItem: {
    padding: '12px 24px',
    cursor: 'pointer',
    borderBottom: '1px solid #f3f4f6',
    transition: 'background-color 0.2s ease',
  },
  resultContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  resultDot: {
    width: '8px',
    height: '8px',
    background: '#3b82f6',
    borderRadius: '50%',
  },
  resultText: {
    color: '#1f2937',
  },
  queryDisplay: {
    marginBottom: '2rem',
  },
  queryText: {
    color: '#6b7280',
    margin: 0,
  },
  queryHighlight: {
    fontWeight: '600',
    color: '#2563eb',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
    padding: '0 1.5rem', // Ajouté du padding
    maxWidth: '1200px', // Limiter la largeur
    margin: '0 auto 4rem auto', // Centrer
  },
  featureCard: {
    padding: '2rem',
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    border: '1px solid #f3f4f6',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  featureIconBlue: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    color: 'white',
    transition: 'transform 0.3s ease',
  },
  featureIconPurple: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #a855f7, #9333ea)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    color: 'white',
    transition: 'transform 0.3s ease',
  },
  featureIconGreen: {
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    color: 'white',
    transition: 'transform 0.3s ease',
  },
  featureTitle: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: '1rem',
  },
  featureDescription: {
    color: '#6b7280',
    lineHeight: '1.6',
    margin: 0,
  },
  ctaSection: {
    textAlign: 'center' as const,
    background: 'linear-gradient(135deg, #2563eb, #9333ea)',
    borderRadius: '24px',
    padding: '3rem',
    color: 'white',
    margin: '0 1.5rem', // Ajouté des marges sur les côtés
    maxWidth: '1200px', // Limiter la largeur
    marginLeft: 'auto', // Centrer
    marginRight: 'auto', // Centrer
  },
  ctaTitle: {
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '1rem',
  },
  ctaSubtitle: {
    fontSize: '20px',
    marginBottom: '2rem',
    opacity: 0.9,
  },
  ctaButton: {
    background: 'white',
    color: '#2563eb',
    padding: '16px 32px',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '18px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
  },
};

export default HomePage;