import React from 'react'

const PageWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center gap-1">
      {children}
    </div>
  )
}

export default PageWrapper
