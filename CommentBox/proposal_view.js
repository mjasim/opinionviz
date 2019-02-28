// Draw proposal-wise comments inside commentBox
function draw_proposal_wise_comments(json, idea_id) {
    //console.log(json)
    var myNode = document.getElementById("parentBox");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var divTask = []
    var divQuestion = []
    var divComment = []
    var prevQuestionId
    var divIdea = document.createElement("div")
    divIdea.className = "ideaDiv"
    divIdea.id = "ideaDivId-" + json.ideas[idea_id].id
    var node = document.createTextNode(json.ideas[idea_id].name)
    divIdea.appendChild(node)
    var element = document.getElementById("parentBox")
    element.appendChild(divIdea)
    for (var i in json.ideas[idea_id].tasks) {
        divTask[i] = document.createElement("div")
        divTask[i].className = "taskDiv"
        divTask[i].id = "taskDivId-" + json.ideas[idea_id].id + "-" + json.ideas[idea_id].tasks[i].id
        var node = document.createTextNode(json.ideas[idea_id].tasks[i].name)
        divTask[i].appendChild(node)
        var element = document.getElementById(divIdea.id)
        element.appendChild(divTask[i])
        for (var j in json.ideas[idea_id].tasks[i].comments) {
            if(json.ideas[idea_id].tasks[i].id == 12){
                divQuestion[j] = document.createElement("div")
                divQuestion[j].className = "questionDiv"
                divQuestion[j].id = "questionDivId-" + json.ideas[idea_id].id + "-" + json.ideas[idea_id].tasks[i].id + "-" + json.ideas[idea_id].tasks[i].comments[j].question_id
                if(prevQuestionId != divQuestion[j].id){
                    var node = document.createTextNode(json.ideas[idea_id].tasks[i].comments[j].question)
                    divQuestion[j].appendChild(node)
                    var element = document.getElementById(divTask[i].id)
                    element.appendChild(divQuestion[j])
                    prevQuestionId = divQuestion[j].id
                }
            }
            divComment[j] = document.createElement("div")
            divComment[j].className = "commentDiv" 
            divComment[j].id = "commentDivId-" + json.ideas[idea_id].id + "-" + json.ideas[idea_id].tasks[i].id + " " + json.ideas[idea_id].tasks[i].comments[j].comment_id
            var node = document.createTextNode(json.ideas[idea_id].tasks[i].comments[j].comment)
            divComment[j].appendChild(node)
            var element = document.getElementById(divTask[i].id)
            element.appendChild(divComment[j])
        }
    }
}

// Get filtered comments
function get_filtered_comment(json, filterobj) {
    var ideas = []
    for (var i in json["ideas"]) {
        if (filterobj.idea_id != null && json.ideas[i].id != filterobj.idea_id) {
            continue
        }
        var tasks = []
        for (var j in json.ideas[i].tasks) {
            if (filterobj.task_id != null && json.ideas[i].tasks[j].id != filterobj.task_id) {
                continue
            }
            var comments = []
            for (var k in json.ideas[i].tasks[j].comments) {

                var flag = true
                if (flag && filterobj.emotion != null && json.ideas[i].tasks[j].comments[k].emotion != filterobj.emotion) {
                    flag = false
                }
                if (flag && filterobj.sentiment_final != null && json.ideas[i].tasks[j].comments[k].sentiment_final != filterobj.sentiment_final) {
                    flag = false
                }
                if (flag && filterobj.subjectivity != null && json.ideas[i].tasks[j].comments[k].subjectivity != filterobj.subjectivity) {
                    flag = false
                }
                if (flag) {
                    comments.push(json.ideas[i].tasks[j].comments[k])
                }
            }
            if (comments.length) {
                var tempTask = json.ideas[i].tasks[j]
                tempTask.comments = comments
                tasks.push(tempTask)
            }
        }
        if (tasks.length) {
            var tempidea = json.ideas[i]
            tempidea.tasks = tasks
            ideas.push(tempidea)
        }
    }
    var filtered_comment = {"ideas": ideas}

    return filtered_comment
}

function draw_filtered_comments(filtered_comment) {

    var myNode = document.getElementById("parentBox");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var divIdea = []
    var divQuestion = []
    var divTask = []
    var divComment = []
    var prevQuestionId
    for (var i in filtered_comment["ideas"]) {
        divIdea[i] = document.createElement("div")
        divIdea[i].className = "ideaDiv"
        divIdea[i].id = "ideaDivId-" + filtered_comment.ideas[i].id
        var node = document.createTextNode(filtered_comment.ideas[i].name)
        divIdea[i].appendChild(node)
        var element = document.getElementById("parentBox")
        element.appendChild(divIdea[i])
        for (var j in filtered_comment.ideas[i].tasks) {
            divTask[j] = document.createElement("div")
            divTask[j].className = "taskDiv"
            divTask[j].id = "taskDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id
            var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].name)
            divTask[j].appendChild(node)
            var element = document.getElementById(divIdea[i].id)
            element.appendChild(divTask[j])
            for (var k in filtered_comment.ideas[i].tasks[j].comments) {
                if(filtered_comment.ideas[i].tasks[j].id == 12){
                    divQuestion[k] = document.createElement("div")
                    divQuestion[k].className = "questionDiv"
                    divQuestion[k].id = "questionDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + "-" + filtered_comment.ideas[i].tasks[j].comments[k].question_id
                    if(prevQuestionId != divQuestion[k].id){
                        var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].comments[k].question)
                        divQuestion[k].appendChild(node)
                        var element = document.getElementById(divTask[k].id)
                        element.appendChild(divQuestion[k])
                        prevQuestionId = divQuestion[k].id
                    }
                }
                divComment[k] = document.createElement("div")
                divComment[k].className = "commentDiv"
                divComment[k].id = "commentDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + " " + filtered_comment.ideas[i].tasks[j].comments[k].comment_id
                var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].comments[k].comment)
                divComment[k].appendChild(node)
                var element = document.getElementById(divTask[j].id)
                element.appendChild(divComment[k])
            }
        }
    }
}