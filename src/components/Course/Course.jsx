import React, { useContext } from "react";
import bemCssModules from "bem-css-modules";
import { default as CourseStyles } from "./Course.module.scss";
import request from "../../helpers/request";
import { StoreContext } from "../../store/StoreProvider";
import { useNavigate } from "react-router-dom";

const block = bemCssModules(CourseStyles);

const Course = ({ authors, id, img, isUserContext, price, title }) => {
  const { user, setUser } = useContext(StoreContext);

  const navigate = useNavigate();

  const allAuthors = authors.join(", ");
  const isUserLogged = Boolean(user);

  const handleOnClick = async () => {
    try {
      const { data, status } = await request.patch("/users", {
        login: user.login,
        courseId: id,
      });
      if (status === 202) {
        setUser(data.user);
        navigate("/my-courses");
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const shouldBeBuyButtonVisible = isUserLogged && !isUserContext;

  return (
    <li>
      <article className={block()}>
        <h3 className={block("title")}></h3>
        <img src={img} alt={title} className={block("image")} />
        <p className={block("price")}>{`Koszt kursu: ${price}zł`}</p>
        <p className={block("authors")}>{`Autorzy kursu: ${allAuthors}`}</p>
        {shouldBeBuyButtonVisible && (
          <button onClick={handleOnClick}>Kup ten kurs</button>
        )}
      </article>
    </li>
  );
};

export default Course;
