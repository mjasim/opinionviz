raw_json = null;
prop_json = null;
currentJSON_compare = null;

var compare_cellHistoryLeft = {
    prev_idea_id: null,
    prev_emo_cell: null,
    prev_idea_id_emo: null,
    prev_emo_color: null,
    prev_emo: null,
    emo_switch: false,
    compare_side: null
}

var compare_cellHistoryRight = {
    prev_idea_id: null,
    prev_emo_cell: null,
    prev_idea_id_emo: null,
    prev_emo_color: null,
    prev_emo: null,
    emo_switch: false,
    compare_side: null
}

compare_filter_obj = {
    emotion: null,
    idea_id: null,
    task_id: null,
    topic: [],
    cloudkey: null
}

selected_idea_left = ""
selected_idea_right = ""

for (var i in whitelist) {
    if (whitelist[i].username == localStorage.getItem("username")) {
        filepath = whitelist[i].file
    }
}

// console.log(filepath)

d3.json(filepath, function (err, myjson) {
    raw_json = JSON.parse(JSON.stringify(myjson))
    prop_json = JSON.parse(JSON.stringify(myjson))
    currentJSON_compare = JSON.parse(JSON.stringify(myjson))

    build_compare_drop(raw_json)
});

function build_compare_drop() {

    // console.log(localStorage.getItem("compare_1"), localStorage.getItem("compare_2"))

    compare_proposal_names = get_proposal_names(JSON.parse(JSON.stringify(prop_json)))

    if (localStorage.getItem("compare_1"))
        var x = localStorage.getItem("compare_1").split("_")[1]
    if (localStorage.getItem("compare_2"))
        var y = localStorage.getItem("compare_2").split("_")[1]

    var left_dd = document.getElementById("compareLeftDrop")
    var right_dd = document.getElementById("compareRightDrop")

    var dd_html_left =
        '<div class="col-lg-6 col-m-6 col-sm-12">' +
        '<select class="form-control" id="leftIdeaSelect">' +
        '<option value="">Please select a proposal</option>';

    var dd_html_right =
        '<div class="col-lg-6 col-m-6 col-sm-12">' +
        '<select class="form-control" id="rightIdeaSelect">' +
        '<option value="">Please select a proposal</option>';

    for (var i in compare_proposal_names) {
        // if (compare_proposal_names[i].idea_id == x)
        dd_html_left = dd_html_left + '<option>' + compare_proposal_names[i].idea_name + '</option>'
        // if (compare_proposal_names[i].idea_id == y)
        dd_html_right = dd_html_right + '<option>' + compare_proposal_names[i].idea_name + '</option>'
    }

    dd_html_left = dd_html_left + '</select>' + '</div>' + '</div>';
    dd_html_right = dd_html_right + '</select>' + '</div>' + '</div>';

    left_dd.innerHTML = dd_html_left
    right_dd.innerHTML = dd_html_right

    if (localStorage.getItem("compare_1")) {
        for (var i in compare_proposal_names) {
            if (compare_proposal_names[i].idea_id == x) {
                $("#leftIdeaSelect").val(compare_proposal_names[i].idea_name);
                $("#leftIdeaSelect").trigger("change");
            }
        }
    }

    if (localStorage.getItem("compare_2")) {
        for (var i in compare_proposal_names) {
            if (compare_proposal_names[i].idea_id == y) {
                $("#rightIdeaSelect").val(compare_proposal_names[i].idea_name);
                $("#rightIdeaSelect").trigger("change");
            }
        }
    }
}

// function build_compare_header(json, selected_idea, side) {

//     compare_proposal_names = get_proposal_names(JSON.parse(JSON.stringify(json)))
//     for (var i in compare_proposal_names) {
//         if (compare_proposal_names[i].idea_name == selected_idea) {
//             var id = compare_proposal_names[i].idea_id
//             serial_num = i;
//         }
//     }

//     compare_proposal_emotions = get_proposal_wise_emotion(JSON.parse(JSON.stringify(json)))
//     for (var i in compare_proposal_emotions) {
//         if (compare_proposal_emotions[i].key == id) {
//             var emo_stat = compare_proposal_emotions[i]
//             serial_num = i;
//         }
//     }

//     if (side == "left") {
//         var left_header = document.getElementById("compareLeftHeader")

//         var left_header_html =
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_comments" >' +
//             "<i class=" + "\"fas fa-comment-alt fa-lg label_icons\"" + "></i>" + "\xa0" +
//             +json.ideas[serial_num].num_of_comments + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_excited" >' +
//             "<i class=" + "\"fas fa-smile-beam fa-lg label_icons\"" + "></i>" + "\xa0" +
//             +emo_stat.excited + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_happy" >' +
//             "<i class=" + "\"fas fa-smile fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.happy + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_neutral" >' +
//             "<i class=" + "\"fas fa-frown fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.neutral + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_concerned" >' +
//             "<i class=" + "\"fas fa-flushed fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.concerned + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + ">" +
//             '<span class="compare-label-emo-button" id="span_id_angry" >' +
//             "<i class=" + "\"fas fa-angry fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.angry + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_positive" >' +
//             "<i class=" + "\"fas fa-thumbs-up fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.positive + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_neutral" >' +
//             "<i class=" + "\"far fa-thumbs-down fa-lg neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
//             emo_stat.neutral + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + ">" +
//             '<span class="compare-label-emo-button" id="span_id_negative" >' +
//             "<i class=" + "\"fas fa-thumbs-down fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.negative + "\xa0\xa0" +
//             '</span>' + "</div>";

