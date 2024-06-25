// ParentComponent.jsx
import React from 'react';

const ParentComponent = ({ children }) => {
  return (
    <div>
      <h1>Parent Component</h1>
      <div>{children}</div>
    </div>
  );
};

export default ParentComponent;
