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

          <div className='navbar__right'>
            <div className='navbar__right__icon'>
              <img src="/static/images/bell.svg" alt="bell" />
            </div>
            <div className='navbar__right__profile'>
              <div className='navbar__user__avatar'>
                <img src="/static/images/avatar.svg" alt="user" />
              </div>
              <div className='navbar__user'>
                <div className='user__details'>
                  <h2>Juan Pablo Yoroi</h2>
                  <span>Entrepreneur</span>
                </div>
                <div className='dropdown'>
                  <img src="/static/images/arrow-down.svg" alt="arrow-down" />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    );
};

export default Navbar;
