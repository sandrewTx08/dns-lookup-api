import express, { Request, Response } from "express"
import nslookupRoute from './routes/nslookupRoute'
const app = express()

app.use(nslookupRoute)

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Page not found.'
  })
})

app.listen(process.env.PORT || 80)
