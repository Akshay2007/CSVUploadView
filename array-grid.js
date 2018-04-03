var dataModel = Ext.define('info', {
	extend: 'Ext.data.Model',
    fields:[
		{name: 'name', type: 'string'},
		{name: 'email', type: 'string'},
		{name: 'phone', type: 'string'}
    ]
});

var datastore = Ext.create('Ext.data.Store', {	
	storeId:'simpsonsStore',
	model:dataModel,    
    data:[
        { 'name': 'Lisa',  "email":"lisa@simpsons.com",  "phone":"555-111-1224"  },
        { 'name': 'Bart',  "email":"bart@simpsons.com",  "phone":"555-222-1234" },
        { 'name': 'Homer', "email":"home@simpsons.com",  "phone":"555-222-1244"  },
        { 'name': 'Marge', "email":"marge@simpsons.com", "phone":"555-222-1254"  }
    ]
});
var grid = Ext.create('Ext.grid.Panel', {
		id:"grid",
		title: 'Simpsons',
		store: datastore,
		columns: [
			{ header: 'Name',  dataIndex: 'name' },
			{ header: 'Email', dataIndex: 'email', flex: 1 },
			{ header: 'Phone', dataIndex: 'phone' }
		],
		height: 200,		
		
	});
Ext.onReady(function(){
	Ext.create('Ext.container.Container', {
    layout: {
        type: 'hbox'
    },
    width: 400,
    renderTo: Ext.getBody(),
    border: 1,
    style: {borderColor:'#000000', borderStyle:'solid', borderWidth:'1px'},
    defaults: {
        labelWidth: 80,
      
        flex: 1,
        style: {
            padding: '10px'
        }
    },
    items:grid 
});

});

