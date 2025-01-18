import styles from './globalStyles.module.scss';

function GlobalStyles({ children }) {
    return <div className={styles['global-styles']}>{children}</div>;
}

export default GlobalStyles;
