import React, { useState, useEffect } from 'react';

export default function TwoColumns({ children, centerLeft, centerRight }) {
  const childrenArray = React.Children.toArray(children);
  const [isMobile, setIsMobile] = useState(false);

  // Gestione responsive via JS per azzerare i padding su mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 996); // Breakpoint standard Docusaurus
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getColumnStyle = (isCentered, isLeft) => ({
    paddingTop: !isMobile ? '0.75rem' : 0,
    paddingBottom: !isMobile ? '0.75rem' : 0,
    paddingRight: !isMobile && isLeft ? '0.5rem' : 0,
    paddingLeft: !isMobile && !isLeft ? '0.5rem' : 0,

    display: isCentered ? 'flex' : 'block',
    flexDirection: 'column',
    justifyContent: 'center',
  });

  return (
    <div className="row row--no-gutters">
      <div className="col col--6" style={getColumnStyle(centerLeft, true)}>
        {childrenArray[0]}
      </div>
      <div className="col col--6" style={getColumnStyle(centerRight, false)}>
        {childrenArray[1]}
      </div>
    </div>
  );
}
