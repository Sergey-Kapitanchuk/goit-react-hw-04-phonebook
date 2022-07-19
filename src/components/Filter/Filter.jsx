import React from "react";
import propTypes from 'prop-types';
import CSS from "./Filter.module.css";

const Filter= ({value, onChange}) => {
 return (<label htmlFor="" className={CSS.filter}>
    Find contacts by name
     <input type="text" value={value} onChange={onChange}  />
</label>)
 };

Filter.propTypes = {
    value: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
}

export default Filter;
