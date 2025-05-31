import Header from '@components/Header/Header';
import Category from '../../components/Category/Category';
import Button from '@components/Button/Button';
import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useHeader} from '../../Context/HeaderContext';

function HomePage(props: any) {
  const districts = [
    'Quận 1',
    'Quận 2',
    'Quận 3',
    'Quận 4',
    'Quận 5',
    'Quận 6',
    'Quận 7',
    'Quận 8',
    'Quận 9',
    'Quận 10',
    'Quận 11',
    'Quận 12',
    'Bình Thạnh',
    'Gò Vấp',
    'Phú Nhuận',
    'Tân Bình',
    'Tân Phú',
    'Bình Tân',
    'Thủ Đức',
    'Nhà Bè',
    'Củ Chi',
    'Hóc Môn',
    'Bình Chánh',
    'Cần Giờ',
  ];

  const priceMax = ['100000', '500000', '1000000', '1500000'];

  const [search, setSearch] = useState({
    brands: '',
    model: '',
    location: '',
    price: 0,
  });

  const navigate = useNavigate();
  const [motorbikes, setMotorbikes] = useState([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);

  useEffect(() => {
    const getMotors = async () => {
      try {
        const response = await fetch('http://localhost:3000/v1/motorbikes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res = await response.json();
        const bikes = res.data.bikes;
        setMotorbikes(bikes);
        setBrands([...new Set(bikes.map((bike: any) => bike.brand))] as string[]);
        setModels(bikes.map((bike: any) => bike.model));
      } catch (error) {
        console.error('Error - HomePage:', error);
      }
    };

    getMotors();
  }, []);

  const handleSelectBrands = (e: any) => {
    setSearch({ ...search, brands: e });
    setModels(motorbikes.filter((bike: any) => bike.brand === e).map((bike: any) => bike.model));
  };

  const handleButton = () => {
    navigate('/search', { state: { search: search} });
  };

  return (
    <>
      <Header/>
      <div className={styles.main}>
        <div>
          <h1>
            Exploring Ho Chi Minh City,
            <img
              style={{ maxWidth: '30px', maxHeight: '30px' }}
              src='/assets/images/mortorbike.svg'
              alt='Motorbike Icon'
            />
            <br />
            <b>
              Rent a <span style={{ color: '#FFB54C' }}>MotorBike</span>
            </b>
          </h1>
          <div>
            <h3>Choose your motorbike</h3>
            <div style={{ display: 'flex', gap: '40px', margin: '0', padding: '0' }}>
              <Category
                text='Brands'
                icon='../assets/images/motorcycle.png'
                list={brands}
                onChange={(e) => handleSelectBrands(e)}
              />
              <Category
                text='Models'
                icon='../assets/images/map.svg'
                list={models}
                onChange={(e) => setSearch({ ...search, model: e })}
              />
              <Category
                text='Location'
                icon='../assets/images/calendar.svg'
                list={districts}
                onChange={(e) => setSearch({ ...search, location: e })}
              />
              <Category
                text='Price'
                icon='../assets/images/dollar.svg'
                list={priceMax}
                onChange={(e) => setSearch({ ...search, price: e })}
              />
            </div>
            <div className={styles.button}>
              <Button text='Search' handler={handleButton} />
            </div>
          </div>
        </div>
        <img
          style={{ width: '30%', height: '30%' }}
          src='../../../assets/images/image1.svg'
          alt='image'
        />
      </div>
    </>
  );
}
export default HomePage;
