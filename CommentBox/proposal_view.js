var currentJSON = null;

var attributeObj = {
    Angry: "fa-angry fa-lg",
    Concerned: "fa-flushed fa-lg",
    Neutral: "fa-meh fa-lg",
    // Bored: "fa-meh fa-lg",
    Happy: "fa-smile fa-lg",
    Excited: "fa-smile-beam fa-lg",
    negative: "fa-thumbs-down fa-lg",
    neutral: "fa-thumbs-down fa-lg",
    positive: "fa-thumbs-up fa-lg",
};

var image = "/images/avatar.jpg";

if (localStorage.getItem("username") == "mjasim") {
    var proposalIntro = {
        1: "https://www.theguardian.com/business/2017/dec/24/new-york-retail-shops-amazon-rent",
        2: "http://www.nydailynews.com/news/politics/majority-n-y-voters-support-legalizing-taxing-pot-poll-article-1.3660456",
        3: "https://www.usnews.com/news/health-news/articles/2018-12-07/new-york-officials-ban-unvaccinated-children-from-school-amid-measles-outbreak",
        4: "https://i.imgur.com/YQcND5y.jpg",
        5: "http://www.nydailynews.com/new-york/bill-require-hotels-bed-bug-inspections-6-months-article-1.2890370",
        6: "https://i.redd.it/mrvecxt5f8b01.jpg",
        7: "https://i.redd.it/5mdjx1g0xm011.jpg",
        8: "https://www.dslreports.com/shownews/New-York-State-to-Introduce-Net-Neutrality-Bill-140920",
        9: "https://i.redd.it/ab1jv0avb2b21.jpg",
        10: "https://www.nytimes.com/2019/02/14/nyregion/amazon-hq2-queens.html",

    };
} else {
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
    };
}


// Draw proposal-wise comments inside commentBox
function draw_proposal_wise_comments(json, idea_id) {
    //console.log(json)
    var myNode = document.getElementById("parentBox");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var divTask = [];
    var divQuestion = [];
    var divComment = [];
    var prevQuestionId;
    var divIdea = document.createElement("div");
    divIdea.className = "ideaDiv";
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
            divComment[j].id = "commentDivId-" + json.ideas[idea_id].id + "-" + json.ideas[idea_id].tasks[i].id + "-" + json.ideas[idea_id].tasks[i].comments[j].comment_id
            var node = document.createTextNode(json.ideas[idea_id].tasks[i].comments[j].comment)
            divComment[j].appendChild(node)
            var element = document.getElementById(divTask[i].id)
            element.appendChild(divComment[j])
        }
    }
}

