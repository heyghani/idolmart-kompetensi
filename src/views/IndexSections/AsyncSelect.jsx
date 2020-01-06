import React, { Component } from 'react';
import AsyncSelect from 'react-select/async';



export default class WithCallbacks extends Component {
  state = { inputValue: '' };
  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    return (
      <div>
        <AsyncSelect
          cacheOptions
          loadOptions={this.props.loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
          {...this.props}
        />
      </div>
    );
  }
}


