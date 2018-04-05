var dataModel = Ext.define('info', {
	extend: 'Ext.data.Model',
    fields:[
		{name: 'name', type: 'string'},
		{name: 'email', type: 'string'},
		{name: 'phone', type: 'string'},
		{name: 'address', type: 'string'},
		{name: 'insurType', type: 'string'}
    ]
});

var datastore = Ext.create('Ext.data.Store', {	
	storeId:'PatientsStore',
	model:dataModel,
	proxy : {
		type : 'rest',
		url : '/readCSV',
		method : "GET",
		useDefaultXhrHeader : false,
		headers : {
			'Content-Type' : 'application/json',
			'Access-Control-Allow-Origin' : '*'
		},
		noCache : false,

		reader : {
			type : 'json',
		}
	}, 

     	autoLoad: true  
    
});
Ext.onReady(function() {
  Ext.Loader.setConfig({
    enabled: true
  });
  Ext.create('Ext.tab.Panel', {	
    renderTo: Ext.getBody(),
    fullscreen: true,
    items: [{
        xtype: 'panel',
        title: 'Upload File',

        items: [{
          xtype: 'form',
          itemId: 'uploadForm', 
          height: 200,
          margin: '75 50 50 570',
          top: 100,
          border: false,
          fileUpload: true,
          items: [{
              xtype: 'fileuploadfield',
              itemId: 'fileUpload',
              name: 'file',
              buttonText: 'Browse',
              allowBlank: false,
              regex: /^.*\.(csv|CSV)$/,
              regexText: 'Only CSV files allowed'
            },
            
            {
              xtype: 'button',
              text: 'Upload',
              width: 70,
              margin: '0 0 0 20',
              handler: function() {
                var form = Ext.ComponentQuery.query('#uploadForm');

                if (form[0].form.isValid()) form[0].getForm().submit({
                  url: '/uploadCSV',
                  method: 'POST',
                  success: function(r, a) {
                    console.log('service call success')
                  },
                  failure: function(r, a) {
                    console.log('service call fail')
                  }
                });

                else {
                  alert("Enter a CSV file");
                  form[0].form.reset();
                }
              },
              scope: this,
              title: 'save',
              overflowText: 'horizontal ruler'
            }]
        }]
      },
      {
        title: 'Patients Details',
        xtype: 'container',
	layout: {type: 'hbox'},
    	width: 400,
    	
    	border: 1,
    	style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
    	defaults: {
        	labelWidth: 80,
        	flex: 1,
        	style: {padding: '10px' }
    	},
	items:[{
		xtype:'panel',
		items:[{
		xtype:'grid',
		id:"grid",
		title: 'Patients Details',
		store: datastore,
		columns: [
			{ header: 'Name',  dataIndex: 'name',flex: 0.25 },
			{ header: 'Email', dataIndex: 'email', flex: 0.5 },
			{ header: 'Phone', dataIndex: 'phone' },
			{ header: 'Address', dataIndex: 'address', flex: 0.5 },
			{ header: 'Insurance Type', dataIndex: 'insurType'}
		],
		height: 200,
		}],
		}]

      }
    ],


  });



});