// Get filtered comments
function get_filtered_comment(json, filterobj) {
    // console.log("get filtered comment", filterobj)
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

                // if (filterobj.topic != null) {
                //     var topicFilter = json.ideas[i].topic_keyphrases[filterobj.topic].topic_keyphrase
                // }
                var flag = true
                if (flag && filterobj.emotion != null && json.ideas[i].tasks[j].comments[k].emotion.toLowerCase() != filterobj.emotion.toLowerCase()) {
                    flag = false
                }
                // if (flag && filterobj.sentiment_final != null && (json.ideas[i].tasks[j].comments[k].sentiment_final).toLowerCase() != filterobj.sentiment_final.toLowerCase()) {
                //     flag = false
                // }
                // if (flag && filterobj.topic != null && !checkKeyphrase(topicFilter, json.ideas[i].tasks[j].comments[k].findTopicLabels)) {
                //     flag = false
                // }

                if (flag && filterobj.topic != null) {
                    for (var l = 0; l < filterobj.topic.length; l++) {
                        var flag = true
                        var topicFilter = json.ideas[i].topic_keyphrases[filterobj.topic[l]].topic_keyphrase

                        if (!checkKeyphrase(topicFilter, json.ideas[i].tasks[j].comments[k].findTopicLabels)) {
                            flag = false
                        } else {
                            //console.log(flag, topicFilter, json.ideas[i].tasks[j].comments[k].comment)
                            //comments.push(json.ideas[i].tasks[j].comments[k])
                        }
                    }
                }
                //console.log(flag, topicFilter)
                //console.log("yolo")

                // if (flag && filterobj.cloudkey != null) {
                //     // console.log("inside cloud loop", filterobj)
                //     if (!(json.ideas[i].tasks[j].comments[k].comment.includes(filterobj.cloudkey))) {
                //         // console.log(json.ideas[i].tasks[j].comments[k].comment)
                //         flag = false

                //         // console.log(json.ideas[i].tasks[j].comments[k].comment.includes(filterobj.cloudkey))

                //     }
                // }

                if (flag) {
                    comments.push(json.ideas[i].tasks[j].comments[k])
                    // console.log("yolo")
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
    var filtered_comment = {
        "ideas": ideas
    }
    return filtered_comment
}

function draw_line_calc(idea_id, svg_id, proposal_wise_dates, prop_json) {
    // console.log("here here", idea_id, svg_id, proposal_wise_dates)

    date_history = []

    for (var i in prop_json['ideas']) {
        if (prop_json['ideas'][i].id == idea_id) {
            idea_num = i
        }
    }

    for (var t in proposal_wise_dates) {
        if (proposal_wise_dates[t].id == idea_id) {
            // console.log(idea_id)

            for (var i in proposal_wise_dates[t].dates) {
                c_excited = 0, c_happy = 0, c_neutral = 0, c_concerned = 0, c_angry = 0;
                for (var j in prop_json.ideas[idea_num].tasks) {
                    for (var k in prop_json.ideas[idea_num].tasks[j].comments) {
                        if (prop_json.ideas[idea_num].tasks[j].comments[k].post_time.split(" ")[0] == proposal_wise_dates[t].dates[i]) {
                            if (prop_json.ideas[idea_num].tasks[j].comments[k].emotion == "Excited") {
                                c_excited = c_excited + 1
                            }
                            if (prop_json.ideas[idea_num].tasks[j].comments[k].emotion == "Happy") {
                                c_happy = c_happy + 1
                            }
                            if (prop_json.ideas[idea_num].tasks[j].comments[k].emotion == "Neutral") {
                                c_neutral = c_neutral + 1
                            }
                            if (prop_json.ideas[idea_num].tasks[j].comments[k].emotion == "Concerned") {
                                c_concerned = c_concerned + 1
                            }
                            if (prop_json.ideas[idea_num].tasks[j].comments[k].emotion == "Angry") {
                                c_angry = c_angry + 1
                            }
                        }
                    }
                }

                temp = {
                    "date": proposal_wise_dates[idea_num].dates[i],
                    "comments": c_excited + c_happy + c_neutral + c_concerned + c_angry,
                    "Excited": c_excited,
                    "Happy": c_happy,
                    "Neutral": c_neutral,
                    "Concerned": c_concerned,
                    "Angry": c_angry,
                }

                date_history.push(temp)
            }
        }
    }

    date_history = date_history.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
    });

    max_val = 0
    for (var i in date_history) {
        if (date_history[i].comments > max_val) {
            max_val = date_history[i].comments
        }
    }

    line_data = [{
        "color": "black",
        "maxval": max_val,
        "history": date_history
    }]

    divid = "headerlines_" + idea_id

    // filterobj.idea_id = idea_id
    // filterobj.emotion = null
    // filterobj.topic = null
    // filterobj.tasks = null

    var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(prop_json)), filterobj)
    // console.log(filtered_comment, idea_id)

    draw_line_in_header(line_data, divid, svg_id)
    // draw_line(filtered_comment, line_data)
}


