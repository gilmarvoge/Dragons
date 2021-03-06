import React from 'react';
import './styles.css';

export default function Card(props: any) {
  const { name, type, date, onDetails, onEdit, onDelete } = props;

  return (
    <div className='dragon_card' id='ave'>
      <div className='info_section'>
        <div className='dragon_header'>
          <h1>{name}</h1>
          <h4>{type}</h4>
          {date && <span className='date'>{date}</span>}
        </div>
        <div className='dragon_actions'>
          <ul>
            {onDetails && <li><i onClick={onDetails}>Details</i></li>}
            {onEdit && <li><i onClick={onEdit}>Edit</i></li>}
            {onDelete && <li><i onClick={onDelete}>Delete</i></li>}
          </ul>
        </div>
      </div>
      <div className='blur_back ave_back'></div>
    </div>
  );
}
