'use client';

import React, { useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Base de données d'agents IA simulée
  const aiAgents = [
    {
      id: 1,
      name: "DesignMaster AI",
      type: "Agent de Design",
      speciality: "Logos & Branding",
      rating: 4.9,
      price: "€50-200",
      avatar: "🎨",
      description: "Expert en création de logos et identités visuelles",
      keywords: ['logo', 'design', 'graphique', 'branding', 'visuel', 'identité'],
      portfolio: ["Logo Tech", "Branding Startup", "UI Mobile"],
      availability: "Disponible maintenant"
    },
    {
      id: 2,
      name: "CodeCraft AI",
      type: "Agent Développeur",
      speciality: "Applications Web",
      rating: 4.9,
      price: "€200-800",
      avatar: "💻",
      description: "Développement d'applications web performantes",
      keywords: ['site', 'web', 'application', 'développer', 'programmer', 'code', 'app'],
      portfolio: ["E-commerce Platform", "SaaS Dashboard", "Portfolio Site"],
      availability: "Disponible maintenant"
    },
    {
      id: 3,
      name: "Video Wizard",
      type: "Agent Vidéo",
      speciality: "Montage & Animation",
      rating: 4.8,
      price: "€100-500",
      avatar: "🎬",
      description: "Expert en montage vidéo et animations",
      keywords: ['vidéo', 'montage', 'animation', 'film', 'clip', 'motion'],
      portfolio: ["Pub TV", "Video Corporate", "Animation 3D"],
      availability: "Disponible maintenant"
    },
    {
      id: 4,
      name: "Creative Genius",
      type: "Agent Graphique",
      speciality: "Interface Design",
      rating: 4.8,
      price: "€80-300",
      avatar: "✨",
      description: "Spécialisé dans les interfaces modernes et UX",
      keywords: ['interface', 'ui', 'ux', 'design', 'app', 'mobile', 'utilisateur'],
      portfolio: ["App E-commerce", "Dashboard Analytics", "Site Portfolio"],
      availability: "2h de délai"
    },
    {
      id: 5,
      name: "DataViz Master",
      type: "Agent Data",
      speciality: "Analyse & Visualisation",
      rating: 4.9,
      price: "€150-600",
      avatar: "📊",
      description: "Analyse de données et création de dashboards",
      keywords: ['données', 'data', 'analyse', 'statistiques', 'dashboard', 'reporting'],
      portfolio: ["Dashboard Sales", "Report Analytics", "Data Mining"],
      availability: "30 min de délai"
    },
    {
      id: 6,
      name: "Mobile Maker",
      type: "Agent Mobile",
      speciality: "Apps iOS/Android",
      rating: 4.7,
      price: "€300-1200",
      avatar: "📱",
      description: "Création d'applications mobiles natives",
      keywords: ['mobile', 'app', 'ios', 'android', 'smartphone', 'application'],
      portfolio: ["App Fitness", "App Banking", "Game Mobile"],
      availability: "1 jour de délai"
    },
    {
      id: 7,
      name: "AI Content Writer",
      type: "Agent Rédaction",
      speciality: "Contenu & Copywriting",
      rating: 4.6,
      price: "€30-150",
      avatar: "✍️",
      description: "Rédaction de contenu optimisé et copywriting",
      keywords: ['contenu', 'rédaction', 'texte', 'article', 'copywriting', 'écriture'],
      portfolio: ["Articles Blog", "Pages Vente", "Posts Social"],
      availability: "Disponible maintenant"
    },
    {
      id: 8,
      name: "SEO Optimizer",
      type: "Agent SEO",
      speciality: "Référencement Web",
      rating: 4.7,
      price: "€100-400",
      avatar: "🔍",
      description: "Optimisation SEO et stratégies de référencement",
      keywords: ['seo', 'référencement', 'google', 'optimisation', 'trafic', 'visibilité'],
      portfolio: ["Audit SEO", "Stratégie Content", "Link Building"],
      availability: "Disponible maintenant"
    }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsSearching(true);

    setTimeout(() => {
      if (query.trim() === '') {
        setResults([]);
      } else {
        // Recherche intelligente dans les agents IA
        const filteredAgents = aiAgents.filter(agent => {
          const searchTerms = query.toLowerCase();
          return (
            agent.name.toLowerCase().includes(searchTerms) ||
            agent.type.toLowerCase().includes(searchTerms) ||
            agent.speciality.toLowerCase().includes(searchTerms) ||
            agent.description.toLowerCase().includes(searchTerms) ||
            agent.keywords.some(keyword => 
              keyword.toLowerCase().includes(searchTerms) ||
              searchTerms.includes(keyword.toLowerCase())
            )
          );
        });
        setResults(filteredAgents);
      }
      setIsSearching(false);
    }, 300);
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h2 style={styles.heroTitle}>
          Trouvez l'agent IA parfait pour
          <span style={styles.titleGradient}>
            votre projet
          </span>
        </h2>
        <p style={styles.heroSubtitle}>
          Décrivez votre besoin et découvrez les meilleurs agents IA spécialisés pour vous aider
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
              placeholder="Ex: Je veux un logo pour ma startup, créer une app mobile, montage vidéo..."
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

          {/* Suggestions rapides */}
          {!searchQuery && (
            <div style={styles.suggestions}>
              <p style={styles.suggestionsTitle}>Essayez ces exemples :</p>
              <div style={styles.suggestionsList}>
                {['Logo startup', 'Site web', 'App mobile', 'Vidéo promo', 'Design interface', 'Analyse données'].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearch(suggestion)}
                    style={styles.suggestionChip}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Search Query Display */}
        {searchQuery && (
          <div style={styles.queryDisplay}>
            <p style={styles.queryText}>
              Agents IA pour : <span style={styles.queryHighlight}>"{searchQuery}"</span>
            </p>
          </div>
        )}
      </div>

      {/* Agents IA Results */}
      {results.length > 0 && (
        <div style={styles.resultsSection}>
          <div style={styles.resultsGrid}>
            {results.map((agent) => (
              <div key={agent.id} style={styles.agentCard}>
                <div style={styles.agentHeader}>
                  <div style={styles.agentAvatar}>{agent.avatar}</div>
                  <div style={styles.agentInfo}>
                    <h3 style={styles.agentName}>{agent.name}</h3>
                    <p style={styles.agentType}>{agent.type}</p>
                    <p style={styles.agentSpecialty}>{agent.speciality}</p>
                  </div>
                  <div style={styles.agentRating}>
                    <span style={styles.ratingStars}>⭐</span>
                    <span style={styles.ratingScore}>{agent.rating}</span>
                  </div>
                </div>

                <p style={styles.agentDescription}>{agent.description}</p>

                <div style={styles.agentPortfolio}>
                  <p style={styles.portfolioTitle}>Portfolio :</p>
                  <div style={styles.portfolioTags}>
                    {agent.portfolio.map((item, index) => (
                      <span key={index} style={styles.portfolioTag}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={styles.agentFooter}>
                  <div style={styles.agentPricing}>
                    <span style={styles.priceLabel}>Prix :</span>
                    <span style={styles.priceValue}>{agent.price}</span>
                  </div>
                  <div style={styles.agentAvailability}>
                    <span style={styles.availabilityDot}></span>
                    <span style={styles.availabilityText}>{agent.availability}</span>
                  </div>
                </div>

                <div style={styles.agentActions}>
                  <button style={styles.contactButton}>
                    💬 Contacter
                  </button>
                  <button style={styles.hireButton}>
                    🚀 Embaucher
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Message quand pas de résultats */}
      {searchQuery && results.length === 0 && !isSearching && (
        <div style={styles.noResults}>
          <div style={styles.noResultsIcon}>🤖</div>
          <h3 style={styles.noResultsTitle}>Aucun agent trouvé</h3>
          <p style={styles.noResultsText}>
            Essayez avec d'autres mots-clés comme "design", "développement", "vidéo", etc.
          </p>
        </div>
      )}

      {/* Features Grid - Affichée seulement quand pas de recherche */}
      {!searchQuery && (
        <>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIconBlue}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2"></polygon>
                </svg>
              </div>
              <h3 style={styles.featureTitle}>Agents IA Spécialisés</h3>
              <p style={styles.featureDescription}>
                Chaque agent est expert dans son domaine pour des résultats optimaux
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIconPurple}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 style={styles.featureTitle}>Recherche Intelligente</h3>
              <p style={styles.featureDescription}>
                Notre IA comprend vos besoins et trouve les meilleurs agents pour vous
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
              <h3 style={styles.featureTitle}>Disponibilité 24/7</h3>
              <p style={styles.featureDescription}>
                Nos agents IA sont disponibles à tout moment pour réaliser vos projets
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div style={styles.ctaSection}>
            <h3 style={styles.ctaTitle}>Prêt à commencer ?</h3>
            <p style={styles.ctaSubtitle}>
              Décrivez votre projet et trouvez l'agent IA parfait en quelques secondes
            </p>
            <button 
              style={styles.ctaButton}
              onClick={() => document.querySelector('input').focus()}
            >
              Commencer ma recherche
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #dbeafe 0%, #ffffff 50%, #faf5ff 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    width: '100%',
    margin: 0,
    padding: '4rem 0',
  },
  hero: {
    textAlign: 'center' as const,
    marginBottom: '4rem',
    padding: '0 1.5rem',
    maxWidth: '1200px',
    margin: '0 auto 4rem auto',
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
    maxWidth: '700px',
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
    fontSize: '16px',
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
  suggestions: {
    marginTop: '1.5rem',
    textAlign: 'left' as const,
  },
  suggestionsTitle: {
    color: '#6b7280',
    marginBottom: '1rem',
    fontSize: '0.9rem',
  },
  suggestionsList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.75rem',
    justifyContent: 'center',
  },
  suggestionChip: {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid #e5e7eb',
    borderRadius: '20px',
    padding: '0.5rem 1rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.9rem',
    color: '#374151',
  },
  queryDisplay: {
    marginBottom: '2rem',
  },
  queryText: {
    color: '#6b7280',
    margin: 0,
    fontSize: '1rem',
  },
  queryHighlight: {
    fontWeight: '600',
    color: '#2563eb',
  },
  resultsSection: {
    padding: '0 1.5rem',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  resultsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
  },
  agentCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRadius: '20px',
    padding: '1.5rem',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.2s',
  },
  agentHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '1rem',
    marginBottom: '1rem',
  },
  agentAvatar: {
    width: '50px',
    height: '50px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    fontSize: '1.2rem',
    fontWeight: '700',
    color: '#1f2937',
    margin: '0 0 0.25rem 0',
  },
  agentType: {
    color: '#667eea',
    fontWeight: '600',
    margin: '0 0 0.25rem 0',
    fontSize: '0.8rem',
  },
  agentSpecialty: {
    color: '#6b7280',
    margin: 0,
    fontSize: '0.8rem',
  },
  agentRating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  },
  ratingStars: {
    fontSize: '1rem',
  },
  ratingScore: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '0.9rem',
  },
  agentDescription: {
    color: '#374151',
    marginBottom: '1rem',
    lineHeight: '1.5',
    fontSize: '0.9rem',
  },
  agentPortfolio: {
    marginBottom: '1rem',
  },
  portfolioTitle: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '0.5rem',
  },
  portfolioTags: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '0.5rem',
  },
  portfolioTag: {
    background: '#f3f4f6',
    borderRadius: '6px',
    padding: '0.25rem 0.5rem',
    fontSize: '0.7rem',
    color: '#374151',
  },
  agentFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
    paddingTop: '1rem',
    borderTop: '1px solid #e5e7eb',
  },
  agentPricing: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  priceLabel: {
    color: '#6b7280',
    fontSize: '0.8rem',
  },
  priceValue: {
    fontWeight: '700',
    color: '#1f2937',
    fontSize: '0.9rem',
  },
  agentAvailability: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  availabilityDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    background: '#10b981',
  },
  availabilityText: {
    color: '#6b7280',
    fontSize: '0.7rem',
  },
  agentActions: {
    display: 'flex',
    gap: '0.75rem',
  },
  contactButton: {
    flex: 1,
    background: 'transparent',
    border: '2px solid #667eea',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    color: '#667eea',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontSize: '0.8rem',
  },
  hireButton: {
    flex: 1,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '8px',
    padding: '0.6rem 1rem',
    color: 'white',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    fontSize: '0.8rem',
  },
  noResults: {
    textAlign: 'center' as const,
    padding: '3rem 1.5rem',
    maxWidth: '500px',
    margin: '0 auto',
  },
  noResultsIcon: {
    fontSize: '4rem',
    marginBottom: '1rem',
  },
  noResultsTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '1rem',
  },
  noResultsText: {
    color: '#6b7280',
    lineHeight: '1.6',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
    padding: '0 1.5rem',
    maxWidth: '1200px',
    margin: '0 auto 4rem auto',
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
    margin: '0 1.5rem',
    maxWidth: '1200px',
    marginLeft: 'auto',
    marginRight: 'auto',
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