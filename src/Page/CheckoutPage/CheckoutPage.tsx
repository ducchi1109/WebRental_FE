import BackButton from '@components/BackButton/BackButton';
import Header from '@components/Header/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressSteps from '@components/ProgressStep/ProgressSteps';
import CheckBikes from './CheckBikes';
import { useState } from 'react';
import VerifyPage from './Verify';
import Payment from './Payment';

function CheckoutPage(props: any) {
  
  const [currentStep, setCurrentStep] = useState(0);

  const renderStepComponent = () => {
    switch (currentStep) {
      case 0:
        return <CheckBikes currentStep={(e: any) => setCurrentStep(e)} />;
      case 1:
        return <VerifyPage currentStep={(e: any) => setCurrentStep(e)}  />;
      case 2:
        return <Payment currentStep={(e: any) => setCurrentStep(e)} />;
      default:
        return <div>Không tìm thấy bước</div>;
    }
  };
  return (
    <>
      <Header/>
      <ProgressSteps
        steps={['Bike confirmation', 'Verification Docs', 'Payments']}
        currentStep={currentStep}
      />
      {renderStepComponent()}
    </>
  );
}

export default CheckoutPage;
