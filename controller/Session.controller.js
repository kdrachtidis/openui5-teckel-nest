sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/Fragment',
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/Popover',
  'sap/m/Button'
], function(jQuery, Fragment, Controller, JSONModel, Popover, Button) {
  "use strict";

  var Controller = Controller.extend("UI5FioriForTools.controller.Session", {

    onInit: function() {
        var oModel = new sap.ui.model.json.JSONModel();
        $.getJSON("./model/uploadedFiles.json", function(json) {
          oModel.setData({
              session: "Session-1",
              sessionName: json.items[0].attributes[0].text,
              sessionDate: json.items[0].attributes[1].text,
              sessionRole: json.items[0].attributes[2].text
          });
        });
        sap.ui.getCore().setModel(oModel, "selectedSession");

        var oModel2 = new JSONModel();
        oModel2.loadData("./model/uploadedFiles.json");
        this.getView().setModel(oModel2,"holdSessions");

        window.session = "Session-1";                                     //global variable for diagram update

        //TODO: select first item in list
    },

    onListItemPress: function(evt) {
      var index = evt.getSource().indexOfItem(evt.getSource().getSelectedItem());
      var shortName = evt.getSource().getSelectedItem().getTitle();
      var oModel = new sap.ui.model.json.JSONModel();
      $.getJSON("./model/uploadedFiles.json", function(json) {
        oModel.setData({
            session: shortName,
            sessionName: json.items[index].attributes[0].text,
            sessionDate: json.items[index].attributes[1].text,
            sessionRole: json.items[index].attributes[2].text
				});
      });
      sap.ui.getCore().setModel(oModel, "selectedSession");

      window.session = evt.getSource().getSelectedItem().getTitle();    //global variable for diagram update
    }

  });

  return Controller;
});
