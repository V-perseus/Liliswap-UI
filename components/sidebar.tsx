import React, { useState } from 'react';

function Sidebar() {

  const [collapse, setCollapse] = useState(false)

  const handleCollapse = (): void => {
    setCollapse(!collapse)
  };

  const handleCollapseClass = (): string => {
    if (collapse) {
      return 'collapsed'
    } else {
      return ''
    }
  }

  return (
    <></>
  );
}

export default Sidebar;