//         left_header.innerHTML = left_header_html

//         compare_filter_obj.idea_id = id
//         compare_filter_obj.emotion = null
//         compare_filter_obj.task_id = null
//         compare_filter_obj.topic = []
//         compare_filter_obj.cloudkey = null
//         filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), compare_filter_obj)
//         // console.log(filtered_comment)
//         draw_filtered_comments_compare(filtered_comment, raw_json, "compareLeftparentBox")

//     } else {
//         var right_header = document.getElementById("compareRightHeader")

//         var right_header_html =
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_comments" >' +
//             "<i class=" + "\"fas fa-comment-alt fa-lg label_icons\"" + "></i>" + "\xa0" +
//             +json.ideas[serial_num].num_of_comments + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_excited" >' +
//             "<i class=" + "\"fas fa-smile-beam fa-lg label_icons\"" + "></i>" + "\xa0" +
//             +emo_stat.excited + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_happy" >' +
//             "<i class=" + "\"fas fa-smile fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.happy + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_neutral" >' +
//             "<i class=" + "\"fas fa-frown fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.neutral + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_concerned" >' +
//             "<i class=" + "\"fas fa-flushed fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.concerned + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + ">" +
//             '<span class="compare-label-emo-button" id="span_id_angry" >' +
//             "<i class=" + "\"fas fa-angry fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.angry + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_positive" >' +
//             "<i class=" + "\"fas fa-thumbs-up fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.positive + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + "\">" +
//             '<span class="compare-label-emo-button" id="span_id_neutral" >' +
//             "<i class=" + "\"far fa-thumbs-down fa-lg neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
//             emo_stat.neutral + "\xa0\xa0" +
//             '</span>' + "</div>" +
//             "<div class=\"compare-label-emo-body\"" + ">" +
//             '<span class="compare-label-emo-button" id="span_id_negative" >' +
//             "<i class=" + "\"fas fa-thumbs-down fa-lg label_icons\"" + "></i>" + "\xa0" +
//             emo_stat.negative + "\xa0\xa0" +
//             '</span>' + "</div>";

//         right_header.innerHTML = right_header_html

//         compare_filter_obj.idea_id = id
//         compare_filter_obj.emotion = null
//         compare_filter_obj.task_id = null
//         compare_filter_obj.topic = []
//         compare_filter_obj.cloudkey = null
//         filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), compare_filter_obj)
//         // console.log(filtered_comment)
//         draw_filtered_comments_compare(filtered_comment, raw_json, "compareRightparentBox")
//     }
// }

