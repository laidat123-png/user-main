import "./index.css";

export const LoadingPage = () => {
    return (
        <div className="wrapper-loading">
            <div className="loader-page book">
                <figure className="page"></figure>
                <figure className="page"></figure>
                <figure className="page"></figure>
            </div>
            <h1>Chờ một chút</h1>
        </div>
    )
}