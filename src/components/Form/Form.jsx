import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
  const [articles, setArticles] = useState(''); // Кол-во артикулов
  const [photo, setPhoto] = useState(''); // Кол-во фото
  const [fashion, setFashion] = useState(''); // Есть ли пожелания по фону или образу?
  const [product, setProduct] = useState(''); // Какой товар?
  const [references, setReferences] = useState(''); // Если есть ссылки на референсы - прикрепите.
  const [hair, setHair] = useState(''); // волосы модели
  const [race, setRace] = useState(''); // расса модели
  const [productImg, setProductImg] = useState(''); // Фото товара
  const [acceptResult, setAcceptResult] = useState(false);
  const [acceptQuantity, setAcceptQuantity] = useState(false);

  const {tg, queryId} = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      articles,
      photo,
      fashion,
      product,
      references,
      hair,
      race,
      productImg,
      queryId,
      acceptResult,
      acceptQuantity
    }

    tg.sendData(JSON.stringify(data));
    // fetch('https://tg-web-app-kyz.netlify.app:8000/web-data', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(data)
    // })
  }, [
    articles,
    photo,
    fashion,
    product,
    references,
    hair,
    race,
    productImg,
    queryId,
    acceptResult,
    acceptQuantity
  ]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({
      text: 'Отправить'
    })
  }, []);

  useEffect(() => {
    if (articles && photo && acceptResult && acceptQuantity) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [articles, photo, acceptResult, acceptQuantity])

  const onChangeArticles = (e) => {
    setArticles(e.target.value)
  }

  const onChangePhoto = (e) => {
    setPhoto(e.target.value)
  }

  const onChangeFashion = (e) => {
    setFashion(e.target.value)
  }

  const onChangeProduct = (e) => {
    setProduct(e.target.value)
  }

  const onChangeReferences = (e) => {
    setReferences(e.target.value)
  }

  const onChangeHair = (e) => {
    setHair(e.target.value)
  }

  const onChangeRace = (e) => {
    setRace(e.target.value)
  }

  const onChangeProductImg = (e) => {
    setProductImg(e.target.value)
  }

  const onChangeAcceptResult = (e) => {
    setAcceptResult(!acceptResult)
  }

  const onChangeAcceptQuantity = (e) => {
    setAcceptQuantity(!acceptQuantity)
  }


  return (
    <div className={"form"}>
      <h3>Введите данные для подчсета суммы</h3>
      <label className="label">
        <p>Количество артикулов</p>
        <input
          className="input"
          type="number"
          placeholder="Количество артикулов"
          value={articles}
          onChange={onChangeArticles}
          required
        />
      </label>
      <label className="label">
        <p>Количество фотографий в артикуле</p>
        <input
          className="input"
          type="number"
          placeholder="Количество фотографий в артикуле"
          value={photo}
          onChange={onChangePhoto}
          required
        />
      </label>
      <label className="label">
        <p>Есть ли пожелания по фону или образу?</p>
        <textarea
          className="input"
          rows="5"
          cols="10"
          placeholder="Опишите пожелания по фону и образу для каждого артикула в виде:
          1. Пожелания для первого артикула,
          2. Пожелания для вторго артикула"
          value={fashion}
          onChange={onChangeFashion}
          required
        />
      </label>
      <label className="label">
        <p>Какой товар?</p>
        <textarea
          className="input"
          rows="5"
          cols="10"
          placeholder="Опишите товар по каждому артикулу в виде:
          1. Описание для первого артикула,
          2. Описание для вторго артикула"
          value={product}
          onChange={onChangeProduct}
          required
        />
      </label>
      <label className="label">
        <p>Если есть ссылки на референсы - прикрепите.</p>
        <textarea
          className="input"
          rows="5"
          cols="10"
          placeholder="Перечислите ссылки на референсы по каждому артикулу в виде:
          1. ссылка на фото референса для первого артикула, ссылка на фото референса для первого артикула
          2. ссылка на фото референса для вторго артикула"
          value={references}
          onChange={onChangeReferences}
        />
      </label>
      <label className="label">
        <p>Волосы модели</p>
        <textarea
          className="input"
          rows="5"
          cols="10"
          placeholder="Перечислите волосы моделии по каждому артикулу в виде:
          1. Волосы модели для первого артикула,
          2. Волосы модели для вторго артикула"
          value={hair}
          onChange={onChangeHair}
          required
        />
      </label>
      <label className="label">
        <p>Расса модели</p>
        <textarea
          className="input"
          rows="5"
          cols="10"
          placeholder="Перечислите рассу модели по каждому артикулу в виде:
          1. Расса модели для первого артикула,
          2. Расса модели для вторго артикула"
          value={race}
          onChange={onChangeRace}
          required
        />
      </label>
      <label className="label">
        <p>Ссылка на фото товара или сам товар</p>
        <textarea
          className="input"
          rows="5"
          cols="10"
          placeholder="Перечислите примеры фото по каждому артикулу в виде:
          1. ссылка на фото для первого артикула, ссылка на фото для первого артикула
          2. ссылка на фото для вторго артикула"
          value={productImg}
          onChange={onChangeProductImg}
        />
      </label>

      <label className="label">
        <span>Я подтверждаю что мои фото сделаны качественно, текстуру видно хорошо, фон однородный.  Чем лучше исходник - тем точнее результат.</span>
        <input
          className="checkbox"
          type="checkbox"
          checked={acceptResult}
          onChange={onChangeAcceptResult}
          name="acceptResult"
          required
        />
      </label>
      <label className="label">
        <span>Я осведомлен с тем, что фото и артикулы с большим кол-вом деталей, сложными принтами- не будут переданы в точности.</span>
        <input
          className="checkbox"
          type="checkbox"
          checked={acceptQuantity}
          onChange={onChangeAcceptQuantity}
          name="acceptQuantity"
          required
        />
      </label>
    </div>
  );
};

export default Form;