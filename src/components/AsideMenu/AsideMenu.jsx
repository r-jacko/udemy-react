import React, { useContext } from "react";
import { StoreContext } from "../../store/StoreProvider";

import { default as AsideMenuStyles } from "./AsideMenu.module.scss";
import bemCssModules from "bem-css-modules";
import AdminMenu from "./subcomponents/AdminMenu";
import UserMenu from "./subcomponents/UserMenu";
const block = bemCssModules(AsideMenuStyles);

const ADMIN_TYPE = 1;

const AsideMenu = () => {
  const { user } = useContext(StoreContext);

  const adminMenuComponent =
    user?.accessLevel === ADMIN_TYPE ? <AdminMenu /> : null;
  return (
    <section className={block()}>
      <div className={block("nav-wrapper")}>
        <UserMenu isUserLogged={Boolean(user)} />
        {adminMenuComponent}
      </div>
    </section>
  );
};

export default AsideMenu;
