sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ui/model/json/JSONModel",
	"stuifzand/xyz/model/models"
], function(UIComponent, Device, JSONModel, models) {
	"use strict";

	return UIComponent.extend("stuifzand.xyz.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			
			var oConfig = this.getMetadata().getConfig();
        	this.rdwURL = oConfig.rdwRemote;
        	
        	var oModel = new JSONModel(this.rdwURL + 'kenteken=');
        	this.setModel(oModel);
        	
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			// create the views based on the url/hash
			this.getRouter().initialize();
		}
	});

});