import { useRef, useState } from 'react';
import styles from './Verify.module.css';
import License from '@components/License/License';
import BackButton from '@components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import Button from '@components/Button/Button';

function VerifyPage(props: any) {
  const [options, setOptions] = useState(true);
  const [citizenid, setCitizenid] = useState({
    front: "",
    back:""
  });
  const [driverlicense, setDriverlicense] = useState({
    front: "",
    back:""
  });

  const ChangeCitizendid = (img:any, opt:any) => {
    if (opt == "front") {
      setCitizenid({ ...citizenid, front: img });
    } else {
      setCitizenid({ ...citizenid, back: img });
    }
  };

  const ChangeDriverLicense = (img:any, opt:any) => {
    if (opt == "front") {
      setCitizenid({ ...citizenid, front: img });
    } else {
      setCitizenid({ ...citizenid, back: img });
    }
  };

  return (
    <div>
      <BackButton handler={() => props.currentStep(0)} />
      <div className={styles.options}>
        <p
          onClick={() => setOptions(true)}
          style={
            options
              ? {
                  fontWeight: 'bolder',
                  backgroundColor: '#F8D66D',
                  margin: '0',
                  border: '1px solid #F8D66D',
                  padding: '5px 10px 5px 10px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)',
                }
              : {
                  fontWeight: 'bolder',
                  margin: '0',
                }
          }
        >
          Citizen ID
        </p>
        <p
          onClick={() => setOptions(false)}
          style={
            !options
              ? {
                  fontWeight: 'bolder',
                  backgroundColor: '#F8D66D',
                  margin: '0',
                  border: '1px solid #F8D66D',
                  padding: '5px 10px 5px 10px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.25)',
                }
              : {
                  fontWeight: 'bolder',
                  margin: '0',
                }
          }
        >
          Driver License
        </p>
      </div>
      <div>
        <div
          style={
            options ?
              {
                display:'block'
              }
              :
              {
                display:"none"
              }
          }
        >
          <License name='CitizenID' store={ChangeCitizendid} img={citizenid} />
        </div>
        <div
          style={
            !options ?
              {
                display:'block'
              }
              :
              {
                display:"none"
              }
          }
        >
          <License name='DriverLicense' store={ChangeDriverLicense} img={driverlicense} />
        </div>
      </div>
      <div className={styles.button}>
        <Button text='Confirm' handler={() => props.currentStep(2)} />
      </div>
    </div>
  );
}

export default VerifyPage;
