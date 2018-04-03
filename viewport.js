Ext.onReady(function() {
  Ext.Loader.setConfig({enabled:true});
  Ext.create('Ext.tab.Panel', {
    renderTo: Ext.getBody(),
    height: 850,
    width: 1000,
    items: [{
        xtype: 'panel',
        title: 'Tab One',

        items: [{
          xtype: 'form',
          itemId: 'monForm',
          url: 'php/webServiceProjet.php?upload=1',
          border: false,
          fileUpload: true,
          items: [{
            xtype: 'fileuploadfield',
            id: 'monFileUpload',
            name: 'monFileUpload',
            buttonText: 'Upload',
	          allowBlank: false,	
            tooltip: 'monFileUpload',
          	regex: /^.*\.(csv|CSV)$/,
          	regexText: 'Only CSV files allowed'
          },
          {xtype: 'button',
                 text: 'Click me',
                handler: function(){
                     var form = Ext.ComponentQuery.query('#monForm');
                     
                     if (form[0].form.isValid()) 
                     {
			form[0].form.submit({url: 'http://10.155.54.188:8080/upload'});
                        
                     }
                     
                     else
                     {
                     	alert("Enter a CSV file");
                        form[0].form.reset();
                     }
                },
                scope: this,
                tooltip: 'horizontal ruler',
           title: 'save',
                overflowText: 'horizontal ruler'}       ]
        }]
      },
      {
        title: 'Tab Two',
        html: 'The second tab'
      }
    ],


  });



});
/* 

var datastore = Ext.create('Ext.data.Store', {
  storeId: 'simpsonsStore',
  model: dataModel,
  data: [{
      'name': 'Lisa',
      "email": "lisa@simpsons.com",
      "phone": "555-111-1224"
    },
    {
      'name': 'Bart',
      "email": "bart@simpsons.com",
      "phone": "555-222-1234"
    },
    {
      'name': 'Homer',
      "email": "home@simpsons.com",
      "phone": "555-222-1244"
    },
    {
      'name': 'Marge',
      "email": "marge@simpsons.com",
      "phone": "555-222-1254"
    }
  ]
});
var grid = Ext.create('Ext.grid.Panel', {
  id: "grid",
  title: 'Simpsons',
  store: datastore,
  selType: 'rowmodel',
  plugins: [
    Ext.create('Ext.grid.plugin.RowEditing', {
      clicksToEdit: 1
    })
  ],
  columns: [{
      header: 'Name',
      dataIndex: 'name',
      editor: {
        xtype: 'textfield',
        allowBlank: false
      }
    },
    {
      header: 'Email',
      dataIndex: 'email',
      flex: 1,
      editor: {
        xtype: 'textfield',
        allowBlank: false
      }
    },
    {
      header: 'Phone',
      dataIndex: 'phone'
    }
  ],
  height: 200,

});
 */