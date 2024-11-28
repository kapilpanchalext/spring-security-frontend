"use client";
import NavigationContext from '@/store/NavigationContext';
import React, { ReactNode, useContext } from 'react';

type Props = {
  children: ReactNode;
}

const ContextWrapper = ({children}: Props) => {
  const { isTheme } = useContext(NavigationContext);

  return (
    <>
      <html lang="en" className={`${isTheme ? "light" : "dark"}`}>
        {children}
      </html>
    </>
  )
}

export default ContextWrapper;