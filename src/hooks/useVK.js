const vkBridge = window.vkBridge;
const VK_GROUP_ID = parseInt(process.env.REACT_APP_VK_GROUP_ID || '0');

export function useVK() {
  const isVK = !!vkBridge;

  // Запрашивает у пользователя разрешение получать сообщения от сообщества.
  // Нужно вызвать один раз при открытии Mini App.
  const allowMessages = async () => {
    if (!vkBridge || !VK_GROUP_ID) return;
    try {
      await vkBridge.send('VKWebAppAllowMessagesFromGroup', { group_id: VK_GROUP_ID });
    } catch (e) {
      // пользователь отказал или уже разрешено — не критично
    }
  };

  const getUserId = async () => {
    if (vkBridge) {
      const data = await vkBridge.send('VKWebAppGetUserInfo');
      return data.id;
    }
    // Fallback: VK Mini App передаёт vk_user_id в URL-параметрах
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('vk_user_id') || '0');
  };

  const close = () => {
    if (vkBridge) vkBridge.send('VKWebAppClose', { status: 'success' });
  };

  const sendData = async (data) => {
    if (!isVK || !VK_GROUP_ID) return false;
    await vkBridge.send('VKWebAppSendPayload', {
      group_id: VK_GROUP_ID,
      payload: JSON.stringify(data),
    });
    return true;
  };

  return { sendData, isVK, close, allowMessages };
}
