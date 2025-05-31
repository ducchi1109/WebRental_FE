import BackButton from '@components/BackButton/BackButton';
import { useState } from 'react';
import styles from './Payment.module.css';
import Button from '@components/Button/Button';
import Popup from '@components/PopUp/PopUp';
import Loading from '@components/Loading/Loading';

function Payment(props: any) {
  const [bike, setBike] = useState({
    total: 7777,
    discount: 4000,
  });

  const [method, setMethod] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('Bạn đã thanh toán thành công.');
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <BackButton handler={() => props.currentStep(1)} />
      </div>
      <div className={styles.container}>
        <div className={styles.codeQR}>
          <p style={{ fontWeight: 'bolder' }}>Please scan this QR code and make payments</p>
          {method ? (
            <img src='/assets/images/momoQR.svg' />
          ) : (
            <img src='/assets/images/bankingQR.png' />
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className={styles.infor}>
            <div className={styles.subinfor}>
              <p style={{ fontWeight: 'bolder' }}>Renting Total</p>
              <p>{bike.total}</p>
            </div>
            <div className={styles.subinfor}>
              <p style={{ fontWeight: 'bolder' }}>Discount Amount</p>
              <p>{bike.discount}</p>
            </div>
            <hr style={{ border: '1px dashed #000000' }} />
            <div className={styles.subinfor}>
              <p style={{ fontWeight: 'bolder' }}>Renting Payment</p>
              <p>{bike.discount}</p>
            </div>
          </div>
          <div className={styles.infor}>
            <p style={{ fontWeight: 'bolder' }}>Payment Method</p>
            <div className={styles.methodpayment}>
              <p
                style={
                  method
                    ? {
                        backgroundColor: '#8CD47E',
                      }
                    : {
                        backgroundColor: '#D9D9D9',
                      }
                }
                onClick={() => setMethod(true)}
              >
                Momo QR
              </p>
              <p
                style={
                  !method
                    ? {
                        backgroundColor: '#8CD47E',
                      }
                    : {
                        backgroundColor: '#D9D9D9',
                      }
                }
                onClick={() => setMethod(false)}
              >
                Banking QR
              </p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', margin: '30px 0 30px 0' }}>
        <Button text='Confirm' handler={() => setShowPopup(true)} />
      </div>
      {showPopup && <Popup message={message} onClose={() => setShowPopup(false)} />}
      {loading && <Loading />}
    </>
  );
}

export default Payment;
