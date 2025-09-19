import React, { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Button } from './components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { 
  Clock, 
  Zap, 
  BarChart3, 
  CheckCircle, 
  Play, 
  Target, 
  TrendingUp, 
  Users, 
  Calendar,
  MoreHorizontal,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Menu,
  X,
  ChevronDown,
  LogOut,
  User,
  Shield
} from 'lucide-react'
import './App.css'

// Import images
import FullLogo from './assets/Logo-socialmediakampagnen-voll.png'
import heroDashboard from './assets/hero-dashboard.png'
import heroCampaign from './assets/hero-campaign.png'
import heroWizard from './assets/hero-wizard.png'

// Import components
import CampaignWizard from './components/Campaign/CampaignWizard'
import AuthModal from './components/Auth/AuthModal'
import AdminDashboard from './components/Admin/AdminDashboard'
import AboutPage from './components/Pages/AboutPage'
import ContactPage from './components/Pages/ContactPage'
import FAQPage from './components/Pages/FAQPage'
import FeaturesPage from './components/Pages/FeaturesPage'
import Footer from './components/Footer'

function AppContent() {
  const [currentView, setCurrentView] = useState('home')
  const [showCampaignWizard, setShowCampaignWizard] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [authView, setAuthView] = useState(null) // null = Homepage, 'login' or 'register'
  
  // Use the auth context
  const { user, isAuthenticated, logout, isLoading } = useAuth()

  const handleLogout = async () => {
    await logout()
    setAuthView(null)
    setCurrentView('home')
  }

  const UserMenu = () => (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center space-x-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
            ? 'bg-gradient-to-br from-red-500 to-pink-500' 
            : 'bg-gradient-to-br from-blue-500 to-purple-500'
        }`}>
          {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? (
            <Shield className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="text-sm">
          <div className="font-medium text-white">{user?.firstName} {user?.lastName}</div>
          <div className="text-white/70 text-xs">
            {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? 'Administrator' : 'Benutzer'}
          </div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/10"
        disabled={isLoading}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Abmelden
      </Button>
    </div>
  )

  const Navigation = () => (
    <nav className="bg-white shadow-sm sticky top-0 z-40 px-3 sm:px-4 py-3 sm:py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src={FullLogo} alt="socialmediakampagnen.com Logo" className="h-8 sm:h-10 w-auto" />
          </div>

          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {isAuthenticated ? (
              <>
                {(user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN') && (
                  <>
                    <button 
                      onClick={() => setCurrentView('dashboard')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'dashboard' ? 'text-purple-600' : ''}`}
                    >
                      Dashboard
                    </button>
                    <button 
                      onClick={() => setCurrentView('features')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'features' ? 'text-purple-600' : ''}`}
                    >
                      Features
                    </button>
                    <button 
                      onClick={() => setCurrentView('pricing')}
                      className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'pricing' ? 'text-purple-600' : ''}`}
                    >
                      Preise
                    </button>
                  </>
                )}
                {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                  <button 
                    onClick={() => setCurrentView('admin')}
                    className={`text-gray-700 hover:text-red-600 transition-colors text-sm font-medium ${currentView === 'admin' ? 'text-red-600' : ''}`}
                  >
                    Admin Dashboard
                  </button>
                )}
              </>
            ) : (
              <>
                <button 
                  onClick={() => setCurrentView('home')}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'home' ? 'text-purple-600' : ''}`}
                >
                  Home
                </button>
                <button 
                  onClick={() => setCurrentView('features')}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'features' ? 'text-purple-600' : ''}`}
                >
                  Features
                </button>
                <button 
                  onClick={() => setCurrentView('pricing')}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'pricing' ? 'text-purple-600' : ''}`}
                >
                  Preise
                </button>
                <button 
                  onClick={() => setCurrentView('about')}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'about' ? 'text-purple-600' : ''}`}
                >
                  Über uns
                </button>
                <button 
                  onClick={() => setCurrentView('contact')}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'contact' ? 'text-purple-600' : ''}`}
                >
                  Kontakt
                </button>
                <button 
                  onClick={() => setCurrentView('faq')}
                  className={`text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium ${currentView === 'faq' ? 'text-purple-600' : ''}`}
                >
                  FAQ
                </button>
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <AuthModal defaultMode="login">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 text-sm px-6 py-2 touch-manipulation font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                    Login
                  </Button>
                </AuthModal>
                <AuthModal defaultMode="register">
                  <Button className="brand-gradient text-white hover:opacity-90 text-sm px-4 py-2 touch-manipulation">
                    Registrieren
                  </Button>
                </AuthModal>
              </>
            )}
          </div>

          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 p-2 touch-manipulation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-1 pb-4 pt-4 bg-gray-900 shadow-xl z-50 px-4">
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  {(user?.role !== 'ADMIN' && user?.role !== 'SUPER_ADMIN') && (
                    <>
                      <button 
                        onClick={() => {
                          setCurrentView('dashboard')
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                      >
                        Dashboard
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('features')
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                      >
                        Features
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentView('pricing')
                          setIsMobileMenuOpen(false)
                        }}
                        className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                      >
                        Preise
                      </button>
                    </>
                  )}
                  {(user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN') && (
                    <button 
                      onClick={() => {
                        setCurrentView('admin')
                        setIsMobileMenuOpen(false)
                      }}
                      className="text-white hover:text-red-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                    >
                      Admin Dashboard
                    </button>
                  )}
                  <div className="pt-2 border-t border-gray-600">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
                          ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                          : 'bg-gradient-to-br from-blue-500 to-purple-500'
                      }`}>
                        {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? (
                          <Shield className="w-3 h-3 text-white" />
                        ) : (
                          <User className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-white">{user?.firstName} {user?.lastName}</div>
                        <div className="text-gray-300 text-xs">
                          {user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' ? 'Administrator' : 'Benutzer'}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-gray-700 w-full justify-start"
                      disabled={isLoading}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Abmelden
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => {
                      setCurrentView('home')
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('features')
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('pricing')
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Preise
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('about')
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Über uns
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('contact')
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    Kontakt
                  </button>
                  <button 
                    onClick={() => {
                      setCurrentView('faq')
                      setIsMobileMenuOpen(false)
                    }}
                    className="text-white hover:text-purple-300 hover:bg-gray-800 text-left py-3 px-2 text-sm font-medium touch-manipulation rounded-md transition-colors w-full"
                  >
                    FAQ
                  </button>
                  <div className="pt-2 border-t border-gray-600 space-y-2">
                    <AuthModal defaultMode="login">
                      <Button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 w-full text-sm touch-manipulation font-semibold shadow-lg"
                      >
                        Login
                      </Button>
                    </AuthModal>
                    <AuthModal defaultMode="register">
                      <Button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="brand-gradient text-white hover:opacity-90 w-full text-sm touch-manipulation"
                      >
                        Registrieren
                      </Button>
                    </AuthModal>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  // Hero Section
  const HeroSection = () => (
    <section className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="text-center lg:text-left">
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-6 sm:mb-8">
              <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium animate-pulse">
                NEU
              </Badge>
              <Badge className="bg-green-400 text-green-900 border-green-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
                KI-POWERED
              </Badge>
              <Badge className="bg-blue-400 text-blue-900 border-blue-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
                EINFACH
              </Badge>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
              Social Media <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500">
                Kampagnen
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 sm:mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Erstellen Sie professionelle Werbekampagnen für alle Social Media Plattformen 
              in nur wenigen Minuten. Ohne Vorkenntnisse, ohne Aufwand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
              {isAuthenticated ? (
                <Button 
                  onClick={() => setShowCampaignWizard(true)}
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 touch-manipulation"
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                  Kampagne erstellen
                </Button>
              ) : (
                <AuthModal defaultMode="register">
                  <Button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-bold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 touch-manipulation">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                    Kostenlos starten
                  </Button>
                </AuthModal>
              )}
              
              <Button 
                variant="outline" 
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-full transition-all duration-300 touch-manipulation"
              >
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
                Demo ansehen
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroDashboard} 
                alt="Dashboard Preview" 
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
              />
            </div>
            <div className="absolute -top-4 -right-4 z-0">
              <img 
                src={heroCampaign} 
                alt="Campaign Preview" 
                className="w-48 sm:w-64 rounded-xl shadow-xl opacity-80 transform -rotate-12 hover:-rotate-6 transition-transform duration-500"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 z-0">
              <img 
                src={heroWizard} 
                alt="Wizard Preview" 
                className="w-48 sm:w-64 rounded-xl shadow-xl opacity-80 transform rotate-12 hover:rotate-6 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )

  // Features Section
  const FeaturesSection = () => (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            <Badge className="bg-purple-100 text-purple-800 border-purple-200 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              REVOLUTIONÄR
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              ZEITSPAREND
            </Badge>
            <Badge className="bg-green-100 text-green-800 border-green-200 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              PROFESSIONELL
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Warum <span className="text-purple-600">wir anders</span> sind
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Unsere Plattform macht Social Media Marketing so einfach wie nie zuvor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <Card className="bg-gradient-to-br from-red-500 to-pink-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium">
                  EFFIZIENZ
                </Badge>
                <Clock className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-purple-100">
                90% Zeitersparnis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Was früher Stunden dauerte, erledigen Sie jetzt in wenigen Minuten. 
                Automatisierte Kampagnenerstellung für alle Plattformen.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium">
                  EINFACH
                </Badge>
                <Zap className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-blue-100">
                Keine Kenntnisse nötig
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Unser intuitiver Wizard führt Sie Schritt für Schritt durch die 
                Kampagnenerstellung. Kein technisches Wissen erforderlich.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-white/20 text-white border-white/30 text-xs font-medium">
                  INNOVATION
                </Badge>
                <BarChart3 className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
              </div>
              <CardTitle className="text-xl sm:text-2xl font-bold text-orange-100">
                Live-Vorschau
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                Sehen Sie in Echtzeit, wie Ihre Anzeigen auf Facebook, Instagram, 
                TikTok und anderen Plattformen aussehen werden.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
            Unterstützte Plattformen
          </h3>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 text-white/90">
            Erstellen Sie Kampagnen für alle wichtigen Social Media Kanäle
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Badge className="bg-blue-600 text-white border-blue-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              <Facebook className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Facebook
            </Badge>
            <Badge className="bg-pink-500 text-white border-pink-600 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Instagram
            </Badge>
            <Badge className="bg-red-500 text-white border-red-600 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              YouTube
            </Badge>
            <Badge className="bg-green-600 text-white border-green-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              🔍 Google
            </Badge>
            <Badge className="bg-black text-white border-gray-800 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              🎵 TikTok
            </Badge>
            <Badge className="bg-yellow-400 text-black border-yellow-500 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              👻 Snapchat
            </Badge>
            <Badge className="bg-orange-600 text-white border-orange-700 text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 font-medium">
              🤖 Reddit
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )

  // Pricing Section
  const PricingSection = () => (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              TRANSPARENT
            </Badge>
            <Badge className="bg-green-400 text-green-900 border-green-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              FAIR
            </Badge>
            <Badge className="bg-blue-400 text-blue-900 border-blue-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              FLEXIBEL
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
            Einfache <span className="text-yellow-400">Preise</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/80 max-w-3xl mx-auto">
            Wählen Sie den Plan, der zu Ihrem Unternehmen passt. Jederzeit kündbar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <Card className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <Badge className="bg-white/20 text-white border-white/30 text-sm font-medium px-4 py-2">
                  FÜR STARTER
                </Badge>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">Standard</CardTitle>
              <div className="text-4xl sm:text-5xl font-bold text-cyan-300 mb-2">49€</div>
              <p className="text-white/80 text-sm sm:text-base">pro Jahr</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">Bis zu 10 Kampagnen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">Alle Plattformen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">Live-Vorschau</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">E-Mail Support</span>
                </div>
              </div>
              <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 text-base sm:text-lg mt-6 touch-manipulation">
                🚀 Jetzt starten
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500 text-sm font-bold px-4 py-2 animate-bounce">
                BELIEBT
              </Badge>
            </div>
            <CardHeader className="text-center pb-4 pt-8">
              <div className="flex justify-center mb-4">
                <Badge className="bg-white/20 text-white border-white/30 text-sm font-medium px-4 py-2">
                  FÜR PROFIS
                </Badge>
              </div>
              <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">Pro</CardTitle>
              <div className="text-4xl sm:text-5xl font-bold text-yellow-300 mb-2">99€</div>
              <p className="text-white/80 text-sm sm:text-base">pro Jahr</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">Unbegrenzte Kampagnen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">Alle Plattformen</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">Erweiterte Analytics</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">Priority Support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/90 text-sm sm:text-base">White-Label Option</span>
                </div>
              </div>
              <Button className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold py-3 text-base sm:text-lg mt-6 touch-manipulation">
                👑 Pro werden
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <p className="text-white/80 text-sm sm:text-base mb-4">
            Alle Pläne sind Jahresmitgliedschaften mit sofortiger Aktivierung
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Badge className="bg-white/10 text-white border-white/20 text-xs sm:text-sm px-3 py-2">
              ✅ Keine Einrichtungsgebühr
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-xs sm:text-sm px-3 py-2">
              ✅ Jährliche Abrechnung
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-xs sm:text-sm px-3 py-2">
              ✅ DSGVO-konform
            </Badge>
          </div>
        </div>
      </div>
    </section>
  )

  // Dashboard Section (for authenticated users)
  const DashboardSection = () => (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Willkommen zurück, {user?.firstName}!
          </h1>
          <p className="text-gray-600">
            Hier ist eine Übersicht Ihrer aktuellen Kampagnen und Performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">
                Aktive Kampagnen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-blue-200">+2 diese Woche</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-green-100">
                Gesamtreichweite
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.2K</div>
              <p className="text-xs text-green-200">+15% vs. letzter Monat</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-purple-100">
                Klickrate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.8%</div>
              <p className="text-xs text-purple-200">Über dem Durchschnitt</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-orange-100">
                Budget verwendet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€2,340</div>
              <p className="text-xs text-orange-200">von €3,000</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Aktuelle Kampagnen</CardTitle>
              <CardDescription>Ihre laufenden Werbekampagnen</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Sommer Sale 2024', platform: 'Facebook', status: 'Aktiv', performance: 'Gut' },
                  { name: 'Produktlaunch', platform: 'Instagram', status: 'Aktiv', performance: 'Exzellent' },
                  { name: 'Brand Awareness', platform: 'TikTok', status: 'Pausiert', performance: 'Durchschnitt' }
                ].map((campaign, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                      <p className="text-sm text-gray-500">{campaign.platform}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={campaign.status === 'Aktiv' ? 'default' : 'secondary'}>
                        {campaign.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Häufig verwendete Aktionen</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => setShowCampaignWizard(true)}
                className="w-full justify-start bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              >
                <Play className="w-4 h-4 mr-2" />
                Neue Kampagne erstellen
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics anzeigen
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Target className="w-4 h-4 mr-2" />
                Zielgruppen verwalten
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Team einladen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  // Campaign Wizard Modal
  if (showCampaignWizard) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          <CampaignWizard onClose={() => setShowCampaignWizard(false)} />
        </div>
      </div>
    )
  }

  // Main render logic
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Render different views based on currentView state */}
      {currentView === 'home' && !isAuthenticated && (
        <>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
        </>
      )}
      
      {currentView === 'dashboard' && isAuthenticated && <DashboardSection />}
      {currentView === 'admin' && isAuthenticated && user?.role === 'ADMIN' && <AdminDashboard />}
      {currentView === 'features' && <FeaturesPage />}
      {currentView === 'pricing' && <PricingSection />}
      {currentView === 'about' && <AboutPage />}
      {currentView === 'contact' && <ContactPage />}
      {currentView === 'faq' && <FAQPage />}
      
      <Footer />
    </div>
  )
}

// Root App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
