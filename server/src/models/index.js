const Activity=require('./Activity');
const Feedback=require('./Feedback');

Activity.hasMany(Feedback,{foreignKey:'activityId'});
Feedback.belongsTo(Activity,{foreignKey:'activityId'});

module.exports={
    Activity,
    Feedback
};