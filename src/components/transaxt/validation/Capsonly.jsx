import { CFormInput } from '@coreui/react';
import React, { useState } from 'react';

function Capsonly({ onStateChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    const uppercaseValue = value.toUpperCase();
    setInputValue(uppercaseValue);
    onStateChange(uppercaseValue);
  };
  return (
    <CFormInput
      maxLength={11}
      size='sm'
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}

export default Capsonly;
