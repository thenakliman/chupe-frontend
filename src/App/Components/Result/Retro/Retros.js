import React from 'react';
import propTypes from 'prop-types';

require('./Retro.css');

export class Retros extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.getAllRetros();
    }

    viewRetro(id) {
    }

    render() {
      return (
      <div id='retro-container-id' className='retro-container'>
          <div className='retro-button-container'>
              <button id='retro-button-id'
                className='retro-button'
                type='button'
              >
                Create Retro
              </button>
          </div>
          <div>
            <table id='all-retros-ordered-list'>
              <thead>
                <tr className='retro-table-header'>
                  <th> Id </th>
                  <th> Name </th>
                  <th> Created By </th>
                  <th> Maximum Vote </th>
                </tr>
              </thead>
              <tbody id='all-retro-table-body-id'>
              {
                this.props.retros.map((retro) =>(
                  <tr key={`${retro.id}`}>
                    <td> {retro.id} </td>
                    <td className='retro-row'
                        onClick={() => this.viewRetro(retro.id)}
                    >
                            {retro.name}
                    </td>
                    <td> {retro.createdBy}</td>
                    <td> {retro.maximumVote}</td>
                  </tr>
                ))
              }
              </tbody>
            </table>
          </div>
      </div>
      );
    }
}

Retros.propTypes = {
  retros: propTypes.array,
  getAllRetros: propTypes.func.isRequired,
};
