import React from 'react';
import * as FaIcons from 'react-icons/fa';

const links = [
  {
    id: 1,
    title: 'CLASSES',
    path: '/',
  },
  {
    id: 2,
    title: 'ADD CLASS',
    path: 'add-class',
  },
  {
    id: 3,
    title: 'RESERVATIONS',
    path: 'reservations',
  },
  {
    id: 4,
    title: 'SIGNUP',
    path: 'signup',
  },
];

export default links;

export const logos = [
  { id: 1, icon: <FaIcons.FaTwitter /> },
  { id: 2, icon: <FaIcons.FaFacebook /> },
  { id: 3, icon: <FaIcons.FaGooglePlus /> },
  { id: 4, icon: <FaIcons.FaVimeo /> },
  { id: 5, icon: <FaIcons.FaPinterest /> },
];
