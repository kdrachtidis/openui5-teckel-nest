sap.ui.define([
  'jquery.sap.global',
  'sap/ui/core/Fragment',
  'sap/ui/core/mvc/Controller',
  'sap/ui/model/json/JSONModel',
  'sap/m/Popover',
  'sap/m/Button'
], function(jQuery, Fragment, Controller, JSONModel, Popover, Button) {
  "use strict";

  var Controller = Controller.extend("UI5FioriForTools.controller.UseCase", {
    
    onInit: function() {
        this.createTabs(0);
    },

    onListItemPress: function(evt) {
        this.createTabs(evt.getSource().indexOfItem(evt.getSource().getSelectedItem()));				
    },
    
    createTabs: function(index){
        var page = this.getView().byId('useCasePage');
        page.destroySections();
        $.getJSON("./model/UseCaseData.json", function(json) {

            var oModel = new sap.ui.model.json.JSONModel();
            oModel.setData({
                id: json.UseCases[index].UseCaseTitle,
                description: json.UseCases[index].UseCaseDescription
            });
            sap.ui.getCore().setModel(oModel, "currentUseCase");

            window.useCase = json.UseCases[index].UseCaseTitle;

            var numberActions = json.UseCases[index].UseCaseActions.length;
            
            var oSubSection1 = new sap.uxap.ObjectPageSubSection({title:""});
            var form = new sap.ui.layout.form.SimpleForm({layout: "ResponsiveGridLayout",singleContainerFullSize:true,content:[
                new sap.m.Label({textAlign:sap.ui.core.TextAlign.Left,text:"Description"}),
                new sap.m.Text({text:"{useCaseData>/UseCases/"+index+"/UseCaseDescription}"}),
                new sap.m.Label({text:"Actions"})
            ]});
            for(var i=0;i<numberActions;i++){
                form.addContent(new sap.m.Text({text:(i+1)+". {useCaseData>/UseCases/"+index+"/UseCaseActions/"+i+"/ActionTitle}"}));
                form.addContent(new sap.m.Label({}));
            }
            
            var html = new sap.ui.core.HTML({content:"<div id='allSessions' class='bar-chart'> </div>"});
            var verticalLayout = new sap.ui.layout.VerticalLayout({width: "100%",content:[form,html]});
            oSubSection1.addBlock(verticalLayout);
            
            var oSection1 = new sap.uxap.ObjectPageSection({title:"All Actions"});
            oSection1.addSubSection(oSubSection1);
            page.addSection(oSection1);
            $.getScript("diagrams/UseCase-allActions.js", function(){});

            for(var i = 0; i<numberActions; i++){
                var oSubSection1 = new sap.uxap.ObjectPageSubSection({title:""});
                var form = new sap.ui.layout.form.SimpleForm({layout: "ResponsiveGridLayout",singleContainerFullSize:true,content:[
                    new sap.m.Label({textAlign:sap.ui.core.TextAlign.Left,text:"Title"}),
                    new sap.m.Text({text:"{useCaseData>/UseCases/"+index+"/UseCaseActions/"+i+"/ActionTitle}"}),
                    new sap.m.Label({textAlign:sap.ui.core.TextAlign.Left,text:"Description"}),
                    new sap.m.Text({text:"{useCaseData>/UseCases/"+index+"/UseCaseActions/"+i+"/ActionDescription}"}),
                    new sap.m.Label({text:"Ideal Steps"})
                ]});
                var numberSteps = json.UseCases[index].UseCaseActions[i].ActionSteps.length;
                for(var j=0;j<numberSteps;j++){
                    form.addContent(new sap.m.Text({text:(j+1)+". {useCaseData>/UseCases/"+index+"/UseCaseActions/"+i+"/ActionSteps/"+j+"/ActionStepDescription}"}));
                    form.addContent(new sap.m.Label({}));
                }
 
                var html = new sap.ui.core.HTML({content:"<div id='UseCase-Action" + (i+1) + "' class='bar-chart'> </div>"});
                var verticalLayout = new sap.ui.layout.VerticalLayout({width: "100%",content:[form,html]});
                oSubSection1.addBlock(verticalLayout);
                var oSection1 = new sap.uxap.ObjectPageSection({title:"Action {useCaseData>/UseCases/"+index+"/UseCaseActions/"+i+"/ActionID}"});
                oSection1.addSubSection(oSubSection1);
                page.addSection(oSection1);
                $.getScript("diagrams/UseCase-Action" + (i+1) + ".js", function(){});
            }
            
      });
    }

  });

  return Controller;
});
