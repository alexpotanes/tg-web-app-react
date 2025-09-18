import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
  const [articles, setArticles] = useState('');
  const [photo, setPhoto] = useState('');
  const [description, setDescription] = useState('');
  const {tg} = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      articles,
      photo,
      description
    }
    console.log(data);
    tg.sendData(JSON.stringify(data));
  }, [articles, photo, description])

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

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
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
        placeholder="Количество фотографий"
        value={photo}
        onChange={onChangePhoto}
      />
      <textarea
        className="input"
        name="Описание ТЗ"
        cols="30"
        rows="10"
        placeholder="Описание ТЗ"
        onChange={onChangeDescription}
        value={description}
      >
      </textarea>
    </div>
  );
};

export default Form;