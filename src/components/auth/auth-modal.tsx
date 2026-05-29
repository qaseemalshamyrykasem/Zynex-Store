'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Loader2,
  LogIn,
  UserPlus,
  UserCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useAuthStore } from '@/store';
import { toast } from 'sonner';
import { APP_NAME } from '@/lib/constants';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register';

interface LoginFormErrors {
  email?: string;
  password?: string;
}

interface RegisterFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState<LoginFormErrors>({});
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [registerErrors, setRegisterErrors] = useState<RegisterFormErrors>({});
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateLogin = (): boolean => {
    const errors: LoginFormErrors = {};

    if (!loginEmail.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!validateEmail(loginEmail)) {
      errors.email = 'البريد الإلكتروني غير صالح';
    }

    if (!loginPassword.trim()) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (loginPassword.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegister = (): boolean => {
    const errors: RegisterFormErrors = {};

    if (!registerName.trim()) {
      errors.name = 'الاسم مطلوب';
    } else if (registerName.trim().length < 3) {
      errors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل';
    }

    if (!registerEmail.trim()) {
      errors.email = 'البريد الإلكتروني مطلوب';
    } else if (!validateEmail(registerEmail)) {
      errors.email = 'البريد الإلكتروني غير صالح';
    }

    if (registerPhone && !/^[\d+\-() ]{7,15}$/.test(registerPhone)) {
      errors.phone = 'رقم الهاتف غير صالح';
    }

    if (!registerPassword.trim()) {
      errors.password = 'كلمة المرور مطلوبة';
    } else if (registerPassword.length < 6) {
      errors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
    }

    if (!registerConfirmPassword.trim()) {
      errors.confirmPassword = 'تأكيد كلمة المرور مطلوب';
    } else if (registerPassword !== registerConfirmPassword) {
      errors.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }

    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      login({
        id: Date.now().toString(),
        email: loginEmail,
        name: loginEmail.split('@')[0],
        role: 'user',
        balance: 250.0,
      });

      toast.success('تم تسجيل الدخول بنجاح', {
        description: `مرحباً بك في ${APP_NAME}!`,
      });

      resetForms();
      onClose();
    } catch {
      toast.error('فشل تسجيل الدخول', {
        description: 'تحقق من بياناتك وحاول مرة أخرى',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!validateRegister()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      login({
        id: Date.now().toString(),
        email: registerEmail,
        name: registerName,
        role: 'user',
        balance: 0,
      });

      toast.success('تم إنشاء الحساب بنجاح', {
        description: `مرحباً بك في ${APP_NAME}!`,
      });

      resetForms();
      onClose();
    } catch {
      toast.error('فشل إنشاء الحساب', {
        description: 'حاول مرة أخرى لاحقاً',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    login({
      id: 'guest-' + Date.now(),
      email: 'guest@zynex.store',
      name: 'ضيف',
      role: 'guest',
      balance: 0,
    });

    toast.success('تم تسجيل الدخول كضيف', {
      description: 'يمكنك تصفح المتجر وإنشاء حساب لاحقاً',
    });

    resetForms();
    onClose();
  };

  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setLoginErrors({});
    setShowLoginPassword(false);
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPhone('');
    setRegisterPassword('');
    setRegisterConfirmPassword('');
    setRegisterErrors({});
    setShowRegisterPassword(false);
    setShowConfirmPassword(false);
    setMode('login');
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setLoginErrors({});
    setRegisterErrors({});
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50 overflow-hidden p-0">
        {/* Header with gradient */}
        <div className="relative px-6 pt-6 pb-4">
          <div className="absolute inset-0 h-32 gradient-primary opacity-10" />
          <DialogHeader className="relative z-10">
            <DialogTitle className="text-xl font-bold text-right gradient-text">
              {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </DialogTitle>
            <DialogDescription className="text-right text-muted-foreground">
              {mode === 'login'
                ? `سجّل دخولك إلى ${APP_NAME} للوصول إلى حسابك`
                : `أنشئ حساباً جديداً في ${APP_NAME} واستمتع بالخدمات الرقمية`}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Tab Switcher */}
        <div className="px-6">
          <div className="flex bg-muted/50 rounded-xl p-1 relative">
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg gradient-primary"
              animate={{
                width: '50%',
                x: mode === 'login' ? '0%' : '100%',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ right: 0 }}
            />
            <button
              onClick={() => switchMode('login')}
              className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                mode === 'login' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
                mode === 'register' ? 'text-white' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              إنشاء حساب
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="px-6 pb-6">
          <AnimatePresence mode="wait">
            {mode === 'login' ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 mt-4"
              >
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-right block text-sm">
                    البريد الإلكتروني
                  </Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginEmail}
                      onChange={(e) => {
                        setLoginEmail(e.target.value);
                        if (loginErrors.email) setLoginErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className="pr-10 text-right"
                      dir="ltr"
                    />
                  </div>
                  {loginErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 text-right"
                    >
                      {loginErrors.email}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-right block text-sm">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showLoginPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => {
                        setLoginPassword(e.target.value);
                        if (loginErrors.password) setLoginErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      className="pr-10 pl-10 text-right"
                      dir="ltr"
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showLoginPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {loginErrors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 text-right"
                    >
                      {loginErrors.password}
                    </motion.p>
                  )}
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <button className="text-xs text-zynex-purple hover:underline">
                    نسيت كلمة المرور؟
                  </button>
                </div>

                {/* Login Button */}
                <Button
                  onClick={handleLogin}
                  disabled={isLoading}
                  className="w-full gradient-primary text-white border-0 hover:opacity-90 h-11 text-base font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 ml-2" />
                      تسجيل الدخول
                    </>
                  )}
                </Button>

                {/* Guest Login */}
                <Button
                  variant="outline"
                  onClick={handleGuestLogin}
                  className="w-full border-border/50 hover:bg-accent/50 h-11"
                >
                  <UserCircle className="h-4 w-4 ml-2" />
                  تسجيل الدخول كضيف
                </Button>

                {/* Social Login */}
                <div className="space-y-3">
                  <div className="relative">
                    <Separator />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                      أو سجّل الدخول بواسطة
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-border/50 hover:bg-accent/50 h-11"
                      onClick={() => toast.info('قريباً!', { description: 'تسجيل الدخول عبر Google سيكون متاحاً قريباً' })}
                    >
                      <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-border/50 hover:bg-accent/50 h-11"
                      onClick={() => toast.info('قريباً!', { description: 'تسجيل الدخول عبر تليجرام سيكون متاحاً قريباً' })}
                    >
                      <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                      تليجرام
                    </Button>
                  </div>
                </div>

                {/* Switch to Register */}
                <p className="text-center text-sm text-muted-foreground">
                  ليس لديك حساب؟{' '}
                  <button
                    onClick={() => switchMode('register')}
                    className="text-zynex-purple hover:underline font-medium"
                  >
                    إنشاء حساب جديد
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 mt-4"
              >
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-right block text-sm">
                    الاسم الكامل
                  </Label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="أدخل اسمك الكامل"
                      value={registerName}
                      onChange={(e) => {
                        setRegisterName(e.target.value);
                        if (registerErrors.name) setRegisterErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      className="pr-10 text-right"
                    />
                  </div>
                  {registerErrors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 text-right"
                    >
                      {registerErrors.name}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-right block text-sm">
                    البريد الإلكتروني
                  </Label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="example@email.com"
                      value={registerEmail}
                      onChange={(e) => {
                        setRegisterEmail(e.target.value);
                        if (registerErrors.email) setRegisterErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      className="pr-10 text-right"
                      dir="ltr"
                    />
                  </div>
                  {registerErrors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 text-right"
                    >
                      {registerErrors.email}
                    </motion.p>
                  )}
                </div>

                {/* Phone Field (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="register-phone" className="text-right block text-sm">
                    رقم الهاتف <span className="text-muted-foreground text-xs">(اختياري)</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-phone"
                      type="tel"
                      placeholder="+967 7XX XXX XXX"
                      value={registerPhone}
                      onChange={(e) => {
                        setRegisterPhone(e.target.value);
                        if (registerErrors.phone) setRegisterErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      className="pr-10 text-right"
                      dir="ltr"
                    />
                  </div>
                  {registerErrors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 text-right"
                    >
                      {registerErrors.phone}
                    </motion.p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-right block text-sm">
                    كلمة المرور
                  </Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showRegisterPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerPassword}
                      onChange={(e) => {
                        setRegisterPassword(e.target.value);
                        if (registerErrors.password) setRegisterErrors((prev) => ({ ...prev, password: undefined }));
                      }}
                      className="pr-10 pl-10 text-right"
                      dir="ltr"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showRegisterPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {registerErrors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 text-right"
                    >
                      {registerErrors.password}
                    </motion.p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password" className="text-right block text-sm">
                    تأكيد كلمة المرور
                  </Label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={registerConfirmPassword}
                      onChange={(e) => {
                        setRegisterConfirmPassword(e.target.value);
                        if (registerErrors.confirmPassword) setRegisterErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                      }}
                      className="pr-10 pl-10 text-right"
                      dir="ltr"
                      onKeyDown={(e) => e.key === 'Enter' && handleRegister()}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showConfirmPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {registerErrors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 text-right"
                    >
                      {registerErrors.confirmPassword}
                    </motion.p>
                  )}
                </div>

                {/* Register Button */}
                <Button
                  onClick={handleRegister}
                  disabled={isLoading}
                  className="w-full gradient-primary text-white border-0 hover:opacity-90 h-11 text-base font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 ml-2" />
                      إنشاء حساب
                    </>
                  )}
                </Button>

                {/* Social Login */}
                <div className="space-y-3">
                  <div className="relative">
                    <Separator />
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-3 text-xs text-muted-foreground">
                      أو سجّل بواسطة
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 border-border/50 hover:bg-accent/50 h-11"
                      onClick={() => toast.info('قريباً!', { description: 'تسجيل الدخول عبر Google سيكون متاحاً قريباً' })}
                    >
                      <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 border-border/50 hover:bg-accent/50 h-11"
                      onClick={() => toast.info('قريباً!', { description: 'تسجيل الدخول عبر تليجرام سيكون متاحاً قريباً' })}
                    >
                      <svg className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                      </svg>
                      تليجرام
                    </Button>
                  </div>
                </div>

                {/* Switch to Login */}
                <p className="text-center text-sm text-muted-foreground">
                  لديك حساب؟{' '}
                  <button
                    onClick={() => switchMode('login')}
                    className="text-zynex-purple hover:underline font-medium"
                  >
                    تسجيل الدخول
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