function draw_filtered_comments(filtered_comment, json) {
    // console.log('draw filter comment', filtered_comment, json);
    var myNode = document.getElementById("parentBox");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    // var divBoxHeader = document.createElement("div")
    // divBoxHeader.className = "boxHeader"
    // divBoxHeader.id = "box_header"
    // var divBoxHeaderHTML = "<div>" + "<p align=\"center\">" + "" + "</p>" + "</div>"
    // var parentBox = document.getElementById("parentBox")
    // divBoxHeader.innerHTML = divBoxHeaderHTML
    // parentBox.appendChild(divBoxHeader);
    // //console.log(filtered_comment)

    var divIdea = []
    var divQuestion = []
    var divTask = []
    var divComment = []
    var topicFilter = ""
    var prevQuestionId = ""
    var comment_count = 0
    var users = []

    var proposal_wise_dates = get_proposal_wise_dates(json)

    for (var i in filtered_comment["ideas"]) {
        for (var j in filtered_comment.ideas[i].tasks) {
            for (var k in filtered_comment.ideas[i].tasks[j].comments) {
                comment_count = comment_count + 1
                users.push(filtered_comment.ideas[i].tasks[j].comments[k].user_id)
            }
        }
    }

    for (var i in filtered_comment["ideas"]) {
        var svg_lines_id = "svg_lines_" + filtered_comment.ideas[i].id;
        divIdea[i] = document.createElement("div")
        divIdea[i].className = "ideaDiv";
        divIdea[i].id = "ideaDivId-" + filtered_comment.ideas[i].id;
        //var node = document.createTextNode(filtered_comment.ideas[i].name);
        //divIdea[i].appendChild(node)
        var divIdeaHTML = '<div style=\"display:flex;flex-direction:row;align-items:flex-start"\"><div style=\"width:60%\"><div style=\"display:flex;align-items:flex-end"\"> <h1 class="search_enable" style=margin-left:5px;>' + filtered_comment.ideas[i].name + '</h1>' +
            "<p>" + "\xa0\xa0\xa0" +
            '<span class="commenters_button" id="span_id_opt" >' +
            "<i class=" + "\"fas fa-user fa-lg\"" + "></i>" +
            '</span>' + "\xa0" +
            '<span class="commenters_number" id="span_id_opt" >' + new Set(users).size +
            '</span>' + "\xa0" +
            '<span class="comments_button" id="span_id_opt" >' +
            "<i class=" + "\"fas fa-comment-alt fa-lg\"" + "></i>" +
            '</span>' + "\xa0" +
            '<span class="comments_number" id="span_id_opt" >' + comment_count +
            '</span>' + "\xa0" +
            "</p>" +
            '</div>' +
            "<div class=\"comment-body\"" + "\">" +
            '<p style=margin-left:10px>' + proposalIntro[filtered_comment.ideas[i].id] + '</p>' + '</div></div>' +
            '<div style=\"width:35%;height:70px;margin:5px; margin-left:15px\" class="lines_view" id="headerlines_' + filtered_comment.ideas[i].id + "\">" +
            '<div id=\"tooltip\" style=\"position:absolute;background-color:lightgray;padding:5px\">' + '</div>' + 
            '</div>';
        divIdea[i].innerHTML = divIdeaHTML;
        var element = document.getElementById("parentBox")
        element.appendChild(divIdea[i])

        draw_line_calc(filtered_comment.ideas[i].id, svg_lines_id, proposal_wise_dates, JSON.parse(JSON.stringify(json)))

        for (var j in filtered_comment.ideas[i].tasks) {
            divTask[j] = document.createElement("div")
            divTask[j].className = "taskDiv"
            divTask[j].id = "taskDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id
            //var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].name)
            //divTask[j].appendChild(node)

            var divTaskHTML = '<h2 style=margin-left:5px;>' + filtered_comment.ideas[i].tasks[j].name + '</h2>';
            divTask[j].innerHTML = divTaskHTML;
            var element = document.getElementById(divIdea[i].id);
            element.appendChild(divTask[j]);

            for (var k in filtered_comment.ideas[i].tasks[j].comments) {

                var awesome_emoticon = attributeObj[filtered_comment.ideas[i].tasks[j].comments[k].emotion]
                // var awesome_sentiment = attributeObj[filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final]

                if (filtered_comment.ideas[i].tasks[j].id == 12) {
                    divQuestion[k] = document.createElement("div")
                    divQuestion[k].className = "questionDiv"
                    divQuestion[k].id = "questionDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + "-" + filtered_comment.ideas[i].tasks[j].comments[k].quesion_id
                    if (prevQuestionId != divQuestion[k].id) {
                        var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].comments[k].question)
                        divQuestion[k].appendChild(node)
                        var divQuestionHTML =

                            "<div class=\"comment-author\">" +
                            "<div style='float: left; padding-right: 15px;padding-top: 5px;'>" +
                            "<img src=\"" + image + "\" width='27px' style='border-radius: 50%;'/></div>" +
                            "<div><div>" + " author name" + "</div>" +
                            '<div style="color: #888;"' + '>' + "posted on " + filtered_comment.ideas[i].tasks[j].comments[k].post_time + '</div></div>' +
                            "</div>" +
                            "<div class=\"question-body\"" + "\">" +
                            "\xa0\xa0" + filtered_comment.ideas[i].tasks[j].comments[k].question + "\xa0" +
                            "</div>";
                        // if (filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final == "neutral") {
                        //     divQuestionHTML = "<div class=\"comment-author\">" +
                        //         "<div style='float: left; padding-right: 15px;padding-top: 5px;'>" +
                        //         "<img src=\"" + image + "\" width='27px' style='border-radius: 50%;'/></div>" +
                        //         "<div><div>" + " author name" + "</div>" +
                        //         '<div style="color: #888;"' + '>' + "posted on " + filtered_comment.ideas[i].tasks[j].comments[k].post_time + '</div></div>' +
                        //         "</div>" +
                        //         "<div class=\"question-body\"" + "\">" +
                        //         "\xa0\xa0" + filtered_comment.ideas[i].tasks[j].comments[k].question + "\xa0" +
                        //         "</div>";
                        // }

                        divQuestion[k].innerHTML = divQuestionHTML;
                        // setTippy(divQuestion[k].id, json);

                        var element = document.getElementById(divTask[j].id)
                        element.appendChild(divQuestion[k])
                        prevQuestionId = divQuestion[k].id
                    }
                }
                divComment[k] = document.createElement("div")
                divComment[k].className = "commentDiv"
                divComment[k].id = "commentDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + "-" + filtered_comment.ideas[i].tasks[j].comments[k].comment_id;
                var image = "/images/avatar.jpg";
                // var sentimentButton = filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final == "neutral" ?
                //     "<i aria-haspopup=\"true\" aria-expanded=\"false\" class=" + "\"far fa-thumbs-down fa-lg neutral\"" + " style=transform:rotate(-90deg)" + "></i>" :
                //     "<i class=" + "\"" + "fas " + awesome_sentiment + "\"" + "></i>";

                var divCommentHTML =

                    "<div class=\"comment-author\">" +
                    "<div style='float: left; padding-right: 5px;;'>" +
                    "<img src=\"" + image + "\" width='24px' style='border-radius: 50%;'/></div>" +
                    "<div style='padding-top: 5px'><div style='float: left;'>" + " User-" + filtered_comment.ideas[i].tasks[j].comments[k].user_id + "</div>" +
                    '<div style="color: #888;"' + '>' + " &nbsp;&nbsp; posted on " + filtered_comment.ideas[i].tasks[j].comments[k].post_time + '</div></div>' +
                    "</div>" +
                    "<div class=\"comment-body\"" + "\">" +
                    '<div style="float: left;padding-left: 2px;"><span class="emoticon_button" id="span_id_emo_' + divComment[k].id + '">' +
                    "<i class=" + "\"" + "fas " + awesome_emoticon + "\"" + "></i>" + "\xa0" + '</span>' +
                    // '<span class="sentiment_button" id="span_id_sent_' + divComment[k].id + '" >' +
                    // //"<i class=" + "\"" + "fas " + awesome_sentiment + "\"" + "></i>" +
                    // sentimentButton + "\xa0" +
                    '</span>' +
                    '<span class="options_button" id="span_id_opt_' + divComment[k].id + '" >' +
                    "<i class=" + "\"fas fa-plus-circle fa-lg\"" + "></i>" +
                    '</span></div>' + "\xa0\xa0" +
                    '<div style="float:left; padding-left: 5px"><p class="search_enable">' + filtered_comment.ideas[i].tasks[j].comments[k].comment + "\xa0" +
                    "</p></div>";

                divComment[k].innerHTML = divCommentHTML;

                //console.log('draw filter comment', json);

                setTippy(divComment[k].id, json);

                var element = document.getElementById(divTask[j].id)
                element.appendChild(divComment[k]);
            }
        }
    }

    $(document).ready(function () {
        $('.options_button').click(function () {
            var id = $(this).attr('id');
            // console.log('options clicked', id)
            save_notes(id)
        });
    });

    // makeRevision(filterobj); //mjasim - call for save
}

