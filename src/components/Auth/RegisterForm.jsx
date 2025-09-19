import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';
import { Checkbox } from '../ui/checkbox';
import { Eye, EyeOff, Loader2, Mail, Lock, User, Building } from 'lucide-react';

const RegisterForm = ({ onSwitchToLogin, onClose }) => {
  const { register, isLoading, error, clearError } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
    
    // Clear auth error when user starts typing
    if (error) {
      clearError();
    }
  };

  // Handle checkbox change (for Checkbox component)
  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({
      ...prev,
      acceptTerms: checked,
    }));
    
    if (validationErrors.acceptTerms) {
      setValidationErrors(prev => ({
        ...prev,
        acceptTerms: '',
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'Vorname ist erforderlich';
    } else if (formData.firstName.trim().length < 2) {
      errors.firstName = 'Vorname muss mindestens 2 Zeichen lang sein';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Nachname ist erforderlich';
    } else if (formData.lastName.trim().length < 2) {
      errors.lastName = 'Nachname muss mindestens 2 Zeichen lang sein';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'E-Mail ist erforderlich';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Ungültige E-Mail-Adresse';
    }
    
    if (!formData.password) {
      errors.password = 'Passwort ist erforderlich';
    } else if (formData.password.length < 8) {
      errors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Passwort muss mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Passwort bestätigen ist erforderlich';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwörter stimmen nicht überein';
    }
    
    if (!formData.acceptTerms) {
      errors.acceptTerms = 'Sie müssen den Nutzungsbedingungen zustimmen';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await register({
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim().toLowerCase(),
      company: formData.company.trim() || undefined,
      password: formData.password,
    });

    if (result.success && onClose) {
      onClose();
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">Registrieren</CardTitle>
        <CardDescription className="text-center">
          Erstellen Sie Ihr SMK-Konto
        </CardDescription>
      </CardHeader>
      
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {/* Global Error Alert */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* First Name Field */}
          <div className="space-y-2">
            <Label htmlFor="firstName">Vorname</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Ihr Vorname"
                value={formData.firstName}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`pl-10 ${validationErrors.firstName ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="given-name"
              />
            </div>
            {validationErrors.firstName && (
              <p className="text-sm text-red-500">{validationErrors.firstName}</p>
            )}
          </div>

          {/* Last Name Field */}
          <div className="space-y-2">
            <Label htmlFor="lastName">Nachname</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Ihr Nachname"
                value={formData.lastName}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`pl-10 ${validationErrors.lastName ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="family-name"
              />
            </div>
            {validationErrors.lastName && (
              <p className="text-sm text-red-500">{validationErrors.lastName}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">E-Mail-Adresse</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ihre@email.com"
                value={formData.email}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`pl-10 ${validationErrors.email ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>
            {validationErrors.email && (
              <p className="text-sm text-red-500">{validationErrors.email}</p>
            )}
          </div>

          {/* Company Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="company">Unternehmen (optional)</Label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Ihr Unternehmen"
                value={formData.company}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="pl-10"
                disabled={isLoading}
                autoComplete="organization"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">Passwort</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mindestens 8 Zeichen"
                value={formData.password}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`pl-10 pr-10 ${validationErrors.password ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {validationErrors.password && (
              <p className="text-sm text-red-500">{validationErrors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Passwort wiederholen"
                value={formData.confirmPassword}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className={`pl-10 pr-10 ${validationErrors.confirmPassword ? 'border-red-500' : ''}`}
                disabled={isLoading}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {validationErrors.confirmPassword && (
              <p className="text-sm text-red-500">{validationErrors.confirmPassword}</p>
            )}
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptTerms"
              checked={formData.acceptTerms}
              onCheckedChange={handleCheckboxChange}
              disabled={isLoading}
            />
            <Label
              htmlFor="acceptTerms"
              className="text-sm font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Ich akzeptiere die{' '}
              <Button
                type="button"
                variant="link"
                className="px-0 h-auto text-sm underline"
                disabled={isLoading}
              >
                Nutzungsbedingungen
              </Button>{' '}
              und{' '}
              <Button
                type="button"
                variant="link"
                className="px-0 h-auto text-sm underline"
                disabled={isLoading}
              >
                Datenschutzerklärung
              </Button>
            </Label>
          </div>
          {validationErrors.acceptTerms && (
            <p className="text-sm text-red-500">{validationErrors.acceptTerms}</p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          {/* Register Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrieren...
              </>
            ) : (
              'Konto erstellen'
            )}
          </Button>

          {/* Switch to Login */}
          <div className="text-center text-sm">
            <span className="text-muted-foreground">Bereits ein Konto? </span>
            <Button
              type="button"
              variant="link"
              className="px-0"
              onClick={onSwitchToLogin}
              disabled={isLoading}
            >
              Jetzt anmelden
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RegisterForm;
