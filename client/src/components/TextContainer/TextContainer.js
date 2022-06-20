import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

const TextContainer = ({ users }) => (
  <div className="textContainer">
    {
      users
        ? (
          <div>
            <h1>Pessoas Onlines:</h1>
            <div className="activeContainer">
              <h2>
                {users.map(({nome}) => (
                  <div key={nome} className="activeItem">
                    <img alt="Online Icon" src={onlineIcon}/>
                    {nome}
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;