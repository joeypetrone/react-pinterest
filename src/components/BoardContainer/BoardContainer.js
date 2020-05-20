import React from 'react';
import './BoardContainer.scss';
import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';

import Board from '../Board/Board';

class BoardContainer extends React.Component {
  state = {
    boards: [],
  }

  componentDidMount() {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('unable to get all boards: ', err));
  }

  render() {
    const { boards } = this.state;
    const makeBaords = boards.map((board) => <Board key={board.id} board={board}/>);

    return (
      <div className="BoardContainer">
        <h2>Boards</h2>
        <div className="d-flex flex-wrap">
          {makeBaords}
        </div>
      </div>
    );
  }
}

export default BoardContainer;
