sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/Fragment',
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/Popover',
  'sap/m/Button'
], function(jQuery, Fragment, Controller, JSONModel, Popover, Button) {
  "use strict";

  var Controller = Controller.extend("UI5FioriForTools.controller.Dashboard", {
    onInit (){
      var oModel = new JSONModel();
      oModel.loadData("./model/general.json");
      this.getView().setModel(oModel,"general"); 
    }

  });

  return Controller;
});
