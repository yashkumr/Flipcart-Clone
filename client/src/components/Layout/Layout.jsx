import React from 'react'
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import TrendingProduct from './TrendingProduct.jsx';

const Layout = ({ children, title, description, keywords, author}) => {
  return (
    <div>
        <Helmet>
            <meta charSet='utf-8'/>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
            <meta name='auth' content={author} />
            <title>{title}</title>
        </Helmet>
        
        <Header/>
        <main style={{minHeight:"50vh"}}>
            <Toaster/>
            {children}
        </main>
        <TrendingProduct/>
        
        <Footer/>
    </div>
    
  )     
};
Layout.defaultProps = {
    title:"Ecommerce app -shop now",
    description:"mern stack project",
    keywords: "mern, react, node, mongodb",
    author:"vimlesh"
}

export default Layout