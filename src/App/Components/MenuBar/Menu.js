import React from 'react';

require('./Menu.css');


/**
* User result component of the application.
*
* @author: thenakliman
*/
export class MenuBar extends React.Component {
    /**
    * User result component of the application.
    *
    * @return {Object} UserResult component.
    */
    render() {
        return (
            <div>
                <header id="chupe-header" className="Header">
                    <a href='#/users' id="users-tab" className='Tab'>
                         Users
                    </a>
                    <a href='#/questions' id="questions-tab" className='Tab'>
                         Questions
                    </a>
                </header>
            </div>
        );
    }
}
