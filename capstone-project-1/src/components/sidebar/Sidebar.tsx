"use client"
import React, { useContext } from 'react';
import styles from "./Sidebar.module.scss";
import NavigationContext from '@/store/NavigationContext';
import Link from 'next/link';
import { useRouterPath } from '../hooks/useRouterPath';
import pageLinks from '../pageLinks/PageLinks';

const Sidebar = () => {
  const { isSideBarExpanded } = useContext(NavigationContext);
  const { isActive } = useRouterPath();

  return (
    isSideBarExpanded ? (
    <aside className={styles.sidebar}>
      <nav className={styles['sidebar__links']}>
        {pageLinks.map((link, index) => (
          <Link 
            key={index} 
            href={`/${link.toLowerCase()}`} 
            className={isActive(`/${link}`) ? styles.active : ''}>{link}</Link>
        ))}
      </nav>
    </aside>)
    : 
    (<></>)
  )
};

export default Sidebar;