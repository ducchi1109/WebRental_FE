import styles from './Button.module.css';

interface HeaderProps {
  text: string;
  handler: () => void;
}

function Button({ text, handler }: HeaderProps) {
  return (
    <button className={styles.button} onClick={handler}>
      {text}
    </button>
  );
}

export default Button;
