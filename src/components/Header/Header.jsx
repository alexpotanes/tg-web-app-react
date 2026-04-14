import React from 'react';
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";
import {useVK} from "../../hooks/useVK";
import './Header.css';

const Header = () => {
  const {user, onClose} = useTelegram();
  const {isVK, close: vkClose} = useVK();

  const handleClose = isVK ? vkClose : onClose;

  return (
    <div className={'header'}>
      <Button onClick={handleClose}>Закрыть</Button>
      {!isVK && <span className={'username'}>{user?.username}</span>}
    </div>
  );
};

export default Header;
