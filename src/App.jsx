import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Avatar, AvatarFallback } from './components/ui/avatar';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from './components/ui/dropdown-menu';
import ProtectedRoute, { AuthGuard } from './components/ProtectedRoute';
import AuthModal from './components/Auth/AuthModal';
import { 
  User, 
  LogOut, 
  Settings, 
  Shield, 
  Users, 
  BarChart3, 
  MessageSquare,
  Loader2,
  CheckCircle
} from 'lucide-react';
import './App.css';

// Header component with authentication
const Header = () => {
  const { user, logout, isLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const getUserInitials = (user) => {
    if (!user) return 'U';
    const firstName = user.firstName || '';
    const lastName = user.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case 'SUPER_ADMIN':
        return 'destructive';
      case 'ADMIN':
        return 'secondary';
      case 'USER':
      default:
        return 'outline';
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold">SMK Dashboard</h1>
          </div>

          {/* Navigation & User Menu */}
          <div className="flex items-center space-x-4">
            <AuthGuard fallback={
              <div className="flex items-center space-x-2">
                <AuthModal defaultMode="login">
                  <Button variant="ghost">Anmelden</Button>
                </AuthModal>
                <AuthModal defaultMode="register">
                  <Button>Registrieren</Button>
                </AuthModal>
              </div>
            }>
              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {getUserInitials(user)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user?.firstName} {user?.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user?.email}
                      </p>
                      <div className="pt-1">
                        <Badge variant={getRoleBadgeVariant(user?.role)} className="text-xs">
                          {user?.role || 'USER'}
                        </Badge>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Einstellungen</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <LogOut className="mr-2 h-4 w-4" />
                    )}
                    <span>Abmelden</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </AuthGuard>
          </div>
        </div>
      </div>
    </header>
  );
};

// Dashboard content for authenticated users
const Dashboard = () => {
  const { user, isAdmin } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Willkommen zurück, {user?.firstName}!
          </h2>
          <p className="text-muted-foreground">
            Hier ist Ihr Social Media Kampagnen Dashboard
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Aktive Kampagnen
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 seit letztem Monat
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Reichweite
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45.2K</div>
              <p className="text-xs text-muted-foreground">
                +15% seit letzter Woche
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Engagement Rate
              </CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2%</div>
              <p className="text-xs text-muted-foreground">
                +0.5% seit gestern
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Conversion Rate
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.1%</div>
              <p className="text-xs text-muted-foreground">
                +0.3% seit letztem Monat
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Letzte Aktivitäten</CardTitle>
            <CardDescription>
              Ihre neuesten Kampagnen-Updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Instagram Kampagne "Sommer 2024" gestartet</p>
                  <p className="text-xs text-muted-foreground">vor 2 Stunden</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Facebook Anzeigen optimiert</p>
                  <p className="text-xs text-muted-foreground">vor 4 Stunden</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center space-x-4">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Neuer Bericht generiert</p>
                  <p className="text-xs text-muted-foreground">vor 6 Stunden</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Admin Section */}
        <AuthGuard requiredRole="ADMIN">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Admin Bereich</span>
              </CardTitle>
              <CardDescription>
                Erweiterte Verwaltungsfunktionen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Benutzer verwalten
                </Button>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  System-Einstellungen
                </Button>
              </div>
            </CardContent>
          </Card>
        </AuthGuard>
      </div>
    </div>
  );
};

// Public landing page for non-authenticated users
const LandingPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Social Media Kampagnen
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Verwalten Sie Ihre Social Media Kampagnen professionell und effizient. 
            Steigern Sie Ihre Reichweite und maximieren Sie Ihr Engagement.
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <AuthModal defaultMode="register">
            <Button size="lg">
              Kostenlos starten
            </Button>
          </AuthModal>
          <AuthModal defaultMode="login">
            <Button variant="outline" size="lg">
              Anmelden
            </Button>
          </AuthModal>
        </div>

        <div className="grid gap-8 md:grid-cols-3 mt-16">
          <Card>
            <CardHeader>
              <BarChart3 className="h-8 w-8 text-primary mx-auto" />
              <CardTitle className="text-center">Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Detaillierte Einblicke in Ihre Kampagnen-Performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-8 w-8 text-primary mx-auto" />
              <CardTitle className="text-center">Zielgruppen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Erreichen Sie die richtige Zielgruppe zur richtigen Zeit
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary mx-auto" />
              <CardTitle className="text-center">Engagement</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground">
                Steigern Sie die Interaktion mit Ihren Inhalten
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Main App component
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <AuthGuard 
          fallback={<LandingPage />}
        >
          <Dashboard />
        </AuthGuard>
      </main>
    </div>
  );
};

// Root App component with AuthProvider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
