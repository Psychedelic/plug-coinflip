import React from 'react';
import clsx from 'clsx';
import '../../assets/main.css';

const Button = ({ value, onClick, disabled = false, border = true }) => {
  const handleClick = () => {
    if (!disabled) onClick();
  }

  return (
    <div className="button-container" onClick={handleClick}>
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
      >
        {value}
      </div>
    </div>
  )
}

export default Button;
