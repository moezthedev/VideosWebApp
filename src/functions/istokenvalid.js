export function isTokenValid() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('userToken=')) {
        return true;
      }
    }
    return false;
  }