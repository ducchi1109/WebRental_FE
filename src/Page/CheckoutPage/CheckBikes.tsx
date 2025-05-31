import styles from './CheckBikes.module.css';
import { useEffect, useState } from 'react';
import Button from '@components/Button/Button';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BackButton from '@components/BackButton/BackButton';
import { useNavigate } from 'react-router-dom';
import { useHeader } from '../../Context/HeaderContext';
import { NotFound } from '@components/NotFound/NotFound';

function CheckBikes(props: any) {

  const navigate = useNavigate();

  const { login, setLogin } = useHeader();

  const [bike, setBike] = useState({
    pricePerDay: 'data.price_per_day',
    vehicleType: 'data.vehicleType',
    color: 'data.color',
    locationId: 'data.loctionId',
    year: 'data.year',
    licensePlate: 'data.licensePlate',
    id: 'data.id',
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
    title: 'data.model.modelName',
    bookingdocsReqs: 'ID Card & Driving License',
    capacity: 'data.model.engineCapacity',
    gear: 'data.year',
    img: '/assets/images/vison.jpg',
    brand: 'data.model.brand.brandName',
    model: ' data.model.modeName',
    displacement: '150',
    description: 'xe tốt',
  });

  const [bikes, setBikes] = useState<any[]>([]);

  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (id:any, newQuantity:any) => {
    setQuantities((prev:any) => ({
      ...prev,
      [id]: newQuantity,
    }));
  };

  useEffect(() => {
    const getAllItems = async () => {
      const allItems: any[] = [];
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key || "");
        if (key && value && key.startsWith('cartItem_')) {
          const response = await fetch(`http://localhost:3000/search/${value}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const data = await response.json();

          allItems.push(data);
        }
      }
      // return allItems;
      setBikes(allItems);

      setQuantities(() => {
        const initial: Record<string, number> = {};
        allItems.forEach((bike:any) => {
          initial[bike.id] = 1;
        });
        return initial;
      });
    };

    getAllItems();
  }, [login.count]);

  const total = bikes.reduce((acc, bike) => acc + bike.price_per_day * quantities[bike.id], 0);

  const [clickedIndex, setClickedIndex] = useState(null);

  useEffect(() => {
    console.log('call id: ' + clickedIndex);
    const detailBike = async () => {
      const response = await fetch(`http://localhost:3000/search/${clickedIndex}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      setBike({
        ...bike,
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
    };

    detailBike();
  }, [clickedIndex]);

  return (
    <>
      {login.isLoggin? (
        <BackButton handler={() => navigate('/home')} />
      ) : (
        <BackButton handler={() => navigate('/')} />
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        <div>
          {login.count==0 ? (
            <div className={styles.notfound }>
              <h1>Oopsssss!. You haven not added any vehicles yet.</h1>
              <img src='../../../assets/images/404.svg' alt='notfoud' style={{width:'200px'}}/>
            </div>
          ) : (
            <>
            <div className={styles.listBike}>
              {bikes.map((bike:any, index: any) => (
                <div
                  key={index}
                  className={styles.card}
                  data-clicked={clickedIndex === bike.id}
                  onClick={() => setClickedIndex(bike.id)}
                >
                  <input type='checkbox' name='checkbox' />
                  <img src='/assets/images/shmode.png' className={styles.imgBike} />
                  <div className={styles.subcard}>
                    <p className={styles.title}>{bike.model.modelName}</p>
                    <div className={styles.location}>
                      <p>{bike.pickuplocation}</p>
                      <img src='/assets/images/arrowright.png' />
                      <p>{bike.dropofflocation}</p>
                    </div>
                  </div>
                  <div className={styles.subcard}>
                    <p>Price/day</p>
                    <p>{bike.price_per_day}k</p>
                  </div>
                  <div className={styles.subcard}>
                    <p>Quantity</p>
                    <div className={styles.quantity}>
                      <img
                        src='/assets/images/minus.png'
                        onClick={() => handleQuantityChange(bike.id, quantities[bike.id] - 1)}
                      />
                      <input type='number' name='number' value={quantities[bike.id]} disabled />
                      <img
                        src='/assets/images/add.png'
                        onClick={() => handleQuantityChange(bike.id, quantities[bike.id] + 1)}
                      />
                    </div>
                  </div>
                  <div className={styles.subcard}>
                    <p>Subtotal</p>
                    <p id={bike.id}>{quantities[bike.id] * bike.price_per_day}k</p>
                  </div>
                  <div
                    className={styles.bin}
                    onClick={() => {
                      sessionStorage.removeItem(`cartItem_${bike.id}`);
                      setLogin({ ...login, count: sessionStorage.length });
                    }}
                  >
                    <img src='/assets/images/bin.png' style={{ width: '20px' }} />
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.total}>
              <p>Total: {total} vnđ.</p>
            </div>
            <div className={styles.button}>
              <Button text='Confirm' handler={() => props.currentStep(1)} />
            </div>
            </>
          )}
        </div>

        {/* ------------ */}

        <div
          style={
            clickedIndex && login.count > 0 ?
              {
                display:'block'
              }
              :
              {
                display:"none"
              }
          }
        >
            <div className={styles.section}>
            <div>
                <div style={{ position: 'relative',cursor:'pointer' }} onClick={()=>setClickedIndex(null)}>
                  <img
                    src="/assets/images/exit.png"
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0
                    }}
                  />
                </div>
                <div className={styles.img}>
                  <img src={bike.img} />
                </div>
                <div>
                  <div>
                    <div className={styles.headline}>
                      <div>
                        <h4 className={styles.title} style={{ color: '#006600' }}>
                          {bike.title}
                          <span
                            style={{ fontWeight: 'bolder', color: '#000000', paddingLeft: '10px' }}
                          >
                            {bike.star}
                            <FontAwesomeIcon icon={faStar} style={{ color: '#FFDD00' }} />
                          </span>
                        </h4>
                      </div>
                      <div style={{ fontSize: '1.3em', fontWeight: 'bolder' }}>
                        {bike.pricePerDay}
                        <span style={{ color: '#a6a6a6' }}>k/day</span>
                      </div>
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
            </div>
          </div>
      </div>
    </>
  );
}

export default CheckBikes;
