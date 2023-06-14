import React, { MouseEventHandler } from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/icons/logo";
import SideBarLink from "./side-bar-link";
import clsx from "clsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
const SideBar = (props: {
  handleTransition?: MouseEventHandler<HTMLAnchorElement> | undefined;
}) => {
  const linkList: { title: string; path: string }[] = [
    { title: "Home", path: "/" },
    { title: "About Me", path: "/about-me" },
    { title: "Project", path: "/projects" },
    { title: "Artwork", path: "/artworks" },
    { title: "Components Demo", path: "/components-demo" },
  ];
  const [hidden, setHidden] = useState(true);
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1280) {
      setHidden(false);
    } else {
      setHidden(true);
    }
  });
  const links = linkList.map((l, i) => {
    return (
      <li className="mb-5" key={i}>
        <SideBarLink onClick={props.handleTransition} path={l.path}>
          {l.title}
        </SideBarLink>
      </li>
    );
  });
  const handleShowMenu = () => {
    setHidden(!hidden);
  };
  return (
    <>
      <div className="fixed w-full h-20 md:h-24 top-0 left-0 backdrop-blur-sm flex items-center xl:invisible px-4 z-10 shadow-md">
        <Link onClick={props.handleTransition} to={"/"}>
          <Logo className="fill-neutral-light w-12 h-12 lg:w-16 lg:h-16" />
        </Link>
        <div className="w-20 h-8 ml-auto">
          <button
            onClick={handleShowMenu}
            className="w-fit bg-neutral-dark py-1 px-3 rounded"
          >
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>
      </div>

      <div
        className={clsx(
          "bg-primary-0 font-normal fixed float-left top-0 px-14 flex items-center z-20 duration-300",
          "min-h-screen 2xl:w-[350px] w-[300px] xl:relative xl:translate-x-0",
          { "-translate-x-full": hidden }
        )}
        id="sidenav"
      >
        {!hidden && window.innerWidth < 1280 && (
          <button
            className={clsx(
              "absolute bg-neutral-dark w-10 h-10 rounded-full top-3 right-[-18px]",
              { "-translate-x-full": hidden }
            )}
            onClick={() => {
              setHidden(true);
            }}
          >
            <FontAwesomeIcon icon={faClose} size="lg" />
          </button>
        )}
        <nav className="w-fit">
          <Link onClick={props.handleTransition} to={"/"}>
            <Logo className="mb-8 fill-neutral-light w-16 h-16" />
          </Link>
          <ul>{links}</ul>
        </nav>
      </div>
      {!hidden && window.innerWidth < 1280 && (
        <div
          className="h-screen w-screen absolute z-10"
          onClick={() => {
            setHidden(true);
          }}
        ></div>
      )}
    </>
  );
};
export default SideBar;
