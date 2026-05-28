import React from 'react';
import styled from 'styled-components';

interface Step {
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

interface ProgressBarProps {
  steps: Step[];
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps }) => {
  return (
    <Container>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <StepContainer>
            <StepCircle isActive={step.isActive} isCompleted={step.isCompleted}>
              {step.isCompleted ? '✔' : index + 1}
            </StepCircle>
            <StepLabel isActive={step.isActive}>{step.label}</StepLabel>
          </StepContainer>
          {index < steps.length - 1 && <StepSeparator />}
        </React.Fragment>
      ))}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: flex;
  align-items: center;
`;

const StepContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const StepCircle = styled.div<{ isActive: boolean; isCompleted: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ isCompleted, isActive }) =>
    isCompleted ? '#ffffff' : isActive ? '#ff9800' : '#e0e0e0'};
  color: ${({ isCompleted, isActive }) =>
    isCompleted || isActive ? '#ffffff' : '#9e9e9e'};
  font-weight: bold;
  border: 1px solid ${({ isActive }) => (isActive ? '#ff9800' : '#e0e0e0')};
`;

const StepLabel = styled.span<{ isActive: boolean }>`
  margin-top: 8px;
  font-size: 14px;
  color: ${({ isActive }) => (isActive ? '#000000' : '#9e9e9e')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
`;

const StepSeparator = styled.div`
  width: 50px;
  height: 2px;
  background-color: #e0e0e0;
  margin: 0 8px;

  &:last-child {
    margin: 0;
  }
`;

export default ProgressBar;
