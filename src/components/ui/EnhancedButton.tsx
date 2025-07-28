'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface EnhancedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}

export const EnhancedButton = ({ 
  children, 
  onClick, 
  className = '', 
  variant = 'primary',
  size = 'md',
  disabled = false 
}: EnhancedButtonProps) => {
  const baseClasses = "relative overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20",
    ghost: "text-white hover:bg-white/10 backdrop-blur-sm"
  };
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ 
        scale: 0.95 
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{
          scale: 1,
          opacity: 1
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
};

// Enhanced Card Component
export const EnhancedCard = ({ 
  children, 
  className = '',
  delay = 0 
}: { 
  children: ReactNode; 
  className?: string;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)"
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 ${className}`}
      style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
    >
      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: 'linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
          backgroundSize: '200% 200%'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6">
        {children}
      </div>
    </motion.div>
  );
};

// Enhanced Link Component
export const EnhancedLink = ({ 
  children, 
  href, 
  className = '',
  onClick 
}: { 
  children: ReactNode; 
  href?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center space-x-2 text-white/90 hover:text-white transition-colors duration-300 ${className}`}
      whileHover={{ 
        scale: 1.05,
        x: 5
      }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
    >
      <span>{children}</span>
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.a>
  );
}; 