function draw_filtered_comments_compare(filtered_comment, json, sideparent) {
    // console.log('draw filter comment compare', filtered_comment, json, sideparent);
    var myNode = document.getElementById(sideparent);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var comment_count = 0
    var users = []

    var divIdea = []
    var divQuestion = []
    var divTask = []
    var divComment = []
    var topicFilter = ""
    var prevQuestionId = ""

    for (var i in filtered_comment["ideas"]) {
        for (var j in filtered_comment.ideas[i].tasks) {
            for (var k in filtered_comment.ideas[i].tasks[j].comments) {
                comment_count = comment_count + 1
                users.push(filtered_comment.ideas[i].tasks[j].comments[k].user_id)
            }
        }
    }

    for (var i in filtered_comment["ideas"]) {
        divIdea[i] = document.createElement("div")
        divIdea[i].className = "ideaDiv";
        divIdea[i].id = sideparent + "-ideaDivId-" + filtered_comment.ideas[i].id;
        //var node = document.createTextNode(filtered_comment.ideas[i].name);
        //divIdea[i].appendChild(node)
        var divIdeaHTML = '<div style=\"display:flex;align-items:flex-end"\"> <h1 class="search_enable" style=margin-left:1px;>' + filtered_comment.ideas[i].name + '</h1>' +
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
            '<p style=margin-left:10px>' + proposalIntro[filtered_comment.ideas[i].id] + '</p>';
        divIdea[i].innerHTML = divIdeaHTML;
        var element = document.getElementById(sideparent)

        element.appendChild(divIdea[i])
        for (var j in filtered_comment.ideas[i].tasks) {
            divTask[j] = document.createElement("div")
            divTask[j].className = "taskDiv"
            divTask[j].id = sideparent + "taskDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id
            //var node = document.createTextNode(filtered_comment.ideas[i].tasks[j].name)
            //divTask[j].appendChild(node)

            var divTaskHTML = '<h2 style=margin-left:5px;>' + filtered_comment.ideas[i].tasks[j].name + '</h2>';
            divTask[j].innerHTML = divTaskHTML;
            var element = document.getElementById(divIdea[i].id);
            element.appendChild(divTask[j]);

            // console.log(element, sideparent)

            for (var k in filtered_comment.ideas[i].tasks[j].comments) {

                var awesome_emoticon = attributeObj[filtered_comment.ideas[i].tasks[j].comments[k].emotion]
                // var awesome_sentiment = attributeObj[filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final]

                if (filtered_comment.ideas[i].tasks[j].id == 12) {
                    divQuestion[k] = document.createElement("div")
                    divQuestion[k].className = "questionDiv"
                    divQuestion[k].id = sideparent + "questionDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + "-" + filtered_comment.ideas[i].tasks[j].comments[k].quesion_id
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
                divComment[k].id = sideparent + "commentDivId-" + filtered_comment.ideas[i].id + "-" + filtered_comment.ideas[i].tasks[j].id + "-" + filtered_comment.ideas[i].tasks[j].comments[k].comment_id;
                var image = "/images/avatar.jpg";
                // var sentimentButton = filtered_comment.ideas[i].tasks[j].comments[k].sentiment_final == "neutral" ?
                //     "<i aria-haspopup=\"true\" aria-expanded=\"false\" class=" + "\"far fa-thumbs-down fa-lg neutral\"" + " style=transform:rotate(-90deg)" + "></i>" :
                //     "<i class=" + "\"" + "fas " + awesome_sentiment + "\"" + "></i>";

                var divCommentHTML =

                    "<div class=\"comment-author\">" +
                    "<div style='float: left; padding-right: 5px;;'>" +
                    "<img src=\"" + image + "\" width='24px' style='border-radius: 50%;'/></div>" +
                    "<div style='padding-top: 5px'><div style='float: left;'>" + " Author name" + "</div>" +
                    '<div style="color: #888;"' + '>' + " &nbsp;&nbsp; posted on " + filtered_comment.ideas[i].tasks[j].comments[k].post_time + '</div></div>' +
                    "</div>" +
                    "<div class=\"comment-body\"" + "\">" +
                    '<div style="float: left;padding-left: 2px;"><span class="emoticon_button" id="span_id_emo_' + divComment[k].id + '">' +
                    "<i class=" + "\"" + "fas " + awesome_emoticon + "\"" + " style= \"cursor:default; opacity:1.0\"" + "></i>" + "\xa0" + '</span>' +
                    // '<span class="sentiment_button" id="span_id_sent_' + divComment[k].id + '" >' +
                    // //"<i class=" + "\"" + "fas " + awesome_sentiment + "\"" + "></i>" +
                    // sentimentButton + "\xa0" +
                    '</span>' +
                    '<span class="compare_options_button" id="compare_span_id_opt_' + divComment[k].id + '" >' +
                    "<i class=" + "\"fas fa-plus-circle fa-lg\"" + "></i>" +
                    '</span></div>' + "\xa0\xa0" +
                    '<div style="float:left; padding-left: 5px"><p class="search_enable">' + filtered_comment.ideas[i].tasks[j].comments[k].comment + "\xa0" +
                    "</p></div>";

                divComment[k].innerHTML = divCommentHTML;

                //console.log('draw filter comment', json);

                // setTippy(divComment[k].id, json);

                var element = document.getElementById(divTask[j].id)
                element.appendChild(divComment[k]);
            }
        }
    }

    $(document).ready(function () {
        $('.compare_options_button').click(function () {
            var id = $(this).attr('id');
            // console.log('options clicked', id)
            save_notes_compare(id)
        });
    });

    // makeRevision(filterobj); //mjasim - call for save
}

function build_compare_bars(json, selected_idea, side) {

    compare_proposal_names = get_proposal_names(JSON.parse(JSON.stringify(json)))
    for (var i in compare_proposal_names) {
        if (compare_proposal_names[i].idea_name == selected_idea) {
            var id = compare_proposal_names[i].idea_id
            serial_num = i;
        }
    }

    // console.log(id, selected_idea, side)

    if (side == "left") {
        var header_div = document.getElementById("compareLeftHeader")
        while (header_div.firstChild) {
            header_div.removeChild(header_div.firstChild);
        }
        var svg_id = "svg_left"
        var compare_proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
        send_data = []
        send_data.push(compare_proposal_wise_emotion_agg[serial_num])
        // console.log(send_data)

        compare_filter_obj.idea_id = id
        compare_filter_obj.emotion = null
        compare_filter_obj.task_id = null
        compare_filter_obj.topic = []
        compare_filter_obj.cloudkey = null
        filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), compare_filter_obj)
        // console.log(compare_filter_obj, "left")

        if (compare_filter_obj.idea_id) {
            draw_filtered_comments_compare(filtered_comment, json, "compareLeftparentBox")
            emotion_rows_compare(send_data, svg_id, header_div.id, id, "compareLeftparentBox")
        }
    } else {
        var header_div = document.getElementById("compareRightHeader")
        while (header_div.firstChild) {
            header_div.removeChild(header_div.firstChild);
        }
        var svg_id = "svg_right"
        var compare_proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
        send_data = []
        send_data.push(compare_proposal_wise_emotion_agg[serial_num])
        // console.log(send_data)

        compare_filter_obj.idea_id = id
        compare_filter_obj.emotion = null
        compare_filter_obj.task_id = null
        compare_filter_obj.topic = []
        compare_filter_obj.cloudkey = null
        filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), compare_filter_obj)
        // console.log(filtered_comment, "right")

        if (compare_filter_obj.idea_id) {
            draw_filtered_comments_compare(filtered_comment, json, "compareRightparentBox")
            emotion_rows_compare(send_data, svg_id, header_div.id, id, "compareRightparentBox")
        }
    }
}

