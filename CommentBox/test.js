// var sentiment = [{}];

// d3.json("communitycrit.json", function (err, json) {
//   console.log(json)
//   for (var i in json["ideas"]) {
//       comments.innerText = comments.innerText + "Proposal: " + json.ideas[i].id + " " + json.ideas[i].name + "\n"
//       for (var j in json.ideas[i].tasks){
//           comments.innerText = comments.innerText + "Task: " + json.ideas[i].tasks[j].id + " " + json.ideas[i].tasks[j].name + "\n"
//           for (var k in json.ideas[i].tasks[j].comments){
//               comments.innerText = comments.innerText + "\xa0\xa0\xa0\xa0\xa0\xa0" + json.ideas[i].tasks[j].comments[k].comment + "\n\n"
//           }
//       }
//   }
// });

d3.json("communitycrit.json", function (err, json) {
  console.log(json)
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


//     console.log(json[i].emotion)
//     if(json[i].sentiment_final == "neutral"){
//       neutral++;
//     }
//     else if(json[i].sentiment_final == "negative"){
//       negative++;
//     }
//     else if(json[i].sentiment_final == "positive"){
//       positive++;
//     }
//   }

//   sentiment['State'] = "sentiment"
//   sentiment['negative'] = negative
//   sentiment['neutral'] = neutral
//   sentiment['positive'] = positive
//   sentiment['columns'] = ["State", "negative", "neutral", "positive"]
// });
