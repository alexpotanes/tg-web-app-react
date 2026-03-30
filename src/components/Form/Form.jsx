import React, {useCallback, useEffect, useState} from 'react';
import './Form.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useVK} from "../../hooks/useVK";
import Button from "../Button/Button";

const Form = () => {
  const [email, setEmail] = useState('');
  const [articles, setArticles] = useState('');
  const [photo, setPhoto] = useState('');
  const [fashion, setFashion] = useState('');
  const [product, setProduct] = useState('');
  const [references, setReferences] = useState('');
  const [hair, setHair] = useState('');
  const [race, setRace] = useState('');
  const [productImg, setProductImg] = useState('');
  const [acceptResult, setAcceptResult] = useState(false);
  const [acceptQuantity, setAcceptQuantity] = useState(false);
  const [sent, setSent] = useState(false);

  const {tg, queryId} = useTelegram();
  const {sendData: vkSendData, isVK} = useVK();

  const isFormValid = articles && photo && acceptResult && acceptQuantity;

  const onSendData = useCallback(async () => {
    const data = {
      email, articles, photo, fashion, product,
      references, hair, race, productImg, queryId,
      acceptResult, acceptQuantity,
    };

    if (isVK) {
      await vkSendData(data);
      setSent(true);
    } else {
      tg.sendData(JSON.stringify(data));
    }
  }, [email, articles, photo, fashion, product, references, hair, race, productImg, queryId, acceptResult, acceptQuantity, tg, isVK, vkSendData]);

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData);
    return () => { tg.offEvent('mainButtonClicked', onSendData); };
  }, [onSendData]);

  useEffect(() => {
    tg.MainButton.setParams({ text: 'Отправить' });
  }, []);

  useEffect(() => {
    if (!isFormValid) { tg.MainButton.hide(); }
    else { tg.MainButton.show(); }
  }, [isFormValid]);

  if (sent) {
    return (
      <div className="form form--success">
        <div className="success-icon">✓</div>
        <h3>Данные отправлены!</h3>
        <p>Ожидайте ответа бота в VK.</p>
      </div>
    );
  }

  return (
    <div className="form">
      <div className="form-header">
        <h3>Заявка на фотосъёмку</h3>
        <p className="form-subtitle">Заполните форму для расчёта стоимости</p>
      </div>

      {/* Секция 1 */}
      <div className="form-section">
        <h4 className="section-title">
          <span className="section-num">1</span>
          Основная информация
        </h4>

        <label className="label">
          <p>Email <span className="hint">(для фискального чека)</span></p>
          <input
            className="input"
            type="email"
            placeholder="example@mail.ru"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <div className="row-fields">
          <label className="label">
            <p>Артикулов <span className="required">*</span></p>
            <input
              className="input"
              type="number"
              min="1"
              placeholder="0"
              value={articles}
              onChange={(e) => setArticles(e.target.value)}
              required
            />
          </label>
          <label className="label">
            <p>Фото на артикул <span className="required">*</span></p>
            <input
              className="input"
              type="number"
              min="1"
              placeholder="0"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              required
            />
          </label>
        </div>
      </div>

      {/* Секция 2 */}
      <div className="form-section">
        <h4 className="section-title">
          <span className="section-num">2</span>
          Детали заказа
        </h4>

        <label className="label">
          <p>Пожелания по фону и образу</p>
          <textarea
            className="input"
            rows="4"
            placeholder={"1. Пожелания для первого артикула\n2. Пожелания для второго артикула"}
            value={fashion}
            onChange={(e) => setFashion(e.target.value)}
          />
        </label>

        <label className="label">
          <p>Описание товара</p>
          <textarea
            className="input"
            rows="4"
            placeholder={"1. Описание первого артикула\n2. Описание второго артикула"}
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </label>

        <label className="label">
          <p>Ссылки на референсы</p>
          <textarea
            className="input"
            rows="3"
            placeholder={"1. Ссылки для первого артикула\n2. Ссылки для второго артикула"}
            value={references}
            onChange={(e) => setReferences(e.target.value)}
          />
        </label>
      </div>

      {/* Секция 3 */}
      <div className="form-section">
        <h4 className="section-title">
          <span className="section-num">3</span>
          Характеристики модели
        </h4>

        <label className="label">
          <p>Волосы модели</p>
          <textarea
            className="input"
            rows="3"
            placeholder={"1. Тип волос для первого артикула\n2. Тип волос для второго артикула"}
            value={hair}
            onChange={(e) => setHair(e.target.value)}
          />
        </label>

        <label className="label">
          <p>Раса модели</p>
          <textarea
            className="input"
            rows="3"
            placeholder={"1. Раса модели для первого артикула\n2. Раса модели для второго артикула"}
            value={race}
            onChange={(e) => setRace(e.target.value)}
          />
        </label>

        <label className="label">
          <p>Фото товара или ссылки на него</p>
          <textarea
            className="input"
            rows="3"
            placeholder={"1. Ссылки для первого артикула\n2. Ссылки для второго артикула"}
            value={productImg}
            onChange={(e) => setProductImg(e.target.value)}
          />
        </label>
      </div>

      {/* Секция 4 — подтверждения */}
      <div className="form-section form-section--confirm">
        <h4 className="section-title">
          <span className="section-num">4</span>
          Подтверждение
        </h4>

        <label className="label label--checkbox">
          <input
            className="checkbox"
            type="checkbox"
            checked={acceptResult}
            onChange={() => setAcceptResult(!acceptResult)}
          />
          <span>
            Мои фото сделаны качественно: текстура видна, фон однородный.
            Чем лучше исходник — тем точнее результат.
            <span className="required"> *</span>
          </span>
        </label>

        <label className="label label--checkbox">
          <input
            className="checkbox"
            type="checkbox"
            checked={acceptQuantity}
            onChange={() => setAcceptQuantity(!acceptQuantity)}
          />
          <span>
            Понимаю, что артикулы со сложными деталями и принтами
            не будут переданы в точности.
            <span className="required"> *</span>
          </span>
        </label>
      </div>

      {isVK && (
        <Button
          className={'submit-btn' + (!isFormValid ? ' submit-btn--disabled' : '')}
          onClick={onSendData}
          disabled={!isFormValid}
        >
          Отправить заявку
        </Button>
      )}

      {!isFormValid && (
        <p className="form-hint">
          Заполните обязательные поля <span className="required">*</span>
        </p>
      )}
    </div>
  );
};

export default Form;
