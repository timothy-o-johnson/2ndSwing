const Freemarker = require('freemarker')

const freemarker = new Freemarker()

freemarker.render(
  '<h1>${title}</h1>',
  { title: 'test render' },
  (err, result) => {
    if (err) {
      throw new Error(err)
    }
    console.log(result)
  }
)
