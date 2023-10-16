import './loading-screen.css';

function LoadingScreen(): JSX.Element {
  return (
    <div className="lds-heart" data-testid="loading-container"><div></div></div>
  );
}

export default LoadingScreen;
