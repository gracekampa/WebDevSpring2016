/**
 * Created by OWNER on 4/1/2016.
 */
(function(){
    angular
        .module("fieldsDirectives", [])
        .directive("fieldsSortable", fieldsSortable);

    function fieldsSortable() {
        function link(scope, element, attrs) {
            var start = null;
            var end   = null;
            $(element)
                .sortable({
                    axis: "y",
                    sort: function(event, ui) {
                        //ui.helper.find("a").hide();
                        start = ui.item.index();
                    },
                    stop: function(event, ui) {
                        //ui.item.find("a").show();
                        end = ui.item.index();
                        if(start >= end) {
                            start--;
                        }
                        scope.model.sortPage(start, end);
                    }
                });
        }
        return {
            link: link
        };
    }
})();