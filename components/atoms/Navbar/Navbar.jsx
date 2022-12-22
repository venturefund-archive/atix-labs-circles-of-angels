/* eslint-disable
 jsx-a11y/anchor-is-valid,
 jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-static-element-interactions
*/

import React, { useContext, useState } from 'react';
import { UserContext } from 'components/utils/UserContext';
import { useHistory, useParams } from 'react-router';
import './_style.scss';
import NavbarProfile from 'components/molecules/NavbarProfile/NavbarProfile';
import NavbarLogin from 'components/molecules/NavbarLogin/NavbarLogin';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, removeUser } = useContext(UserContext);
  const { push } = useHistory();
  const { projectId } = useParams();

  return (
    <div className="navbar">
      <div className="mobile">
        <div className="hamburger-icon" onClick={() => setIsNavOpen(prev => !prev)}>
          <div className={`icon-1 ${isNavOpen ? 'a' : ''}`}></div>
          <div className={`icon-2 ${isNavOpen ? 'c' : ''}`}></div>
          <div className={`icon-3 ${isNavOpen ? 'b' : ''}`}></div>
          <div className="clear"></div>
        </div>
        <div className="navbar__logo--mobile">
          <img src="/static/images/coa.svg" alt="coa" />
        </div>
      </div>

      <div className="desktop">
        <div className="navbar__logo--desktop">
          <img src="/static/images/desktop-logo.svg" alt="desktopCOA" />
        </div>

        <div className="navbar__right">
          {!!user && (
            <div className="navbar__right__icon">
              <img src="/static/images/bell.svg" alt="bell" />
            </div>
          )}
          <div className="navbar__right__items">
            {!!user && <NavbarProfile user={user} removeUser={removeUser} projectId={projectId} />}
            {!user && <NavbarLogin loginFn={() => push(`/${projectId}/login`)} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