function build_compare_topics(json, selected_idea, side) {

    compare_proposal_wise_topic_agg = get_proposal_wise_topic(JSON.parse(JSON.stringify(json)))

    compare_proposal_names = get_proposal_names(JSON.parse(JSON.stringify(json)))
    for (var i in compare_proposal_names) {
        if (compare_proposal_names[i].idea_name == selected_idea) {
            var id = compare_proposal_names[i].idea_id
            serial_num = i;
        }
    }

    if (side == "left") {
        var header_topic_div = document.getElementById("compareLeftTopic")
        while (header_topic_div.firstChild) {
            header_topic_div.removeChild(header_topic_div.firstChild);
        }

        var divTopicName = "<div class=\"comparetopic-body\" id=\"cmptopbodyleft\"" + "\">"
        var topic_length = 0

        for (var j = 0; j < compare_proposal_wise_topic_agg[serial_num].length; j++) {
            topic_length += compare_proposal_wise_topic_agg[serial_num][j].topic_keyphrase.length
            //console.log(proposal_wise_topic_agg[i][j].topic_keyphrase, topic_row_length)
            if (header_topic_div) {
                if (topic_length > header_topic_div.clientWidth / 11) {
                    break;
                } else {
                    divTopicName = divTopicName +
                        '<div  class="comparetopicName" id="comparetopic_' + compare_proposal_names[serial_num].idea_id + "_" + j + '\">' +
                        '<span class="badge badge-warning comparetopic-name" id="comparetopic_' + compare_proposal_names[serial_num].idea_id + "_" + j + "_id\">" + compare_proposal_wise_topic_agg[serial_num][j].topic_keyphrase + '</span></div>'
                }
            }
        }
        topic_length = 0

        divTopicName = divTopicName +
            '<div  class="comparetopicNameAll" id="comparetopic_' + compare_proposal_names[serial_num].idea_id + "_" + 'all' + '\">' +
            '<div class="col-lg-12 col-m-12 col-sm-12" style="padding:1px">' +
            '<select class="form-control comparetopic_down" id="compareall_topics_' + compare_proposal_names[serial_num].idea_id + "\"" +
            ' style="height:24px;width:50px;font-size:0.8em;font-weight:bold;background-color:#F5F8FA;border-color:#337AB7; padding:0">' +
            '<option value="">...</option>';

        all_topics = compare_proposal_wise_topic_agg[serial_num]

        for (var j in all_topics) {
            divTopicName += '<option>' + all_topics[j].topic_keyphrase + '</option>'
        }

        divTopicName = divTopicName + '</select>' + '</div>' + '</div>';

        if (header_topic_div)
            header_topic_div.innerHTML = divTopicName

    } else {
        var header_topic_div = document.getElementById("compareRightTopic")
        while (header_topic_div.firstChild) {
            header_topic_div.removeChild(header_topic_div.firstChild);
        }

        var divTopicName = "<div class=\"comparetopic-body\" id=\"cmptopbodyright\"" + "\">"
        var topic_length = 0

        for (var j = 0; j < compare_proposal_wise_topic_agg[serial_num].length; j++) {
            topic_length += compare_proposal_wise_topic_agg[serial_num][j].topic_keyphrase.length
            //console.log(proposal_wise_topic_agg[i][j].topic_keyphrase, topic_row_length)
            if (header_topic_div) {
                if (topic_length > header_topic_div.clientWidth / 11) {
                    break;
                } else {
                    divTopicName = divTopicName +
                        '<div  class="comparetopicName" id="comparetopic_' + compare_proposal_names[serial_num].idea_id + "_" + j + '\">' +
                        '<span class="badge badge-warning comparetopic-name" id="comparetopic_' + compare_proposal_names[serial_num].idea_id + "_" + j + "_id\">" + compare_proposal_wise_topic_agg[serial_num][j].topic_keyphrase + '</span></div>'
                }
            }
        }
        topic_length = 0

        divTopicName = divTopicName +
            '<div  class="comparetopicNameAll" id="comparetopic_' + compare_proposal_names[serial_num].idea_id + "_" + 'all' + '\">' +
            '<div class="col-lg-12 col-m-12 col-sm-12" style="padding:1px">' +
            '<select class="form-control comparetopic_down" id="compareall_topics_' + compare_proposal_names[serial_num].idea_id + "\"" +
            ' style="height:24px;width:50px;font-size:0.8em;font-weight:bold;background-color:#F5F8FA;border-color:#337AB7; padding:0">' +
            '<option value="">...</option>';

        all_topics = compare_proposal_wise_topic_agg[serial_num]

        for (var j in all_topics) {
            divTopicName += '<option>' + all_topics[j].topic_keyphrase + '</option>'
        }

        divTopicName = divTopicName + '</select>' + '</div>' + '</div>';

        if (header_topic_div)
            header_topic_div.innerHTML = divTopicName
    }

    $(document).ready(function () {
        $('.comparetopicName').click(function () {

            // if (!selected_topic && selected_row) {

            //     // draw_view(json)
            //     selected_row = ""
            //     prev_row = ""
            //     prev_topic = ""
            // }

            var id = $(this).attr('id');
            var sideparent = $(this).parent().parent().attr('id');

            if (sideparent == "compareLeftTopic")
                compare_show_topics(id, false, "left")
            else
                compare_show_topics(id, false, "right")
        });
    });
}

$(document).ready(function () {
    $(document).on('change', '#leftIdeaSelect', function () {
        selected_idea_left = $("#leftIdeaSelect").val();
        // console.log(selected_idea_left)
        // build_compare_header((JSON.parse(JSON.stringify(prop_json))), selected_idea_left, "left")
        build_compare_bars((JSON.parse(JSON.stringify(prop_json))), selected_idea_left, "left")
        build_compare_topics((JSON.parse(JSON.stringify(prop_json))), selected_idea_left, "left")
    });
});

