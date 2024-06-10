import { CFormInput } from '@coreui/react';
import React, { useState } from 'react';

function Alphabetonly({onStateChange}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    const alphabetsOnly = value.replace(/[^a-zA-Z]/g, ''); 
    setInputValue(alphabetsOnly);
    onStateChange(alphabetsOnly);
  };

  return (
    <CFormInput
      size='sm'
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
}

export default Alphabetonly;
