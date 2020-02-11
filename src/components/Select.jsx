import React from "react";
import ReactSelect from "react-select"
const CreatableSelect = ReactSelect.CreatableSelect

// const selectTheme = {
//   container: (provided, state) => ({
//     ...provided,
//     opacity: state.isDisabled ? 0.5 : 1
//   }),
//   control: (provided) => ({
//     ...provided,
//     backgroundColor: "#27293d",
//     borderColor: "#2b3553",
//     color: "rgba(255, 255, 255, 0.8)",
//   }),
//   menu: (provided) => ({
//     ...provided,
//     backgroundColor: "#27293d",
//     color: "rgba(255, 255, 255, 0.8)"
//   }),
//   singleValue: (provided) => ({
//     ...provided,
//     color: "rgba(255, 255, 255, 0.8)"
//   }),
//   input: (provided) => ({
//     ...provided,
//     color: "rgba(255, 255, 255, 0.8)"
//   }),
//   option: (provided, state) => ({
//     ...provided,
//     backgroundColor: state.isFocused || state.isSelected ? "rgba(222, 222, 222, 0.3)" : "none"
//   }),
//   multiValueLabel: (provided) => ({
//     ...provided,
//     backgroundColor: "#47495d",
//     color: "rgba(255, 255, 255, 0.8)"
//   }),
//   multiValueRemove: (provided) => ({
//     ...provided,
//     backgroundColor: "#47495d",
//   })
// };

// For use with Formik Field
class Select extends React.Component {
  render() {
    const { isCreatable } = this.props
    // const styles = this.props.styles || {};
    return isCreatable ?
      <CreatableSelect
        {...this.props}
        placeholder={this.props.placeholder || "Pilih / tambah baru..."}
        // styles={{...selectTheme, ...styles}}
      /> :
      <ReactSelect
        {...this.props}
        placeholder={this.props.placeholder || "Pilih..."}
        // styles={{...selectTheme, ...styles}}
      />
  }
}

export default Select;