$(document).ready(function () {
    $(document).on('change', '#rightIdeaSelect', function () {
        selected_idea_right = $("#rightIdeaSelect").val();
        // console.log(selected_idea_right)
        // build_compare_header((JSON.parse(JSON.stringify(prop_json))), selected_idea_right, "right")
        build_compare_bars((JSON.parse(JSON.stringify(prop_json))), selected_idea_right, "right")
        build_compare_topics((JSON.parse(JSON.stringify(prop_json))), selected_idea_right, "right")

    });
});

// $(document).ready(function () {
//     $(document).on('click', '.compare-label-emo-button', function () {
//         var id = $(this).attr('id');
//         selected_condition = id
//         logInteraction('click, compare, idea, ' + id + 'condition' + selected_condition);

//         if ($(this).parent().parent().attr('id') == "compareLeftHeader") {

//             for (var i in compare_proposal_names) {
//                 if (compare_proposal_names[i].idea_name == selected_idea_left) {
//                     var id = compare_proposal_names[i].idea_id
//                     serial_num = i;
//                 }
//             }

//             compare_filter_obj.idea_id = id
//             if (selected_condition.split('_')[2] == "comments") {
//                 compare_filter_obj.emotion = null
//             } else {
//                 compare_filter_obj.emotion = selected_condition.split('_')[2]
//             }
//             compare_filter_obj.task_id = null
//             compare_filter_obj.topic = []
//             compare_filter_obj.cloudkey = null
//             filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), compare_filter_obj)
//             console.log(filtered_comment, "left")
//             draw_filtered_comments_compare(filtered_comment, raw_json, "compareLeftparentBox")
//         } else if ($(this).parent().parent().attr('id') == "compareRightHeader") {

//             for (var i in compare_proposal_names) {
//                 if (compare_proposal_names[i].idea_name == selected_idea_right) {
//                     var id = compare_proposal_names[i].idea_id
//                     serial_num = i;
//                 }
//             }

//             compare_filter_obj.idea_id = id
//             if (selected_condition.split('_')[2] == "comments") {
//                 compare_filter_obj.emotion = null
//             } else {
//                 compare_filter_obj.emotion = selected_condition.split('_')[2]
//             }
//             compare_filter_obj.task_id = null
//             compare_filter_obj.topic = []
//             compare_filter_obj.cloudkey = null
//             filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), compare_filter_obj)
//             console.log(filtered_comment, "right")
//             draw_filtered_comments_compare(filtered_comment, raw_json, "compareRightparentBox")
//         }
//     })
// });

