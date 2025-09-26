import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
  const [articles, setArticles] = useState('');
  const [photo, setPhoto] = useState('');
  const {tg, queryId} = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      articles,
      photo,
      queryId,
    }

    fetch('https://tg-web-app-kyz.netlify.app:8000/web-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  }, [articles, photo])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData])

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить'
    })
    tg.MainButton.show();
  }, [])

  const onChangeArticles = (e) => {
    setArticles(e.target.value)
  }

  const onChangePhoto = (e) => {
    setPhoto(e.target.value)
  }

  return (
    <div className={"form"}>
      <h3>Введите данные для подчсета суммы</h3>
      <input
        className="input"
        type="number"
        placeholder="Количество артикулов"
        value={articles}
        onChange={onChangeArticles}
      />
      <input
        className="input"
        type="number"
        placeholder="Количество фотографий в артикуле"
        value={photo}
        onChange={onChangePhoto}
      />
    </div>
  );
};

export default Form;