import {Server} from "./lib/service";
import { getSession } from "next-auth/react";

export default async (req, res) => {
  const session = await getSession({ req });
  const token = session?.accessToken;
  const {card, name, type_id, rate, status} = req.body
  console.log(req.body)
  const result = await Server.post(
    "/admin/create-card-type",
    {
      card_id: card, name, type_id, rate, status
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  res.status(200).json({ data: result });
};