// draw emotions
function emotion_rows_compare(salesData, svg_id, div_id, idea_id, sideparent) {

    // console.log(salesData)
    //var group = ["angry", "concerned", "neutral", "happy", "excited"];
    var group = ["excited", "happy", "neutral", "concerned", "angry"];

    var parseDate = d3.timeFormat("%b-%Y");
    var mainDiv = "#" + div_id;
    var mainDivName = div_id;

    var column = document.getElementById(div_id)

    var svg = d3.select(mainDiv)
        .append("svg")
        //responsive SVG needs these 2 attributes and no width and height attr
        .attr("id", svg_id)
        .attr("height", column.clientHeight)
        .attr("width", column.clientWidth)
        .call(responsivefy_compare)
    //class to make it responsive

    salesData.forEach(function (d) {
        d = type(d);
    });

    var layers = d3.stack()
        .keys(group)
        .offset(d3.stackOffsetDiverging)
        (salesData);

    var margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },

        width = +svg.attr("width") - 2,
        height = +svg.attr("height") - 2;
    if (width < 0) {
        width = 0;
    }

    var x = d3.scaleLinear()
        .rangeRound([margin.left, width - margin.right]);

    x.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)]);

    var y = d3.scaleBand()
        .rangeRound([height - margin.bottom, margin.top])
        .padding(0.0);

    y.domain(salesData.map(function (d) {
        return d.date;
    }))

    function stackMin(layers) {
        return d3.min(layers, function (d) {
            return d[0];
        });
    }

    function stackMax(layers) {
        return d3.max(layers, function (d) {
            return d[1];
        });
    }

    //var z = d3.scaleOrdinal(["#E45756", "#B279A2", "#4C78A8", "#EECA3B", "#F58518"]); IN REVERSE
    var z = d3.scaleOrdinal(["#EF8518", "#FFCA3B", "#4C78BF", "#B279AF", "#FF5756"]).domain(group);
    var maing = svg.append("g")
        .selectAll("g")
        .data(layers)
    var g = maing.enter().append("g")
        // .attr("fill", function (d) {
        //     return z(d.key);
        // })
        // .attr("style", "outline: solid;")
        // .attr("style", "outline-color: #F2F2F2")
        .style("cursor", "pointer")

    maing.selectAll('text')
        .data(layers)
        .enter()
        .append('text')
        .attr("x", function (d) {
            return x(d.key) + x.rangeBand() / 2 - 3;
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr('dy', '.75em')
        .style('fill', 'black')
        .text(function (d) {
            return (d.value)
        })
    var rect = g.selectAll("rect")
        .data(function (d) {
            d.forEach(function (d1) {
                d1.key = d.key;
                return d1;
            });
            return d;
        })
        .enter().append("rect")
        .attr("data", function (d) {
            var data = {};
            data["key"] = d.key;
            data["value"] = d.data[d.key];
            var total = 0;
            group.map(function (d1) {
                total = total + d.data[d1]
            });
            data["total"] = total;
            return JSON.stringify(data);
        })
        .attr("width", function (d) {
            if (x(d[1]) - x(d[0]) - 2 < 0) {
                return 0;
            } else {
                return x(d[1]) - x(d[0]) - 2;
            }
        })
        .attr("x", function (d) {
            return x(d[0]);
        })
        .attr("y", function (d) {
            return y(d.data.date);
        })
        .attr("fill", function (d) {
            // if (current_sort === "" || current_sort == selected_sort[0] || current_sort == selected_sort[1])
            //     return z(d.key)
            // else if (d.key == current_sort) {
            //     return z(d.key)
            // }
            // else {
            //     return "#DEE5EA"
            // }
            return z(d.key);
        })
        .attr("stroke", function (d) {
            // if (current_sort === "" || current_sort == selected_sort[0] || current_sort == selected_sort[1])
            //     return z(d.key)
            // else if (d.key == current_sort) {
            //     return z(d.key)
            // }
            // else {
            //     return "#DEE5EA"
            // }
            return z(d.key);
        })
        .attr("stroke-width", function (d) {
            return "2px";
        })
        .attr("height", 30)
        //.attr("height", y.bandwidth);
        .attr("opacity", function (d) {
            return 0.7
        });

    rect.on("mouseover", function () {
        var currentEl = d3.select(this);
        currentEl.attr("opacity", 1);
        var fadeInSpeed = 120;
        d3.select("#recttooltip_" + mainDivName)
            .transition()
            .duration(fadeInSpeed)
            .style("opacity", function () {
                return 1;
            })
        d3.select("#recttooltip_" + mainDivName).attr("transform", function (d) {
            var mouseCoords = d3.mouse(this.parentNode);
            var xCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                    .attr("width")) - 10;
            } else {
                xCo = mouseCoords[0] + 10;
            }
            var x = xCo;
            var yCo = 0;
            // if (mouseCoords[0] + 10 >= width * 0.80) {
            //     yCo = mouseCoords[1] + 10;
            // } else {
            //     yCo = mouseCoords[1];
            // }
            var x = xCo;
            var y = yCo;
            return "translate(" + x + "," + y + ")";
        });
        //CBT:calculate tooltips text
        var tooltipData = JSON.parse(currentEl.attr("data"));
        var tooltipsText = "";
        d3.selectAll("#recttooltipText_" + mainDivName).text("");
        var yPos = 0;
        d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text(tooltipData.key + ":  " + tooltipData.value);
        yPos = yPos + 1;
        d3.selectAll("#recttooltipText_" + mainDivName).append("tspan").attr("x", 0).attr("y", yPos * 10).attr("dy", "1.9em").text("Total" + ":  " + tooltipData.total);
        //CBT:calculate width of the text based on characters
        var dims = helpers.getDimensions("recttooltipText_" + mainDivName);
        d3.selectAll("#recttooltipText_" + mainDivName + " tspan")
            .attr("x", dims.w + 4);

        d3.selectAll("#recttooltipRect_" + mainDivName)
            .attr("width", dims.w + 10)
            .attr("height", dims.h + 20);
    });

    rect.on("mousemove", function () {
        var currentEl = d3.select(this);
        currentEl.attr("r", 7);
        d3.selectAll("#recttooltip_" + mainDivName)
            .attr("transform", function (d) {
                var mouseCoords = d3.mouse(this.parentNode);
                var xCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                        .attr("width")) - 10;
                } else {
                    xCo = mouseCoords[0] + 10;
                }
                var x = xCo;
                var yCo = 0;
                // if (mouseCoords[0] + 10 >= width * 0.80) {
                //     yCo = mouseCoords[1] + 10;
                // } else {
                //     yCo = mouseCoords[1];
                // }
                var x = xCo;
                var y = yCo;
                return "translate(" + x + "," + y + ")";
            });
    });
    rect.on("mouseout", function () {
        var currentEl = d3.select(this);
        currentEl.attr("opacity", function (d) {
            return 0.8
        })
        d3.select("#recttooltip_" + mainDivName)
            .style("opacity", function () {
                return 0;
            })
            .attr("transform", function (d, i) {
                // klutzy, but it accounts for tooltip padding which could push it onscreen
                var x = -500;
                var y = -500;
                return "translate(" + x + "," + y + ")";
            });
    });

    rect.on("click", clicked_emotion_compare);

    function clicked_emotion_compare(d) {

        logInteraction('compare, click, idea, ' + idea_id + ', emotion, ' + d.key);

        // document.getElementById(div_id.split("-")[0]).setAttribute("style", "outline:solid thin gray");

        // console.log(sideparent, idea_id)

        var this_cell = d3.select(this)
        compare_filter_obj.idea_id = idea_id
        compare_filter_obj.emotion = d.key

        // remove outline from previous cell

        if (sideparent == "compareLeftparentBox") {
            if (compare_cellHistoryLeft.prev_emo_cell) {
                compare_cellHistoryLeft.prev_emo_cell.attr("stroke", compare_cellHistoryLeft.prev_emo_color)
                compare_cellHistoryLeft.prev_emo_cell.attr("opacity", 0.8)
            }

            // deselect cell (check if previously selected row and column selected. Remove the column filter)
            if (compare_cellHistoryLeft.emo_switch && compare_cellHistoryLeft.prev_emo == d.key && compare_cellHistoryLeft.prev_idea_id_emo == idea_id) {
                compare_filter_obj.idea_id = idea_id
                compare_filter_obj.emotion = null
                compare_filter_obj.topic = null
                compare_filter_obj.cloudkey = null
                compare_cellHistoryLeft.emo_switch = false
            } else {
                this_cell.attr("stroke", "black")
                this_cell.attr("id", "emo_cell")
                this_cell.attr("opacity", 1)
                compare_cellHistoryLeft.emo_switch = true
            }

            //console.log(filterobj)

            var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), compare_filter_obj)
            draw_filtered_comments_compare(filtered_comment, raw_json, sideparent)

            compare_cellHistoryLeft.prev_emo_cell = this_cell
            compare_cellHistoryLeft.prev_idea_id_emo = idea_id
            compare_cellHistoryLeft.prev_idea_id = idea_id
            compare_cellHistoryLeft.prev_emo = d.key
            compare_cellHistoryLeft.prev_emo_color = z(d.key)

            $("#compareLeftparentBox").animate({
                scrollTop: 0
            }, 1000);
        } else if (sideparent == "compareRightparentBox") {
            if (compare_cellHistoryRight.prev_emo_cell) {
                compare_cellHistoryRight.prev_emo_cell.attr("stroke", compare_cellHistoryRight.prev_emo_color)
                compare_cellHistoryRight.prev_emo_cell.attr("opacity", 0.8)
            }

            // deselect cell (check if previously selected row and column selected. Remove the column filter)
            if (compare_cellHistoryRight.emo_switch && compare_cellHistoryRight.prev_emo == d.key && compare_cellHistoryRight.prev_idea_id_emo == idea_id) {
                compare_filter_obj.idea_id = idea_id
                compare_filter_obj.emotion = null
                compare_filter_obj.topic = null
                compare_filter_obj.cloudkey = null
                compare_cellHistoryRight.emo_switch = false
            } else {
                this_cell.attr("stroke", "black")
                this_cell.attr("id", "emo_cell")
                this_cell.attr("opacity", 1)
                compare_cellHistoryRight.emo_switch = true
            }

            //console.log(filterobj)

            var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), compare_filter_obj)
            draw_filtered_comments_compare(filtered_comment, raw_json, sideparent)

            compare_cellHistoryRight.prev_emo_cell = this_cell
            compare_cellHistoryRight.prev_idea_id_emo = idea_id
            compare_cellHistoryRight.prev_idea_id = idea_id
            compare_cellHistoryRight.prev_emo = d.key
            compare_cellHistoryRight.prev_emo_color = z(d.key)

            $("#compareRightparentBox").animate({
                scrollTop: 0
            }, 1000);
        }
    }

    var rectTooltipg = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("id", "recttooltip_" + mainDivName)
        .attr("style", "opacity:0")
        .attr("transform", "translate(-500,-500)")
        .attr("style", "position:absolute")
        .attr("style", "z-index:30");

    rectTooltipg.append("rect")
        .attr("id", "recttooltipRect_" + mainDivName)
        .attr("x", 0)
        .attr("width", 120)
        .attr("height", 80)
        .attr("opacity", 0.7)
        .style("fill", "#000000");

    rectTooltipg
        .append("text")
        .attr("id", "recttooltipText_" + mainDivName)
        .attr("x", 30)
        .attr("y", 15)
        .attr("fill", function () {
            return "#fff"
        })
        .style("font-size", function (d) {
            return 10;
        })
        .style("font-family", function (d) {
            return "arial";
        })
        .text(function (d, i) {
            return "";
        });


    function type(d) {
        //d.date = parseDate(new Date(d.date));
        group.forEach(function (c) {
            d[c] = +d[c];
        });
        return d;
    }

    var helpers = {
        getDimensions: function (id) {
            var el = document.getElementById(id);
            var w = 0,
                h = 0;
            if (el) {
                var dimensions = el.getBBox();
                w = dimensions.width;
                h = dimensions.height;
            } else {
                console.log("error: getDimensions() " + id + " not found.");
            }
            return {
                w: w,
                h: h
            };
        }
    };
}

