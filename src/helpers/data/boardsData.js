import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allBoardsObject = result.data;
      const boards = [];
      if (allBoardsObject !== null) {
        Object.keys(allBoardsObject).forEach((boardId) => {
          const newBoard = allBoardsObject[boardId];
          newBoard.id = boardId;
          boards.push(newBoard);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});

const getBoardByBoardId = (boardId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards/${boardId}.json`)
    .then((response) => {
      const board = response.data;

      resolve(board);
    })
    .catch((err) => reject(err));
});

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const addBoard = (newBoard) => axios.post(`${baseUrl}/boards.json`, newBoard);

export default {
  getBoardsByUid,
  getBoardByBoardId,
  deleteBoard,
  addBoard,
};
