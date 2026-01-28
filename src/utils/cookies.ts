export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'),
  );
  return matches && matches[1] ? decodeURIComponent(matches[1]) : null;
}

export function setCookie(
  name: string,
  value: string,
  options: {
    path?: string;
    domain?: string;
    expires?: Date | string;
    maxAge?: number;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  } = {},
): void {
  if (typeof document === 'undefined') {
    return;
  }

  const defaultOptions = {
    path: '/',
    ...options,
  };

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (defaultOptions.path) {
    cookieString += `; path=${defaultOptions.path}`;
  }

  if (defaultOptions.domain) {
    cookieString += `; domain=${defaultOptions.domain}`;
  }

  if (defaultOptions.expires) {
    const expires =
      defaultOptions.expires instanceof Date
        ? defaultOptions.expires
        : new Date(defaultOptions.expires);
    cookieString += `; expires=${expires.toUTCString()}`;
  }

  if (defaultOptions.maxAge !== undefined) {
    cookieString += `; max-age=${defaultOptions.maxAge}`;
  }

  if (defaultOptions.secure) {
    cookieString += '; secure';
  }

  if (defaultOptions.sameSite) {
    cookieString += `; samesite=${defaultOptions.sameSite}`;
  }

  document.cookie = cookieString;
}

export function removeCookie(
  name: string,
  options: {
    path?: string;
    domain?: string;
  } = {},
): void {
  setCookie(name, '', {
    ...options,
    maxAge: -1,
  });
}
