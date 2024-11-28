"use client";
import React, { useContext, useEffect, useState } from 'react';
import styles from "./Navbar.module.scss";
import Link from 'next/link';
import NavigationContext from '@/store/NavigationContext';
import { useRouterPath } from '../hooks/useRouterPath';

const Navbar = () => {
  const { isTheme, toggleTheme, toggleSidebar } = useContext(NavigationContext);
  const [ isNavbarExtended, setIsNavbarExtended ] = useState<boolean>(false);

  const { isActive } = useRouterPath();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 769 && isNavbarExtended) {
        setIsNavbarExtended(false);
      }
    };

    if (window.innerWidth > 769 && isNavbarExtended) {
      setIsNavbarExtended(false);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isNavbarExtended]);

  const toggleIconHandler = () => {
    if (isTheme) {
      return <span className={`material-symbols-outlined`}>dark_mode</span>
    } else {
      return <span className={`material-symbols-outlined`}>light_mode</span>
    }
  }

  const openLinksMenuHandler = () => {
    setIsNavbarExtended((prevResult) => !prevResult);
  }

  return (
    <>
      <div className={styles.backdrop}></div>
      <header className={`${styles['navbar']} ${isNavbarExtended ? styles['navbar__extended'] : ''}`}>
        <button className={`${styles['sidebar-button']}`} onClick={toggleSidebar}><span className={`material-symbols-outlined`}>menu</span></button>
        <div className={styles['navbar__title']}>
          <Link href="/"><h1>SchoolBell</h1></Link>
        </div>
        
        <nav className={styles['navbar__links']}>
          <Link href="/home" className={isActive('/home') ? styles.active : ''}>Home</Link>
          <Link href="/insert" className={isActive('/insert') ? styles.active : ''}>Insert</Link>
          <Link href="/design" className={isActive('/design') ? styles.active : ''}>Design</Link>
          <Link href="/layout" className={isActive('/layout') ? styles.active : ''}>Layout</Link>
          <Link href="/references" className={isActive('/references') ? styles.active : ''}>References</Link>
          <Link href="/mailings" className={isActive('/mailings') ? styles.active : ''}>Mailings</Link>
          <Link href="/review" className={isActive('/review') ? styles.active : ''}>Review</Link>
          <Link href="/view" className={isActive('/view') ? styles.active : ''}>View</Link>
        </nav>
        <button className={styles['theme-button']} onClick={toggleTheme}>{toggleIconHandler()}</button>
        <button className={`${styles['menu-button']}`} onClick={openLinksMenuHandler}><span className={`material-symbols-outlined`}>menu</span></button>
      </header>
    </>
  )
}

export default Navbar;