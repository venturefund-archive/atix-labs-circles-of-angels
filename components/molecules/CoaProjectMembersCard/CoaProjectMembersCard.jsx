import { Collapse } from 'antd';
import React from 'react';
import './coa-project-members-card.scss';
import { Link } from 'react-router-dom';
import { DictionaryContext } from 'components/utils/DictionaryContext';
import { CoaUserAvatar } from '../../atoms/CoaUserAvatar/CoaUserAvatar';

const { Panel } = Collapse;

const CustomCollapseHeader = ({ firstName, lastName, rol }) => {
  const fullName = `${firstName} ${lastName}`;
  return (
    <div className='m-coaProjectMembersCard__header'>
      <CoaUserAvatar firstName={firstName} lastName={lastName}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h5 className='m-coaProjectMembersCard__title'>{fullName}</h5>
        <h6 className='m-coaProjectMembersCard__subtitle'>{rol}</h6>
      </div>
    </div>
  );
};

export const CoaProjectMembersCard = ({ id, firstName, lastName, email, rol, address }) => {
  const { texts } = React.useContext(DictionaryContext);
  return (
    <div>
      <Collapse bordered={false} expandIconPosition='right' className='m-coaProjectMembersCard'>
        <Panel
          header={
            <CustomCollapseHeader firstName={firstName} lastName={lastName} rol={rol}/>
          }
          key={id}
          style={{ border: 0 }}
        >
          <div className='m-coaProjectMembersCard__extraInfo'>
            <div>
              <span className='m-coaProjectMembersCard__boldText'>{texts?.landingProjectMembers?.email || 'Email:'}&nbsp;</span>
              {email}
            </div>
            {
              address && <div className="m-coaProjectMembersCard__addressContainer">
                <span className='m-coaProjectMembersCard__boldText'>{texts?.landingProjectMembers?.address || 'Address:'}&nbsp;</span>
                <Link
                  to={{ pathname: `https://etherscan.io/address/${address}` }}
                  target="_blank"
                  className="m-coaProjectMembersCard__addressContainer__link"
                >
                  {address}
                </Link>
              </div>
            }
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

CoaProjectMembersCard.defaultProps = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  rol: undefined,
  address: undefined,
};
