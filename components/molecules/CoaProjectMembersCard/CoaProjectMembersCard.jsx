import { Avatar, Collapse } from 'antd';
import React from 'react';
import './coa-project-members-card.scss';
import { Link } from 'react-router-dom';
import { stringToHexColor } from '../../../helpers/stringToHexColor';

const { Panel } = Collapse;

const CustomCollapseHeader = ({ firstName, lastName, rol }) => {
  const customAvatarName = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  const fullName = `${firstName} ${lastName}`;
  const avatarColor = stringToHexColor(fullName);
  return (
    <div className='m-coaProjectMembersCard__header'>
      <Avatar style={{ backgroundColor: avatarColor }} size="large">
        {customAvatarName}
      </Avatar>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h5 className='m-coaProjectMembersCard__title'>{fullName}</h5>
        <h6 className='m-coaProjectMembersCard__subtitle'>{rol}</h6>
      </div>
    </div>
  );
};

export const CoaProjectMembersCard = ({ id, firstName, lastName, email, rol, address }) => (
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
          <span className='m-coaProjectMembersCard__boldText'>Email: </span>
          {email}
        </div>
        {
          address && <div className="m-coaProjectMembersCard__addressContainer">
            <span className='m-coaProjectMembersCard__boldText'>Address:&nbsp;</span>
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
  );

CoaProjectMembersCard.defaultProps = {
  id: undefined,
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  rol: undefined,
  address: undefined,
};
