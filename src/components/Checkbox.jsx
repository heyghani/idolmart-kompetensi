import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";

const Checkboxes = ({ id, name, checked = false, onChange, value, color }) => (
	<Checkbox
		id={id}
		name={name}
		checked={checked}
		onChange={onChange}
		value={value}
		color={color}
	/>
);

Checkboxes.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string,
	value: PropTypes.string,
	checked: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	color: PropTypes.string,
};

export default Checkboxes;
