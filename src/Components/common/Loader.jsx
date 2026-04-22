const Loader = ({ message, fullScreen = true }) => {
  return (
    <div
      className={`flex flex-col ${fullScreen ? "h-full min-h-[50vh]" : "h-full py-8"} items-center justify-center bg-transparent`}
    >
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-t-transparent"></div>
      {message && (
        <p className="mt-4 text-lg font-medium text-[var(--color-primary)]">{message}</p>
      )}
    </div>
  );
};
export default Loader;
