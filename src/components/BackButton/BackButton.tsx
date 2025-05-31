import 'react';
import { useNavigate } from 'react-router-dom';

function BackButton(props: any) {
  const navigate = useNavigate();

  const buttonBackStyle = {
    borderRadius: '110px',
    backgroundColor: '#ffb54c',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bolder',
    padding: '10px',
  };

  return (
    <div>
      <button style={buttonBackStyle} onClick={props.handler}>
        <img src='/assets/images/arrowleft.png' style={{ width: '10px', paddingRight: '5px' }} />
        Back
      </button>
    </div>
  );
}

export default BackButton;
