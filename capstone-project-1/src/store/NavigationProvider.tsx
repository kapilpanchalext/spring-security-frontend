"use client";
import React, { ReactNode, useState } from 'react'
import NavigationContext from './NavigationContext';

type Props = {
  children: ReactNode;
}

const NavigationProvider = ({children}: Props) => {
  const [isThemeState, setIsThemeState] = useState<boolean>(false);
  const [isSideBarExpandedState, setIsSideBarExpandedState] = useState<boolean>(false);

  const toggleTheme = () => {
    setIsThemeState(!isThemeState);
  }

  const toggleSidebar = () => {
    setIsSideBarExpandedState(!isSideBarExpandedState);
  };

  return (
    <NavigationContext.Provider value={{ isTheme: isThemeState, toggleTheme, isSideBarExpanded: isSideBarExpandedState, toggleSidebar }}>
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider;