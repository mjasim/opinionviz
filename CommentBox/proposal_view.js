// Find corresponding awesome emoticon
function find_emoticon(emo){
    if(emo == "Angry"){
        tempEmo = "fa-angry"
    }
    else if(emo == "Fear"){
        tempEmo = "fa-flushed"
    }
    else if(emo == "Sad"){
        tempEmo = "fa-frown"
    }
    else if(emo == "Bored"){
        tempEmo = "fa-meh"
    }
    else if(emo == "Happy"){
        tempEmo = "fa-smile"
    }
    else if(emo == "Excited"){
        tempEmo = "fa-smile-beam"
    }
    return tempEmo
}


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
            if (json.ideas[idea_id].tasks[i].id == 12) {
                divQuestion[j] = document.createElement("div")
                divQuestion[j].className = "questionDiv"
                divQuestion[j].id = "questionDivId-" + json.ideas[idea_id].id + "-" + json.ideas[idea_id].tasks[i].id + "-" + json.ideas[idea_id].tasks[i].comments[j].question_id
                if (prevQuestionId != divQuestion[j].id) {
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
                if (flag && filterobj.emotion != null && json.ideas[i].tasks[j].comments[k].emotion.toLowerCase() != filterobj.emotion.toLowerCase()) {
                    flag = false
                }
                if (flag && filterobj.sentiment_final != null && (json.ideas[i].tasks[j].comments[k].sentiment_final).toLowerCase() != filterobj.sentiment_final.toLowerCase()) {
                    flag = false
                }
                if (flag && filterobj.subjectivity != null && json.ideas[i].tasks[j].comments[k].subjectivity.toLowerCase() != filterobj.subjectivity.toLowerCase()) {
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
    var filtered_comment = { "ideas": ideas }
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
    var prevQuestionId = ""
    for (var i in filtered_comment["ideas"]) {
        divIdea[i] = document.createElement("div")
        divIdea[i].className = "ideaDiv"
        divIdea[i].id = "ideaDivId-" + filtered_comment.ideas[i].id;
        //var node = document.createTextNode(filtered_comment.ideas[i].name);
        //divIdea[i].appendChild(node)
        var divIdeaHTML = '<h1>' + filtered_comment.ideas[i].name + '</h1>';
        var divIdeaHTML = divIdeaHTML + '<p>' + "It would be brilliant if the entire length of 14th street was closed to motor traffic and was a truly pedestrian promenade. The only exception could be the small Free Ride carts that could transport people up and down the street. This would not only provide a pleasant safe space for people and pets to walk, but would also create space for outdoor seating, more trees and greenery, more and safer play areas, as well as food places with real sidewalk seating that is not disrupted by air pollution and motor noise. " + '</p>';
        divIdea[i].innerHTML = divIdeaHTML;
        var element = document.getElementById("parentBox")
        element.appendChild(divIdea[i])
        for (var j in filtered_comment.ideas[i].tasks) {
            divTask[j] = document.createElement("div")
            divTask[j].className = "taskDiv"
            divTask[j].id = "taskDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id
            //var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].name)
            //divTask[j].appendChild(node)

            var divTaskHTML = '<h2>' + filtered_comment.ideas[i].tasks[j].name + '</h2>';
            divTask[j].innerHTML = divTaskHTML;
            var element = document.getElementById(divIdea[i].id);
            element.appendChild(divTask[j]);

            for (var k in filtered_comment.ideas[i].tasks[j].comments) {

                //var awesome_emoticon = "<i class=far " + find_emoticon(filtered_comment.ideas[i].tasks[j].comments[k].emotion) + "></i>"
                var awesome_emoticon = "<i class=" + "far fa-smile" + "></i>"

                console.log(awesome_emoticon)
                
                if (filtered_comment.ideas[i].tasks[j].id == 12) {
                    divQuestion[k] = document.createElement("div")
                    divQuestion[k].className = "questionDiv"
                    divQuestion[k].id = "questionDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + "-" + filtered_comment.ideas[i].tasks[j].comments[k].quesion_id
                    var image = "/images/avatar.jpg";
                    if (prevQuestionId != divQuestion[k].id) {
                        var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].comments[k].question)
                        divQuestion[k].appendChild(node)
                        var divQuestionHTML =

                            "<div class=\"comment-author\">" +
                            "<div style='float: left; padding-right: 15px;padding-top: 5px;'>" +
                            "<img src=\"" + image + "\" width='27px' style='border-radius: 50%;'/></div>" +
                            "<div><div>" + " author name" + "</div>" +
                            '<div style="color: #888;"' + '> one year ago' + '</div></div>' +
                            "</div>" +
                            "<div class=\"comment-body\"" + "\">" +
                            "<p>" + filtered_comment.ideas[i].tasks[j].comments[k].question + "</p>" +
                            'inlined angry comment <span class="emoticon_button" id="span_id" >' +
                            '<i class="far fa-angry"></i>' +
                            '</span>'
                            + ' comment goes on';

                        divQuestion[k].innerHTML = divQuestionHTML;
                        var element = document.getElementById(divTask[j].id)
                        element.appendChild(divQuestion[k])
                        prevQuestionId = divQuestion[k].id
                    }
                }
                divComment[k] = document.createElement("div")
                divComment[k].className = "commentDiv"
                divComment[k].id = "commentDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + "-" + filtered_comment.ideas[i].tasks[j].comments[k].comment_id;
                var image = "/images/avatar.jpg";
                var divCommentHTML =

                    "<div class=\"comment-author\">" +
                    "<div style='float: left; padding-right: 15px;padding-top: 5px;'>" +
                    "<img src=\"" + image + "\" width='27px' style='border-radius: 50%;'/></div>" +
                    "<div><div>" + " author name" + "</div>" +
                    '<div style="color: #888;"' + '> one year ago' + '</div></div>' +
                    "</div>" +
                    "<div class=\"comment-body\"" + "\">" +
                    "<p>" + filtered_comment.ideas[i].tasks[j].comments[k].comment + "</p>" +
                    'inlined angry comment <span class="emoticon_button" id="span_id" >' +
                    awesome_emoticon + 
                    '</span>'
                    + ' comment goes on';

                console.log("div", awesome_emoticon)

                var tempdivCommentHTML =

                    "<div class=\"comment-author\">" +
                    "<div style='float: left; padding-right: 15px;padding-top: 5px;'>" +
                    "<img src=\"" + image + "\" width='27px' style='border-radius: 50%;'/></div>" +
                    "<div><div>" + " author name" + "</div>" +
                    '<div style="color: #888;"' + '> one year ago' + '</div></div>' +
                    "</div>" +
                    "<div class=\"comment-body\"" + "\">" +
                    "<p>" + filtered_comment.ideas[i].tasks[j].comments[k].comment + "</p>" +
                    'inlined angry comment <span class="emoticon_button" id="span_id" >' +
                    "<i class=" + "far fa-angry" + "></i>" +
                    '</span>'
                    + ' comment goes on';

                //console.log("temp", tempdivCommentHTML)

                    
                //'<p>'+ filtered_comment.ideas[i].tasks[j].comments[k].comment + '</p>';
                divComment[k].innerHTML = divCommentHTML;
                //var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].comments[k].comment)
                //divComment[k].appendChild(node)
                var element = document.getElementById(divTask[j].id)
                element.appendChild(divComment[k]);
            }
        }
    }

    $(document).ready(function () {
        $('.emoticon_button').click(function () {
            var id = $(this).attr('id');
            console.log('emotion clicked', id)
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    makeRevision(filterobj);
}

function makeRevision(obj) {

    $.ajax({
        type: "POST",
        url: "http://localhost:8082/saveRevision/",
        dataType: 'json',
        data: {
            jsonQuery: obj
        },
        success: function (output) {
            console.log(saved);

        }
    });

}