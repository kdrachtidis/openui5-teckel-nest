sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/Fragment',
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/Popover',
  'sap/m/Button'
], function(jQuery, Fragment, Controller, JSONModel, Popover, Button) {
  "use strict";

  var Controller = Controller.extend("UI5FioriForTools.controller.General", {
    onInit: function() {
      var oModel = new JSONModel();
      oModel.loadData("./model/os.json");
      this.getView().setModel(oModel,"os");

      var oModel2 = new JSONModel();
      oModel2.loadData("./model/browser.json");
      this.getView().setModel(oModel2,"browser");

      var oModel3 = new JSONModel();
      oModel3.loadData("./model/screenWidth.json");
      this.getView().setModel(oModel3,"screen");

      var oModel4 = new JSONModel();
      oModel4.loadData("./model/role.json");
      this.getView().setModel(oModel4,"role");

      var oModel5 = new JSONModel();
      oModel5.loadData("./model/java.json");
      this.getView().setModel(oModel5,"java");

      var oModel6 = new JSONModel();
      oModel6.loadData("./model/cookie.json");
      this.getView().setModel(oModel6,"cookie");

    },

    onAfterRendering: function(){
      var form = this.getView().byId('roleForm');
      form.removeAllContent();
      $.getJSON("./model/role.json", function(json) {

          for(var i = 0; i<json.length; i++){
              form.addContent( new sap.m.Label({ text: "{role>/"+i+"/role}" }) );
              form.addContent( new sap.m.Text({ text: "{role>/"+i+"/count} participant(s)" }) );
              form.addContent( new sap.m.Text({ text: "{role>/"+i+"/percentage}%" }) );
          }
      });
      
    }

  });

  return Controller;
});
