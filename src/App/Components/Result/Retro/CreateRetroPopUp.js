import React from 'react';
import propTypes from 'prop-types';
import {MINIMUM_VOTES} from './constants';

require('./Retros.css');

export class CreateRetroPopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', maximumVote: MINIMUM_VOTES};
    this.handleRetroName = this.handleRetroName.bind(this);
    this.handleMaximumVote = this.handleMaximumVote.bind(this);
    this.createRetro = this.createRetro.bind(this);
  }

  handleRetroName(name) {
    this.setState({name: name});
  }

  handleMaximumVote(maximumVote) {
    this.setState({maximumVote: maximumVote});
  }

  createRetro() {
    this.props.createRetro({
      name: this.state.name,
      maximumVote: this.state.maximumVote,
    });
    this.setState({name: '', maximumVote: MINIMUM_VOTES});
  }

  render() {
    return (
        <div className='retro-pop-up-container'>
          <div id='create-retro-container-id' className='create-retro-container'>
            <div className={'retro-button-container'}>
              <input className={'retro-creation-input'}
                     id={'create-retro-name'}
                     onChange={
                       (event) => this.handleRetroName(event.target.value)}
                     value={this.state.name}
              />
              <input className={'maximum-vote-count'}
                     id={'create-retro-maximum-vote-count'}
                     onChange={
                       (event) => this.handleMaximumVote(event.target.value)}
                     value={this.state.maximumVote}
              />
              <div className='create-retro-buttons-container'>
                <button id='create-retro-button-id'
                        className='create-retro-button'
                        type='button'
                        onClick={this.createRetro}
                >
                  Create Retro
                </button>
                <button id='cancel-create-retro-button-id'
                        className='create-retro-button'
                        onClick={this.props.closeCreatePopUp}
                        type='button'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>);
  }
}

CreateRetroPopUp.propTypes = {
  retros: propTypes.array,
  closeCreatePopUp: propTypes.func.isRequired,
  createRetro: propTypes.func.isRequired,
};
