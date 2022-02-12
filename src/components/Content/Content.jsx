import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";
import { Routes, Route, Navigate } from "react-router-dom";

import Courses from "../Courses/Courses";

import { default as ContentStyles } from "./Content.module.scss";
import { StoreContext } from "../../store/StoreProvider";

const block = bemCssModules(ContentStyles);

const ADMIN_TYPE = 1;

const Content = () => {
  const { user } = useContext(StoreContext);
  const isUserLogged = Boolean(user);
  const isAdmin = user?.accessLevel === ADMIN_TYPE;

  return (
    <main className={block()}>
      <Routes>
        {/* <Route exact path="/" render={() => <Courses />} /> */}
        <Route exact path="/" element={<Courses />} />
        {isUserLogged && (
          <Route exact path="/my-courses" element={<p>Moje kursy</p>} />
        )}
        {isAdmin && (
          <Route
            exact
            path="/manage-courses"
            element={<p>Zarządzanie kursami</p>}
          />
        )}
        {/* <Redirect to="/" /> */}
        {/* <Route element={<Redirect to="/" />} /> */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
};

export default Content;
