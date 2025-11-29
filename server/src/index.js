const express = require('express');
const app = express();
const sequelize = require('./db');
const { Activity, Feedback } = require('./models');



app.use(express.json());

sequelize.sync().then(() => {
    console.log('Database synchronized');
});

app.get('/api', (req, res) => {
    res.json({status:"ok"});
});

function CodeGenerator(){
    let chars='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code='';
    for(let i=0;i<4;i++){
        code+=chars.charAt(Math.floor(Math.random()*chars.length));
    }
    return code;
}

//pentru profesor
app.post("/api/activities", async (req, res) => {
    const { title, description, startTime, endTime } = req.body;

    const activity=await Activity.create({
        title,
        description,
        startTime,
        endTime,
        code:CodeGenerator()
});
    res.json(activity);
});

//pentru student
app.post("/api/activities/:id/feedback", async (req, res) => {
    const { type} = req.body;
    const feedback=await Feedback.create({
        type,
        activityId:req.params.id
    });
    res.json(feedback);
});

app.get("/api/activities/:id/feedback", async (req, res) => {
    const list=await Feedback.findAll({
        where:{activityId:req.params.id}
    });
    res.json(list);
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});