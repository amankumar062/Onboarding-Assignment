import LoadingIcon from "./LoadingIcon/LoadingIcon";
import "./Loading.sass";

export default function Loading() {
    return (
        <div className="loading" data-testid="loadingComponent">
            <LoadingIcon/>
            <span> Loading </span>
        </div>
    );
}
