import { CCard, CContainer, CRow, CCol } from '@coreui/react'
import React, { useEffect, useState } from 'react'

function ManageProfile() {
  const [profileDetails, setProfileDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/viewprofile';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const manageprofileData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          clientId: clientId,

        })
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.message);
        throw new Error('Network response was not ok');
      }
      if (result.status === "0") {
        setProfileDetails(result?.clientDetails);
      }

    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    manageprofileData();
  }, []);



  return (
    <div>
      <CCard>
        <CContainer style={{ border: '1px solid black', borderRadius: '5px' }}>
          <CContainer className='my-3' style={{ textAlign: 'center', fontSize: '25px' }}>
            <strong>Profile</strong>
          </CContainer >
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> First Name</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.firstName}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> Last Name</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.lastName}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> AES Id</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.clientId}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> Mobile Number</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.regMobile}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> Email Id</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.username}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> Alternate Number</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.alterMobile}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> Company Number</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.companyName}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> Pan Card</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.panNo}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> State</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.state}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> District</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.district}</CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> Address</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.address} </CCol>
          </CRow>
          <CRow className='my-2'>
            <CCol style={{ textAlign: 'end' }}><b> Pin Code</b></CCol>
            <CCol style={{ textAlign: 'start' }}>{profileDetails?.pincode}</CCol>
          </CRow>
        </CContainer>
      </CCard>
    </div>
  )
}

export default ManageProfile