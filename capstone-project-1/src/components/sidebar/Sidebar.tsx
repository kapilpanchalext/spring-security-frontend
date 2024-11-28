"use client"
import React, { useContext } from 'react';
import styles from "./Sidebar.module.scss";
import NavigationContext from '@/store/NavigationContext';
import Link from 'next/link';
import { useRouterPath } from '../hooks/useRouterPath';

const Sidebar = () => {
  const { isSideBarExpanded } = useContext(NavigationContext);
  const { isActive } = useRouterPath();

  return (
    isSideBarExpanded ? (
    <aside className={styles.sidebar}>
      <nav className={styles['sidebar__links']}>
        <Link href="/home" className={isActive('/home') ? styles.active : ''}>Info</Link>
        <Link href="/insert" className={isActive('/insert') ? styles.active : ''}>New</Link>
        <Link href="/" className={isActive('/') ? styles.active : ''}>Open</Link>
        <Link href="/" className={isActive('/') ? styles.active : ''}>Save</Link>
        <Link href="/" className={isActive('/') ? styles.active : ''}>SaveAs</Link>
        <Link href="/" className={isActive('/') ? styles.active : ''}>Print</Link>
        <Link href="/" className={isActive('/') ? styles.active : ''}>Share</Link>
        <Link href="/" className={isActive('/') ? styles.active : ''}>Export</Link>
        <Link href="/" className={isActive('/') ? styles.active : ''}>Close</Link>
      </nav>
    </aside>)
    : 
    (<></>)
  )
}

export default Sidebar;