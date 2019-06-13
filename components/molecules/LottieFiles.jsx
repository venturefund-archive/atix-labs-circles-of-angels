/**
 * AGPL LICENSE
 * Circle of Angels aims to democratize social impact financing.
 * It facilitate the investment process by utilizing smart contracts to develop impact milestones agreed upon by funders and the social entrepenuers.
 *
 * Copyright (C) 2019 AtixLabs, S.R.L <https://www.atixlabs.com>
 */

import React from 'react';
import Lottie from 'react-lottie';

class LottieFiles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { animationData, height, width } = this.props;
    const defaultOptions = {
      loop: true,
      autoplay: true,
      rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
      animationData
    };
    return (
      <div>
        <Lottie options={defaultOptions} height={height} width={width} />
      </div>
    );
  }
}
export default LottieFiles;
