import React from 'react';

// const Emoji = props => (
//     <span
//         className="emoji"
//         role="img"
//         aria-label={props.label ? props.label : ""}
//         aria-hidden={props.label ? "false" : "true"}
//     >
//         {props.symbol}
//     </span>
// );
// export default Emoji;

const Emoji = ({label, symbol}) => (
  <span
      className="emoji"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
  >
      {symbol}
  </span>
);
export default Emoji;