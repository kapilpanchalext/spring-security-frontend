import { usePathname } from 'next/navigation';

export const useRouterPath = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return { pathname, isActive };
};