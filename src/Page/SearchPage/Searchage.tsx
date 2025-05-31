import { useEffect, useState } from 'react';
import Filter from '../../components/Filter/filter';
import Card from '@components/Card/Card';
import styles from './SearchPage.module.css';
import Header from '@components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import BackButton from '@components/BackButton/BackButton';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DetailPage from './DetailPage';
import { useHeader } from '../../Context/HeaderContext';

function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState(location.state.search);

  const {login, setLogin } = useHeader();

  const [motorbikes, setMotorbikes] = useState({
    data: [],
    pagination: {
      totalPages: 1,
      totalItems: 0,
      currentPage: 1,
    },
  });

  const handleMotorbikes = (e1: any, e2: any) => {
    setMotorbikes(e1);
    setSearchPa(e2);
  };

  const totalCards = motorbikes.pagination.totalItems;
  const totalPages = motorbikes.pagination.totalPages;
  const [currentPage, setCurrentPage] = useState(1);

  const [searchPa, setSearchPa] = useState({
    brand: search.brands,
    model: search.model,
    keyword: search.brands,
    // location: props.search.location,
    // priceMin: '0',
    // priceMax: props.search.price,
    // pickuplocation: 'Quận 1',
    // dropofflocation: 'Quận 1',
    // pickupDate: '2025-04-15',
    // dropoffDate: '2025-04-15',
    page: '1',
    perPage: '12',
  });

  useEffect(() => {
    const handleSearch = async () => {
      try {
        const queryParams = new URLSearchParams({
          keyword: searchPa.brand,
          page: '1',
          perPage: '12',
        });

        const response = await fetch(`http://localhost:3000/search?${queryParams.toString()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setMotorbikes(result);
      } catch (error) {
        console.error('Pagination failed:', error);
      }
    };

    handleSearch();
  }, [searchPa]);

// -----------------------------------------------------------

  const [view, setView] = useState(null);

  const ChangeView = (view: any) => {
    setView(view);
  };

  return (
    <>
      <Header/>
      {login.isLoggin ? (
        <BackButton handler={() => navigate('/home')} />
      ) : (
        <BackButton handler={() => navigate('/')} />
      )}
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ marginLeft: '15px', marginRight: '15px' }}>
          <Filter search={search} onHandleMotorbikes={handleMotorbikes} />
        </div>

        {totalCards > 0 ? (
          <div>
            <div style={
          view ?
            {
              display:'block'
            }
            :
            {
              display:'none'
            }
        }>
              <DetailPage id={view} onChangeView={ChangeView} />
              </div>
            <div className={styles.listcard}>
              {motorbikes?.data?.length > 0 ? (
                motorbikes.data.map((item: any) => (
                    <div key={item.id} onClick={()=>setView(item.id)}>
                      <Card item={item} />
                    </div>
                  ))
              ) : (
                <p>Không có phương tiện nào được tìm thấy.</p>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.notfound}>
            <h1>Oopsssss!. We have not found anything matched your search.</h1>
            <img src='../../../assets/images/404.svg' alt='notfoud' />
          </div>
        )}
      </div>

      {totalCards > 0 && (
        <div className={styles.pagination}>
          <button
            disabled={currentPage === 1}
            onClick={() => {
              setSearchPa({ ...searchPa, page: (currentPage - 1).toString() });
              setCurrentPage(currentPage - 1);
            }}
          >
            {'<'} Trước
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setSearchPa({ ...searchPa, page: (i + 1).toString() });
                setCurrentPage(i + 1);
              }}
              style={{ fontWeight: parseInt(searchPa.page) === i + 1 ? 'bold' : 'normal' }}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => {
              setSearchPa({ ...searchPa, page: (currentPage + 1).toString() });
              setCurrentPage(currentPage + 1);
            }}
          >
            Sau {'>'}
          </button>
        </div>
      )}
    </>
  );
}

export default SearchPage;
