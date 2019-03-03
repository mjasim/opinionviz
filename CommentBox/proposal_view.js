
var proposalIntro = {
    1: "Build a tower in the center of El Nudillo. Sketches of tower concepts as shown.",
    2: "I would love to see El Nudillo, the intersection of 14th Street and National Avenue, become a place for public creative expression. There are so many talented artists around this area, and if we could somehow commission one to make a sculpture or something, or maybe invite everyone to paint a mural one day, it could be an amazing way to make this space ours and bring the community together.",
    3: "The intersection right now is basically just an empty lot. We could easily make it a roundabout with three crosswalks so that traffic from National Ave and Commercial St can still get around but so people can also use the open space in the center.",
    4: "So many cities are beautified with fountains! Kids can play in them when it is hot outside, and any sort of water element attracts a crowd. A huge fountain at El Nudillo would make it a destination for people to visit. ",
    6: "Love to see interactive rotating art with current cultural subjects. A place for exchanging ideas which helps the community grow together.",
    10: "a densely landscaped small urban park. NO Large sculpture or gateway 'ART' archway JUST a BIG canopy tree and pervious ground cover with native grasses to soften",
    14: "I want to see National Avenue between Imperial and Commercial closed to Auto traffic. I want to see MTS's property, the triangle parking lot bordered by National, 14th and Imperial, the lot with the Greyhound terminal and the parking area for busses to become a woonerf.",
    15: "It would be brilliant if the entire length of 14th street was closed to motor traffic and was a truly pedestrian promenade. The only exception could be the small Free Ride carts that could transport people up and down the street. This would not only provide a pleasant safe space for people and pets to walk, but would also create space for outdoor seating, more trees and greenery, more and safer play areas, as well as food places with real sidewalk seating that is not disrupted by air pollution and motor noise",
    22: "Instead of making a roundabout we can create a two story triangle platform to avoid a major infrastructure change. It is a platform that works with current traffic, but allows people to walk to get where they need, and creates a green space at the ground level. ",
    23: "",
    24: "A zipline from the top of a tower that allows people to see the view and connects El Nudillo to Balboa park. People can get up and look at the park. It creates a direct visual link to the Balboa park.",
    25: "Many large cities like New York have a transit hub. We can create a station that ties to commercial and residential activities. Right now, the bus station is disconnected from the trolley. It should be a transit hub for bus, trolley, and bike traffic. ",
    26: "El Nudillo is a front door for both Barrio Logan and East Village. It can be a gateway that reflects both neighborhoods, something that has both characteristics of the education district to the north and the Barrio to the south with a green space and murals.",
    27: "We can create a public green path to connect the past to the future. Library and the dome represent the future, and the brewery represents the past. The brewery is one of the oldest warehouses in San Diego.They can work together to create a mass and a sense of place.",
    31: "Address the homeless issue before spending on artistic projects or it is just a waste of money.",
    32: "Stop using the term \"El Nudillo\". It is obnoxious and arrogant. You cannot create culture before it exists. Please adopt high-density zoning and let the people who occupy those spaces define FOR THEMSELVES what the area is called. ",
    33: "The spires intersect to support three sky paths suspended by cables allowing complete access around the streets above transit modes passing below. The elevation of the paths remains consistent, approximately 16-18 feet above grade.",
    34: "Named because the primary archway and supporting cables are reminiscent of this musical instrument. This suspension bridge’s sky paths slope through the air moving above the streets below. The lowest level begins approximately 14-16 feet above the street on the corner adjacent to the transit center.",
    35: "Open Air Market - weekly activations, events, farmer's markets, etc."
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

    var attributeObj = {
        Angry: "fa-angry fa-lg",
        Worried: "fa-flushed fa-lg",
        Sad: "fa-frown fa-lg",
        Bored: "fa-meh fa-lg",
        Happy: "fa-smile fa-lg",
        Excited: "fa-smile-beam fa-lg",
        negative: "fa-thumbs-down fa-lg",
        neutral: "fa-thumbs-down fa-lg",
        positive: "fa-thumbs-up fa-lg",
        Fact: "fa-clipboard-check fa-lg",
        Opinion: "fa-comments fa-lg"
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
        var divIdeaHTML = '<h1 style=margin-left:5px;color:#337AB7>' + filtered_comment.ideas[i].name + '</h1>';
        var divIdeaHTML = divIdeaHTML + '<p style=margin-left:10px>' + proposalIntro[filtered_comment.ideas[i].id] + '</p>';
        divIdea[i].innerHTML = divIdeaHTML;
        var element = document.getElementById("parentBox")
        element.appendChild(divIdea[i])
        for (var j in filtered_comment.ideas[i].tasks) {
            divTask[j] = document.createElement("div")
            divTask[j].className = "taskDiv"
            divTask[j].id = "taskDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id
            //var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].name)
            //divTask[j].appendChild(node)

            var divTaskHTML = '<h2 style=margin-left:5px;color:#3DAADB>' + filtered_comment.ideas[i].tasks[j].name + '</h2>';
            divTask[j].innerHTML = divTaskHTML;
            var element = document.getElementById(divIdea[i].id);
            element.appendChild(divTask[j]);

            for (var k in filtered_comment.ideas[i].tasks[j].comments) {

                var awesome_emoticon = attributeObj[filtered_comment.ideas[i].tasks[j].comments[k].emotion]
                var awesome_sentiment = attributeObj[filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final]
                var awesome_subjectivity = attributeObj[filtered_comment.ideas[i].tasks[j].comments[k].subjectivity]

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
                            "<p>" + filtered_comment.ideas[i].tasks[j].comments[k].question + "\xa0\xa0" +
                            '<span class="emoticon_button" id="span_id_emo" >' +
                            "<i class=" + "\"" + "fas " + awesome_emoticon + "\"" + "></i>" + "\xa0" + '</span>' +
                            '<span class="sentiment_button" id="span_id_sent" >' +
                            "<i class=" + "\"" + "fas " + awesome_sentiment + "\"" + "></i>" + "\xa0" + '</span>' +
                            '<span class="subjectivity_button" id="span_id_sub" >' +
                            "<i class=" + "\"" + "fas " + awesome_subjectivity + "\"" + "></i>" +
                            '</span>' +
                            "</p>";
                        if (filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final == "neutral") {
                            divCommentHTML = "<div class=\"comment-author\">" +
                                "<div style='float: left; padding-right: 15px;padding-top: 5px;'>" +
                                "<img src=\"" + image + "\" width='27px' style='border-radius: 50%;'/></div>" +
                                "<div><div>" + " author name" + "</div>" +
                                '<div style="color: #888;"' + '> one year ago' + '</div></div>' +
                                "</div>" +
                                "<div class=\"comment-body\"" + "\">" +
                                "<p>" + filtered_comment.ideas[i].tasks[j].comments[k].comment + "\xa0\xa0" +
                                '<span class="emoticon_button" id="span_id_emo" >' +
                                "<i class=" + "\"" + "fas " + awesome_emoticon + "\"" + "></i>" + "\xa0" + '</span>' +
                                '<span class="sentiment_button" id="span_id_sent" >' +
                                "<i class=" + "\"fas fa-thumbs-down fa-lg neutral\"" + " style=transform:rotate(90deg)" + "></i>" + "\xa0" + '</span>' +
                                '<span class="subjectivity_button" id="span_id_sub" >' +
                                "<i class=" + "\"" + "fas " + awesome_subjectivity + "\"" + "></i>" +
                                '</span>' +
                                "</p>";
                        }

                        divQuestion[k].innerHTML = divQuestionHTML;
                        setTippy(divQuestion[k].id);

                        var element = document.getElementById(divTask[j].id)
                        element.appendChild(divQuestion[k])
                        prevQuestionId = divQuestion[k].id
                    }
                }
                divComment[k] = document.createElement("div")
                divComment[k].className = "commentDiv"
                divComment[k].id = "commentDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + "-" + filtered_comment.ideas[i].tasks[j].comments[k].comment_id;
                var image = "/images/avatar.jpg";
                var sentimentButton = filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final == "neutral" ?
                    "<i aria-haspopup=\"true\" aria-expanded=\"false\" class=" + "\"fas fa-thumbs-down fa-lg neutral\"" + " style=transform:rotate(90deg)" + "></i>" :
                    "<i class=" + "\"" + "fas " + awesome_sentiment + "\"" + "></i>";
                var divCommentHTML =

                    "<div class=\"comment-author\">" +
                    "<div style='float: left; padding-right: 15px;padding-top: 5px;'>" +
                    "<img src=\"" + image + "\" width='27px' style='border-radius: 50%;'/></div>" +
                    "<div><div>" + " author name" + "</div>" +
                    '<div style="color: #888;"' + '> one year ago' + '</div></div>' +
                    "</div>" +
                    "<div class=\"comment-body\"" + "\">" +
                    "<p>" + filtered_comment.ideas[i].tasks[j].comments[k].comment + "\xa0\xa0" +
                    '<span class="emoticon_button" id="span_id_emo">' +
                    "<i class=" + "\"" + "fas " + awesome_emoticon + "\"" + "></i>" + "\xa0" + '</span>' +
                    '<span class="sentiment_button" id="span_id_sent" >' +
                    //"<i class=" + "\"" + "fas " + awesome_sentiment + "\"" + "></i>" +
                    sentimentButton + "\xa0" +
                    '</span>' +
                    '<span class="subjectivity_button" id="span_id_sub" >' +
                    "<i class=" + "\"" + "fas " + awesome_subjectivity + "\"" + "></i>" +
                    '</span>' +
                    "</p>";

                /*if (filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final == "neutral") {
                    divCommentHTML = "<div class=\"comment-author\">" +
                        "<div style='float: left; padding-right: 15px;padding-top: 5px;'>" +
                        "<img src=\"" + image + "\" width='27px' style='border-radius: 50%;'/></div>" +
                        "<div><div>" + " author name" + "</div>" +
                        '<div style="color: #888;"' + '> one year ago' + '</div></div>' +
                        "</div>" +
                        "<div class=\"comment-body\"" + "\">" +
                        "<p>" + filtered_comment.ideas[i].tasks[j].comments[k].comment + "\xa0\xa0" +
                        '<span class="emoticon_button" id="span_id_emo">' +
                        "<i class=" + "\"" + "fas " + awesome_emoticon + "\"" + "></i>" + "\xa0" + '</span>' +
                        '<span class="sentiment_button" id="span_id_sent" >' +
                        "<i class=" + "\"fas fa-thumbs-down fa-lg neutral\"" + " style=transform:rotate(90deg)" + "></i>" +
                        '</span>' +
                        "</p>";
                }*/
                //'<p>'+ filtered_comment.ideas[i].tasks[j].comments[k].comment + '</p>';
                divComment[k].innerHTML = divCommentHTML;
                setTippy(divComment[k].id);

                var element = document.getElementById(divTask[j].id)
                element.appendChild(divComment[k]);
            }
        }
    }



    // $(document).ready(function () {
    //     $('.emoticon_button').popover(function () {
    //         var id = $(this).attr('id');
    //         console.log('emotion clicked', id)
    //     });
    //     $('.emoticon_button').popover(function () {
    //         var id = $(this).attr('id');
    //         console.log('emotion clicked', id)
    //     });
    //     // $('.emoticon_button').mouseover(function() {
    //     //     var id = $(this).attr('id');
    //     //     console.log('emotion mouseover',id)
    //     // });
    // });

    $(document).ready(function () {
        $('.sentiment_button').click(function () {
            var id = $(this).attr('id');
            console.log('sentiment clicked', id)
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    makeRevision(filterobj);
}

function setTippy(commentID) {
    //console.log(commentID);
    $(document).ready(function () {
        tippy('#' + commentID + ' .emoticon_button', {
            interactive: true,
            role: 'menu',
            // `focus` is not suitable for buttons with dropdowns
            trigger: 'click',
            content: getEmojiString(commentID),
            theme: 'tomato',
            // Don't announce the tooltip's contents when expanded
            aria: null,
            // Important: the tooltip should be DIRECTLY after the reference element
            // in the DOM source order, which is why it has its own wrapper element
            appendTo: 'parent',
            // Let the user know the popup has been expanded
            onMount({ reference }) {
                reference.setAttribute('aria-expanded', 'true')
            },
            onHide({ reference }) {
                reference.setAttribute('aria-expanded', 'false')
            },
        });

        tippy('#' + commentID + ' .sentiment_button', {
            interactive: true,
            role: 'menu',
            // `focus` is not suitable for buttons with dropdowns
            trigger: 'click',
            content: getSentiString(commentID),
            theme: 'tomato',
            // Don't announce the tooltip's contents when expanded
            aria: null,
            // Important: the tooltip should be DIRECTLY after the reference element
            // in the DOM source order, which is why it has its own wrapper element
            appendTo: 'parent',
            // Let the user know the popup has been expanded
            onMount({ reference }) {
                reference.setAttribute('aria-expanded', 'true')
            },
            onHide({ reference }) {
                reference.setAttribute('aria-expanded', 'false')
            },
        });

        tippy('#' + commentID + ' .subjectivity_button', {
            interactive: true,
            role: 'menu',
            // `focus` is not suitable for buttons with dropdowns
            trigger: 'click',
            content: getSubjectivityString(commentID),
            theme: 'tomato',
            // Don't announce the tooltip's contents when expanded
            aria: null,
            // Important: the tooltip should be DIRECTLY after the reference element
            // in the DOM source order, which is why it has its own wrapper element
            appendTo: 'parent',
            // Let the user know the popup has been expanded
            onMount({ reference }) {
                reference.setAttribute('aria-expanded', 'true')
            },
            onHide({ reference }) {
                reference.setAttribute('aria-expanded', 'false')
            },
        });

        // $('#'+commentID+ ' .label-emo-button').click(function () {
        //     var id = $(this).attr('id');
        //     console.log('emoji-revision', id)
        // });
        // $('#span_id_angry'+commentID).click(function () {
        //     var id = $(this).attr('id');
        //     console.log('emoji-revision', id)
        // });
        // $('#span_id_angrycommentDivId-1-1-0').click(function () {
        //     var id = $(this).attr('id');
        //     console.log('emoji-revision', id)
        // });
    });

}
function emojiMouseClick(id) {
    console.log('emoji id ' + id);
}
function getEmojiString(commentID) {

    var emojiDiv =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" + "</div>" +
        "<div class=\"label-emo-body\"" + ">" +
        "<p>" + "Angry" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_angry' + commentID + '" onclick="emojiMouseClick(\'' + 'angry' + commentID + '\')">' +
        "<i class=" + "\"fas fa-angry fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Fear" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_fear' + '" onclick="emojiMouseClick(\'' + 'fear' + commentID + '\')">' +
        "<i class=" + "\"fas fa-flushed fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Sad" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_sad' + '" onclick="emojiMouseClick(\'' + 'sad' + commentID + '\')">' +
        "<i class=" + "\"fas fa-frown fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Bored" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_bored' + '" onclick="emojiMouseClick(\'' + 'bored' + commentID + '\')">' +
        "<i class=" + "\"fas fa-meh fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Happy" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_happy' + '" onclick="emojiMouseClick(\'' + 'happy' + commentID + '\')">' +
        "<i class=" + "\"fas fa-smile fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Excited" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_excited' + '" onclick="emojiMouseClick(\'' + 'excited' + commentID + '\')">' +
        "<i class=" + "\"fas fa-smile-beam fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>";
    return emojiDiv;
}

function sentiMouseClick(id) {
    console.log('senti id ' + id);
}
function getSentiString(commentID) {

    var sentiDiv =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" + "</div>" +
        "<div class=\"label-sent-body\"" + ">" +
        "<p>" + "Negative" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_negative' + commentID + '" onclick="sentiMouseClick(\'' + 'negative' + commentID + '\')">' +
        "<i class=" + "\"fas fa-thumbs-down fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + "\">" +
        "<p>" + "Neutral" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_neutral' + '" onclick="sentiMouseClick(\'' + 'neutral' + commentID + '\')">' +
        "<i class=" + "\"fas fa-thumbs-down fa-2x neutral\"" + " style=transform:rotate(-90deg)" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + "\">" +
        "<p>" + "Positive" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_positive' + '" onclick="sentiMouseClick(\'' + 'positive' + commentID + '\')">' +
        "<i class=" + "\"fas fa-thumbs-up fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>";
    return sentiDiv;
}

function subjectivityMouseClick(id) {
    console.log('subjectivity id ' + id);
}
function getSubjectivityString(commentID) {

    var subjectivityDiv =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" + "</div>" +
        "<div class=\"label-sub-body\"" + ">" +
        "<p>" + "Fact" + "</p>" +
        "<p>" + '<span class="label-sub-button" id="span_id_fact' + commentID + '" onclick="subjectivityMouseClick(\'' + 'fact' + commentID + '\')">' +
        "<i class=" + "\"fas fa-clipboard-check fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sub-body\"" + "\">" +
        "<p>" + "Neutral" + "</p>" +
        "<p>" + '<span class="label-sub-button" id="span_id_opinion' + '" onclick="subjectivityMouseClick(\'' + 'opinion' + commentID + '\')">' +
        "<i class=" + "\"fas fa-comments fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>";
    return subjectivityDiv;
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