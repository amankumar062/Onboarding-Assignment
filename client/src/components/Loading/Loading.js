import "./Loading.sass";

export default function Loading() {
    return (
        <div className="loading" data-testid="loadingComponent">
            <span class="donut"></span>
            <span> Loading </span>
        </div>
    );
}
