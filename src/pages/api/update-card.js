import {Server} from './lib/service'
import { getSession } from "next-auth/react";

export default async (req, res) => {
  try {
    const session = await getSession({ req });
    const token = session?.accessToken;
    const result = await Server.put('/admin/update-card', {
      id: req.body.id,
      name: req.body.name
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  } catch (error) {
    res.redirect(['401',  ])
  }
 
  res.status(200).json({user: result})
}