// get time passed
// function time_ago(date_past, date_now) {
//     var delta = Math.abs(date_now - date_past) / 1000;
//     var years = Math.floor(delta / 31556952);
//     delta -= years * 31556952;
//     var months = Math.floor(delta / 2629746);
//     delta -= months * 2629746;
//     var days = Math.floor(delta / 86400);
//     delta -= days * 86400;
//     var hours = Math.floor(delta / 3600) % 24;
//     delta -= hours * 3600;
//     var minutes = Math.floor(delta / 60) % 60;
//     delta -= minutes * 60;
//     var seconds = delta % 60;  // in theory the modulus is not required
//     return  years + " years" + months + " months" + days + " days" + hours + " hours" + minutes + " minutes" + seconds + " seconds ago"
// }

// tippy functions for categories
function setTippy(commentID, json) {
    //console.log(commentID);

    //console.log("printing", json)

    currentJSON = json;
    $(document).ready(function () {
        tippy('#' + commentID + ' .emoticon_button', {
            interactive: true,
            role: 'menu',
            arrow: true,
            arrowType: 'sharp',
            theme: 'light',
            // `focus` is not suitable for buttons with dropdowns
            trigger: 'mouseenter',
            content: getEmojiString(commentID),
            // Don't announce the tooltip's contents when expanded
            aria: null,
            // Important: the tooltip should be DIRECTLY after the reference element
            // in the DOM source order, which is why it has its own wrapper element
            appendTo: 'parent',
            // Let the user know the popup has been expanded
            onMount({
                reference
            }) {
                reference.setAttribute('aria-expanded', 'true')
            },
            onHide({
                reference
            }) {
                reference.setAttribute('aria-expanded', 'false')
            },
        });

        // tippy('#' + commentID + ' .options_button', {
        //     interactive: true,
        //     role: 'menu',
        //     arrow: true,
        //     arrowType: 'sharp',
        //     // `focus` is not suitable for buttons with dropdowns
        //     trigger: 'mouseenter',
        //     content: getOptionString(commentID),
        //     theme: 'light',
        //     // Don't announce the tooltip's contents when expanded
        //     aria: null,
        //     // Important: the tooltip should be DIRECTLY after the reference element
        //     // in the DOM source order, which is why it has its own wrapper element
        //     appendTo: 'parent',
        //     // Let the user know the popup has been expanded
        //     onMount({
        //         reference
        //     }) {
        //         reference.setAttribute('aria-expanded', 'true')
        //     },
        //     onHide({
        //         reference
        //     }) {
        //         reference.setAttribute('aria-expanded', 'false')
        //     },
        // });
    });
}

