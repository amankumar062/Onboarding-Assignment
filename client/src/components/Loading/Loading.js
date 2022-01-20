import "./Loading.sass";

export default function Loading() {
    return (
        <div className="loading" data-testid="loadingComponent">
            <span className="donut"></span>
            <span> Loading </span>
        </div>
    );
}
