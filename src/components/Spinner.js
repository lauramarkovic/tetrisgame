import React from 'react';

import { SpinnerContainer, SpinnerOverlay } from "./styles/StyledSpinner";

const Spinner = () => {
  return (
    <SpinnerOverlay>
      <SpinnerContainer />
    </SpinnerOverlay>
  )
};

export default Spinner;
