import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="d-flex justify-content-center align-items-center flex-column px-4">
      <div className="text-center">
        © Copyright 2016 @ Bankit Services Pvt.Ltd.| support@bankit.in | 9243000200
      </div>
      {/* <div className="ms-auto">
    <span className="h6"></span>
  </div> */}
    </CFooter>
  )
}

export default React.memo(AppFooter)
