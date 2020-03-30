var ng1545 = {
  jirraLink: 'https://2ndswing.atlassian.net/browse/NG-1545',
  labelDimensions: `3" x 1"`,
  currentPrintCodeForLabels: `^XA^CI31^CF0,20^FO20,20^FB549,4,,^FH^FD
      New Mens Nike Leggings Large L Red MSRP $76 726172 / Brand New 10.0

      ^FS^FO20,97^A0N,40,30^BCN,75,Y,N,N^FD
      G0507693

      ^FS^FO360,100^CF0,30^FD
      2nd Swing Golf

      ^FS^FO360,135^CF0,24^FD
      Our Price:

      ^FS^FO490,135^CF0,24^FD
      30.99

      ^FS^FO360,165^CFB,2,2^FD
      MSRP Price:

      ^FS^FO490,165^CFB,2,2^FD
      75.99

      ^FS^XZ
      10:36:29.377 `,
  newQRLabel: `
          ^XA

      ^CFA,30
      ^FO50,100^FD{Label Description Line 1}^FS
      ^FO50,140^FD{Label Description Line 2}^FS

      ^CFB,40, 15
      ^FO50,200^FD{Label Description Line 2}^FS

      ^FO580,90^BQN,,9, ^FD12345678^FS

      ^XZ
          `
}

function printLabel (url, printQRLabel) {
  var title = 'Print Labels'
  var msg =
    '# of Labels to Print&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp'
  var buttons = { yes: 'Price', no: 'No Price' }
  var prompt = { autocapitalize: false }
  var fn

  if (printQRLabel) {
    fn = function (btn, text) {
      sendToPrinter(btn, text, printQRLabel)
    }
  } else {
    fn = function (btn, text) {
      sendToPrinter(btn, text)
    }
  }

  debugger

  Ext.Msg.show({
    title: title,
    msg: msg,
    buttons: buttons,
    prompt: prompt,
    fn: fn
  })
}
