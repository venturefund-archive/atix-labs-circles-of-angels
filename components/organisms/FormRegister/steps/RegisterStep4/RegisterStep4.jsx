/**
 * AGPL License
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import { Row, Col, Popover } from 'antd';
import { CopyFilled } from '@ant-design/icons';
import '../_style4.scss';
import { useHistory } from 'react-router';
import SecurityKey from '../../../../molecules/SecurityKeySection/SecurityKeySection';
import CustomButton from '../../../../atoms/CustomButton/CustomButton';

export default function RegisterStep4(props) {
  const history = useHistory();
  const { wallet, goToLanding, data } = props;

  const mnemonicWords = () => {
    const mnemonics = wallet.mnemonic.split(' ');
    return mnemonics;
  };

  const copyToClipboard = mnemonicWords => {
    if (wallet) {
      const words = mnemonicWords;
      navigator.clipboard.writeText(words);
    }
  };

  return (
    <div className="RegisterStep4">
      <div className="InfoStep">
        <img
          src="./static/images/icon-users-small.svg"
          alt="Circles of Angels"
        />
        <h1>Congratulations</h1>
        <h2> Hello {data.role.value}!</h2>
        <p>
          Continue discovering the Circles of Angels platform while
          administration confirm your account
        </p>
      </div>
      <div className="StepPersonalInformation">
        <Row className="FormRegister" gutter={26} type="flex" justify="center">
          <Col className="gutter-row BlockCongrats BlockKeyWords" span={20}>
            <div className="SubtitleSection">
              <img src="./static/images/password-lock.svg" alt="password" />
              <h2>Please keep your security key safe!</h2>
            </div>
            <p>
              This keywords will guarantee your access to your account at any
              time
            </p>
            <SecurityKey words={mnemonicWords()} />
            <Popover content="Copied" trigger="click">
              <CustomButton
                theme={'Alternative'}
                buttonText={'Copy security Key'}
                onClick={() => copyToClipboard(wallet.mnemonic)}
              />
            </Popover>
            <CustomButton
              theme={'Primary'}
              buttonText={'Finish!'}
              onClick={goToLanding}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
}
