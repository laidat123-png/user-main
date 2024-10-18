import './index.css'

export const Button = (props) => {
    return (
        <button className="button" style={{ width: `${props.width || "100%"}` }}>
            {props.label || ""}
        </button>
    )
}