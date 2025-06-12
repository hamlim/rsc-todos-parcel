"use server-entry";

import Root from "../_root";
import "../styles.css";
import "../client";

export async function Page() {
  return (
    <Root>
      <body>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2>Home</h2>
          <p>This is the home page.</p>
          <p>
            Visit <code>{`/<handle>`}</code> to see your todos!
          </p>
        </div>
      </body>
    </Root>
  );
}
