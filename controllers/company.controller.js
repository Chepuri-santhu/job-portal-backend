
import { Company } from '../models/company.model.js';

export const registerComapny = async (req, res) => {
    try {
        const { companyName } = req.body;

        if (!companyName) {
            return res.status(400).json({
                message: 'company name is missing',
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: 'company already exist',
                success: false
            });
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            company,
            message: 'company created successfully',
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompany=async (req,res)=>{
    try{
    const userId=req.id;
    const companies=await Company.find({userId});
    if(!companies){
        return res.status(404).json({
            message:"comapanies not found",
            success:false
        });
    }
    return res.status(200).json({
        companies,
        success:true
    });
}catch(error){
        console.log(error);
    }

}

export const companyById=async (req,res)=>{
    try{
    const companyId=req.params.id;
    const company=await Company.findById(companyId);
    if(!company){
        return res.status(404).json({
            message:"comapany not found",
            success:false
        });
    }

    return res.status(200).json({
        company,
        success:true
    });
}catch(error){
    console.log(error);
}
}

export const updateCompany=async (req,res)=>{
    try{
        const {name,description,website,location}=req.body;

        const file=req.file;
        //cloudinary will come

        const updatedData={name,description,website,location};

        const company=await Company.findByIdAndUpdate(req.params.id,updatedData,{new:true});
        if(!company){
            return res.status(404).json({
                message:"comapany not found",
                success:false
            });
        }
        return res.status(200).json({
            message:"company updated successfully",
            success:true
        });
    }
    catch(error){
        console.log(error)
    }
}


