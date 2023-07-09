import React from 'react';
import IL from '../images/IL.jpg';
import Australia from '../images/Australia.jpg';
import Brazil from '../images/Brazil.jpg';
import GER from '../images/GER.jpg';
import Italy from '../images/Italy.jpg';
import JP from '../images/JP.jpg';
import Singapore from '../images/Singapore.jpg';
import UK from '../images/UK.jpg';
import USA from '../images/USA.jpg';
import GLOBAL from '../images/GLOBAL.jpg';

const Banner = ({ country }) => {
  let image = GLOBAL;

  switch (country) {
    case '428ece74-5fa0-4b99-8321-342abd90101c':
      image = IL;
      break;
    case '1fe9aad8-6203-42e6-8c27-3d18d96343f9':
      image = USA;
      break;
    case 'd39f34a0-5c06-43fc-9cdd-bb0409e441a2':
      image = UK;
      break;
    case 'cfc0de37-6e41-4022-97f4-e6297d832d10':
      image = GER;
      break;
    case '2de52073-3ca0-4c75-a568-73ba2e6346ad':
      image = JP;
      break;
    case 'ba00a0df-433c-4ea1-b97a-980756727513':
      image = Singapore;
      break;
    case '7b5b0d36-b0a8-4c3d-b11c-62f78c3bfda1':
      image = Italy;
      break;
    case 'ef885505-932a-4ba0-9516-2686eadb0c32':
      image = Brazil;
      break;
    case '5d7760ae-56a3-4e9c-9173-a9bfd43388a9':
      image = Australia;
      break;
    case '5d7g760ae-56a3-4e9c-9173-a9bfd43388a9':
      image = Australia;
      break;
    default:
      image = GLOBAL;
      break;
  }

  return image !== GLOBAL ? (
    <div
      className="card"
      style={{
        background: `url(${image})`,
        height: '190px',
        width: '108%',
        marginLeft: '-47px',
        marginBottom: '30px',
        marginTop: '-70px',
      }}
    />
  ) : (
    <div
      className="card"
      style={{
        background: `url(${image})`,
        height: '166.5px',
        width: '108%',
        marginLeft: '-47px',
        marginBottom: '30px',
        marginTop: '-55px',
      }}
    />
  );
};

export default Banner;