function emojiMouseClick(id) {
    // console.log('emoji id ' + id);
    // console.log("inside emoclick");

    var all_ids = id.split("-");

    //console.log(all_ids)

    logInteraction('click, revision, ' + 'idea, ' + all_ids[2] + ' task, ' + all_ids[3] + ' comment' + all_ids[4] + ' revision, ' + all_ids[0]);

    //console.log(currentJSON);

    for (var i in currentJSON["ideas"]) {
        for (var j in currentJSON.ideas[i].tasks) {
            for (var k in currentJSON.ideas[i].tasks[j].comments) {
                if (currentJSON.ideas[i].id == all_ids[2] && currentJSON.ideas[i].tasks[j].id == all_ids[3] &&
                    currentJSON.ideas[i].tasks[j].comments[k].comment_id == all_ids[4]) {

                    var new_emo = all_ids[0].charAt(0).toUpperCase() + all_ids[0].slice(1);
                    // console.log("New Emotion ", String(new_emo));
                    currentJSON.ideas[i].tasks[j].comments[k].emotion = new_emo;

                    // console.log(new_emo.toLowerCase());
                    var awesome_emoticon = attributeObj[new_emo];
                    // console.log(awesome_emoticon);
                    var newEmotionButtonStr =
                        "<i class=" + "\"" + "fas " + awesome_emoticon + "\"" + "></i>" + "\xa0";

                    $('#span_id_emo_' + all_ids[1] + '-' + all_ids[2] + '-' + all_ids[3] + '-' + all_ids[4]).html(newEmotionButtonStr);
                    makeRevision(currentJSON);
                    raw_json = currentJSON;
                }
            }
        }
    }

    // console.log(currentJSON)
    //after revising do this
}


