import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import PropTypes from 'prop-types';

// const checkboxes = [
//     {
//         id: 'promotion',
//         key: '1',
//         value: 'Promotion',
//     },
//     {
//         id: 'hot-product',
//         key: '2',
//         value: 'Hot Product',
//     },
// ];

// const Checkboxes = ({ id, checked = false, onChange, value }) => (
//     <Checkbox id={id} checked={checked} onChange={onChange} value={value} />
// );

// Checkboxes.propTypes = {
//     id: PropTypes.string.isRequired,
//     value: PropTypes.array,
//     checked: PropTypes.bool,
//     onChange: PropTypes.func.isRequired,
// }

export default class CheckedBox extends React.Component {
    constructor() {
        super()
        this.state = {
            checkedA: false,
            checkedB: false,
            values: []
        }

    }

    handlePromotion(checkedA) {
        return checkedA === true ? { values: ['Promotion'] } : { values: [] }
    }
    handleHotProduct(checkedB) {
        return checkedB === true ? { values: ['Hot Product'] } : { values: [] }
    }

    handleChange = name => event => {
        this.setState({ ...this.state, [name]: event.target.checked });
    };

    render() {
        console.log(this.state)
        return (
            <FormGroup row>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={this.state.checkedA}
                            onChange={this.handleChange('checkedA')}
                            value={this.handlePromotion}
                            color="primary"
                        />
                    }
                    label="Promotion"
                />
                <FormControlLabel
                    control={
                        <Checkbox

                            checked={this.state.checkedB}
                            onChange={this.handleChange('checkedB')}
                            value={this.handleHotProduct}
                            color="primary"
                        />
                    }
                    label="Hot Product"
                />
            </FormGroup>
        );
    }
}