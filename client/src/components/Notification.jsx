import React from 'react';
import styled from '@emotion/styled';

const StyledText = styled.p`
  font-size: 15px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
  line-height: 24px;
`;

const Notification = ({ text }) => (
  <div>
    <StyledText>{text}</StyledText>
  </div>
);

export default Notification;
