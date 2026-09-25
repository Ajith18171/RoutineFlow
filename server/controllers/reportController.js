import {
  getReportStats,
  getWeeklyReport,
  getMonthlyReport
} from "../models/reportModel.js";


export const getReports = async (req,res)=>{

try{

const userId = req.user.id;


const stats = await getReportStats(userId);

const weekly = await getWeeklyReport(userId);

const monthly = await getMonthlyReport(userId);



const reportStats = {

total:Number(stats.total),

completed:Number(stats.completed),

pending:Number(stats.pending),

highPriority:Number(stats.highPriority),

};



reportStats.completionRate =
reportStats.total > 0
?
Math.round(
(reportStats.completed / reportStats.total) * 100
)
:
0;



res.json({

success:true,

stats:reportStats,

weekly,

monthly

});


}
catch(error){

console.log(error);


res.status(500).json({

success:false,

message:"Failed to load reports"

});


}


};