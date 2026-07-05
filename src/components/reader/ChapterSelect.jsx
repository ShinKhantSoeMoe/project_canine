import { useNavigate } from 'react-router-dom';
import styles from './ChapterSelect.module.css';

/** Chapter dropdown in the reader's top bar. */
export default function ChapterSelect({ chapters, currentId }) {
  const navigate = useNavigate();

  return (
    <select
      className={styles.select}
      value={currentId}
      onChange={(e) => navigate(`/chapter/${e.target.value}`)}
      aria-label="Select chapter"
    >
      {chapters.map((ch) => (
        <option key={ch.id} value={ch.id}>
          Ch. {ch.number}: {ch.title}
        </option>
      ))}
    </select>
  );
}
