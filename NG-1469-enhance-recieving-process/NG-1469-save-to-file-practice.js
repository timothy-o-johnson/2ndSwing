require(['N/file'], function (file) {
  function saveParamsToFile (params) {
    var dateTime = new Date().toString().split(' ') // ['Wed', 'Dec', '11', '2019', '20:52:27', 'GMT-0500', '(Eastern', 'Standard', 'Time)']
    var dateTime = dateTime[2] + dateTime[1] + dateTime[3] + '-' + dateTime[4]
    var fileName = 'EditLineData-' + dateTime + '.txt'

    params = JSON.stringify(params)

    var fileObj = file.create({
      name: fileName,
      fileType: file.Type.PLAINTEXT,
      contents: params
    })
      
    fileObj.folder = 28697 // SuiteScripts/WMS/shared/EditLineData



    var id = fileObj.save()
  
  }

  saveParamsToFile()
})

fileObj = file.load({
  id: id
})
