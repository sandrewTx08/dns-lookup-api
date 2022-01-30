import express, { Request, Response } from 'express'
import process from '../modules/nslookup'
const router = express.Router()

router.get('/:host', async (req: Request, res: Response) => {
  res.status(200).json(await process(req.params.host))
})

export default router
