const tg = window.Telegram?.WebApp ?? {
  ready: () => {},
  close: () => {},
  sendData: () => {},
  onEvent: () => {},
  offEvent: () => {},
  MainButton: { setParams: () => {}, show: () => {}, hide: () => {}, isVisible: false },
  initDataUnsafe: {},
};

export function useTelegram() {

  const onClose = () => {
    tg.close()
  }

  const onToggleButton = () => {
    if(tg.MainButton.isVisible) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
    }
  }

  return {
    onClose,
    onToggleButton,
    tg,
    user: tg.initDataUnsafe?.user,
    queryId: tg.initDataUnsafe?.query_id,
    initData: tg.initData,
  }
}