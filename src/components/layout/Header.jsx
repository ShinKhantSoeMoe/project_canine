import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          🐾 Canine
        </Link>
        <nav className={styles.nav}>
          <Link to="/">Library</Link>
          {/* Add more links here as the site grows (About, Updates, ...) */}
        </nav>
      </div>
    </header>
  );
}
