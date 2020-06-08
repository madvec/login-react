import React from 'react'
import icon from '../../../assets/images/icon.png';
import styles from './logo.module.css'

const logo = () => {
    return <div className={styles.Icon} ><img src={icon} alt="Icon" /></div>
}

export default logo