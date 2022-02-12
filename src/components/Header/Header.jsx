import React, { useContext, useState } from "react";

import bemCssModules from "bem-css-modules";

import { StoreContext } from "../../store/StoreProvider";

import { default as HeaderStyles } from "./Header.module.scss";
import LoginForm from "../LoginForm/LoginForm";

const block = bemCssModules(HeaderStyles);

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, setUser } = useContext(StoreContext);

  const handleOnClose = () => setIsModalOpen(false);

  const handleOnClick = () => {
    if (Boolean(user)) {
      setUser(null);
    } else {
      setIsModalOpen(true);
    }
  };

  const setProperlyLabel = Boolean(user) ? "Wyloguj się" : "Zaloguj się ";

  return (
    <header className={block()}>
      <div className={block("logo-wrapper")} />
      <h1 className={block("title")}>Super kursy JS!</h1>
      <button onClick={handleOnClick}>{setProperlyLabel}</button>
      <LoginForm handleOnClose={handleOnClose} isModalOpen={isModalOpen} />
    </header>
  );
};

export default Header;
