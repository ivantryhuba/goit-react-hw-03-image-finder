import React from 'react';

export class Modal extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = evt => {
        if (evt.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = evt => {
        if (evt.currentTarget === evt.target) {
            this.props.onClose();
        }
    };

    render() {
        return (
            <div className="Overlay" onClick={this.handleBackdropClick}>
                <div className="Modal">{this.props.children}</div>
            </div>
        );
    }
}
