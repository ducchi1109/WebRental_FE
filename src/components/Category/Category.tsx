import { useRef, useState } from 'react';
import styles from './Category.module.css';

interface HeaderProps {
  text: string;
  icon: string;
  list: any[];
  // onSelect: (categoryName: string, value: string) => void;
  onChange: (e: any) => void;
}

function Category({ text, icon, list, onChange }: HeaderProps) {
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Mở trực tiếp calendar
    }
  };

  const [date, setDate] = useState('');
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={icon} alt='Motorbike Icon' />
      </div>
      <div>
        {text == 'Pickup Date' ? (
          <div>
            <button onClick={handleButtonClick} className={styles.select}>
              {date ? date : 'Pickup Date'}
            </button>
            <input
              ref={dateInputRef}
              type='date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{ visibility: 'hidden', position: 'absolute' }}
            />
          </div>
        ) : (
          <select
            className={styles.select}
            onChange={(e) => onChange(e.target.value)}
            defaultValue={text}
          >
            <option value=''>{text}</option>
            {list.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}

export default Category;
