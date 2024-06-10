import React, { useState } from 'react'
import { CContainer, CCard, CRow, CCardBody, CButton, CCol } from '@coreui/react'
import RegisterMyBank from './RegisterMyBank'
import MySettlement from './MySettlement'
import RegisterMyRetailerBank from './RegisterMyRetailerBank'
import MyRetailerList from './MyRetailerList'

const Settlement = () => {
  const [selected, setSelected] = useState('RegisterMyBank')

  const handleButtonClick = (page) => {
    setSelected(page)
  }

  return (
    <CContainer>
      <CCard>
        <CCardBody>
          <CRow className="justify-content-center">
            <CCol xs="auto">
              <div className="mx-4, mb-3">
                <CButton
                  size='sm'
                  color={selected === 'RegisterMyBank' ? 'primary' : 'secondary'}
                  onClick={() => handleButtonClick('RegisterMyBank')}
                >
                  Register MyBank
                </CButton>
              </div>
            </CCol>
            <CCol xs="auto">
              <div className="mx-4,mb-3">
                <CButton
                  size='sm'
                  color={selected === 'MySettlement' ? 'primary' : 'secondary'}
                  onClick={() => handleButtonClick('MySettlement')}>
                  My Settlement</CButton>
              </div>
            </CCol>
            <CCol xs="auto">
              <div className="mx-4,mb-3">
                <CButton
                  size='sm'
                  color={selected === 'RegisterMyRetailerBank' ? 'primary' : 'secondary'}
                  onClick={() => handleButtonClick('RegisterMyRetailerBank')}>
                  Register My Retailer Bank
                </CButton>
              </div>
            </CCol>
            <CCol xs="auto">
              <div className="mb-3">
                <CButton
                  size='sm'
                  color={selected === 'MyRetailerList' ? 'primary' : 'secondary'}
                  onClick={() => handleButtonClick('MyRetailerList')}>
                  My Retailer List
                </CButton>
              </div>
            </CCol>
          </CRow>
          <CRow className="justify-content-center">
            {selected === 'RegisterMyBank' && <RegisterMyBank />}
            {selected === 'MySettlement' && <MySettlement />}
            {selected === 'RegisterMyRetailerBank' && <RegisterMyRetailerBank />}
            {selected === 'MyRetailerList' && <MyRetailerList />}
          </CRow>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Settlement
