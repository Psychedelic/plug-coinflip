import React from 'react';
import clsx from 'clsx';
import '../../assets/main.css';

const Button = ({ value, onClick, border = true }) => {
  return (
    <div className={clsx('button', border && 'button-border')} onClick={onClick}>{value}</div>
  )
}

export default Button;