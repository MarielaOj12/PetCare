const Ollama=require('../services/ollamaService');
const ChatModel=require('../models/ChatModel');
const {chat}=require('../middleware/validate');
exports.health=async(req,res)=>res.json({ok:true,data:await Ollama.health()});
exports.ask=async(req,res)=>{
  const {message,history}=chat(req.body);
  try{
    const answer=await Ollama.ask(message,history);
    ChatModel.save(message,answer,process.env.OLLAMA_MODEL||'gemma3:4b').catch(()=>{});
    res.json({ok:true,reply:answer,model:process.env.OLLAMA_MODEL||'gemma3:4b'});
  }catch(error){
    console.error('[OLLAMA]',error.message);
    res.status(503).json({ok:false,message:'No se pudo consultar Gemma 3. Verifica que Ollama esté abierto y ejecuta: ollama pull gemma3:4b'});
  }
};
