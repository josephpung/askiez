$(function(){
$(".up").click(function(){


  var id = $(this).attr("data")
  var currentNum = $(`#${id}`).text()
    $.post("/upvote", {changeBy: 1, current: currentNum, obj: id}, function(dataBack){

        $(`#${id}`).text(dataBack);
    })
})
$(".down").click(function(){

  var id = $(this).attr("data")
  var currentNum = $(`#${id}`).text()
    $.post("/downvote", {changeBy: 1, current: currentNum, obj: id}, function(dataBack){

        $(`#${id}`).text(dataBack);
    })

})


})
