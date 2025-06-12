"use server-entry";

import { themeCheck } from "../_root";
import "../index.css";
import "../client";

export async function Page() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head suppressHydrationWarning>
        <title>Rsc Todos Parcel</title>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
          dangerouslySetInnerHTML={{ __html: `(${themeCheck.toString()})()` }}
        />
      </head>
      <body>
        <div className="flex flex-col items-center justify-center h-screen">
          <h2>Home</h2>
          <p>This is the home page.</p>
          <p>
            Visit <code>{`/<handle>`}</code> to see your todos!
          </p>
        </div>
      </body>
    </html>
  );
}
