'use client';

import React, { useEffect, useState } from 'react';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [prestations, setPrestations] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [demande, setDemande] = useState('');
  const [humanServices, setHumanServices] = useState([]);
  const [iaServices, setIaServices] = useState([]);
  const [waiter, setWaiter] = useState(false);
  const [selectedIaService, setSelectedIaService] = useState();
  const [demandeReady, setDemandeReady] = useState(false);
  const [formulaireReady, setFormulaireReady] = useState(false);
  const [formulaireIa, setFormulaireIa] = useState();
  const [responseFormulaireReady, setResponseFormulaireReady] = useState(false);

  // Base de données d'agents IA simulée
  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        const response = await fetch('http://localhost:3001/prestations');
        const data = await response.json();
        setPrestations(data.data);
        setResults(data.data); // Affiche tout par défaut si besoin
      } catch (error) {
        console.error('Erreur lors du chargement des prestations :', error);
      }
    };

    fetchPrestations();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    setTimeout(() => {
      if (query.trim() === '') {
        setResults(prestations);
      } else {
        const lowerQuery = query.toLowerCase();
        const filtered = prestations.filter((p) => {
          return (
            p.title?.toLowerCase().includes(lowerQuery) ||
            p.description?.toLowerCase().includes(lowerQuery) ||
            p.category?.toLowerCase().includes(lowerQuery) ||
            (p.tags && p.tags.some((tag: string) => tag.toLowerCase().includes(lowerQuery)))
          );
        });
        setResults(filtered);
      }
      setIsSearching(false);
    }, 300);
  };

  const getAvatar = (category: string) => {
    const map: Record<string, string> = {
      design: '🎨',
      développement: '💻',
      vidéo: '🎬',
      ui: '✨',
      data: '📊',
      mobile: '📱',
      rédaction: '✍️',
      seo: '🔍',
    };
    return map[category?.toLowerCase()] || '🤖';
  };

  const sendDemande = async () => {
    if (!demande.trim()) return;
    try {
      setWaiter(true);
      const response = await fetch('http://localhost:3001/ia/prestations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userRequest : demande}),
      });
      const data = await response.json();
      setWaiter(false);
      setHumanServices(data.humaines || []);
      setIaServices(data.ia || []);
      setDemandeReady(true);
    } catch (error) {
      setWaiter(false);
      setDemandeReady(false);
      console.error('Erreur lors de l’envoi de la demande IA:', error);
    }
  };

  const handleFormChange = (index: number, value: string) => {
    const updatedForm = [...formulaireIa];
    updatedForm[index].value = value;
    setFormulaireIa(updatedForm);
  };

  const sendFormulaireIA = async (e) => {
    e.preventDefault();
  
    // Transforme le tableau en objet { name1: value1, name2: value2, ... }
    const payload = formulaireIa.reduce((acc, field) => {
      acc[field.name] = field.value;
      return acc;
    }, {});
  
    try {
      const response = await fetch(`http://localhost:3001/ia/prestations/${selectedIaService}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ form: payload }),
      });
  
      const data = await response.json();
      } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire :", error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Hero Section */}
      <div style={styles.hero}>
        <h2 style={styles.heroTitle}>
          Trouvez la pretation parfaite pour
          <span style={styles.titleGradient}>
            votre projet
          </span>
        </h2>
        <p style={styles.heroSubtitle}>
          Décrivez votre besoin et découvrez les meilleurs prestations pour vous aider
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
            <button
              onClick={() => setShowChat(true)}
              style={styles.iaChatButton}
            >
              💬 IA Chat
            </button>
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
                <div style={styles.agentAvatar}>{getAvatar(agent.category)}</div>
                <div style={styles.agentInfo}>
                  <h3 style={styles.agentName}>{agent.title} {agent.serviceParIa ? '(IA Service)' : ''}</h3>
                  <p style={styles.agentType}>{agent.category}</p>
                  <p style={styles.agentSpecialty}>Durée : {agent.duration}</p>
                </div>
                </div>

                <p style={styles.agentDescription}>{agent.description}</p>

                <div style={styles.agentPortfolio}>
                  <p style={styles.portfolioTitle}>Tags :</p>
                  <div style={styles.portfolioTags}>
                    {agent.tags.map((item) => (
                      <span key={item} style={styles.portfolioTag}>
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

      {showChat && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ marginBottom: '1rem', color: 'black' }}>IA Chat</h3>
              <button style={styles.closebtn}
                onClick={() => setShowChat(false)}
              >✖</button>
            </div>
            <div>
              <h4 style={{color: 'black'}}>Bienvenue dans l'assistant IA. Vous pouvez exprimer votre demande ici !</h4>
              <textarea
                placeholder="Ex: Je souhaite traduire un texte"
                rows={4}
                value={demande}
                onChange={(e) => setDemande(e.target.value)}
                style={{
                  width: '100%',
                  padding: '1rem',
                  marginTop: '1rem',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
                readOnly={demandeReady}
              />
            </div>
            
            {demandeReady && (<div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '1rem', color: 'black' }}>💼 Services Humains</h4>
                {humanServices.length === 0 && <p style={{ color: '#666' }}>Aucun service humain trouvé.</p>}
                {humanServices.map((service) => (
                  <div
                  key={service.id}
                  style={{
                    padding: '1rem',
                    marginBottom: '1rem',
                    backgroundColor: '#eef2ff',
                    borderRadius: '10px',
                    border: '1px solid #c7d2fe',
                  }}
                >
                  <h5 style={{ margin: 0, fontWeight: 600, color: 'black' }}>{service.title}</h5>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#444' }}>{service.description}</p>
                </div>

                  ))}
                </div>
              
              {/* Services IA */}
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '1rem', color: 'black' }}>🤖 Services IA</h4>
                {iaServices.length === 0 && <p style={{ color: '#666' }}>Aucun service IA trouvé.</p>}
                {iaServices.map((service) => (
                  <div
                    key={service.id}
                    style={{ cursor: 'pointer' }}
                    onClick={async () => {
                      try {
                        const response = await fetch(`http://localhost:3001/ia/form/${service.id}`);
                        const formData = await response.json();
                      
                        const enrichedForm = formData.form.map(field => ({
                          ...field,
                          value: '',
                        }));
                      
                        setSelectedIaService(service.id);
                        setFormulaireIa(enrichedForm);
                        setFormulaireReady(true);
                        setResponseFormulaireReady(false);
                      } catch (error) {
                        console.error('Erreur lors de la récupération du formulaire :', error);
                        setResponseFormulaireReady(false);
                      }
                    }}                  
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  >
                    <h5 style={{ margin: 0, fontWeight: 600, color: 'black' }}>{service.title}</h5>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
            )}

            {(formulaireReady && formulaireIa) && (<div>
              <h4 style={{color: 'black'}}>Formulaire</h4>
              <form
                onSubmit={sendFormulaireIA}
                style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
              >
                {formulaireIa.map((field, index) => {
                  if (field.type === 'textarea') {
                    return (
                      <div key={index}>
                        <label style={{color: 'black'}}>{field.label}</label>
                        <textarea
                          name={field.name}
                          value={field.value}
                          onChange={(e) => handleFormChange(index, e.target.value)}
                          rows={4}
                        />
                      </div>
                    );
                  } else if (field.type === 'select') {
                    return (
                      <div key={index}>
                        <label style={{color: 'black'}}>{field.label}</label>
                        <select
                          name={field.name}
                          value={field.value}
                          onChange={(e) => handleFormChange(index, e.target.value)}
                        >
                          {field.options.map((option, optIndex) => (
                            <option key={optIndex} value={option.value}>{option.name}</option>
                          ))}
                        </select>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <label style={{color: 'black'}}>{field.label}</label>
                        <input
                          name={field.name}
                          value={field.value}
                          onChange={(e) => handleFormChange(index, e.target.value)}
                        />
                      </div>
                    );
                  }
                })}
                <button type="submit">Soumettre</button>
              </form>
            </div>
            )}

            {responseFormulaireReady && (
              <p>
                {responseFormulaireReady}
              </p>
            )}

            <div style={{ textAlign: 'right', marginTop: '1rem' }}>
              <div
                onClick={() => sendDemande()}
                style={{
                  background: 'blue',
                  width: 'fit-content',
                  height: 'fit-content',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                {waiter ? (
                  <div style={styles.loadingIcon}>
                    <div style={styles.spinner}></div>
                  </div>
                  ) : ('Envoyer')
                }
              </div>
            </div>
          </div>
        </div>
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
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box' as const,
  },
  loadingIcon: {
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
  iaChatButton: {
    position: 'absolute',
    right: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'linear-gradient(135deg, #2563eb, #9333ea)',
    color: 'white',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.8rem',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalContent: {
    background: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    width: '90%',
    maxWidth: '1000px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    textAlign: 'left',
  },
  closebtn: {
    color: 'black',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    marginBottom: 'auto'
  }
};

export default HomePage;