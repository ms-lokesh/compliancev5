import React from 'react';
import snsSquareLogoImg from '../assets/sns_square_logo.png';

interface SnsSquareLogoProps {
  className?: string;
  mode?: 'light' | 'dark';
}

export const SnsSquareLogo: React.FC<SnsSquareLogoProps> = ({
  className = 'h-10 w-auto',
  mode = 'light',
}) => {
  // Reference prop to prevent TypeScript unused local error (TS6133)
  const _ = mode;

  return (
    <img
      src={snsSquareLogoImg}
      alt="SNS Square"
      className={`${className} shrink-0`}
      style={{ aspectRatio: '608 / 416', objectFit: 'contain' }}
    />
  );
};

export default SnsSquareLogo;
