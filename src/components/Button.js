import React from 'react';
import "./Button.css"
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Button(props) {
const styles = {
    backgroundColor: 
    typeof(props.value)==="number" || props.value==='.' ? "var(--dark-grey)":
    ['/', 'x', '+', '-'].includes(props.value) ?  "var(--light-grey)" :
    props.value==="AC"? "var(--red-button)" : "var(--blue-button)",    
    gridRow: `span ${props.span[0]}`,
    gridColumn: `span ${props.span[1]}`,
}
  return (
    <>
        <div className="buttons" style={styles} onClick={props.handleClick}>{props.value}</div>
    </>
  );
}