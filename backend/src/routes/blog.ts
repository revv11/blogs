import { Hono } from 'hono'
import { sign, verify } from 'hono/jwt'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createBlogInput, updateBlogInput } from 'utkarsh-zod'



export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL : string
      JWT_SECRET: string
      
    },
    Variables:{
        userId: string
    }

  }>() 

  blogRouter.use('/*', async (c, next)=>{

    try{
        const header = c.req.header("authorization") || "";
        const token = header.split(" ")[1]
        const response = await verify(token, c.env.JWT_SECRET)
        if (response.id){
            //@ts-ignore
            c.set("userId", response.id)
            await next()
        }else{
          c.status(403)
          return c.json({message: "You are not logged in"})
        }

    }
    catch(e){
        c.status(403)
        return c.json({message: "You are not logged in"})
    }
  
    
  })

  blogRouter.post('/', async (c) => {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    const authorId = c.get("userId")
    
    const blog = await prisma.posts.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: Number(authorId),
        }
    })

    return c.json({
        id: blog.id   
    })
    
  })
  
  blogRouter.put('/', async(c) => {
    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message: "Inputs not correct"
        })
    }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    
    const blog = await prisma.posts.update({
        where:{
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
            authorId: 1,
        }
    })

    return c.json({
        id: blog.id
    })
  })
  blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())

      const blogs = await prisma.posts.findMany();
      return c.json({
        blogs
      })
  })
  
  blogRouter.get('/:id',  async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
    
    
    const id = c.req.param("id")
    try{
        const blog = await prisma.posts.findFirst({
            where:{
                id: Number(id)
            },
        })
    
        return c.json({
            blog
        })

    }
    catch(err){
        c.status(411);{
            return c.json({
                message: "Error while fetching blog post"
            })
        }
    }
    
  })
  