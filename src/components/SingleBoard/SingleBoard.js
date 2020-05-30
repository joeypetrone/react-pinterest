import React from 'react';
import PropTypes from 'prop-types';

import './SingleBoard.scss';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';

import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    editPin: {},
    pins: [],
    formOpen: false,
  }

  getInfo = () => {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((request) => {
        const board = request.data;
        this.setState({ board });
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => this.setState({ pins }))
          .catch();
      })
      .catch((err) => console.error('unable to get single board: ', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  removePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => {
        this.getInfo();
      })
      .catch((err) => console.error('could not delete pin', err));
  }

  saveNewPin = (newPin) => {
    pinsData.savePin(newPin)
      .then(() => {
        this.setState({ formOpen: false });
        this.getInfo();
      })
      .catch((err) => console.error('unable to save new pin: ', err));
  }

  putPin = (pinId, updatePin) => {
    pinsData.updatePin(pinId, updatePin)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false, editPin: {} });
      })
      .catch((err) => console.error('unable to update pin', err));
  }

  editAPin = (pin) => {
    this.setState({ formOpen: true, editPin: pin });
  }

  render() {
    const { setSingleBoard, boardId } = this.props;
    const {
      board,
      pins,
      formOpen,
      editPin,
    } = this.state;

    const makePins = pins.map((p) => <Pin key={p.id} editAPin={this.editAPin} pin={p} removePin={this.removePin}/>);

    return (
      <div className="SingleBoard">
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}><i className="fas fa-times"></i></button>
        <h2>{board.name} Board</h2>
        <h3>{board.description}</h3>
        <button className="btn btn-danger" onClick={() => this.setState({ formOpen: true })}><i className="fas fa-plus"></i> Pin</button>
        { formOpen ? <PinForm boardId={boardId} saveNewPin={this.saveNewPin} pin={editPin} putPin={this.putPin}/> : '' }
        <div className="d-flex flex-wrap">
          {makePins}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
