import type { env } from "cloudflare:workers";
import { callAction, renderRequest } from "@parcel/rsc/server";
import { Page as HandlePage } from "./pages/handle";
import { Page as IndexPage } from "./pages/index";

import { Hono } from "hono";

let app = new Hono<{ Bindings: typeof env }>();

app.get("/", (c) => {
  return renderRequest(c.req.raw, <IndexPage />, {
    component: IndexPage,
  });
});

app.post("/", async (c) => {
  let id = c.req.header("rsc-action-id");
  let result = await callAction(c.req.raw, id);
  let root: any = <IndexPage />;
  if (id) {
    root = { result, root };
  }
  return renderRequest(c.req.raw, root, { component: IndexPage });
});

app.get("/:handle", async (c) => {
  return renderRequest(
    c.req.raw,
    <HandlePage handle={c.req.param("handle")} />,
    {
      component: (props) => (
        <HandlePage handle={c.req.param("handle")} {...props} />
      ),
    },
  );
});

app.post("/:handle", async (c) => {
  let id = c.req.header("rsc-action-id");
  let result = await callAction(c.req.raw, id);
  let root: any = <HandlePage handle={c.req.param("handle")} />;
  if (id) {
    root = { result, root };
  }
  return renderRequest(c.req.raw, root, {
    component: (props) => (
      <HandlePage handle={c.req.param("handle")} {...props} />
    ),
  });
});

app.all("*", (c) => {
  if (c.req.url === "/") {
    return new Response("Unknown method", { status: 500 });
  }
  return new Response("Not found", { status: 404 });
});

export default app;
