
const studentModel = require("../model/studentModel")

const createAndAddStudent = async function(req,res){
    try{
        let data =req.body
      
        if(Object.keys(data).length==0)return res.status(400).send({status:false,msg:"can't create user with empty body"})
       
        let {name,subject,marks} = data

       if(!name){
        return res.status(400).send({status:false,message:"name is mandatory"})
       }
       if(!subject){
        return res.status(400).send({status:false,message:"subject is mandatory"})
       }
       if(!marks){
        return res.status(400).send({status:false,message:"name is mandatory"})
       }     
     const oldstudent=await studentModel.findOne({name:name,subject:subject,isDeleted:false})
     if(oldstudent){
       let  finalMarks=oldstudent.marks+marks
       const updateData=await studentModel.findOneAndUpdate({name:name,subject:subject},{marks:finalMarks},{new:true})
      return res.status(200).send({status:true,message:"Sucess",data:updateData})
     }
        const studentData=await studentModel.create(data)
        res.status(201).send({status:true,message:"Sucess",data:studentData})
         }
         catch(err){
             res.status(500).send({status:false ,msg:err.message})
         }
}
  

const viewStudent  = async function(req,res){
 try{
        let data=req.query
        data.isDeleted=false
        const studentData=await studentModel.find(data)
        if(!studentData)return res.status(404).send({status:false ,msg:"NO student found with this query"})
      return  res.status(200).send({status:true,data:studentData})

 }
 catch(err){
     return   res.status(500).send({status:false ,msg:err.message})
    }
}

const deleteStudentSubject = async (req,res)=>{
    try{
        let data=req.params.studentId

        const deletestudent= await studentModel.findOneAndUpdate({_id:data,isDeleted:false},{isDeleted:true,deletedAt:Date.now()})
        if(!deletestudent)return res.status(404).send({status:false ,message:"NO student found with this Id"})

       return res.status(201).send({status:true,message:"student data deleted successfully"})

    }
    catch(err){
       return  res.status(500).send({status:false ,msg:err.message})
    }
}

module.exports = {deleteStudentSubject,viewStudent,createAndAddStudent}