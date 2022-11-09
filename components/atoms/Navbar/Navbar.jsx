/* eslint-disable
 jsx-a11y/anchor-is-valid,
 jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-static-element-interactions
*/

import React, { useState } from 'react';
import './_style.scss';


const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false)
    return (
      <div className="navbar">
        <div className="mobile">
          <div className="hamburger-icon"
                     onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <div className={`icon-1 ${isNavOpen ? 'a' : ''}`}></div>
            <div className={`icon-2 ${isNavOpen ? 'c' : ''}`}></div>
            <div className={`icon-3 ${isNavOpen ? 'b' : ''}`}></div>
            <div className="clear"></div>
          </div>
          <div className="navbar__logo--mobile">
            <img src='/static/images/coa.svg' alt='coa'/>
          </div>

        </div>


        <div className="desktop">
          <div className="navbar__logo--desktop">
            <img src='/static/images/desktop-logo.svg' alt='desktopCOA'/>
          </div>

          <div className="login--btn">
            <a href="components/atoms/Navbar/Navbar">
              <img src='/static/images/download.svg' alt='loginIcon' />
              <span>Log In</span>
            </a>
          </div>
        </div>


      </div>
    );
};

export default Navbar;
