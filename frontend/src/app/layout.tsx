'use client';
import { ReactNode } from 'react';
import './globals.css'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body style={{margin: 0, padding: 0, width: '100%'}}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <div style={styles.headerLeft}>
              <div style={styles.logo}>
                <div style={styles.logoIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
                    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
                  </svg>
                </div>
                <h1 style={styles.title}>Fluent IA</h1>
              </div>
            </div>
            
            <nav style={styles.nav}>
              <a href="#" style={styles.navLink}>Explorer</a>
              <a href="#" style={styles.navLink}>À propos</a>
              <button style={styles.headerButton}>Commencer</button>
            </nav>
            
            {/* Mobile menu button */}
            <button style={styles.mobileMenuButton}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main style={{width: '100%', padding: 0, margin: 0}}>
          {children}
        </main>

        {/* Footer */}
        <footer style={styles.footer}>
          <div style={styles.footerContent}>
            <div style={styles.footerTop}>
              <div style={styles.footerBrand}>
                <div style={styles.footerLogo}>
                  <div style={styles.footerLogoIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="currentColor"/>
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <span style={styles.footerTitle}>Fluent IA</span>
                </div>
                <p style={styles.footerDescription}>
                  Révolutionnez votre workflow avec l'intelligence artificielle. 
                  Des solutions innovantes pour un avenir intelligent.
                </p>
                <div style={styles.socialLinks}>
                  <a href="#" style={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" style={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="#" style={styles.socialLink}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div style={styles.footerLinks}>
                <div style={styles.footerColumn}>
                  <h4 style={styles.footerColumnTitle}>Produit</h4>
                  <ul style={styles.footerList}>
                    <li><a href="#" style={styles.footerLink}>Fonctionnalités</a></li>
                    <li><a href="#" style={styles.footerLink}>Prix</a></li>
                    <li><a href="#" style={styles.footerLink}>API</a></li>
                    <li><a href="#" style={styles.footerLink}>Documentation</a></li>
                  </ul>
                </div>
                
                <div style={styles.footerColumn}>
                  <h4 style={styles.footerColumnTitle}>Entreprise</h4>
                  <ul style={styles.footerList}>
                    <li><a href="#" style={styles.footerLink}>À propos</a></li>
                    <li><a href="#" style={styles.footerLink}>Blog</a></li>
                    <li><a href="#" style={styles.footerLink}>Carrières</a></li>
                    <li><a href="#" style={styles.footerLink}>Presse</a></li>
                  </ul>
                </div>
                
                <div style={styles.footerColumn}>
                  <h4 style={styles.footerColumnTitle}>Support</h4>
                  <ul style={styles.footerList}>
                    <li><a href="#" style={styles.footerLink}>Centre d'aide</a></li>
                    <li><a href="#" style={styles.footerLink}>Contact</a></li>
                    <li><a href="#" style={styles.footerLink}>Statut</a></li>
                    <li><a href="#" style={styles.footerLink}>Communauté</a></li>
                  </ul>
                </div>
                
                <div style={styles.footerColumn}>
                  <h4 style={styles.footerColumnTitle}>Légal</h4>
                  <ul style={styles.footerList}>
                    <li><a href="#" style={styles.footerLink}>Confidentialité</a></li>
                    <li><a href="#" style={styles.footerLink}>Conditions</a></li>
                    <li><a href="#" style={styles.footerLink}>Cookies</a></li>
                    <li><a href="#" style={styles.footerLink}>Licences</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div style={styles.footerBottom}>
              <div style={styles.footerBottomContent}>
                <div style={styles.footerBottomLinks}>
                  <a href="#" style={styles.footerBottomLink}>Politique de confidentialité</a>
                  <a href="#" style={styles.footerBottomLink}>Conditions d'utilisation</a>
                  <a href="#" style={styles.footerBottomLink}>Paramètres des cookies</a>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

const styles = {
  header: {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
    position: 'sticky' as const,
    top: 0,
    zIndex: 50,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    margin: 0, // Ajouté
    width: '100%', // Ajouté
  },
  headerContent: {
    maxWidth: '100%', // Modifié de 1200px à 100%
    margin: 0, // Modifié de '0 auto' à 0
    padding: '0 1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '70px',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0,
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  navLink: {
    color: '#374151',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    padding: '8px 16px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  headerButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 24px',
    borderRadius: '10px',
    fontWeight: '600',
    fontSize: '14px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
  },
  mobileMenuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: '#374151',
    cursor: 'pointer',
    padding: '8px',
  },
  footer: {
    background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
    color: 'white',
    margin: 0, // Modifié de 'marginTop: 5rem' à 0
    width: '100%', // Ajouté
  },
  footerContent: {
    maxWidth: '100%', // Modifié de 1200px à 100%
    margin: 0, // Modifié de '0 auto' à 0
    padding: '0 1.5rem',
  },
  footerTop: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '4rem',
    padding: '4rem 0 2rem 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    margin: 0, // Ajouté
  },
  footerBrand: {
    maxWidth: '350px',
  },
  footerLogo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '1.5rem',
  },
  footerLogoIcon: {
    width: '32px',
    height: '32px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  footerTitle: {
    fontSize: '20px',
    fontWeight: '700',
    color: 'white',
  },
  footerDescription: {
    color: '#d1d5db',
    lineHeight: '1.6',
    marginBottom: '2rem',
    fontSize: '16px',
  },
  socialLinks: {
    display: 'flex',
    gap: '16px',
  },
  socialLink: {
    width: '40px',
    height: '40px',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#d1d5db',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  footerLinks: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '2rem',
  },
  footerColumn: {},
  footerColumnTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '1rem',
  },
  footerList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  footerLink: {
    color: '#d1d5db',
    textDecoration: 'none',
    fontSize: '14px',
    lineHeight: '2',
    transition: 'color 0.2s ease',
  },
  footerBottom: {
    padding: '2rem 0',
    margin: 0, // Ajouté
  },
  footerBottomContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    margin: 0, // Ajouté
  },
  footerBottomLinks: {
    display: 'flex',
    gap: '2rem',
  },
  footerBottomLink: {
    color: '#9ca3af',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'color 0.2s ease',
  },
};

export default Layout;
