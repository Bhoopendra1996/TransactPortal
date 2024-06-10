import { CFormInput } from '@coreui/react';
import React, { useState } from 'react';

function Numberonly({onStateChange}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    const numberonly = value.replace(/[^0-9]/g, '');
    setInputValue(numberonly);
    onStateChange(numberonly);
  };

  return (
    <CFormInput
      size='sm'
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      maxLength={10}
    />
  );
}

export default Numberonly;
