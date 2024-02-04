import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./Header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper"
import logo from "../../Images/movix-logo.svg"

const Header = () => {
  const [show, setShow] = useState("top"); // Scrolling Effect --> top is class -> changing the class
  const [lastScrollY, setLastScrollY] = useState(0); // Scrolling Effect
  const [mobileMenu, setMobileMenu] = useState(false); // Hamburger effect for mobile
  const [query, setQuery] = useState(""); // this is for search in navigation bar search
  const [showSearch, setShowSearch] = useState(""); // showing and hiding of search menu

  // Scrolling effect
  const controlNavbar = () => {
    // console.log(window.scrollY); // property will return the current scroll amount at that preticular point
    if (window.scrollY > 200 && !mobileMenu) {
      if (window.scrollY > lastScrollY) {
        setShow("hide");
      }
      else {
        setShow("show");
      }
    }
    else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    // When you add a event listner to certain tag or anything -> the best practices to remove it
    // when its doen ->  Memory leakage will be takes place
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY]);

  const navigate = useNavigate();
  const location = useLocation(); // When ew go from current page to other page then sometimes the scroll value will be very high thath why we used this hook
  useEffect(()=> {
    window.scrollTo(0, 0); // -> wiil set the scroll as 0 horizontally 0 vartically
  }, [location]);

  // Handling the menubar in mobile mode
  const openMobileMenu = () => {
    console.log("Hello")
    setMobileMenu(true);
    setShowSearch(false);
  }

  // Handling the opening and closing of search in navigation bar
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  }

  // THese function are for input search handling
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  }
  const onChangeHandler = (event) => {
    setQuery(event.target.value);
  }

  // Redirecting to the path where we clicked in hamburger options
  const handleClickOptions = (type) => {
    navigate(`explore/${type}`);
  }

  return (
    <header className={`header ${show} ${mobileMenu ? "mobileView" : ""}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => {
            handleClickOptions("movie")
          }}>Movies</li>
          <li className="menuItem" onClick={() => {
            handleClickOptions("tv")
          }}>Tv Shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch}/></li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (<VscChromeClose onClick={() => setMobileMenu(false)} />) : (<SlMenu onClick={openMobileMenu} />)}
        </div>
      </ContentWrapper>

      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input type="text"
              placeholder='Search for a movie or TV Show'
              onKeyUp={searchQueryHandler}
              value={query}
              onChange={onChangeHandler}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header>
  );
};

export default Header;