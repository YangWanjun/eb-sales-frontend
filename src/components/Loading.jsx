import React from 'react';
import {
  CircularProgress,
  Modal,
} from '@material-ui/core';

const circleSize = 64;

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `calc(${top}% - ${circleSize}px)`,
    left: `calc(${left}% - ${circleSize}px)`,
    // transform: `translate(-${top}%, -${left}%)`,
    position: 'absolute',
  };
}

export default class Loading extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.loading !== this.state.open) {
      this.setState({
        open: nextProps.loading,
      })
    }
  }

  render () {
    const { open } = this.state;

    return (
      <div>
        <Modal
          open={open}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          BackdropProps={{style: {opacity: "0.5"}}}
        >
          <div style={getModalStyle()}>
            <CircularProgress size={circleSize} />
          </div>
        </Modal>
      </div>
    );
  }
}