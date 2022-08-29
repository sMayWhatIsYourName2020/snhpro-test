// export const base = 'http://cors-anywhere.herokuapp.com/https://test-api.misaka.net.ru/api/';
export const base = 'https://test-api.misaka.net.ru/api/';

const routes = {
  getOrCreateNotes: (id: string) => `${base}Folders/${id}/notes`,
  updateOrDeleteNote: (id: string) => `${base}Notes/${id}`,
  login: () => `${base}Account/login`,
  register: () => `${base}Account/register`,
  refreshToken: () => `${base}Account/refresh-token`,
  getUserInfo: () => `${base}Account/user`
}

export default routes;