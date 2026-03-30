const vkBridge = window.vkBridge;

export function useVK() {
  const isVK = !!vkBridge;

  const getGroupId = () => {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get('vk_group_id') || '0');
  };

  const sendData = (data) => {
    if (!vkBridge) return Promise.resolve(false);
    return vkBridge.send('VKWebAppSendPayload', {
      group_id: getGroupId(),
      payload: JSON.stringify(data),
    });
  };

  return { sendData, isVK };
}
