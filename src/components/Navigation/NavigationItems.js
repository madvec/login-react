import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'

const Navigation = () => {
    return (
        <ul className={styles.Navigation}>
            <NavigationItem link='/' exact >Home</NavigationItem>
            <NavigationItem link='/signin'  >Sign in</NavigationItem>
            <NavigationItem link='/signup'  >Sign up</NavigationItem>
        </ul>
    )
}

export default Navigation