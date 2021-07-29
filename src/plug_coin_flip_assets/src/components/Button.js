import React from 'react';
import clsx from 'clsx';
import '../../assets/main.css';

const Button = ({ value, onClick, disabled = false, border = true }) => {
  return (
    <div
      className={clsx('button', disabled && 'button-disabled', border && 'button-border')}
      onClick={onClick}
    >
      {value}
    </div>
  )
}

export default Button;