function getEmojiString(commentID) {

    //console.log(commentID)

    var emojiDiv =
        "<div class=\"tippy-label-body\"" + "\">" +
        "<div class=\"label-title\"" + " style=border:none;font-size:1.0em" + ">" + "<p> " + "Click on an icon to set as the new emotion" + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + ">" +
        "<p style=font-size:0.7em>" + "Excited" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_excited' + commentID + '" onclick="emojiMouseClick(\'' + 'excited-' + commentID + '\')">' +
        "<i class=" + "\"fas fa-smile-beam fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p style=font-size:0.7em>" + "Happy" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_happy' + '" onclick="emojiMouseClick(\'' + 'happy-' + commentID + '\')">' +
        "<i class=" + "\"fas fa-smile fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p style=font-size:0.7em>" + "Neutral" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_neutral' + '" onclick="emojiMouseClick(\'' + 'neutral-' + commentID + '\')">' +
        "<i class=" + "\"fas fa-meh fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p style=font-size:0.7em>" + "Concerned" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_concerned' + '" onclick="emojiMouseClick(\'' + 'concerned-' + commentID + '\')">' +
        "<i class=" + "\"fas fa-flushed fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p style=font-size:0.7em>" + "Angry" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_angry' + '" onclick="emojiMouseClick(\'' + 'angry-' + commentID + '\')">' +
        "<i class=" + "\"fas fa-angry fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>";
    // "<div class=\"label-emo-body\"" + "\">" +
    // "<p style=font-size:0.7em>" + "Negative" + "</p>" +
    // "<p>" + '<span class="label-emo-button" id="span_id_negative' + '" onclick="emojiMouseClick(\'' + 'negative-' + commentID + '\')">' +
    // "<i class=" + "\"fas fa-flushed fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
    // "<div class=\"label-emo-body\"" + "\">" +
    // "<p style=font-size:0.7em>" + "Neutral" + "</p>" +
    // "<p>" + '<span class="label-emo-button" id="span_id_neutral' + '" onclick="emojiMouseClick(\'' + 'neutral-' + commentID + '\')">' +
    // "<i class=" + "\"fas fa-flushed fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
    // "<div class=\"label-emo-body\"" + "\">" +
    // "<p style=font-size:0.7em>" + "Positive" + "</p>" +
    // "<p>" + '<span class="label-emo-button" id="span_id_positive' + '" onclick="emojiMouseClick(\'' + 'positive-' + commentID + '\')">' +
    // "<i class=" + "\"fas fa-flushed fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>";
    return emojiDiv;
}

// function optionMouseClick(id) {
//     console.log('option id ' + id);
//     console.log("inside optclick", currentJSON)

//     if (id.includes("issue")) {
//         save_issue(id)
//     } else if (id.includes("criteria")) {
//         save_criteria(id)
//     } else if (id.includes("note")) {
//         save_notes(id)
//     }
// }

// function getOptionString(commentID) {

//     var optDiv =
//         "<div class=\"tippy-label-body\"" + "\">" +
//         "<div class=\"label-title\"" + " style=border:none;font-size:1.5em" + ">" + "<p> " + "Click on an icon to save as an issue, criteria or note" + "</p>" + "</div>" +
//         "<div class=\"label-opt-body\"" + ">" +
//         "<p>" + "Issue" + "</p>" +
//         "<p>" + '<span class="label-opt-button" id="span_id_issue' + commentID + '" onclick="optionMouseClick(\'' + 'issue-' + commentID + '\')">' +
//         "<i class=" + "\"fas fa-exclamation-circle fa-3x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
//         "<div class=\"label-opt-body\"" + "\">" +
//         "<p>" + "Criteria" + "</p>" +
//         "<p>" + '<span class="label-opt-button" id="span_id_criteria' + '" onclick="optionMouseClick(\'' + 'criteria-' + commentID + '\')">' +
//         "<i class=" + "\"fas fa-clipboard-list fa-3x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
//         "<div class=\"label-opt-body\"" + "\">" +
//         "<p>" + "Note" + "</p>" +
//         "<p>" + '<span class="label-opt-button" id="span_id_note' + '" onclick="optionMouseClick(\'' + 'note-' + commentID + '\')">' +
//         "<i class=" + "\"fas fa-save fa-3x\"" + "></i>" + '</span>' + "</p>" + "</div>";
//     return optDiv;
// }

// save revisions
function makeRevision(obj) {
    // console.log('make revision');
    // $.ajax({
    //     url: 'save_file.php',
    //     data: {myData: JSON.stringify(obj)},
    //     type: 'POST',
    //     success: function(response) {
    //         console.log(response);
    //     },
    //     error:function(data){
    //         console.log("error occured", data); //===Show Error Message====
    //     }
    // });

    var str_json = JSON.stringify(obj);
    // request = new XMLHttpRequest()
    // request.open("POST", "save_file.php", true)
    // request.setRequestHeader("Content-type", "application/json")
    // request.send(JSON.stringify(obj));

    request = new XMLHttpRequest();
    request.open("POST", "save_file.php");
    request.setRequestHeader("Content-type", "application/json");
    request.send(str_json);
}

// check keyphrases for topics
function checkKeyphrase(prop_topic, all_topics) {
    var split_topics = all_topics.split(",")

    // console.log(split_topics)

    for (var i = 0; i < split_topics.length; i++) {
        another_split = split_topics[i].split("_")
        for (var j = 0; j < another_split.length; j++) {
            if (prop_topic.replace(/\s/g, '') == another_split[j].replace(/\s/g, '')) {
                // console.log(prop_topic.replace(/\s/g, ''))
                return true;
            }
        }
    }
    return false;
}

// save notes
function save_notes(id) {

    $('#noteModal').modal('show')
    $('#note_save_button').off('click').on('click', function () {

        if (!localStorage.getItem("notes")) {
            var notes = []
            // console.log("inside")
            localStorage.setItem("notes", JSON.stringify(notes))
        } else
            notes = JSON.parse(localStorage.getItem("notes") || null);

        var all_ids = id.split("-")
        count = 0

        logInteraction('click, revision, ' + 'idea, ' + all_ids[2] + ' task, ' + all_ids[3] + ' comment' + all_ids[4] + ' note');

        for (var i in currentJSON["ideas"]) {
            for (var j in currentJSON.ideas[i].tasks) {
                for (var k in currentJSON.ideas[i].tasks[j].comments) {
                    if (currentJSON.ideas[i].id == all_ids[1]) {
                        if (currentJSON.ideas[i].tasks[j].id == all_ids[2]) {
                            if (currentJSON.ideas[i].tasks[j].comments[k].comment_id == all_ids[3]) {
                                if (currentJSON.ideas[i].tasks[j].comments[k].quesion_id == null) {
                                    var new_note = {
                                        Title: currentJSON.ideas[i].name,
                                        Task: currentJSON.ideas[i].tasks[j].name,
                                        Comment: currentJSON.ideas[i].tasks[j].comments[k].comment,
                                        Emotion: currentJSON.ideas[i].tasks[j].comments[k].emotion,
                                        noteTitle: $('#note_title').val(),
                                        noteType: $('#note_type').val(),
                                        noteText: $('#note_text').val()
                                    }
                                } else {
                                    var new_note = {
                                        Title: currentJSON.ideas[i].name,
                                        Task: currentJSON.ideas[i].tasks[j].name,
                                        Question: currentJSON.ideas[i].tasks[j].comments[k].question,
                                        Comment: currentJSON.ideas[i].tasks[j].comments[k].comment,
                                        Emotion: currentJSON.ideas[i].tasks[j].comments[k].emotion,
                                        noteTitle: $('#note_title').val(),
                                        noteType: $('#note_type').val(),
                                        noteText: $('#note_text').val()
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        notes.push(new_note);

        // console.log(notes)

        localStorage.setItem("notes", JSON.stringify(notes))

        // makeRevision(currentJSON);
        // raw_json = currentJSON;

        //console.log(currentJSON)
        $('#noteModal').modal('hide')
    });
}

// save as criteria
// function save_criteria(id) {
//     $('#criteriaModal').modal('show')
//     $('#criteria_save_button').on('click', function () {
//         //console.log(currentJSON)
//         var all_ids = id.split("-")
//         //console.log(all_ids)

//         logInteraction('click, revision, ' + 'idea, ' + all_ids[2] + ' task, ' + all_ids[3] + ' comment' + all_ids[4] + ' criteria');

//         for (var i in currentJSON["ideas"]) {
//             for (var j in currentJSON.ideas[i].tasks) {
//                 for (var k in currentJSON.ideas[i].tasks[j].comments) {
//                     if (currentJSON.ideas[i].id == all_ids[2] && currentJSON.ideas[i].tasks[j].id == all_ids[3] && currentJSON.ideas[i].tasks[j].comments[k].comment_id == all_ids[4]) {
//                         console.log("Criteria Title", $('#criteria_title').val())
//                         console.log("Criteria Type", $('#criteria_type').val())
//                         console.log("Criteria Text", $('#criteria_text').val())
//                         currentJSON.ideas[i].tasks[j].comments[k].criteria_title = $('#criteria_title').val()
//                         currentJSON.ideas[i].tasks[j].comments[k].criteria_type = $('#criteria_type').val()
//                         currentJSON.ideas[i].tasks[j].comments[k].criteria_text = $('#criteria_text').val()
//                     }
//                 }
//             }
//         }

//         makeRevision(currentJSON);
//         raw_json = currentJSON;

//         console.log(currentJSON)
//         $('#criteriaModal').modal('hide')
//     });
// }

// function save_notes(id) {
//     var all_ids = id.split("-")
//     var new_note = ""
//     count = 0

//     logInteraction('click, revision, ' + 'idea, ' + all_ids[2] + ' task, ' + all_ids[3] + ' comment' + all_ids[4] + ' note');

//     for (var i in currentJSON["ideas"]) {
//         for (var j in currentJSON.ideas[i].tasks) {
//             for (var k in currentJSON.ideas[i].tasks[j].comments) {
//                 if (currentJSON.ideas[i].id == all_ids[2]) {
//                     if (currentJSON.ideas[i].tasks[j].id == all_ids[3]) {
//                         if (currentJSON.ideas[i].tasks[j].comments[k].comment_id == all_ids[4]) {
//                             if (currentJSON.ideas[i].tasks[j].comments[k].quesion_id == null) {
//                                 new_note = "Proposal Title: " + currentJSON.ideas[i].name + "\n" +
//                                     "Task: " + currentJSON.ideas[i].tasks[j].name + "\n" +
//                                     "Comment: " + currentJSON.ideas[i].tasks[j].comments[k].comment + "\n" +
//                                     "Emotion " + currentJSON.ideas[i].tasks[j].comments[k].emotion + "\n"
//                             } else {
//                                 new_note = "Proposal Title: " + currentJSON.ideas[i].name + "\n" +
//                                     "Task: " + currentJSON.ideas[i].tasks[j].name + "\n" +
//                                     "Question: " + currentJSON.ideas[i].tasks[j].comments[k].question + "\n" +
//                                     "Comment: " + currentJSON.ideas[i].tasks[j].comments[k].comment + "\n" +
//                                     "Emotion " + currentJSON.ideas[i].tasks[j].comments[k].emotion + "\n"
//                             }
//                         }
//                         notes.push(new_note);
//                     }
//                 }
//             }
//         }
//     }
// }

now_notes = ""

function get_note_body() {
    note_body = document.getElementById("note_modal_body")

    // console.log("called", note_all_html)

    var note_all_html = ""

    notes = JSON.parse(localStorage.getItem("notes") || null);

    for (var i in notes) {
        if (("Question" in notes[i])) {
            note_all_html = note_all_html + "<p> - " + "Proposal Name: " + notes[i].Title + ", " + "Task Name: " + notes[i].Task + ", " + "Question: " + notes[i].Question + ", " + "Comment: " + notes[i].Comment + ", " + "Emotion: " + notes[i].Emotion + ", " + "Note Title: " + notes[i].noteTitle + ", " + "Note Type: " + notes[i].noteType + ", " + "Note Text: " + notes[i].noteText + "</p>"
        } else {
            note_all_html = note_all_html + "<p> - " + "Proposal Name: " + notes[i].Title + ", " + "Task Name: " + notes[i].Task + ", " + "Comment: " + notes[i].Comment + ", " + "Emotion: " + notes[i].Emotion + ", " + "Note Title: " + notes[i].noteTitle + ", " + "Note Type: " + notes[i].noteType + ", " + "Note Text: " + notes[i].noteText + "</p>"
        }
    }

    note_body.innerHTML = note_all_html
}

$(document).ready(function () {
    $('#notes_all_button').click(function () {
        var id = $(this).attr('id');
        // console.log('note clicked', id)

        get_note_body();

        $('#notesAllModal').on('show.bs.modal', function (event) {
            $("#notesAllModal").off('shown.bs.modal');
        });
    });
});

$(document).ready(function () {
    $('#note_print').click(function () {
        var id = $(this).attr('id');
        // console.log('note print', id)
    });
});