import Activity from "./Activity.js";
import Feedback from "./Feedback.js";

Activity.hasMany(Feedback, { foreignKey: "activityId" });
Feedback.belongsTo(Activity, { foreignKey: "activityId" });

export { Activity, Feedback };
