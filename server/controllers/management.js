const mongoose = require('mongoose');
const User = require('../models/User');
const Transaction = require('../models/Transaction');

const getAdmins = async (req,res) =>{
    try{
       const admins = await User.find({role:'admin'}).select("-password");
       res.status(200).json(admins);
    }
    catch(error){
        res.status(404).json({message:error.message})
    }
}

const getUserPerformance = async (req,res) =>{
    try{
       const {id} = req.params;
       const userWithStat = await User.aggregate([
        {$match: {_id: new mongoose.Type.ObjectId(id)}},
        {
            $lookup:{
                from:'affiliatestates',
                locatedField:"_id",
                foreignField:"userId",
                as:'affiliateStats'
            },
        },
        {$unwind:"$affiliateStats"}
       ]);

       const saleTransactions = await Promise.all(
        userWithStat[0].affiliateStats.affiliatesSales.map((id)=>{
            return Transaction.findById(id)
        })
       )
       const filteredSalesTransactions = saleTransactions.filter(
        (transaction) =>transaction !== null
       )
        res.status(200).json({user:userWithStat[0], sales:filteredSalesTransactions});
     }
     catch(error){
         res.status(404).json({message:error.message})
     }
}

module.exports = {getAdmins,getUserPerformance};