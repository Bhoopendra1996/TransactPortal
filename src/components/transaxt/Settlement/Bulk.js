import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
  CButton,
  CSpinner
} from '@coreui/react';

const Bulk = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [formData, setFormData] = useState({});

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const endPoint = '/bulkagentregister';
  const token = localStorage.getItem("token");
  const clientId = localStorage.getItem("clientId");

  const bulkDetails = async () => {
    setLoading(true);
    setError('');
    setSuccessMessage('');
    const uploadData = new FormData();
    uploadData.append('fileUpload', file);
    uploadData.append('transactionModel', JSON.stringify({ apiId: clientId }));

    try {
      const response = await fetch(`${baseUrl}${endPoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`
        },
        body: uploadData,
      });

      if (!response.ok) {
        const result = await response.json();
        setError(result.message);
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.status === "0") {
        setSuccessMessage("Submitted successfully!");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred during submission.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      bulkDetails();
    } else {
      setError("Please select a file to upload.");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <CCard className="w-75" style={{ boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <CCardBody>
          <CForm onSubmit={handleSubmit}>
            <CRow className="mb-3">
              <CFormLabel htmlFor="bulk" className="col-sm-5" style={{ textAlign: 'end' }}>
                Upload Excel File <span className="text-danger">*</span>
              </CFormLabel>
              <CCol>
                <CFormInput
                  size="sm"
                  type="file"
                  id="bulk"
                  name="BulkDetails"
                  accept=".xlsx, .xls"
                  onChange={handleChange}
                  required
                />
                {error && <div className="text-danger">{error}</div>}
                {successMessage && <div className="text-success">{successMessage}</div>}
              </CCol>
            </CRow>
            <CRow className="mb-3">
              <CCol
                xs={{ size: 12, offset: 0 }}
                sm={{ size: 5, offset: 3 }}
                md={{ size: 5, offset: 4 }}
                lg={{ size: 5, offset: 5 }}
              >
                <p>
                  <a href="#">Click here</a> For Sample Excel Format
                </p>
              </CCol>
            </CRow>
            <CRow>
              {loading && <div className='d-flex justify-content-center pb-3'><CSpinner color="info" /></div>}
            </CRow>
            <CRow className="mb-3">
              <CCol sm={{ offset: 5, size: 5 }}>
                <CButton type="submit" color="primary">
                  Registration
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Bulk;
