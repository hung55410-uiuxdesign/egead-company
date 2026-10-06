'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0D0E] text-white flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-gray-400 text-sm max-w-md mb-6">{error.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-full bg-[#5EFC8D] text-black font-semibold text-xs transition hover:bg-[#4ee37e]"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
