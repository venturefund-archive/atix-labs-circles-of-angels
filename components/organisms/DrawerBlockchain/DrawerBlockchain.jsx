import React from 'react';
import { Drawer, Button } from 'antd';
import CustomButton from '../../atoms/CustomButton/CustomButton';
import ItemBlockchain from '../../atoms/ItemBlockchain/ItemBlockchain';
import { userAvatarPropTypes } from '../../../helpers/proptypes';
import './_style.scss';


class DrawerBlockchain extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          Open
        </Button>
        <Drawer
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          className="DrawerBlockchain"
          width="350"
        >
          <div>
            <img className="TitleImage" src="/static/images/blockchain.svg" />
            <h1>This project was saved on the <b>Blockchain</b></h1>
            <div className="BlockContainer">
              <ItemBlockchain 
                image= "/static/images/icon-date.svg" 
                label="Creation Date" 
                info="14/03/2020" />
              <ItemBlockchain 
                image= "/static/images/icon-block.svg" 
                label="Block Number" 
                link="69,818" />
              <ItemBlockchain 
                image= "/static/images/icon-number.svg" 
                label="Project Address" 
                link="0x8e19747326a8f0b46056a09330a..." />
              <ItemBlockchain 
                image= "/static/images/icon-transaction.svg"
                label="Transaction Númber" 
                link="0x8e19747326a8f0b0a09330a..." />
              <ItemBlockchain 
                image= "/static/images/icon-agreement.svg" 
                label="Agreement" 
                info="Los acuerdos sobre los hitos, actividades y montos acordados 
                quedaron registrados de manera inalterable y pueden ser auditados desde este enlace" 
                link="AgreementLink" />
              </div>
            </div>
          <img src="/static/images/rsk.svg" />
        </Drawer>
      </div>
    );
  }
}

export default DrawerBlockchain;
