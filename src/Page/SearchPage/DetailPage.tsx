import React from 'react';
import { useState, useRef, useEffect } from 'react';
import styles from './DetailPage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '@components/Button/Button';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHeader } from '../../Context/HeaderContext';
import Login from '@components/Login/Login';

function DetailPage(props: any) {
  const navigate = useNavigate();

  const { login, setLogin } = useHeader();

  useEffect(() => {
    const detailBike = async () => {
      if (props.id != null) {
        const response = await fetch(`http://localhost:3000/search/${props.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setBike({
        pricePerDay: data.price_per_day,
        vehicleType: data.vehicleType,
        color: data.color,
        locationId: data.loctionId,
        year: data.year,
        licensePlate: data.licensePlate,
        id: data.id,
        // -----------
        fee: 20,
        deposit: 500,
        pickuplocation: 'Quận 1',
        dropofflocation: 'Quận 2',
        pickupDate: '2025-04-15',
        dropoffDate: '2025-04-15',
        pickupTime: '08:00 am',
        dropoffTime: '06:00 pm',
        star: 4,
        title: data.model.modelName,
        bookingdocsReqs: 'ID Card & Driving License',
        capacity: data.model.engineCapacity,
        gear: data.year,
        img: '/assets/images/vison.jpg',
        brand: data.model.brand.brandName,
        model: data.model.modeName,
        displacement: '150',
        description: 'xe tốt',
      });
      }
    };
    detailBike();
  },[props.id]);

  const [bike, setBike] = useState({
       pricePerDay: 54,
        vehicleType: 45,
        color: 45,
        locationId: 45,
        year: 45,
        licensePlate: 45,
        id: 45,
        // -----------
        fee: 20,
        deposit: 500,
        pickuplocation: 'Quận 1',
        dropofflocation: 'Quận 2',
        pickupDate: '2025-04-15',
        dropoffDate: '2025-04-15',
        pickupTime: '08:00 am',
        dropoffTime: '06:00 pm',
        star: 4,
        title: "sdfsdf",
        bookingdocsReqs: 'ID Card & Driving License',
        capacity: 34,
        gear: 34,
        img: '/assets/images/vison.jpg',
        brand: 34,
        model: 34,
        displacement: '150',
        description: 'xe tốt',
  });


  const addToCart = (newItem: any) => {
    const itemKey = `cartItem_${newItem}`;
    sessionStorage.setItem(itemKey, newItem);
    setLogin({ ...login, count:sessionStorage.length });
  };

  return (
    <div>
      {/* <h2 className={styles.title}>Detail Bike</h2> */}
      <div className={styles.Container}>
        <div className={styles.section}>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => props.onChangeView(null)}>
            <img
              src="/assets/images/exit.png"
              style={{
                position: 'absolute',
                top: 0,
                right: 0
              }}
          />
          </div>
          {/* <h1>Details</h1> */}
          <div className={styles.section1}>
            <div className={styles.img}>
              <img src={bike.img} />
            </div>
            <div>
              <div className={styles.descript}>
                <h4 className={styles.title} style={{ color: '#006600' }}>
                  {bike.title}
                </h4>
                <div className={styles.infor}>
                  <span style={{ fontWeight: 'bolder' }}>
                    {bike.star}
                    <FontAwesomeIcon icon={faStar} style={{ color: '#FFDD00' }} />
                  </span>
                  <span>
                    <span className={styles.title} style={{ fontSize: '1.3em' }}>
                      {bike.pricePerDay}
                    </span>
                    <span style={{ color: '#a6a6a6' }}>k/day</span>
                  </span>
                </div>
                <div className={styles.infor}>
                  <span className={styles.type}>Vehicle Type:</span>
                  <span style={{ fontWeight: 'bolder' }}>{bike.vehicleType}</span>
                </div>
                <div className={styles.infor}>
                  <span className={styles.type}>Capacity:</span>
                  <span style={{ fontWeight: 'bolder' }}>{bike.capacity}cc</span>
                </div>
                <div className={styles.infor}>
                  <span className={styles.type}>Brand:</span>
                  <span style={{ fontWeight: 'bolder' }}>{bike.brand}</span>
                </div>
                <div className={styles.infor}>
                  <span className={styles.type}>Color:</span>
                  <span style={{ fontWeight: 'bolder' }}>{bike.color}</span>
                </div>
              </div>
              <hr style={{ border: '1px dashed #595959' }} />
              <div className={styles.pickdrop}>
                <div>
                  <h4>Pickup</h4>
                  <p>{bike.pickuplocation}</p>
                  <p>{bike.pickupDate}</p>
                  <p>{bike.pickupTime}</p>
                </div>
                <img src='/assets/images/arrowright.png' />
                <div>
                  <h4>DropOff</h4>
                  <p>{bike.dropofflocation}</p>
                  <p>{bike.dropoffDate}</p>
                  <p>{bike.dropoffTime}</p>
                </div>
              </div>
              <hr style={{ border: '1px dashed #595959' }} />
            </div>
          </div>
          <div className={styles.button}>
            <Button text='Add WishList' handler={() => addToCart(props.id)} />
            <Button text='Checkout' handler={() => navigate('/checkout')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
