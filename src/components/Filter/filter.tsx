import styles from './filter.module.css';
import Button from '@components/Button/Button';
import { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';

function Filter(props: any) {
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
        setBrands([...new Set(bikes.map((bike: any) => bike.brand))] as string[]);
        setModels(bikes.map((bike: any) => bike.model));
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getMotors();
  }, []);

  const [search, setSearch] = useState({
    brand: props.search.brands,
    model: props.search.model,
    keyword: props.search.brands,
    priceMin: '0',
    priceMax: props.search.price,
    pickuplocation: props.search.location,
    dropofflocation: 'Quận 1',
    pickupDate: '2025-04-15',
    dropoffDate: '2025-04-15',
    page: '1',
    perPage: '12',
  });

  // const HandlerSubmit = (e: any) => {
  //   e.preventDefault();
  //   alert(`Bạn đã submit`);
  // };

  useEffect(() => {
    console.log(search.keyword);
    const handleSearch = async () => {
      try {
        const queryParams = new URLSearchParams({
          keyword: search.keyword,
          page: '1',
          perPage: '12',
        });

        const response = await fetch(
          `http://localhost:3000/search?${encodeURIComponent(queryParams.toString())}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setMotorbikes(result);
        props.onHandleMotorbikes(result, search);
      } catch (error) {
        console.error('Api search failed:', error);
      }
    };

    handleSearch();
  }, [search]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Filters</h3>
        {/* <h4>Reset</h4> */}
      </div>
      <div className={styles.brandtype}>
        <label htmlFor='brand'>Brand</label>
        <select
          value={search.brand}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value, brand: e.target.value })}
          name='brand'
          id='brand'
        >
          {brands.map((car: any, index: any) => (
            <option key={index} value={car}>
              {car}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.brandtype}>
        <label htmlFor='model'>Model</label>
        <select
          value={search.model}
          onChange={(e) => setSearch({ ...search, keyword: e.target.value, model: e.target.value })}
          name='model'
          id='model'
        >
          {models.map((car: any, index: any) => (
            <option key={index} value={car}>
              {car}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>
          Price range - <span>{search.priceMax}x1000đ/day</span>
        </h4>
        <Slider
          defaultValue={50}
          onChange={(event, value) => setSearch({ ...search, keyword: value, priceMax: value })}
          aria-label='Default'
          valueLabelDisplay='auto'
        />
      </div>
      <div>
        {/* <h4>Location</h4> */}
        {/* <div className={styles.location}> */}
        <div>
          <div className={styles.locationTT}>
            {/* <img src='../../../assets/images/uparrow.png' /> */}
            <label htmlFor='pickuplocation'>Location</label>
            <select
              value={search.pickuplocation}
              onChange={(e) =>
                setSearch({ ...search, keyword: e.target.value, pickuplocation: e.target.value })
              }
              name='pickuplocation'
              id='pickuplocation'
            >
              {districts.map((locate, index) => (
                <option key={index}>{locate}</option>
              ))}
            </select>
          </div>
          {/* <div>
            <img src='../../../assets/images/downarrow.png' />
            <select
              value={search.dropofflocation}
              onChange={(e) => setSearch({ ...search, dropofflocation: e.target.value })}
              name='dropofflocation'
            >
              {districts.map((locate, index) => (
                <option key={index}>{locate}</option>
              ))}
            </select>
          </div> */}
        </div>
      </div>
      {/* <div>
        <h4>Date & Time</h4>
        <div className={styles.datetime}>
          <div>
            <img src='../../../assets/images/uparrow.png' />
            <input
              type='date'
              value={search.pickupDate}
              onChange={(e) => setSearch({ ...search, pickupDate: e.target.value })}
              name='pickupDate'
            />
          </div>
          <div>
            <img src='../../../assets/images/downarrow.png' />
            <input
              type='date'
              value={search.dropoffDate}
              onChange={(e) => setSearch({ ...search, dropoffDate: e.target.value })}
              name='dropoffDate'
            />
          </div>
        </div>
      </div> */}
      {/* <div className={styles.button}>
        <Button text='Search' handler={handleButton} />
      </div> */}
    </div>
  );
}

export default Filter;
