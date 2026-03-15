'use client';

import Link from 'next/link';
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline-white' | 'neon' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  'outline-white': 'btn-outline-white',
  neon: 'btn-neon',
  ghost: 'btn-ghost',
};

const sizeClass: Record<ButtonSize, string> = {
  sm: 'btn-sm',
  md: '',
  lg: 'btn-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled,
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  const classes = ['btn', variantClass[variant], sizeClass[size], className].filter(Boolean).join(' ');

  const content = (
    <>
      <span className="btn-label">{children}</span>
      <span className="btn-label-hover" aria-hidden>{children}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  );
}
