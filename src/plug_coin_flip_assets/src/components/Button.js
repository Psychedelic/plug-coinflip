import React from 'react';
import clsx from 'clsx';
import '../../assets/main.css';

const Button = ({ value, onClick, disabled = false, border = true }) => {
  return (
    <div className="button-container" onClick={onClick}>
      { !disabled && (
        <div
          className={clsx(
            'button',
            'glitched delay-2',
            border && 'button-border'
          )}
        >
          {value}
        </div>
      )}
      <div
        className={clsx('button', disabled && 'button-disabled', border && 'button-border')}
        onClick={onClick}
      >
        {value}
      </div>
    </div>
  )
}

export default Button;
