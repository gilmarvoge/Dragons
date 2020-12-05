import React from 'react';
import './styles.css';

export default function Forms(props: any) {
  const { children } = props;

  return (
    <div id='form' >
      {children}
    </div>
  );
}
