import React from "react";
import bemCssModules from "bem-css-modules";
import { Link } from "react-router-dom";

import { default as AsideMenuStyles } from "../AsideMenu.module.scss";

const block = bemCssModules(AsideMenuStyles);

const UserMenu = ({ isUserLogged }) => (
  <>
    <p className={block("title")}>Panel użytkownika</p>
    <nav>
      <ul>
        <li className={block("link")}>
          <Link to="/">Kursy w sprzedaży</Link>
        </li>
        {isUserLogged && (
          <li className={block("link")}>
            <Link to="/my-courses">Moje zakupione kursy</Link>
          </li>
        )}
      </ul>
    </nav>
  </>
);

export default UserMenu;
