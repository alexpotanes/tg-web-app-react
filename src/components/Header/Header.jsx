import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import {useVK} from "../../hooks/useVK";
import './Header.css';

const Header = () => {
  const {user, onClose} = useTelegram();
  const {isVK} = useVK();

  if (isVK) return null;

  return (
    <div className={'header'}>
      <Button onClick={onClose}>Закрыть</Button>
      <span className={'username'}>{user?.username}</span>
    </div>
  );
};

export default Header;
