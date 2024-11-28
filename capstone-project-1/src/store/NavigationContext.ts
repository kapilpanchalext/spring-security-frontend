import { createContext } from "react";

type NavigationContextType = {
  isTheme: boolean;
  toggleTheme: () => void;
  isSideBarExpanded: boolean;
  toggleSidebar: () => void;
};
  
const NavigationContext = createContext<NavigationContextType>({
  isTheme: false,
  toggleTheme: () => {},
  isSideBarExpanded: false,
  toggleSidebar: () => {},
});

export default NavigationContext;