import { ReactNode } from 'react';

export default function FloatingBottomNav({ children }: { children: ReactNode }) {
  return (
    <div className="fixed flex w-full justify-center bottom-6  sm:hidden">
      <div className="flex shadow-moon-lg bg-gohan rounded-moon-s-md gap-2 px-3 py-2 border-beerus">{children}</div>
    </div>
  );
}
