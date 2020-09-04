var express = require('express');
var router = express.Router();
var formidable = require('formidable')
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload',function(req, res){
  const form = new formidable.IncomingForm();

  form.parse(req,function(err,fields,files){

    const filePath = './public/static/'+fields.name

    const fileName = fields.uploadPartCount + "." + fields.type

    fs.mkdir(filePath,{recursive:true},(err)=>{
      if(err) throw err;

      fs.writeFile(filePath+'/'+fileName, fields.file, function(err) {
        if (err) throw err;
        res.json({ state:'ok'})
      })

    });
  
  })
})

module.exports = router;
