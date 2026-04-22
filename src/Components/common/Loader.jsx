import "./Loader.css";

const Loader = ({ message, fullScreen = true, compact = false }) => {
  const loaderClass = compact ? "food-loader-svg food-loader-svg-compact" : "food-loader-svg";

  return (
    <div
      className={`flex flex-col ${fullScreen ? "h-full min-h-[50vh]" : "h-full py-8"} items-center justify-center bg-transparent`}
    >
      <svg
        viewBox="0 0 200 120"
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="4"
        strokeLinecap="round"
        className={loaderClass}
        aria-hidden="true"
      >
        <line className="food-loader-line" x1="10" y1="40" x2="80" y2="40" />
        <line className="food-loader-line" x1="5" y1="60" x2="70" y2="60" />
        <line className="food-loader-line" x1="15" y1="80" x2="85" y2="80" />

        <path d="M100 80 A40 40 0 0 1 180 80" fill="var(--color-primary)" />
        <circle cx="140" cy="40" r="5" fill="var(--color-primary)" />
        <rect x="95" y="80" width="90" height="5" fill="var(--color-primary)" />
      </svg>

      {message && (
        <p
          className={`mt-3 font-medium text-[var(--color-primary)] ${
            compact ? "text-sm" : "text-lg"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default Loader;
