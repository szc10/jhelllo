APP.define({
    name: "main",
    init: function (data) {

    },
    activite: function () {

    },
    sleep: function () {
        
    },
    formatjs:function(str){

        str = js_beautify(str, {
            'indent_size': 1,
            'indent_char': '\t'
          });

      return "<xmp>"+str+"</xmp>";
    }
});