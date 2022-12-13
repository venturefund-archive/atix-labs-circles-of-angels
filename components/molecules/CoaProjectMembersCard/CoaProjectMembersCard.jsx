import { Avatar, Collapse } from 'antd';
import React from 'react';
import './coa-project-members-card.scss';

const { Panel } = Collapse;

const CustomCollapseHeader = ({ firstName, lastName, rol }) => {
  const customAvatarName = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  const randomAvatarColor = `#${((1<<24)*Math.random()|0).toString(16)}`;
  const name = `${firstName} ${lastName}`;
  return (
    <div className='m-coaProjectMembersCard__header'>
      <Avatar style={{ backgroundColor: randomAvatarColor }} size="large">
        {customAvatarName}
      </Avatar>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h5 className='m-coaProjectMembersCard__title'>{name}</h5>
        <h6 className='m-coaProjectMembersCard__subtitle'>{rol}</h6>
      </div>
    </div>
  );
};

export const CoaProjectMembersCard = ({ id, firstName, lastName, email, rol }) => (
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
        <div>
          <span className='m-coaProjectMembersCard__boldText'>Address: </span>
            0x3f427D8c5c1f48Fe6B65F80bBae8a49519E29316
        </div>
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
};
