const vkBridge = window.vkBridge;
const VK_GROUP_ID = parseInt(process.env.REACT_APP_VK_GROUP_ID || '0');

export function useVK() {
  const isVK = !!vkBridge;

  const getGroupId = () => {
    if (VK_GROUP_ID) return VK_GROUP_ID;
    // Fallback: VK передаёт vk_group_id в URL при открытии Mini App внутри сообщества
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('vk_group_id') || '0');
  };

  // Запрашивает у пользователя разрешение получать сообщения от сообщества.
  // Нужно вызвать один раз при открытии Mini App.
  const allowMessages = async () => {
    const groupId = getGroupId();
    if (!vkBridge || !groupId) return;
    try {
      await vkBridge.send('VKWebAppAllowMessagesFromGroup', { group_id: groupId });
    } catch (e) {
      // пользователь отказал или уже разрешено — не критично
    }
  };

  const close = () => {
    if (vkBridge) vkBridge.send('VKWebAppClose', { status: 'success' });
  };

  // Отправляет данные формы напрямую в VK-бот через нативный механизм Mini App.
  // Бот получает событие app_payload → создаёт ссылку на оплату ЮKassa.
  const sendData = async (data) => {
    if (!isVK) return false;
    const groupId = getGroupId();
    if (!groupId) throw new Error('ID сообщества VK не настроен (REACT_APP_VK_GROUP_ID)');
    await vkBridge.send('VKWebAppSendPayload', {
      group_id: groupId,
      payload: JSON.stringify(data),
    });
    return true;
  };

  return { sendData, isVK, close, allowMessages };
}
