import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useUserContext } from "../context/authContext";

export const Layout = ({ children, title, color }) => {
  const [state] = useUserContext();

  const mainStyle = {
    minHeight: state ? "45vw" : "50vw",
    backgroundColor: color,
  };

  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" name="viewport" content="initial-scale=1.0 width=device-width" />
        <title>{title}</title>
      </Helmet>
      <Header />
      <div className="container-fluid">
        <div className="row">
          {state && (
            <Sidebar className="col-md-3 col-lg-2 d-md-block bg-light sidebar" style={{ minHeight: '100vw', backgroundColor: color }} />
          )}
          <main
            className={state ? "col-md-9 ms-sm-auto col-lg-10 px-md-4" : "col-12"}
            style={mainStyle}
          >
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
              <button
                className="btn btn-primary d-md-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#sidebar"
                aria-controls="sidebar"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                Toggle Sidebar
              </button>
            </div>
            {children}
          </main>
        </div>
      </div>
    </>
  );
};
