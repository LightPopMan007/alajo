import {Server} from "./lib/service";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const {id, card, name, type_id, rate, status} = req.body
  // console.log(id)
  const result = await Server.put(
    "/admin/update-card-type",
    {
      id, card_id: card, name, type_id, rate, status
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  res.status(200).json({ data: result });
};
