import {Server} from "./lib/service";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const result = await Server.post(
    "/admin/create-card",
    {
      name: req.body.name,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  res.status(200).json({ data: result });
};
