export const isBrowserSupported = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();

  // iOS Safari または Android Chrome のみ対応
  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);
  const isChrome = /chrome/.test(ua);
  const isSafari = /safari/.test(ua) && !/chrome/.test(ua);

  return (isIOS && isSafari) || (isAndroid && isChrome);
};

export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  return {
    userAgent: ua,
    isIOS: /iphone|ipad|ipod/i.test(ua),
    isAndroid: /android/i.test(ua),
    isMobile: /mobile/i.test(ua),
  };
};

export const hasWebGL = (): boolean => {
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};
