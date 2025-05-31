import styles from './Card.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

function Card(props: any) {
  // const [bikes, setBikes] = useState(props.item);
  const [bikes, setBikes] = useState({
    pricePerDay: props.item.pricePerDay,
    vehicleType: props.item.vehicleType,
    color: props.item.color,
    locationId: props.item.loctionId,
    year: props.item.year,
    licensePlate: props.item.licensePlate,
    id: props.item.id,
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
    title: 'Honda Airblade 2021',
    bookingdocsReqs: 'ID Card & Driving License',
    capacity: props.item.model.engineCapacity,
    gear: props.item.year,
    img: '/assets/images/vison.jpg',
    brand: props.item.model.brand.brandName,
    model: props.item.model.modeName,
    displacement: '150',
    description: 'xe tốt',
  });

  return (
    <>
      <div className={styles.container}>
        <img className={styles.image} src={bikes.img} alt='image' />
        <div>
          <div>
            <h2 className={styles.title}>{bikes.title}</h2>
            <div className={styles.DescriptStar}>
              <h3 className={styles.description}>{bikes.description}</h3>
              <h5 className={styles.star}>
                {bikes.star}
                <FontAwesomeIcon icon={faStar} />
              </h5>
            </div>
            <h3 className={styles.location}>
              <span>
                <img
                  style={{ maxWidth: '20px', paddingRight: '5px'}}
                  src='../../../assets/images/uparrow.png'
                />
                {bikes.pickuplocation}
              </span>
              <span>
                <img
                  style={{ maxWidth: '20px', paddingRight: '5px',}}
                  src='../../../assets/images/downarrow.png'
                />
                {bikes.dropofflocation}
              </span>
            </h3>
            <h4 className={styles.price}>{bikes.pricePerDay}K/day</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
