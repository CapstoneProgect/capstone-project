const getVendor = s => {
  const myRe = /.*\d.*/g
  let first3line = s.split('\n').slice(0, 2)
  let res = ''
  first3line.forEach(line => {
    if (!myRe.exec(line)) {
      res += line + ' '
    }
  })
  res = res.trim().toUpperCase()
  return res
}

const isFloat = x => {
  return !!(x % 1)
}

const makeLine = (dict, x, y, part) => {
  let range = []
  for (let i = y - 20; i < y + 40; i++) {
    range.push(i)
  }

  for (let each of range) {
    // ** if on the same line
    if (dict.hasOwnProperty(each)) {
      if (x > 600) {
        dict[each].price += part
      } else {
        dict[each].name += part
      }
      return
    }
  }
  // ** if on a different line
  if (x > 600) {
    dict[y] = {
      name: '',
      price: part
    }
  } else {
    dict[y] = {
      name: part,
      price: ''
    }
  }
}

function readReceipt(parsed) {
  console.log(parsed)
  try {
    let document = parsed.fullTextAnnotation
    //get vendor name
    let vendorStr = document.text
    let vendor = getVendor(vendorStr)
    // get products array
    let blocks = document.pages[0].blocks //27 blocks
    let dictionary = {}
    for (let block of blocks) {
      block.paragraphs.forEach(paragraph =>
        paragraph.words.forEach(word => {
          let x = word.boundingBox.vertices[0].x
          let y = word.boundingBox.vertices[0].y
          let part = word.symbols.map(symbol => symbol.text).join('') // part = the word
          if (part !== '$') makeLine(dictionary, x, y, part)
        })
      )
    }
    let products = []
    let totalPrice
    for (let itemKey in dictionary) {
      let item = dictionary[itemKey]
      if (
        item.price &&
        !isNaN(item.price) &&
        isFloat(item.price) &&
        !item.name.toLowerCase().includes('total') &&
        !item.name.toLowerCase().includes('due')
      ) {
        item.price = item.price[0] === '$' ? item.price.slice(1) : item.price
        item.categoryId = 1
        products.push(item)
      }
      //get total price
      if (
        item.price &&
        !isNaN(item.price) &&
        isFloat(item.price) &&
        (item.name.toLowerCase().includes('total') ||
          item.name.toLowerCase().includes('due'))
      ) {
        totalPrice = item.price[0] === '$' ? item.price.slice(1) : item.price
      }
    }
    let receiptDetails = {
      vendor: vendor,
      products: products,
      totalPrice: totalPrice
    }
    return receiptDetails
  } catch (err) {
    console.error(err)
    return {error: 'Unable to read receipt'}
  }
}

module.exports = readReceipt