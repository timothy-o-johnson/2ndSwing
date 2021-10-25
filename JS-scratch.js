parentSublistObj = {
  form: {
    fieldGroups: {
      parentfilters: {
        label: 'Parent Item Filters'
      }
    },
    fields: {
      custpage_brand: {
        container: 'parentfilters',
        id: 'custpage_brand',
        label: 'Brand',
        source: 'customrecord_g2_brand',
        type: 'SELECT',
        defaultValue: null
      },
      custpage_category: {
        container: 'parentfilters',
        id: 'custpage_category',
        label: 'Category',
        source: 'customrecord_g2_category',
        type: 'SELECT',
        defaultValue: null
      },
      custpage_parent_item: {
        container: 'parentfilters',
        id: 'custpage_parent_item',
        label: 'Parent Item',
        source: 'inventoryitem',
        type: 'SELECT',
        defaultValue: 'parentItem'
      }
    },
    hideNavBar: true,
    sublists: {
      custpage_parentlist: {
        fields: {
          custpage_thisone: {
            id: 'custpage_thisone',
            label: '&nbsp;',
            type: 'RADIO'
          },
          custpage_parentid: {
            id: 'custpage_parentid',
            label: '&nbsp;',
            type: 'text'
          }
        },
        label: 'Select Parent Item',
        type: 'list'
      }
    },
    title: 'Create Item',
    clientScriptModulePath: '/SuiteScripts/WMS/shared/ItemSelector-Client.js'
  },
  parentSublist: {
    fields: {
      custpage_thisone: {
        id: 'custpage_thisone',
        label: '&nbsp;',
        type: 'RADIO'
      },
      custpage_parentid: {
        id: 'custpage_parentid',
        label: '&nbsp;',
        type: 'text'
      }
    },
    label: 'Select Parent Item',
    type: 'list'
  },
  parentIdField: {
    id: 'custpage_parentid',
    label: '&nbsp;',
    type: 'text'
  },
  parentSublistFields: ['parent1', 'parent2', 'parent3']
}
