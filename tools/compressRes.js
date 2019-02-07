var fs = require("fs");


function compress(path){
   if(!/\.js$/.test(path)){
      var o_code = fs.readFileSync(path).toString();

      o_code = o_code.replace("`","\`","gm");

      var t_code = "app.res(`"+o_code+"`);"
      fs.writeFileSync(path+".js",t_code);
   }
}

exports.compressRes = function(arr){
    arr.forEach(element => {
        compress(element);
    });
}