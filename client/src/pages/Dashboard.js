import React from "react";
import { Redirect, useHistory } from "react-router-dom";

import { remove_refresh_token } from "../queries";
import { useCustomer, useClient } from "../store";
import  CLA from "./CLA";

const Dashboard = () => {
  const client = useClient();
  const history = useHistory();
  const { customer, setCustomer } = useCustomer();

  const logout = () => {
    client.request(remove_refresh_token).finally(() => {
      history.push("/auth/signin");

      setCustomer(null);
    });
  };

  if (!customer) {
    return <Redirect to="/auth/signin" />;
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
          <a className="navbar-brand" href="/">
            Contact storage
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto"></ul>
            <button
              onClick={() => logout()}
              className="btn btn-danger my-2 my-sm-0"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <div className="mt-5">
       
        <CLA />
        
      </div>
    </>
  );
};

export default Dashboard;
