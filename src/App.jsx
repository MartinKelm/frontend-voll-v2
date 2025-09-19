import React, { useState } from 'react'
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
import LoginForm from './components/Auth/LoginForm'
import RegisterForm from './components/Auth/RegisterForm'
import AdminDashboard from './components/Admin/AdminDashboard'
import AboutPage from './components/Pages/AboutPage'
import ContactPage from './components/Pages/ContactPage'
import FAQPage from './components/Pages/FAQPage'
import FeaturesPage from './components/Pages/FeaturesPage'
import Footer from './components/Footer'


function App() {
  const [currentView, setCurrentView] = useState('home')
  const [showCampaignWizard, setShowCampaignWizard] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Auth states
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [authView, setAuthView] = useState(null) // null = Homepage, 'login' or 'register'

  const handleLogin = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setAuthView(null) // Schließe Login-Formular
    if (userData.role === 'admin') {
      setCurrentView('admin')
    } else {
      setCurrentView('dashboard')
    }
  }

  const handleRegister = (userData) => {
    setCurrentUser(userData)
    setIsAuthenticated(true)
    setAuthView(null) // Schließe Register-Formular
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    setAuthView(null) // Zurück zur Homepage
    setCurrentView('home')
  }

  const UserMenu = () => (
    <div className="flex items-center space-x-4">
      <div className="hidden md:flex items-center space-x-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          currentUser?.role === 'admin' 
            ? 'bg-gradient-to-br from-red-500 to-pink-500' 
            : 'bg-gradient-to-br from-blue-500 to-purple-500'
        }`}>
          {currentUser?.role === 'admin' ? (
            <Shield className="w-4 h-4 text-white" />
          ) : (
            <User className="w-4 h-4 text-white" />
          )}
        </div>
        <div className="text-sm">
          <div className="font-medium text-white">{currentUser?.name}</div>
          <div className="text-white/70 text-xs">
            {currentUser?.role === 'admin' ? 'Administrator' : 'Benutzer'}
          </div>
        </div>
      </div>
      <Button
        onClick={handleLogout}
        variant="ghost"
        size="sm"
        className="text-white hover:bg-white/10"
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
                {currentUser?.role !== 'admin' && (
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
                {currentUser?.role === 'admin' && (
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
                <Button 
                  onClick={() => setAuthView('login')}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 text-sm px-6 py-2 touch-manipulation font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Login
                </Button>
                <Button 
                  onClick={() => setAuthView('register')}
                  className="brand-gradient text-white hover:opacity-90 text-sm px-4 py-2 touch-manipulation"
                >
                  Registrieren
                </Button>
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
                  {currentUser?.role !== 'admin' && (
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
                  {currentUser?.role === 'admin' && (
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
                        currentUser?.role === 'admin' 
                          ? 'bg-gradient-to-br from-red-500 to-pink-500' 
                          : 'bg-gradient-to-br from-blue-500 to-purple-500'
                      }`}>
                        {currentUser?.role === 'admin' ? (
                          <Shield className="w-3 h-3 text-white" />
                        ) : (
                          <User className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-white">{currentUser?.name}</div>
                        <div className="text-gray-300 text-xs">
                          {currentUser?.role === 'admin' ? 'Administrator' : 'Benutzer'}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-gray-700 w-full justify-start"
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
                    <Button 
                      onClick={() => {
                        setAuthView('login')
                        setIsMobileMenuOpen(false)
                      }}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 w-full text-sm touch-manipulation font-semibold shadow-lg"
                    >
                      Login
                    </Button>
                    <Button 
                      onClick={() => {
                        setAuthView('register')
                        setIsMobileMenuOpen(false)
                      }}
                      className="brand-gradient text-white hover:opacity-90 w-full text-sm touch-manipulation"
                    >
                      Registrieren
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )

  // Auth Views
  if (!isAuthenticated && (authView === 'login' || authView === 'register')) {
    return (
      <div>
        {authView === 'login' ? (
          <LoginForm 
            onLogin={handleLogin}
            onSwitchToRegister={() => setAuthView('register')}
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister}
            onSwitchToLogin={() => setAuthView('login')}
          />
        )}
      </div>
    )
  }

  // Admin Dashboard
  if (isAuthenticated && currentUser?.role === 'admin' && currentView === 'admin') {
    return (
      <div>
        <Navigation />
        <AdminDashboard user={currentUser} />
      </div>
    )
  }

  // Campaign Wizard Modal
  if (showCampaignWizard) {
    return (
      <div>
        <CampaignWizard onClose={() => setShowCampaignWizard(false)} />
      </div>
    )
  }

  // Hero Section
  const HeroSection = () => (
    <section className="hero-section relative overflow-hidden px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8">
            <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              🆕 NEU
            </Badge>
            <Badge className="bg-green-400 text-green-900 border-green-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              🔥 BELIEBT
            </Badge>
            <Badge className="bg-blue-400 text-blue-900 border-blue-500 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              🇩🇪 DEUTSCHLAND
            </Badge>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            <span className="text-yellow-300">Social Media</span> Kampagnen{' '}
            <span className="text-green-300">ohne</span> technisches{' '}
            <span className="text-blue-300">Know-how</span>
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed">
            Ohne technisches Know-how. Ohne Agentur. Ohne Stress.
          </p>
          <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Unsere intuitive Plattform führt Sie Schritt für Schritt durch die Erstellung erfolgreicher Kampagnen für Facebook, Instagram, TikTok und mehr.
          </p>
          

        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-orange-500/20 rounded-3xl blur-3xl"></div>
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 border border-white/20">
            <img 
              src={heroDashboard} 
              alt="socialmediakampagnen.com Dashboard Preview" 
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  )

  // Features Section
  const FeaturesSection = () => (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6">
            <Badge className="bg-red-500 text-white border-red-600 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              ZEITERSPARNIS
            </Badge>
            <Badge className="bg-orange-500 text-white border-orange-600 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              EINFACH
            </Badge>
            <Badge className="bg-green-500 text-white border-green-600 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              EFFEKTIV
            </Badge>
            <Badge className="bg-blue-500 text-white border-blue-600 text-xs sm:text-sm px-2 sm:px-3 py-1 font-medium">
              PROFESSIONELL
            </Badge>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Warum <span className="text-purple-600">socialmediakampagnen.com</span> wählen?
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
            Willkommen zurück, {currentUser?.name}!
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
                      <Badge className={
                        campaign.status === 'Aktiv' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }>
                        {campaign.status}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                onClick={() => setShowCampaignWizard(true)}
                className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Neue Kampagne erstellen
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance Übersicht</CardTitle>
              <CardDescription>Ihre wichtigsten Metriken</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Impressions</span>
                    <span>89%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Klicks</span>
                    <span>76%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Conversions</span>
                    <span>62%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )

  // Main render logic
  return (
    <div>
      <Navigation />
      
      {authView === 'login' && <LoginForm onBack={() => setAuthView(null)} onLogin={handleLogin} />}
      {authView === 'register' && <RegisterForm onBack={() => setAuthView(null)} onRegister={handleRegister} />}
      
      {showCampaignWizard && (
        <CampaignWizard onClose={() => setShowCampaignWizard(false)} />
      )}
      
      {currentView === 'home' && !authView && (
        <>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
          <Footer />
        </>
      )}
      
      {currentView === 'features' && !authView && (
        <>
          <FeaturesPage />
          <Footer />
        </>
      )}
      {currentView === 'pricing' && !authView && (
        <>
          <PricingSection />
          <Footer />
        </>
      )}
      {currentView === 'about' && !authView && (
        <>
          <AboutPage />
          <Footer />
        </>
      )}
      {currentView === 'contact' && !authView && (
        <>
          <ContactPage />
          <Footer />
        </>
      )}
      {currentView === 'faq' && !authView && (
        <>
          <FAQPage />
          <Footer />
        </>
      )}
      {currentView === 'dashboard' && isAuthenticated && (
        <>
          <DashboardSection />
          <Footer />
        </>
      )}
      {currentView === 'admin' && isAuthenticated && currentUser?.role === 'admin' && (
        <>
          <AdminDashboard />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App

