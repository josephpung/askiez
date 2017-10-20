$(function () {
  $('.up').click(function () {
    var id = $(this).attr('data')
    var currentUp = $(this).attr("upvotes")
    var currentNum = $(`#${id}`).text()
    $.post('/vote/upvote', {current: currentNum, obj: id, up: currentUp}, function (dataBack) {
      $(`#${id}`).text(dataBack)
    })
    $(this).attr("upvotes", parseInt(currentUp) +1)
  })

  $('.down').click(function () {
    var id = $(this).attr('data')
    var currentDown = $(this).attr("downvotes")
    var currentNum = $(`#${id}`).text()
    $.post('/vote/downvote', {current: currentNum, obj: id, down: currentDown}, function (dataBack) {
      $(`#${id}`).text(dataBack)

    })
    $(this).attr("downvotes", parseInt(currentDown) +1)
  })
})
