import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ startDate, length, id,deleteCard}) => {
  const handleDelete = () => {
    deleteCard(id);
  };

  return (
    <div className="col m3 s6">
      <div className="card">
        <div className="card-content">
          <span className="card-title">
          {length} 天
          </span>
          <div className="card-data">
            <span>自{startDate} 开始</span>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </div>
  );
};

Info.propTypes = {
  startDate: PropTypes.string,
  length: PropTypes.number,
};

export default Info;
