var dataModel = Ext.define('info', {
  extend: 'Ext.data.Model',
  fields: [{
      name: 'name',
      type: 'string'
    },
    {
      name: 'email',
      type: 'string'
    },
    {
      name: 'phone',
      type: 'string'
    },
    {
      name: 'address',
      type: 'string'
    },
    {
      name: 'insurType',
      type: 'string'
    }
  ]
});


var datastore = Ext.create('Ext.data.Store', {
  storeId: 'PatientsStore',
  model: dataModel,
  proxy: {
    type: 'rest',
    url: '/readCSV',
    method: "GET",
    useDefaultXhrHeader: false,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    noCache: false,

    reader: {
      type: 'json',
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
        title: 'Upload Patients Details',

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
              tooltip: 'monFileUpload',
              regex: /^.*\.(csv|CSV)$/,
              regexText: 'Only CSV files allowed'
            },

            {
              xtype: 'button',
              text: 'Upload',
              width: 70,
              handler: function() {
                var form = Ext.ComponentQuery.query('#uploadForm');

                if (form[0].form.isValid()) {
                  form[0].getForm().submit({
                    url: '/uploadCSV',
                    /*  waitMsg: 'Uploading Please Wait...',*/
                    method: 'POST',
                    success: function(r, a) {
                      console.log('service call success');
                      Ext.getCmp('grid').getStore().load();
                      Ext.getCmp('grid').getView().refresh();

                    },
                    failure: function(r, a) {
                      console.log('service call fail');
                    }
                  });


                  var datastore = Ext.create('Ext.data.Store', {
                    storeId: 'PatientsStore',
                    model: dataModel,
                    proxy: {
                      type: 'rest',
                      url: '/readCSV',
                      method: "GET",
                      useDefaultXhrHeader: false,
                      headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'
                      },
                      noCache: false,

                      reader: {
                        type: 'json',
                      }
                    },
                    autoLoad: true

                  });
                } else {
                  alert("Enter a CSV file");
                  form[0].form.reset();
                }
              },
              scope: this,
              title: 'save',
              overflowText: 'horizontal ruler'
            }
          ]
        }]
      },
      {
        title: 'Patients Details',
        xtype: 'container',
        layout: {
          type: 'hbox'
        },
        width: 400,

        border: 1,
        style: {
          borderColor: '#000000',
          borderStyle: 'solid',
          borderWidth: '1px'
        },
        defaults: {
          labelWidth: 80,
          flex: 1,
          style: {
            padding: '10px'
          }
        },
        items: [{
          xtype: 'panel',
          autoScroll: true,
          items: [{
              xtype: 'button',
              text: 'Refresh',
	      cls: 'refresh-button',
              handler: function() {
                Ext.getCmp('grid').getStore().load();
                Ext.getCmp('grid').getView().refresh();
              }
            },
            {
              xtype: 'grid',
              id: "grid",
              title: 'Patients Details',
              store: datastore,
              columns: [{
                  header: 'Name',
                  dataIndex: 'name',
                  flex: 0.25
                },
                {
                  header: 'Email',
                  dataIndex: 'email',
                  flex: 0.5
                },
                {
                  header: 'Phone',
                  dataIndex: 'phone'
                },
                {
                  header: 'Address',
                  dataIndex: 'address',
                  flex: 0.5
                },
                {
                  header: 'Insurance Type',
                  dataIndex: 'insurType'
                }
              ],
            height: 200
            },
            {
                xtype: 'displayfield',
                fieldLabel: 'Note',
		fieldLabelCls: 'class-for-refresh-field',
                name: 'home_score',
		cls:'note-for-refresh',
                value: 'Please click on the refresh button to view the updated records'
            }
          ],
        }]

      }
    ],


  });



});
