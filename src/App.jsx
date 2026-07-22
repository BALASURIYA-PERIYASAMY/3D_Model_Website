import { useState, useRef, useCallback } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import SequenceSection from './components/SequenceSection'
import FeaturesSection from './components/FeaturesSection'
import ColorSection from './components/ColorSection'
import SpecsSection from './components/SpecsSection'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import LoadingOverlay from './components/LoadingOverlay'

// Subpages
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfUse from './pages/TermsOfUse'
import Accessibility from './pages/Accessibility'
import Sitemap from './pages/Sitemap'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [page, setPage] = useState('home') // 'home' | 'privacy' | 'terms' | 'accessibility' | 'sitemap'
  const loadingBarRef = useRef(null)

  const handleLoadingProgress = useCallback((progress) => {
    if (loadingBarRef.current) {
      loadingBarRef.current.style.width = (progress * 100) + '%'
    }
  }, [])

  const handleReady = useCallback(() => {
    setIsReady(true)
  }, [])

  const handleNavigate = (targetPage) => {
    setPage(targetPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleBackToHome = () => {
    setPage('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Render dedicated subpage if selected
  if (page === 'privacy') {
    return <PrivacyPolicy onBack={handleBackToHome} />
  }
  if (page === 'terms') {
    return <TermsOfUse onBack={handleBackToHome} />
  }
  if (page === 'accessibility') {
    return <Accessibility onBack={handleBackToHome} />
  }
  if (page === 'sitemap') {
    return <Sitemap onBack={handleBackToHome} onNavigate={handleNavigate} />
  }

  return (
    <>
      <LoadingOverlay isVisible={!isReady} loadingBarRef={loadingBarRef} />
      <Navbar />
      <HeroSection />
      <SequenceSection
        onLoadingProgress={handleLoadingProgress}
        onReady={handleReady}
      />
      <FeaturesSection />
      <ColorSection />
      <SpecsSection />
      <CTASection />
      <Footer onNavigate={handleNavigate} />
    </>
  )
}
