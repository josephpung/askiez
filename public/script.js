$(function(){

  var url = 'mongodb://localhost/27017/project'
  apiCaller(url)

  function apiCaller (link) {
    var apiCall = fetch(link) // get data from URL

    console.log('Api Call')

    apiCall
.then((response) => {
  // direct response to console
  console.log('Reponse received')
  return response.json()
}) // run writeLiEveryArticle function on the data that comes in from the fetch URL
.catch((err) => {
  console.log(err)
})
  }


})
