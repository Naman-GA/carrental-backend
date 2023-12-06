const subscribe= require("../models/newsletterModel")

exports.subs=async(req,res)=>{
    let data=req.body;
    const details=new subscribe(data)
    try {
        const c1 = await details.save();
        res.json({
          data: c1,
          message: "Details Saved",
          status: true,
          code: 200,
        });
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

exports.getlist=async(req,res)=>{
  try{
  const data= await subscribe.find()
  res.json({
    data: data,
    message: "Details fetched",
    status: true,
    code: 200,
  });
} catch (error) {
  res.status(400).json({ message: error.message });
}
}

exports.bulkdelete=async(req,res)=>{
  try{
    const da=req.body.data;
    for(let i=0;i<da.length;i++){
      await subscribe.deleteMany({_id:{$in:[da[i]]}})
    }
    res.json({
      success:true,
      message:"Deleted Succesfully",
      code:201
    })
  }
  catch(error){
    res.json({
      success:false,
      message:error.message,
      code:400})
  }
}