function getCookieValue(cookieName) {
    const cookieString = document.cookie;
    const cookies = cookieString.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(cookieName + "=")) {
        const cookieValue = cookie.substring(cookieName.length + 1);
        return decodeURIComponent(cookieValue);
      }
    }

    return null;
  }
export function savedCookie(){
    const cookieName = "userToken";
    const savedCookieValue = getCookieValue(cookieName);
    return savedCookieValue;
}
  