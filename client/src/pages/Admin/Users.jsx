import React from "react";
import AdminMenu from "../../components/Layout/AdminMenu.jsx";
import Layout from "../../components/Layout/Layout.jsx";

const Users = () => {
  return (
    <Layout title={"Dashboard - All Users"}>
      <div className="container mt-5 m-3 p-3">
        <div className="row mt-5">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="">All Users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
