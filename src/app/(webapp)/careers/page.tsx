export default function Page() {
  return (
    <main>
      <div className="flex min-h-svh bg-black bg-dot-white/[.2]  w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-white">
            We do not have any open positions at the moment, sorry!
          </h1>
          <p className="text-gray-400 mt-4">
            Stop by another time to check for new opportunities!
          </p>
        </div>
      </div>
    </main>
  );
}
