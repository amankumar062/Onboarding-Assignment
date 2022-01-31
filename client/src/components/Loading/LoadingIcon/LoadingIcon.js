import "./LoadingIcon.sass";

export default function LoadingIcon({ color }) {
    return <div data-testid="loadingIcon" className={`donut ${color}`}></div>;
}
