import { useEffect, useRef, useState } from 'react';
import styles from './License.module.css';

function License(props: any) {
  const fileInputRef1 = useRef(null);
  const fileInputRef2 = useRef(null);
  const fileInputRef3 = useRef(null);
  const fileInputRef4 = useRef(null);
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [preview3, setPreview3] = useState<string | null>(null);
  const [preview4, setPreview4] = useState<string | null>(null);


  const handleClick = (ref: any) => {
    ref.current.click();
  };

  const handleChangeFront = (event: any, setPreview: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (props.name == "CitizenID") {
        setPreview1(imageUrl);
        props.store.ChangeCitizendid(imageUrl, "front");
      } else {
        setPreview3(imageUrl);
        props.store.ChangeDriverLicense(imageUrl, "front");
      }
    }
  };

  const handleChangeBack = (event: any, setPreview: any) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (props.name == "CitizenID") {
        setPreview2(imageUrl);
        props.store.ChangeCitizendid(imageUrl, "back");
      } else {
        setPreview4(imageUrl);
        props.store.ChangeDriverLicense(imageUrl, "back");
      }
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        {
          props.name == "CitizenID" ?
        <div className={styles.section1}
          style={
            props.name == "DriverLicense" ?
              {
                borderColor: '#ff9999',
                backgroundColor: '#ff9999'
              }
              :
              {
                borderColor: '#8cd47e',
                backgroundColor: '#8cd47e'
              }
          }
        >
          <div className={styles.citizen}>
            <div className={styles.label}>
              <p>Front View</p>
              <img
                src={preview1 || '/assets/images/image 12.svg'}
                onClick={() => handleClick(fileInputRef1)}
              />
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef1}
              onChange={(e) => handleChangeFront(e, setPreview1)}
              style={{ display: 'none' }}
            />
          </div>
          <div className={styles.citizen}>
            <div className={styles.label}>
              <p>Back View</p>
              <img
                src={preview2 || '/assets/images/image 12.svg'}
                onClick={() => handleClick(fileInputRef2)}
              />
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef2}
              onChange={(e) => handleChangeBack(e, setPreview2)}
              style={{ display: 'none' }}
            />
          </div>
            </div>
            :
            <div className={styles.section1}
          style={
            props.name == "DriverLicense" ?
              {
                 borderColor: '#ff9999',
                backgroundColor: '#ff9999'
              }
              :
              {
                borderColor: '#8cd47e',
                backgroundColor: '#8cd47e'
              }
          }
        >
          <div className={styles.citizen}>
            <div className={styles.label}>
              <p>Front View</p>
              <img
                src={preview3 || '/assets/images/image 12.svg'}
                onClick={() => handleClick(fileInputRef3)}
              />
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef3}
              onChange={(e) => handleChangeFront(e, setPreview1)}
              style={{ display: 'none' }}
            />
          </div>
          <div className={styles.citizen}>
            <div className={styles.label}>
              <p>Back View</p>
              <img
                src={preview4 || '/assets/images/image 12.svg'}
                onClick={() => handleClick(fileInputRef4)}
              />
            </div>
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef4}
              onChange={(e) => handleChangeBack(e, setPreview2)}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default License;
