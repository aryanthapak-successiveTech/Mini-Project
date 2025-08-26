const Button = (props) => {
    const DenyButton=props.title==="Deny"||props.title==="Didn't Collect";
    const colorClasses=DenyButton ?"bg-red-500 hover:bg-red-700":"bg-teal-500 hover:bg-teal-700"
    return(
        <button
        className={`${colorClasses} text-sm text-white py-2 px-4 rounded`}
        onClick={props.onClick}
      >
        {props.title}
      </button>
     
    )
};

export default Button;