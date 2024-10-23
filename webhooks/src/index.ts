import express from "express";
import {PrismaClient} from "@prisma/client"

const app = express();
app.use(express.json())

const client = new PrismaClient();

app.get("/hooks/catch",async(req,res)=>{
    res.send("Hello");
})

app.post("/hooks/catch/:userId/:zapId", async(req,res)=>{
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;

    await client.$transaction(async tx => {

        const run  = await tx.zapRun.create({
            data : {
                zapId : zapId,
                metadata : body
            }
        })
        
        await tx.zapRunOutbox.create({
            data : {
                zapRunId : run.id
            }
        })

    })

    res.json({
        message : "a New Zap has been created"
    })

    //store in db a new trigger


    //put it to quese in redis or kafka


})


app.listen(3000,()=>{console.log("server is well and is well!!")});
