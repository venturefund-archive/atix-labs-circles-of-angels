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
import { Icon } from 'antd';
import classNames from 'classnames';
import { CoaTextButton } from '../CoaTextButton/CoaTextButton';

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, removeUser } = useContext(UserContext);
  const { push } = useHistory();
  const { projectId } = useParams();

  return (
    <>
      <div className="navbar">
        <div className="mobile">
          <Icon type="menu" className="mobile__icon --blue" onClick={() => setIsNavOpen(true)} />
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
              {!!user && (
                <NavbarProfile user={user} removeUser={removeUser} projectId={projectId} />
              )}
              {!user && <NavbarLogin loginFn={() => push(`/${projectId}/login`)} />}
            </div>
          </div>
        </div>
      </div>
      <div
        className={classNames('mobile__menu', {
          '--visible': isNavOpen
        })}
      >
        <div className="mobile__menu__header">
          <Icon
            onClick={() => setIsNavOpen(false)}
            type="menu-fold"
            className="mobile__icon --blue"
          />
          <img src="/static/images/coa.svg" alt="coa" />
          <Icon type="close" onClick={() => setIsNavOpen(false)} className="mobile__icon --gray" />
        </div>
        <div className="mobile__menu__body">
          <ul>
            <li>
              <CoaTextButton
                onClick={user ? removeUser : () => push(`/${projectId}/login`)}
                className="mobile__menu__button"
              >
                {user ? 'Logout' : 'Login'}
              </CoaTextButton>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={classNames('mobile__overlay', {
          '--visible': isNavOpen
        })}
      ></div>
    </>
  );
};

export default Navbar;
