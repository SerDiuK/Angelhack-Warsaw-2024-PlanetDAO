import { ReactNode } from 'react';

const Card = ({ children, height, width, className }: { children: ReactNode; height?: number; width?: number; className?: string }) => {
  return (
    <div className={`${className} theme-moon-light flex w-full p-6 border-1 border-beerus shadow-moon-lg rounded-moon-s-md bg-gohan text-bulma`} style={{ height, width }}>
      {children}
    </div>
  );
};

export default Card;
