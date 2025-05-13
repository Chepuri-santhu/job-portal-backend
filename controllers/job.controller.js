
import {Job} from "../models/job.model.js";

//admin posting job
export const postJob=async (req,res)=>{
    try{
    const {title,description,requirements,salary,expereince,location,jobtype,position,companyId}=req.body;
    const userId=req.id;

    if(!title || !description || !requirements || !salary || !expereince|| !location || !jobtype || !position || !companyId ){
       return res.status(404).json({
            message:"something is missing",
            success:false
        })
    }
    const job=await Job.create({
        title,
        description,
        requirements:requirements.split(","),
        salary:Number(salary),
        expereinceLevel:expereince,
        location,
        jobtype,
        position,
        company:companyId,
        created_by:userId
    })
    return res.status(200).json({
        message:"job posted successfully",
        job,
        success:true
    });
}catch(error){
    console.log(error);
}
}
//students getting jobs

export const getAllJobs=async (req,res)=>{
    try {
        const keyword=req.query.keyword || "";
        const query ={
            $or:[
                {title:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ]
        };
        const jobs=await Job.find(query).populate({
            path:"company"
        }).sort({createdAt:-1});
        if(!jobs){
            return res.status(404).json({
                message:"jobs not found",
                success:false

            });  
      }

      return res.status(200).json({
        jobs,
        success:true
      })
    } catch (error) {
        console.log(error);
        
    }
}

//students getting jobs by id
export const getJobById=async (req,res)=>{
    try{
    const jobId=req.params.id;
    const job=await Job.findById(jobId);
    if(!job){
        return res.status(400).json({
            message:"job not found by that id",
            succes:false
        });
    }
    return res.status(200).json({
        job,
        success:true
    });
}catch(error){
    console.log(error);
}
}
//jobs created by respective admin
export const getAdminJob=async (req,res)=>{
    try{
    const adminId=req.id;

    const  adminpostedjobs=await Job.find({created_by:adminId});
    if(!adminpostedjobs){
        return res.status(400).json({
            message:"jobs created by this admin are not found",
            succes:false
        })
    }
    return res.status(200).json({
        adminpostedjobs,
        success:true
    }
    );
}catch(error){
    console.log(error);
}

}

