APP.define({
    name: "main",
    init: function (data) {

    },
    activite: function () {

    },
    sleep: function () {
        //console.log("sleep");
    },
    escapeHtml: function (string) {
        var entityMap = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;'
        };

        function escapeHtml(string) {
            return String(string).replace(/[&<>"'`=\/]/g, function (s) {
                return entityMap[s];
            });
        }

        string =  HTMLFormat(string);
        // return escapeHtml(string);
        console.log(string);
        return "<xmp>"+string+"</xmp>"
    }
});