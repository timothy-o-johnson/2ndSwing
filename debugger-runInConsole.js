require(['N'], function (N) {
  loadModules()

  try {
    //
    // insert code!

    //
  } catch (e) {
    console.error(e.message)
  }

  function loadModules () {
    for (var n in N) {
      window[n] = N[n]
    }
  }
})
