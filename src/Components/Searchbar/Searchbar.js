import React from 'react';

export class Searchbar extends React.Component {
    state = {
        searchQuery: '',
    };

    handleInputValue = evt => {
        const { value } = evt.currentTarget;
        this.setState({
            searchQuery: value.toLowerCase(),
        });
    };

    handleSubmit = evt => {
        evt.preventDefault();

        if (this.state.searchQuery.trim() === '') {
            return;
        }
        this.props.onSubmit(this.state.searchQuery);
        this.resetForm();
    };

    resetForm = () => {
        this.setState({
            searchQuery: '',
        });
    };

    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>

                    <input
                        className="SearchForm-input"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.searchQuery}
                        onChange={this.handleInputValue}
                    />
                </form>
            </header>
        );
    }
}
