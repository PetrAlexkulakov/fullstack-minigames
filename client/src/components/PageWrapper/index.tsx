import React from 'react'
import Navbar from '../Navbar'

const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <div className="d-flex flex-column align-items-center justify-content-center gap-1 h-100">
        {children}
      </div>
    </>
  )
}

export default PageWrapper
