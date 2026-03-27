
export interface ButtonProps {
    variant : "primary" | "secondary";
    size : "sm" | "md" | "lg";
    text : string;
    startIcon ? : number;
    endIcon ? : number;
    onClick : () => void;
}

export const Button = (props : ButtonProps) => {
    return (
        <button onclick = {onClick}>
            {props.variant}
            
        </button>
 );
}

