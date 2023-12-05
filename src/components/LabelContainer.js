import React from 'react';

export const LabelContainer = ({ children, text, onClick = () => {} }) => (
    <div className="flex items-center justify-center gap-x-5" onClick={onClick}>
      <span>{children}</span>
      <span className="capitalize">{text}</span>
    </div>
  );
