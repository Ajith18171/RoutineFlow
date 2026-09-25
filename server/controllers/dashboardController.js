import {
getDashboardStatistics,
getDashboardAnalytics
} from "../models/dashboardModel.js";





// BASIC STATS

export const getDashboardStats = async(req,res)=>{


try{


const userId=req.user.id;


console.log(
"DASHBOARD USER:",
userId
);



const stats =
await getDashboardStatistics(userId);



console.log(
"DASHBOARD STATS:",
stats
);



res.json({

success:true,

stats

});



}

catch(error){


console.log(
"DASHBOARD ERROR:",
error
);



res.status(500).json({

success:false,

message:"Database Error"

});


}


};






// ANALYTICS

export const getDashboardAnalyticsController =
async(req,res)=>{


try{


const userId=req.user.id;


const analytics =
await getDashboardAnalytics(userId);



res.json({

success:true,

analytics

});



}

catch(error){


console.log(
"ANALYTICS ERROR:",
error
);



res.status(500).json({

success:false,

message:"Analytics Error"

});


}


};