
export interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon ? : number;
    endIcon ? : number;
    onClick? : () => void;
}

const variantOptions = {
    "primary" : "bg-[#4543DA] text-white",
    "secondary" : "bg-[#d6d6ff] text-[e0e7fe]"
}

const sizeStyles = {
    "sm" : "py-1 px-2", // p in tailwind css is for padding, x and y are axis
    "md" : "py-2 px-4",
    "lg" : "py-4 px-6"
}


const defaultStyles = "rounded-md mr-4" //rounded is for the corners(like border-radius)

export const Button = (props : ButtonProps) => {
    return (
        <button className={`${variantOptions[props.variant]} 
            ${defaultStyles} ${sizeStyles[props.size]}`}
        >  
        {props.text}
        </button>
 );
}

