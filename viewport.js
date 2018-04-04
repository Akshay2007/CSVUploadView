Ext.onReady(function() {
  Ext.Loader.setConfig({
    enabled: true
  });
  Ext.create('Ext.tab.Panel', {
    renderTo: Ext.getBody(),
    height: 850,
    width: 1000,
    items: [{
        xtype: 'panel',
        title: 'Tab One',

        items: [{
          xtype: 'form',
          itemId: 'uploadForm',
          border: false,
          fileUpload: true,
          items: [{
              xtype: 'fileuploadfield',
              itemId: 'fileUpload',
              name: 'file',
              buttonText: 'Upload',
              allowBlank: false,
              tooltip: 'monFileUpload',
              regex: /^.*\.(csv|CSV)$/,
              regexText: 'Only CSV files allowed'
            },
            {
              xtype: 'button',
              text: 'Save',
              handler: function() {
                var form = Ext.ComponentQuery.query('#uploadForm');

                if (form[0].form.isValid()) form[0].getForm().submit({
                  url: 'http://10.155.54.188:8080',
                  waitMsg: 'Uploading Please Wait...',
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
              tooltip: 'horizontal ruler',
              title: 'save',
              overflowText: 'horizontal ruler'
            }
          ]
        }]
      },
      {
        title: 'Tab Two',
        html: 'The second tab'
      }
    ],


  });



});