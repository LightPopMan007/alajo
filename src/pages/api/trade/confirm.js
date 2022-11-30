import { Server } from '../lib/service'
import { getSession } from "next-auth/react";

export default async (req, res) => {
    try {
        const session = await getSession({ req });
        const token = session?.accessToken;
        Server.put('/admin/confirm-card-transaction', {
            id: req.body.id,
            note: req.body.note,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then(response => {
                res.status(200).json(response.data);
            })
            .catch(error => {
                res.status(error.response.status).json(error.response.data);
            }
            )
        }
    catch (error) {
        res.status(500).json({ error });
    }

}