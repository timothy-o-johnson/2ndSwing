var adjustmentReasonsSearchResults = [
  {
    id: '1',
    scriptid: { value: 'VAL_52195172_4537321_SB1_766', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #1',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: { value: '1969', text: null },
    custrecord_adj_reason_position: { value: '22', text: null }
  },
  {
    id: '2',
    scriptid: { value: 'VAL_52195177_4537321_SB1_441', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #2',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: { value: '1969', text: null },
    custrecord_adj_reason_position: { value: '22', text: null }
  },
  {
    id: '3',
    scriptid: { value: 'VAL_52195178_4537321_SB1_372', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #3',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: { value: '1969', text: null },
    custrecord_adj_reason_position: { value: '22', text: null }
  },
  {
    id: '4',
    scriptid: { value: 'VAL_52195179_4537321_SB1_305', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #3',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: { value: '1969', text: null },
    custrecord_adj_reason_position: { value: '12', text: null }
  },
  {
    id: '5',
    scriptid: { value: 'VAL_52195180_4537321_SB1_196', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #3',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: { value: '1969', text: null },
    custrecord_adj_reason_position: { value: '1', text: null }
  },
  {
    id: '6',
    scriptid: { value: 'VAL_52195181_4537321_SB1_372', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #5',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'beep beep, my thoughts are deep',
      text: null
    },
    custrecord_adj_reason_account: { value: '1969', text: null },
    custrecord_adj_reason_position: { value: '2', text: null }
  },
  {
    id: '7',
    scriptid: { value: 'VAL_52195184_4537321_SB1_292', text: null },
    custrecord_adj_reason_name: {
      value: 'Obama... Adjustment Reason Test Record #6',
      text: null
    },
    custrecord_adj_reason_memo: {
      value:
        "There's not a liberal America and a conservative America-- there' s a United States of America",
      text: null
    },
    custrecord_adj_reason_account: { value: '2040', text: null },
    custrecord_adj_reason_position: { value: '2', text: null }
  },
  {
    id: '8',
    scriptid: { value: 'VAL_52195185_4537321_SB1_512', text: null },
    custrecord_adj_reason_name: {
      value: 'Beware... Adjustment Reason Test Record #7',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'flip flop, do the wop',
      text: null
    },
    custrecord_adj_reason_account: { value: '1776', text: null },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '9',
    scriptid: { value: 'VAL_52195197_4537321_SB1_260', text: null },
    custrecord_adj_reason_name: {
      value: 'Abraham Lincoln... Adjustment Reason Test Record #7',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'four score... and seven years ago',
      text: null
    },
    custrecord_adj_reason_account: { value: '1865', text: null },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '10',
    scriptid: { value: 'VAL_52195200_4537321_SB1_228', text: null },
    custrecord_adj_reason_name: {
      value: 'Grant... Adjustment Reason Test Record #8',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'I have never advocated war except as a means of peace',
      text: null
    },
    custrecord_adj_reason_account: { value: '1885', text: null },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '11',
    scriptid: { value: 'VAL_52195201_4537321_SB1_778', text: null },
    custrecord_adj_reason_name: {
      value: 'Hamilton... Adjustment Reason Test Record #9',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'Those who stand for nothing fall for anything.',
      text: null
    },
    custrecord_adj_reason_account: { value: '1804', text: null },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '12',
    scriptid: { value: 'VAL_52195202_4537321_SB1_615', text: null },
    custrecord_adj_reason_name: {
      value: 'Roosevelt ... Adjustment Reason Test Record #9',
      text: null
    },
    custrecord_adj_reason_memo: {
      value:
        'If you treat people right, they will treat you right... 90% of the time.',
      text: null
    },
    custrecord_adj_reason_account: { value: '1945', text: null },
    custrecord_adj_reason_position: { value: '4', text: null }
  }
]

console.log(getAdjustmentReasonsArr(adjustmentReasonsSearchResults))

function getAdjustmentReasonsArr (adjustmentReasonsSearchResults) {
  var adjReasonData, adjustName
  var adjReasonsDataObj = {}
  var adjReasonsArr = []

  var label, memo, name, position

  adjustmentReasonsSearchResults.forEach(function (adjReason) {
    memo = adjReason['custrecord_adj_reason_memo'].value
    name = adjReason['custrecord_adj_reason_name'].value
    position = adjReason['custrecord_adj_reason_position'].value

    label = adjReasonData = {
      //label: position + '. ' + name,
      memo: memo,
      name: name,
      position: position
    }

    adjReasonsDataObj[adjustName] = adjReasonData

    adjReasonsArr.push(adjReasonsDataObj[adjustName])
  })

  return adjReasonsArr
}

var data = [
  {
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #1',
    position: '22'
  },
  {
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #2',
    position: '22'
  },
  {
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #3',
    position: '22'
  },
  {
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #3',
    position: '12'
  },
  {
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #3',
    position: '1'
  },
  {
    memo: 'beep beep, my thoughts are deep',
    name: 'Adjustment Reason Test Record #5',
    position: '2'
  },
  {
    memo:
      "There's not a liberal America and a conservative America-- there' s a United States of America",
    name: 'Obama... Adjustment Reason Test Record #6',
    position: '2'
  },
  {
    memo: 'flip flop, do the wop',
    name: 'Beware... Adjustment Reason Test Record #7',
    position: '4'
  },
  {
    memo: 'four score... and seven years ago',
    name: 'Abraham Lincoln... Adjustment Reason Test Record #7',
    position: '4'
  },
  {
    memo: 'I have never advocated war except as a means of peace',
    name: 'Grant... Adjustment Reason Test Record #8',
    position: '4'
  },
  {
    memo: 'Those who stand for nothing fall for anything.',
    name: 'Hamilton... Adjustment Reason Test Record #9',
    position: '4'
  },
  {
    memo:
      'If you treat people right, they will treat you right... 90% of the time.',
    name: 'Roosevelt ... Adjustment Reason Test Record #9',
    position: '4'
  }
]

var adjReasonsSearchResults = [
  {
    id: '1',
    scriptid: { value: 'VAL_52195172_4537321_SB1_766', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #1',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: { value: '328', text: '1000 Petty Cash' },
    custrecord_adj_reason_position: { value: '22', text: null }
  },
  {
    id: '2',
    scriptid: { value: 'VAL_52195177_4537321_SB1_441', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #2',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: {
      value: '130',
      text: '1011 Bridgewater Bank 0082'
    },
    custrecord_adj_reason_position: { value: '22', text: null }
  },
  {
    id: '3',
    scriptid: { value: 'VAL_52195178_4537321_SB1_372', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #3',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: {
      value: '153',
      text: '2005 Bonuses Payable'
    },
    custrecord_adj_reason_position: { value: '22', text: null }
  },
  {
    id: '4',
    scriptid: { value: 'VAL_52195179_4537321_SB1_305', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #3',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: {
      value: '458',
      text: '2121 Accrued Expenses : Accrued Expenses - Gen.'
    },
    custrecord_adj_reason_position: { value: '12', text: null }
  },
  {
    id: '5',
    scriptid: { value: 'VAL_52195180_4537321_SB1_196', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #3',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'memo memo, have you heard my demo?',
      text: null
    },
    custrecord_adj_reason_account: {
      value: '154',
      text: '2010 Customer Deposits'
    },
    custrecord_adj_reason_position: { value: '1', text: null }
  },
  {
    id: '6',
    scriptid: { value: 'VAL_52195181_4537321_SB1_372', text: null },
    custrecord_adj_reason_name: {
      value: 'Adjustment Reason Test Record #5',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'beep beep, my thoughts are deep',
      text: null
    },
    custrecord_adj_reason_account: {
      value: '456',
      text: '2123 Accrued Expenses : Accrued Expenses - CC Fees'
    },
    custrecord_adj_reason_position: { value: '2', text: null }
  },
  {
    id: '7',
    scriptid: { value: 'VAL_52195184_4537321_SB1_292', text: null },
    custrecord_adj_reason_name: {
      value: 'Obama... Adjustment Reason Test Record #6',
      text: null
    },
    custrecord_adj_reason_memo: {
      value:
        "There's not a liberal America and a conservative America-- there' s a United States of America",
      text: null
    },
    custrecord_adj_reason_account: {
      value: '456',
      text: '2123 Accrued Expenses : Accrued Expenses - CC Fees'
    },
    custrecord_adj_reason_position: { value: '2', text: null }
  },
  {
    id: '8',
    scriptid: { value: 'VAL_52195185_4537321_SB1_512', text: null },
    custrecord_adj_reason_name: {
      value: 'Beware... Adjustment Reason Test Record #7',
      text: null
    },
    custrecord_adj_reason_memo: { value: 'flip flop, do the wop', text: null },
    custrecord_adj_reason_account: {
      value: '459',
      text: '2122 Accrued Expenses : Accured Expenses - Adv.'
    },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '9',
    scriptid: { value: 'VAL_52195197_4537321_SB1_260', text: null },
    custrecord_adj_reason_name: {
      value: 'Abraham Lincoln... Adjustment Reason Test Record #7',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'four score... and seven years ago',
      text: null
    },
    custrecord_adj_reason_account: {
      value: '108',
      text: '4051 Shipping and Handling'
    },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '10',
    scriptid: { value: 'VAL_52195200_4537321_SB1_228', text: null },
    custrecord_adj_reason_name: {
      value: 'Grant... Adjustment Reason Test Record #8',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'I have never advocated war except as a means of peace',
      text: null
    },
    custrecord_adj_reason_account: { value: '328', text: '1000 Petty Cash' },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '11',
    scriptid: { value: 'VAL_52195201_4537321_SB1_778', text: null },
    custrecord_adj_reason_name: {
      value: 'Hamilton... Adjustment Reason Test Record #9',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'Those who stand for nothing fall for anything.',
      text: null
    },
    custrecord_adj_reason_account: {
      value: '1494',
      text: '1008 Bridgewater Bank 1522'
    },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '12',
    scriptid: { value: 'VAL_52195202_4537321_SB1_615', text: null },
    custrecord_adj_reason_name: {
      value: 'Roosevelt ... Adjustment Reason Test Record #9',
      text: null
    },
    custrecord_adj_reason_memo: {
      value:
        'If you treat people right, they will treat you right... 90% of the time.',
      text: null
    },
    custrecord_adj_reason_account: { value: '177', text: '4200 Service Sales' },
    custrecord_adj_reason_position: { value: '4', text: null }
  },
  {
    id: '13',
    scriptid: { value: 'VAL_52196036_4537321_SB1_467', text: null },
    custrecord_adj_reason_name: { value: 'Clearance', text: null },
    custrecord_adj_reason_memo: { value: 'Going to Clearance.', text: null },
    custrecord_adj_reason_account: {
      value: '124',
      text: '5010 Merchandise COGS : Cost of Goods Sold'
    },
    custrecord_adj_reason_position: { value: '1', text: null }
  },
  {
    id: '14',
    scriptid: { value: 'VAL_52196037_4537321_SB1_268', text: null },
    custrecord_adj_reason_name: {
      value: 'Ghosting Issue in Club Trader (Store Credit)',
      text: null
    },
    custrecord_adj_reason_memo: {
      value: 'Ghosting Issue in Club Trader',
      text: null
    },
    custrecord_adj_reason_account: { value: '163', text: '2500 Store Credit' },
    custrecord_adj_reason_position: { value: '2', text: null }
  }
]

// Disable #x
$('#x').prop('disabled', true)

// Enable #x
$('#x').prop('disabled', false)

var dog = encodeURIComponent(JSON.stringify(dof))

var adjReasonsObj = {
  adjReasonsObj: {
    'Adjustment Reason Test Record #3': {
      dropDownPosition: 0,
      memo: 'memo memo, have you heard my demo?',
      name: 'Adjustment Reason Test Record #3',
      position: '1'
    },
    Clearance: {
      dropDownPosition: 1,
      memo: 'Going to Clearance.',
      name: 'Clearance',
      position: '1'
    },
    'Adjustment Reason Test Record #5': {
      dropDownPosition: 2,
      memo: 'beep beep, my thoughts are deep',
      name: 'Adjustment Reason Test Record #5',
      position: '2'
    },
    'Ghosting Issue in Club Trader (Store Credit)': {
      dropDownPosition: 3,
      memo: 'Ghosting Issue in Club Trader',
      name: 'Ghosting Issue in Club Trader (Store Credit)',
      position: '2'
    },
    'Obama... Adjustment Reason Test Record #6': {
      dropDownPosition: 4,
      memo:
        "There's not a liberal America and a conservative America-- there' s a United States of America",
      name: 'Obama... Adjustment Reason Test Record #6',
      position: '2'
    },
    'Abraham Lincoln... Adjustment Reason Test Record #7': {
      dropDownPosition: 5,
      memo: 'four score... and seven years ago',
      name: 'Abraham Lincoln... Adjustment Reason Test Record #7',
      position: '4'
    },
    'Beware... Adjustment Reason Test Record #7': {
      dropDownPosition: 6,
      memo: 'flip flop, do the wop',
      name: 'Beware... Adjustment Reason Test Record #7',
      position: '4'
    },
    'Grant... Adjustment Reason Test Record #8': {
      dropDownPosition: 7,
      memo: 'I have never advocated war except as a means of peace',
      name: 'Grant... Adjustment Reason Test Record #8',
      position: '4'
    },
    'Hamilton... Adjustment Reason Test Record #9': {
      dropDownPosition: 8,
      memo: 'Those who stand for nothing fall for anything.',
      name: 'Hamilton... Adjustment Reason Test Record #9',
      position: '4'
    },
    'Roosevelt ... Adjustment Reason Test Record #9': {
      dropDownPosition: 9,
      memo:
        'If you treat people right, they will treat you right... 90% of the time.',
      name: 'Roosevelt ... Adjustment Reason Test Record #9',
      position: '4'
    },
    'Adjustment Reason Test Record #3_1': {
      dropDownPosition: 13,
      memo: 'memo memo, have you heard my demo?',
      name: 'Adjustment Reason Test Record #3',
      position: '22'
    },
    'Adjustment Reason Test Record #1': {
      dropDownPosition: 11,
      memo: 'memo memo, have you heard my demo?',
      name: 'Adjustment Reason Test Record #1',
      position: '22'
    },
    'Adjustment Reason Test Record #2': {
      dropDownPosition: 12,
      memo: 'memo memo, have you heard my demo?',
      name: 'Adjustment Reason Test Record #2',
      position: '22'
    }
  },
  dropDownSelectionArr: [
    'Adjustment Reason Test Record #3',
    'Clearance',
    'Adjustment Reason Test Record #5',
    'Ghosting Issue in Club Trader (Store Credit)',
    'Obama... Adjustment Reason Test Record #6',
    'Abraham Lincoln... Adjustment Reason Test Record #7',
    'Beware... Adjustment Reason Test Record #7',
    'Grant... Adjustment Reason Test Record #8',
    'Hamilton... Adjustment Reason Test Record #9',
    'Roosevelt ... Adjustment Reason Test Record #9',
    'Adjustment Reason Test Record #3',
    'Adjustment Reason Test Record #1',
    'Adjustment Reason Test Record #2',
    'Adjustment Reason Test Record #3'
  ]
}

var adjObj = {
  'Adjustment Reason Test Record #3': {
    dropDownPosition: 0,
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #3',
    position: '1'
  },
  Clearance: {
    dropDownPosition: 1,
    memo: 'Going to Clearance.',
    name: 'Clearance',
    position: '1'
  },
  'Adjustment Reason Test Record #5': {
    dropDownPosition: 2,
    memo: 'beep beep, my thoughts are deep',
    name: 'Adjustment Reason Test Record #5',
    position: '2'
  },
  'Ghosting Issue in Club Trader (Store Credit)': {
    dropDownPosition: 3,
    memo: 'Ghosting Issue in Club Trader',
    name: 'Ghosting Issue in Club Trader (Store Credit)',
    position: '2'
  },
  'Obama... Adjustment Reason Test Record #6': {
    dropDownPosition: 4,
    memo:
      "There's not a liberal America and a conservative America-- there' s a United States of America",
    name: 'Obama... Adjustment Reason Test Record #6',
    position: '2'
  },
  'Abraham Lincoln... Adjustment Reason Test Record #7': {
    dropDownPosition: 5,
    memo: 'four score... and seven years ago',
    name: 'Abraham Lincoln... Adjustment Reason Test Record #7',
    position: '4'
  },
  'Beware... Adjustment Reason Test Record #7': {
    dropDownPosition: 6,
    memo: 'flip flop, do the wop',
    name: 'Beware... Adjustment Reason Test Record #7',
    position: '4'
  },
  'Grant... Adjustment Reason Test Record #8': {
    dropDownPosition: 7,
    memo: 'I have never advocated war except as a means of peace',
    name: 'Grant... Adjustment Reason Test Record #8',
    position: '4'
  },
  'Hamilton... Adjustment Reason Test Record #9': {
    dropDownPosition: 8,
    memo: 'Those who stand for nothing fall for anything.',
    name: 'Hamilton... Adjustment Reason Test Record #9',
    position: '4'
  },
  'Roosevelt ... Adjustment Reason Test Record #9': {
    dropDownPosition: 9,
    memo:
      'If you treat people right, they will treat you right... 90% of the time.',
    name: 'Roosevelt ... Adjustment Reason Test Record #9',
    position: '4'
  },
  'Adjustment Reason Test Record #3_1': {
    dropDownPosition: 13,
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #3',
    position: '22'
  },
  'Adjustment Reason Test Record #1': {
    dropDownPosition: 11,
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #1',
    position: '22'
  },
  'Adjustment Reason Test Record #2': {
    dropDownPosition: 12,
    memo: 'memo memo, have you heard my demo?',
    name: 'Adjustment Reason Test Record #2',
    position: '22'
  }
}

var updatedObj = {
  'Adjustment Reason Test Record #3': {
    dropDownPosition: 0,
    memo: { value: 'memo memo, have you heard my demo?', text: null },
    name: 'Adjustment Reason Test Record #3',
    position: '1'
  },
  Clearance: {
    dropDownPosition: 1,
    memo: { value: 'Going to Clearance.', text: null },
    name: 'Clearance',
    position: '1'
  },
  'Adjustment Reason Test Record #5': {
    dropDownPosition: 2,
    memo: { value: 'beep beep, my thoughts are deep', text: null },
    name: 'Adjustment Reason Test Record #5',
    position: '2'
  },
  'Ghosting Issue in Club Trader (Store Credit)': {
    dropDownPosition: 3,
    memo: { value: 'Ghosting Issue in Club Trader', text: null },
    name: 'Ghosting Issue in Club Trader (Store Credit)',
    position: '2'
  },
  'Obama... Adjustment Reason Test Record #6': {
    dropDownPosition: 4,
    memo: {
      value:
        "There's not a liberal America and a conservative America-- there' s a United States of America",
      text: null
    },
    name: 'Obama... Adjustment Reason Test Record #6',
    position: '2'
  },
  'Abraham Lincoln... Adjustment Reason Test Record #7': {
    dropDownPosition: 5,
    memo: { value: 'four score... and seven years ago', text: null },
    name: 'Abraham Lincoln... Adjustment Reason Test Record #7',
    position: '4'
  },
  'Beware... Adjustment Reason Test Record #7': {
    dropDownPosition: 6,
    memo: { value: 'flip flop, do the wop', text: null },
    name: 'Beware... Adjustment Reason Test Record #7',
    position: '4'
  },
  'Grant... Adjustment Reason Test Record #8': {
    dropDownPosition: 7,
    memo: {
      value: 'I have never advocated war except as a means of peace',
      text: null
    },
    name: 'Grant... Adjustment Reason Test Record #8',
    position: '4'
  },
  'Hamilton... Adjustment Reason Test Record #9': {
    dropDownPosition: 8,
    memo: {
      value: 'Those who stand for nothing fall for anything.',
      text: null
    },
    name: 'Hamilton... Adjustment Reason Test Record #9',
    position: '4'
  },
  'Roosevelt ... Adjustment Reason Test Record #9': {
    dropDownPosition: 9,
    memo: {
      value:
        'If you treat people right, they will treat you right... 90% of the time.',
      text: null
    },
    name: 'Roosevelt ... Adjustment Reason Test Record #9',
    position: '4'
  },
  'Adjustment Reason Test Record #3_1': {
    dropDownPosition: 13,
    memo: { value: 'memo memo, have you heard my demo?', text: null },
    name: 'Adjustment Reason Test Record #3',
    position: '22'
  },
  'Adjustment Reason Test Record #1': {
    dropDownPosition: 11,
    memo: { value: 'memo memo, have you heard my demo?', text: null },
    name: 'Adjustment Reason Test Record #1',
    position: '22'
  },
  'Adjustment Reason Test Record #2': {
    dropDownPosition: 12,
    memo: { value: 'memo memo, have you heard my demo?', text: null },
    name: 'Adjustment Reason Test Record #2',
    position: '22'
  }
}

<input name="inpt_account" type="text" value="1000 Petty Cash" class="dropdownInput textbox" onkeydown="getDropdown(this).handleKeydown(event);" onkeypress="getDropdown(this).handleKeypress(event);" onfocus="getDropdown(this).handleOnFocus(event);" onblur="getDropdown(this).handleOnBlur(event);" aria-labelledby="account_fs_lbl" autocomplete="off" contenteditable="false" role="combobox" id="inpt_account2" title="1000 Petty Cash" style="width: 280px; background-color: rgb(255, 255, 255);" disabled="">