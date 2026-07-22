/**
 * LoadingOverlay — fades out once isVisible becomes false.
 * loadingBarRef is updated directly (no re-renders) for smooth progress.
 */
export default function LoadingOverlay({ isVisible, loadingBarRef }) {
  return (
    <div className={`loading-overlay${isVisible ? '' : ' hidden'}`} aria-live="polite">
      <div className="loading-logo">Sony</div>
      <div className="loading-bar-track" aria-hidden="true">
        <div className="loading-bar-fill" ref={loadingBarRef} />
      </div>
      <div className="loading-text">
        {isVisible ? 'Preparing experience…' : 'Experience WH‑1000XM6'}
      </div>
    </div>
  )
}
