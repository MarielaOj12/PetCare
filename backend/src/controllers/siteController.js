const Site=require('../models/SiteModel');
exports.home=async(req,res)=>res.json({ok:true,data:await Site.getHome()});
exports.services=async(req,res)=>res.json({ok:true,data:await Site.fetch('SELECT * FROM services WHERE active=1 ORDER BY sort_order')});
exports.specialties=async(req,res)=>res.json({ok:true,data:await Site.fetch('SELECT * FROM specialties WHERE active=1 ORDER BY sort_order')});
exports.prices=async(req,res)=>res.json({ok:true,data:await Site.fetch('SELECT * FROM prices WHERE active=1 ORDER BY sort_order')});
exports.about=async(req,res)=>res.json({ok:true,data:await Site.one('SELECT * FROM clinic_settings LIMIT 1')});
exports.gallery=async(req,res)=>res.json({ok:true,data:await Site.fetch('SELECT * FROM gallery ORDER BY sort_order')});
exports.faqs=async(req,res)=>res.json({ok:true,data:await Site.fetch('SELECT * FROM faqs ORDER BY sort_order')});
