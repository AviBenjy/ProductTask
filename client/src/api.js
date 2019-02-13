
const baseUrl = 'https://nodejs-express-1totwzee1.now.sh'


const getCategories = async () => {
  try {
    return await fetch(baseUrl + '/api/categorities').then(d => d.json())
  } 
  catch (error) {    
    return [
      'Toys & Games',
      'Games',
      'Clothing & Accessories',
      'Cell Phones',
      'Personal Computers',
      'Beauty',
      'Books'
    ]
  }

}

export default {
  getCategories
}