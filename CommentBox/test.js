// Read json file and create commentBox
d3.json("communitycrit.json", function (err, json) {
  //console.log(json)

  //fetch proposal_names (row-wise)
  var proposal_names = get_proposal_names(json)
  console.log(proposal_names)

  //fetch proposal-wise information (row-wise)
  var proposal_wise_sentiment_agg = get_proposal_wise_sentiment(json)
  var proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
  var proposal_wise_subjectivity_agg = get_proposal_wise_subjectivity(json)
  var proposal_wise_profanity_agg = get_proposal_wise_profanity(json)
  //console.log(proposal_wise_sentiment_agg)
  //console.log(proposal_wise_emotion_agg)
  //console.log(proposal_wise_subjectivity_agg)
  //console.log(proposal_wise_profanity_agg)

  // fetch all-proposal information (column-wise)
  var all_proposal_sentiment_agg = get_all_proposal_sentiment(json)
  var all_proposal_emotion_agg = get_all_proposal_emotion(json)
  var all_proposal_subjectivity_agg = get_all_proposal_subjectivity(json)
  var all_proposal_profanity_agg = get_all_proposal_profanity(json)
  //console.log(all_proposal_sentiment_agg)
  //console.log(all_proposal_emotion_agg)
  //console.log(all_proposal_subjectivity_agg)
  //console.log(all_proposal_profanity_agg)

  var divIdea = []
  var divTask = []
  var divComment = []
  for (var i in json["ideas"]) {
    divIdea[i] = document.createElement("div")
    divIdea[i].className = "ideaDiv"
    divIdea[i].id = "ideaDivId-" + json.ideas[i].id
    var node = document.createTextNode(json.ideas[i].name)
    divIdea[i].appendChild(node)
    var element = document.getElementById("parentBox")
    element.appendChild(divIdea[i])
    for (var j in json.ideas[i].tasks) {
      divTask[j] = document.createElement("div")
      divTask[j].className = "taskDiv"
      divTask[j].id = "taskDivId-" + json.ideas[i].id + "-" + json.ideas[i].tasks[j].id
      var node = document.createTextNode(json.ideas[i].tasks[j].name)
      divTask[j].appendChild(node)
      var element = document.getElementById(divIdea[i].id)
      element.appendChild(divTask[j])
      for (var k in json.ideas[i].tasks[j].comments) {
        divComment[k] = document.createElement("div")
        divComment[k].className = "commentDiv"
        divComment[k].id = "commentDivId-" + json.ideas[i].id + "-" + json.ideas[i].tasks[j].id + " " + json.ideas[i].tasks[j].comments[k].comment_id
        var node = document.createTextNode(json.ideas[i].tasks[j].comments[k].comment)
        divComment[k].appendChild(node)
        var element = document.getElementById(divTask[j].id)
        element.appendChild(divComment[k])
      }
    }
  }
});

