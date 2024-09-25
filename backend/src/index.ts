import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { Bindings } from 'hono/types'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'



const app = new Hono<{
  Bindings: {
    DATABASE_URL : string
    JWT_SECRET: string
    
  }
}>()
app.use('/*', cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);






export default app
