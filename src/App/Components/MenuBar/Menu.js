import React from 'react';
import propTypes from 'prop-types'

require("./Menu.css")


class MenuBar extends React.Component {
    render() {
        console.log(this.props);
        return (
            <div> <header id="chupe-header" className="Header" onClick={this.props.getUsers}> Users </header> </div>
        )
    }
}

MenuBar.propTypes = {
  getUsers: propTypes.func.isRequired
}

export default MenuBar;