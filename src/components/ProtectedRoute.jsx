import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, Lock, Shield, AlertTriangle } from 'lucide-react';
import AuthModal from './Auth/AuthModal';

const ProtectedRoute = ({ 
  children, 
  requiredRole = null, 
  fallback = null,
  showLoginPrompt = true,
  customMessage = null 
}) => {
  const { isAuthenticated, isLoading, user, hasRole } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Authentifizierung wird überprüft...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!isAuthenticated) {
    if (fallback) {
      return fallback;
    }

    if (!showLoginPrompt) {
      return null;
    }

    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Lock className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle>Anmeldung erforderlich</CardTitle>
            <CardDescription>
              {customMessage || 'Sie müssen sich anmelden, um auf diesen Bereich zuzugreifen.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-2">
              <AuthModal defaultMode="login">
                <Button className="w-full">
                  Jetzt anmelden
                </Button>
              </AuthModal>
              <AuthModal defaultMode="register">
                <Button variant="outline" className="w-full">
                  Neues Konto erstellen
                </Button>
              </AuthModal>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated but doesn't have required role
  if (requiredRole && !hasRole(requiredRole)) {
    if (fallback) {
      return fallback;
    }

    return (
      <div className="flex items-center justify-center min-h-[400px] p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <Shield className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle>Zugriff verweigert</CardTitle>
            <CardDescription>
              Sie haben nicht die erforderlichen Berechtigungen, um auf diesen Bereich zuzugreifen.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Erforderliche Rolle: <strong>{requiredRole}</strong><br />
                Ihre Rolle: <strong>{user?.role || 'Keine'}</strong>
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated and has required permissions
  return children;
};

// Higher-order component for protecting routes
export const withProtectedRoute = (Component, options = {}) => {
  return function ProtectedComponent(props) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
};

// Hook for checking if current user can access a route
export const useCanAccess = (requiredRole = null) => {
  const { isAuthenticated, hasRole } = useAuth();
  
  if (!isAuthenticated) {
    return false;
  }
  
  if (requiredRole && !hasRole(requiredRole)) {
    return false;
  }
  
  return true;
};

// Component for conditionally rendering content based on authentication
export const AuthGuard = ({ 
  children, 
  requiredRole = null, 
  fallback = null,
  inverse = false 
}) => {
  const canAccess = useCanAccess(requiredRole);
  
  if (inverse) {
    return canAccess ? fallback : children;
  }
  
  return canAccess ? children : fallback;
};

export default ProtectedRoute;