//functions for d3
function responsivefy_compare(svg) {
    // get container + svg aspect ratio
    var container = d3.select(svg.node().parentNode),
        width = parseInt(svg.style("width")),
        height = parseInt(svg.style("height")),
        aspect = width / height;

    // add viewBox and preserveAspectRatio properties,
    // and call resize so that svg resizes on inital page load
    svg.attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "none")
        .call(resize);

    // to register multiple listeners for same event type,
    // you need to add namespace, i.e., 'click.foo'
    // necessary if you call invoke this function for multiple svgs
    // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    d3.select(window).on("resize." + container.attr("id"), resize);

    // get width of container and resize svg to fit it
    function resize() {
        var targetWidth = parseInt(container.style("width"));
        var targetHeight = parseInt(container.style("height"));
        //console.log(targetWidth,targetHeight)
        svg.attr("width", targetWidth);
        svg.attr("height", targetHeight);
        // svg.attr("height", Math.round(targetWidth / aspect));
    }
}

function save_notes_compare(id) {

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

        for (var i in currentJSON_compare["ideas"]) {
            for (var j in currentJSON_compare.ideas[i].tasks) {
                for (var k in currentJSON_compare.ideas[i].tasks[j].comments) {
                    if (currentJSON_compare.ideas[i].id == all_ids[1]) {
                        if (currentJSON_compare.ideas[i].tasks[j].id == all_ids[2]) {
                            if (currentJSON_compare.ideas[i].tasks[j].comments[k].comment_id == all_ids[3]) {
                                if (currentJSON_compare.ideas[i].tasks[j].comments[k].quesion_id == null) {
                                    var new_note = {
                                        Title: currentJSON_compare.ideas[i].name,
                                        Task: currentJSON_compare.ideas[i].tasks[j].name,
                                        Comment: currentJSON_compare.ideas[i].tasks[j].comments[k].comment,
                                        Emotion: currentJSON_compare.ideas[i].tasks[j].comments[k].emotion,
                                        noteTitle: $('#note_title').val(),
                                        noteType: $('#note_type').val(),
                                        noteText: $('#note_text').val()
                                    }
                                } else {
                                    var new_note = {
                                        Title: currentJSON_compare.ideas[i].name,
                                        Task: currentJSON_compare.ideas[i].tasks[j].name,
                                        Question: currentJSON_compare.ideas[i].tasks[j].comments[k].question,
                                        Comment: currentJSON_compare.ideas[i].tasks[j].comments[k].comment,
                                        Emotion: currentJSON_compare.ideas[i].tasks[j].comments[k].emotion,
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

        localStorage.setItem("notes", JSON.stringify(notes))

        // makeRevision(currentJSON_compare);
        // raw_json = currentJSON_compare;

        //console.log(currentJSON)
        $('#noteModal').modal('hide')
    });
}

selected_topic = ""
prev_topic = ""

function compare_show_topics(id, drop, sideparent) {

    if (sideparent == "left") {
        var split_str = id.split("_")
        logInteraction('click, idea, ' + split_str[1], 'topic ', split_str[2]);

        selected_topic = split_str[2]

        // console.log(id, prev_topic)

        if (id != prev_topic) {
            filterobj.idea_id = split_str[1]
            filterobj.emotion = null
            filterobj.task_id = null
            filterobj.topic = selected_topic
            // filterobj.cloudkey = null
            filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), filterobj)

            // console.log(filtered_comment)

            new_view = JSON.parse(JSON.stringify(prop_json))
            draw_filtered_comments_compare(filtered_comment, new_view, "compareLeftparentBox")
            if (drop == false) {
                document.getElementById(id + "_id").setAttribute("style", "background-color:#3DAADD")
            }
            if (prev_topic && drop == false) {
                document.getElementById(prev_topic + "_id").setAttribute("style", "background-color:none")
            }

            prev_topic = id;
            prev_row = split_str[1];
        } else {
            filterobj.idea_id = split_str[1]
            prev_topic = ""
            selected_topic = ""
            filterobj.topic = null
            document.getElementById(id + "_id").setAttribute("style", "background-color:none")

            // console.log("here", filterobj)

            var myNode = document.getElementById("compareLeftparentBox");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            new_view = JSON.parse(JSON.stringify(prop_json))

            filtered_comment = get_filtered_comment(new_view, filterobj)
            draw_filtered_comments_compare(filtered_comment, new_view, "compareLeftparentBox")

            filterobj = {}
        }
    } else {
        var split_str = id.split("_")
        logInteraction('click, idea, ' + split_str[1], 'topic ', split_str[2]);

        selected_topic = split_str[2]

        // console.log(id, prev_topic)

        if (id != prev_topic) {
            filterobj.idea_id = split_str[1]
            filterobj.emotion = null
            filterobj.task_id = null
            filterobj.topic = selected_topic
            // filterobj.cloudkey = null
            filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), filterobj)

            // console.log(filtered_comment)

            new_view = JSON.parse(JSON.stringify(prop_json))
            draw_filtered_comments_compare(filtered_comment, new_view, "compareRightparentBox")
            if (drop == false) {
                document.getElementById(id + "_id").setAttribute("style", "background-color:#3DAADD")
            }
            if (prev_topic && drop == false) {
                document.getElementById(prev_topic + "_id").setAttribute("style", "background-color:none")
            }

            prev_topic = id;
            prev_row = split_str[1];
        } else {
            filterobj.idea_id = split_str[1]
            prev_topic = ""
            selected_topic = ""
            filterobj.topic = null
            document.getElementById(id + "_id").setAttribute("style", "background-color:none")

            // console.log("here", filterobj)

            var myNode = document.getElementById("compareRightparentBox");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }

            new_view = JSON.parse(JSON.stringify(prop_json))

            filtered_comment = get_filtered_comment(new_view, filterobj)
            draw_filtered_comments_compare(filtered_comment, new_view, "compareRightparentBox")

            filterobj = {}
        }
    }
}


$(document).on('change', '.comparetopic_down', function () {

    var pos = 0
    var topic = ""
    id = $(this).attr('id')

    var sideparent = $(this).parent().parent().parent().attr('id')

    id_input = id.split('_')[2]
    topic_input = $("#" + id).val();
    x = get_proposal_wise_topic(raw_json)
    sn = get_serial_number(raw_json)
    for (var i in sn) {
        // console.log(sn[i].idea_id, id.split('_')[2])
        if (sn[i].idea_id == id_input) {
            pos = parseInt(sn[i].serial_number) - 1
        }
    }

    props = x[pos]

    for (var i in props) {
        // console.log(props[i].topic_keyphrase, topic_input)
        if (props[i].topic_keyphrase == topic_input) {
            topic = i
        }
    }

    topic_parameter = "topic_" + id_input + "_" + topic
    console.log(topic_parameter)

    if (sideparent == "cmptopbodyleft")
        compare_show_topics(topic_parameter, true, "left")
    else
        compare_show_topics(topic_parameter, true, "right")
});