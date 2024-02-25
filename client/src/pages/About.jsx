import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import "./About.css"


const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
       <div className="about">
          <div className="background">
            <div className="img-about">
              <p>
                <h1>About Us </h1>
              </p>
            </div>
          </div>
        </div>

    </Layout>
  );
};

export default About;
