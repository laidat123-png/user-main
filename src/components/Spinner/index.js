import "./index.css";

export const Spinner = (props) => {
    const { bgC } = props;
    return (
        <div className="spinner" style={{ backgroundColor: `${bgC ? bgC : "#2F2B35"}` }}>
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
        </div>
    )
}