import { baseUrl, headers } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _returnResponse(response) {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(`Произошла ошибка: ${response.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    }).then(this._returnResponse);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    })
      .then(this._returnResponse)
      .then((res) => {
        this.mainId = res._id;
        return res;
      });
  }

  changeUserInfo(data) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._returnResponse);
  }

  changeUserAvatar(data) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._returnResponse);
  }

  addCard(data) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._returnResponse);
  }

  likeCard(cardId, isLiked) {
    let method;
    isLiked ? (method = 'DELETE') : (method = 'PUT');
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: method,
      headers: this._headers,
    }).then(this._returnResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._returnResponse);
  }
}

export const api = new Api({ baseUrl, headers });