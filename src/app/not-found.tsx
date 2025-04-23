export default function NotFound() {
  return (
    <main className="dark:bg-black dark:bg-dot-white/[0.2] min-h-screen w-full flex items-center justify-center">
      <div>
        <style>
          {`
            body {
              color: #fff;
              background: #000;
              margin: 0;
              padding: 0;
              min-height: 100vh;
            }

            .next-error-h1{
              border-right: 1px solid rgba(255,255,255,.3)
            }
          `}
        </style>
        <h1 className="next-error-h1" style={{
          display: "inline-block",
          margin: "0px 20px 0 0",
          padding: "0 23px 0 0",
          fontSize: "24px",
          fontWeight: 500,
          verticalAlign: "top",
          lineHeight: "49px"
        }}>404</h1>
        <div style={{display: "inline-block"}}>
          <h2 style={{
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "49px",
            margin: 0
          }}>This page could not be found.</h2>
        </div>
      </div>
    </main>
  )
}