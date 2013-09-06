(function (global) {
    var mobileSkin = "",
        app = global.app = global.app || {};

    document.addEventListener("deviceready", function () {
        $data.initService("http://jaydata.org/examples/Northwind.svc").then(function(db, factory, type){
            app.database = db;
            app.application = new kendo.mobile.Application(document.body, {
                layout: "tabstrip-layout",
                transition: "slide"
            });
        });
    }, false);

    app.changeSkin = function () {
        app.application.skin(this.selectedIndex == 0 ? "" : "flat");
    };
    
    app.showProducts = function(e){
        e.view.scroller.reset();
        $("#products-listview").data("kendoMobileListView").setDataSource(
            app.database.Products.include("Supplier").filter(function(it){
                return it.Category_ID == this.id;
            }, {
                id: e.view.params.categoryid
            }).asKendoDataSource()
        );
    };
    
    app.showProductDetails = function(e){
        $(".product-details.active").removeClass("active");
        $(e.button.context).next(".product-details").addClass("active");
    };
})(window)