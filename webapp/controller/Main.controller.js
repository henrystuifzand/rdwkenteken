sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function(Controller, MessageToast) {
	"use strict";

	return Controller.extend("stuifzand.xyz.controller.Main", {

		onPress: function() {
			var oComp = this.getOwnerComponent();
			var that = this;
			var url = oComp.rdwURL;
			//https://opendata.rdw.nl/resource/m9d7-ebf2.json?kenteken=KG296B&$select=merk,handelsbenaming,vervaldatum_apk
			// ?kenteken=KG296B&$select=merk,handelsbenaming,vervaldatum_apk 
			var oModel1 = this.getView().getModel();
			var kenteken = oModel1.getProperty("/kenteken");
			var res = kenteken.toUpperCase();
			var res1 = res.replace(/-/g, "");
			url = url + '?kenteken=' + res1 + '&$select=merk,handelsbenaming,vervaldatum_apk';
			$.ajax({
				url: url,
				success: function(response) {
					var oModel = that.getView().getModel();
					if (response.length !== 0) {
						oModel.setProperty("/type", response[0].handelsbenaming);
						oModel.setProperty("/merk", response[0].merk);
						oModel.setProperty("/apk", response[0].vervaldatum_apk);
					} else {
						// show message
						oModel.setProperty("/type", '');
						oModel.setProperty("/merk", '');
						oModel.setProperty("/apk", '');
						var sMsg = that.getView().getModel("i18n").getResourceBundle().getText("kentekenerror");
						MessageToast.show(sMsg);
					}
				}
			});
		}

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf stuifzand.xyz.view.Main
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf stuifzand.xyz.view.Main
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf stuifzand.xyz.view.Main
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf stuifzand.xyz.view.Main
		 */
		//	onExit: function() {
		//
		//	}

	});

});