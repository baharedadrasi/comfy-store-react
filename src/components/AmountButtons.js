import React from 'react';
import styled from 'styled-components';
import { FaPlus, FaMinus } from 'react-icons/fa';

const AmountButtons = ({ stock }) => {
  const [amount, setAmount] = React.useState(1);

  const changeAmount = (type) => {
    setAmount((oldAmount) => {
      let newAmount;
      if (type === 'inc') {
        newAmount = oldAmount + 1;
        if (newAmount <= stock) {
          return newAmount;
        } else {
          return stock;
        }
      }
      if (type === 'dec') {
        newAmount = oldAmount - 1;
        if (newAmount <= 1) {
          return 1;
        } else {
          return newAmount;
        }
      }
    });
  };
  return (
    <Wrapper className="amount-btns">
      <button onClick={() => changeAmount('dec')}>
        <FaMinus />
      </button>
      <h2 className="amont">{amount}</h2>
      <button onClick={() => changeAmount('inc')}>
        <FaPlus />
      </button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  h2 {
    margin-bottom: 0;
  }
`;

export default AmountButtons;
