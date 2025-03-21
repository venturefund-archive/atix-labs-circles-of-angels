/* eslint-disable
 jsx-a11y/anchor-is-valid,
 jsx-a11y/click-events-have-key-events,
 jsx-a11y/no-static-element-interactions
*/

import React, { useContext, useState } from 'react';
import { UserContext } from 'components/utils/UserContext';
import { useHistory, useParams } from 'react-router';
import './_style.scss';
import NavbarLogin from 'components/molecules/NavbarLogin/NavbarLogin';
import { Icon } from 'antd';
import classNames from 'classnames';
import customConfig from 'custom-config';
import { CoaNavbarProfile } from 'components/molecules/CoaNavbarProfile/CoaNavbarProfile';
import { checkRoleByProject } from 'helpers/roles';
import { CoaTextButton } from '../CoaTextButton/CoaTextButton';

const Navbar = ({ project, isProtectedRoute }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { user, removeUser } = useContext(UserContext);
  const { push } = useHistory();
  const { projectId } = useParams();

  const role = checkRoleByProject({ user, project });

  return (
    <>
      <div className="navbar">
        <div className="mobile">
          <Icon type="menu" className="mobile__icon --blue" onClick={() => setIsNavOpen(true)} />
          <div className="navbar__logo--mobile">
            <img src={customConfig.LARGE_LOGO_PATH_SVG} alt="coa" />
          </div>
        </div>

        <div className="desktop">
          <div className="navbar__logo--desktop">
            <img src={customConfig.LARGE_LOGO_PATH_SVG} alt="coa" />
          </div>

          <div className="navbar__right">
            {!!user && (
              <div className="navbar__right__icon">
                <img src="/static/images/bell.svg" alt="bell" />
              </div>
            )}
            <div className="navbar__right__items">
              {!!user && (
                <CoaNavbarProfile
                  user={user}
                  removeUser={removeUser}
                  projectId={projectId}
                  role={role?.name}
                  isProtectedRoute={isProtectedRoute}
                />
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
          <img src={customConfig.LOGO_PATH} alt="coa" />
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
