import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.wrapper}>
      <h1>404</h1>
      <p>That page wandered off.</p>
      <Link to="/" className={styles.link}>
        Back to the library
      </Link>
    </div>
  );
}
