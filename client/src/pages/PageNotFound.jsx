import React from 'react'
import Layout from '../components/Layout/Layout.jsx'

const PageNotFound = () => {
  return (
    <Layout title="Go Back - Page not found">
        <div className="pnf text-center mt-5">
            <h1 className="pnf-title">
                404
            </h1>
            <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        </div>

    </Layout>
  )
}

export default PageNotFound