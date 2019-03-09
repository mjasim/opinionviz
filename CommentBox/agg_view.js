// global variable to maintain what will be filtered
var filterobj = {
    emotion: null,
    sentiment_final: null,
    subjectivity: null,
    idea_id: null,
    task_id: null,
    topic: []
}

// global variable to track active ideas
selected_rows = Array.apply(null, Array(36))
selected_topics = Array.apply(null, Array(36))
for (var i = 0; i < selected_topics.length; i++) {
    selected_topics[i] = Array.apply(null, Array(7))
}

//console.log(selected_topics)

// global variable to maintain filter selection
var cellHistory = {
    prev_idea_id: null,
    prev_emo_cell: null,
    prev_senti_cell: null,
    prev_sub_cell: null,
    prev_idea_id_emo: null,
    prev_idea_id_senti: null,
    prev_idea_id_sub: null,
    prev_emo_color: null,
    prev_senti_color: null,
    prev_sub_color: null,
    prev_emo: null,
    prev_senti: null,
    prev_sub: null,
    emo_switch: false,
    senti_switch: false,
    sub_switch: false
}

var json = null;

var animate_trigger = false;

function animatedDivs() {
    if (!filterobj.idea_id && (filterobj.emotion || filterobj.sentiment_final || filterobj.subjectivity)) {
        draw_view();
        document.getElementById("aggregateDiv").setAttribute("style", "height:0px")
        document.getElementById("parentBox").setAttribute("style", "height:80vh")
        $("#parentBox").animate({ scrollTop: 0 }, 1000);
        $("#aggregateDiv").animate({ scrollTop: 0 }, 1000);
    }
    else if (!filterobj.idea_id && !filterobj.emotion && !filterobj.sentiment_final && !filterobj.subjectivity) {
        //draw_view();
        document.getElementById("aggregateDiv").setAttribute("style", "height:80vh")
        document.getElementById("parentBox").setAttribute("style", "height:50px")
    }
    else if (filterobj.idea_id) {
        temp = get_proposal_names(json)
        for (var i = 0; i < temp.length; i++) {
            if (temp[i].idea_id == filterobj.idea_id) {
                one_row = i
            }
        }
        draw_one_row(one_row)
        document.getElementById(filterobj.idea_id).parentElement.parentElement.scrollIntoView({ block: 'start' });
        document.getElementById("aggregateDiv").setAttribute("style", "height:50px")
        document.getElementById("parentBox").setAttribute("style", "height:80vh")
        $("#parentBox").animate({ scrollTop: 0 }, 1000);
        //document.getElementById("emo_cell").setAttribute("style", "stroke:red");
    }
}

d3.json("communitycrit_new.json", function (err, myjson) {
    json = myjson
    console.log()
    draw_view(json)
    //var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
    //draw_filtered_comments(filtered_comment, json)
    if (animate_trigger) {
        animatedDivs()
    }
})

function draw_one_row(one_row) {

    console.log("drawing one row", one_row)

    var myNode = document.getElementById("topDiv");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var myNode = document.getElementById("labelDiv");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var myNode = document.getElementById("aggregateDiv");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var numberOfRows = 19;
    var numberOfColumns = 6;

    var proposal_names = get_proposal_names(json)
    var proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
    var proposal_wise_sentiment_agg = get_proposal_wise_sentiment(json)
    var proposal_wise_subjectivity_agg = get_proposal_wise_subjectivity(json)
    var proposal_wise_profanity_agg = get_proposal_wise_profanity(json)
    var proposal_wise_topic_agg = get_proposal_wise_topic(json)
    var all_proposal_sentiment_agg = get_all_proposal_sentiment(json)
    var all_proposal_emotion_agg = get_all_proposal_emotion(json)
    var all_proposal_subjectivity_agg = get_all_proposal_subjectivity(json)
    var all_proposal_profanity_agg = get_all_proposal_profanity(json)

    // backup data
    this.data = json

    // Top div fillup
    var topElement = document.getElementById("topDiv")
    for (var i = 0; i < numberOfColumns; i++) {
        var tempTopDiv = document.createElement("div")
        tempTopDiv.id = "top" + i
        tempTopDiv.className = "t_column" + i
        topElement.appendChild(tempTopDiv)
    }

    //============================ top column 0 =========================//

    // var top0 = document.getElementById("top0")

    // var divCaption =
    //     "<div class=\"search\"" + "\">" +
    //     "<input type=\"text\" class=\"c_search_box\"" + "id=search_box\"" + " placeholder=\"Search...\"" + "style=\"width:280px\"" + ">" +
    //     "<i class=\"fa fa-search fa-lg\"></i>" + "</div>";

    // top0.innerHTML = divCaption

    //'<button type=\"submit\" id="search_button">' + "<i class=" + "\"fas fa-search fa-lg\"" + "></i>" + "</div>";

    //============================ top column 0 end =====================//


    //============================ top column 1 =========================//

    //var top1 = document.getElementById("top0")
    //tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    //tempSvg.id = "svgtop0"
    //tempSvg.setAttribute("class", "t_svg")
    //tempSvg.setAttribute("width", top1.clientWidth)
    //tempSvg.setAttribute("height", top1.clientHeight)
    //top1.appendChild(tempSvg)

    //============================ top column 1 end =====================//

    //============================ top column 2 =========================//

    // top emotions
    var top2 = document.getElementById("top2")
    tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg.id = "svgtop2"
    tempSvg.setAttribute("class", "t_svg")
    tempSvg.setAttribute("width", top2.clientWidth)
    tempSvg.setAttribute("height", top2.clientHeight)
    top2.appendChild(tempSvg)

    send_data = all_proposal_emotion_agg
    emotion_rows(send_data, tempSvg.id, top2.id, null)

    //============================ top column 2 end =========================//
    //============================ top column 3 =========================//

    // top sentiments
    var top3 = document.getElementById("top3")
    tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg.id = "svgtop3"
    tempSvg.setAttribute("class", "t_svg")
    tempSvg.setAttribute("width", top3.clientWidth)
    tempSvg.setAttribute("height", top3.clientHeight)
    top3.appendChild(tempSvg)

    send_data = all_proposal_sentiment_agg
    sentiment_rows(send_data, tempSvg.id, top3.id, null)

    //============================ top column 3 end =========================//

    //============================ top column 4 =========================//

    // top subjectivity
    var top4 = document.getElementById("top4")
    tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg.id = "svgtop4"
    tempSvg.setAttribute("class", "t_svg")
    tempSvg.setAttribute("width", top4.clientWidth)
    tempSvg.setAttribute("height", top4.clientHeight)
    top4.appendChild(tempSvg)

    send_data = all_proposal_subjectivity_agg
    subjectivity_rows(send_data, tempSvg.id, top4.id, null)

    //============================ top column 4 end =========================//

    //============================ top column 5 =========================//

    // top profanity
    var top5 = document.getElementById("top5")
    tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg.id = "svgtop5"
    tempSvg.setAttribute("class", "t_svg")
    tempSvg.setAttribute("width", top5.clientWidth)
    tempSvg.setAttribute("height", top5.clientHeight)
    top5.appendChild(tempSvg)
    send_data = all_proposal_profanity_agg[0].profanity_distribution;

    count_very_low = 0, count_low = 0, count_mid = 0, count_high = 0, count_very_high = 0;
    for (var x = 0; x < send_data.length; x++) {
        if (send_data[x] > 0.0 && send_data[x] <= 0.1) {
            count_very_low++;
        }
        else if (parseFloat(send_data[x]) > 0.1 && parseFloat(send_data[x]) <= 0.2) {
            count_low++;
        }
        else if (parseFloat(send_data[x]) > 0.2 && parseFloat(send_data[x]) <= 0.3) {
            count_mid++;
        }
        else if (parseFloat(send_data[x]) > 0.3 && parseFloat(send_data[x]) <= 0.4) {
            count_high++;
        }
        else if (parseFloat(send_data[x]) > 0.4 && parseFloat(send_data[x]) <= 0.5) {
            count_very_high++;
        }
    }

    var prof_data = []
    //console.log(prof_data)

    prof_data.push({
        key: proposal_names[i].idea_id,
        very_low: count_very_low,
        low: count_low,
        medium: count_mid,
        high: count_high,
        very_high: count_very_high,
    })

    profanity_rows(prof_data, tempSvg.id, top5.id, null)

    //============================ top column 5 end =========================//


    // Label div fillup

    var labelElement = document.getElementById("labelDiv")

    // =========================== label column 0 ===============================//

    // labels and search bars for proposals
    var labelColumn0Div = document.createElement("div")
    labelColumn0Div.id = "labelcolumn0"
    labelColumn0Div.className = "l_column0"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1.5em;text-align:left\"" + ">" + "Proposals" + "</p>" + "</div>" +
        "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "19\xa0" + "</p>" + "</div>"

    labelColumn0Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn0Div)

    // =========================== label column 0 end ===========================//


    //============================ label column 1 =========================//

    // label and search bars for topics
    var labelColumn1Div = document.createElement("div")
    labelColumn1Div.id = "labelcolumn1"
    labelColumn1Div.className = "l_column1"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1.5em;text-align:left\"" + ">" + "Topics" + "</p>" + "</div>" +
        "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + ">" +
        "<p>" + "Angry" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Worried" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_worried" >' +
        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>"
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

    labelColumn1Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn1Div)

    //============================ label column 1 end =====================//



    // =========================== label column 2 ===============================//

    // labels and icons for emotions
    var labelColumn2Div = document.createElement("div")
    labelColumn2Div.id = "labelcolumn2"
    labelColumn2Div.className = "l_column2"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\"" + ">" + "Emotion" + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + ">" +
        "<p>" + "Angry" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Worried" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_worried" >' +
        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Sad" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_sad" >' +
        "<i class=" + "\"fas fa-frown fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Bored" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_bored" >' +
        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Happy" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Excited" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";

    labelColumn2Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn2Div)

    // =========================== label column 2 end ===========================//


    // =========================== label column 3 ===============================//

    // labels and icons for sentiments
    var labelColumn3Div = document.createElement("div")
    labelColumn3Div.id = "labelcolumn3"
    labelColumn3Div.className = "l_column3"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\"" + ">" + "Sentiment" + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + ">" +
        "<p>" + "Negative" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_negative" >' +
        "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + "\">" +
        "<p>" + "Neutral" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_neutral" >' +
        "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + "\">" +
        "<p>" + "Positive" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_positive" >' +
        "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
    labelColumn3Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn3Div)

    // =========================== label column 3 end ===========================//

    // =========================== label column 4 ===============================//

    // labels and icons for subjectivity
    var labelColumn4Div = document.createElement("div")
    labelColumn4Div.id = "labelcolumn4"
    labelColumn4Div.className = "l_column4"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\"" + ">" + "Subjectivity" + "</p>" + "</div>" +
        "<div class=\"label-sub-body\"" + ">" +
        "<p>" + "Fact" + "</p>" +
        "<p>" + '<span class="label-sub-button" id="span_id_negative" >' +
        "<i class=" + "\"fas fa-clipboard-check fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sub-body\"" + "\">" +
        "<p>" + "Opinion" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_neutral" >' +
        "<i class=" + "\"fas fa-comments fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
    labelColumn4Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn4Div)

    // =========================== label column 4 end ===========================//

    // =========================== label column 5 ===============================//

    // labels for profanity
    var labelColumn5Div = document.createElement("div")
    labelColumn5Div.id = "labelcolumn5"
    labelColumn5Div.className = "l_column5"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\"" + ">" + "Profanity" + "</p>" + "</div>";
    labelColumn5Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn5Div)

    // =========================== label column 5 end ===========================//

    // Aggregate div fillup
    var titles = []
    var aggElement = document.getElementById("aggregateDiv")
    for (var i = 0; i < 1; i++) {
        var tempRowDiv = document.createElement("div")
        tempRowDiv.id = "row" + one_row
        //console.log(tempRowDiv.id)
        tempRowDiv.className = "c_row"
        for (var j = 0; j < numberOfColumns; j++) {
            var tempColumnDiv = document.createElement("div")
            tempColumnDiv.id = "row" + one_row + "column" + j
            //console.log(tempColumnDiv.id)
            tempColumnDiv.className = "c_column" + j
            tempRowDiv.appendChild(tempColumnDiv)
        }

        aggElement.appendChild(tempRowDiv)

        //console.log(proposal_names[i]);
        //============================ column 0=========================//

        // column with one proposal names
        var column0 = document.getElementById("row" + one_row + "column0")

        console.log("drawing one row column starting", one_row)

        if (proposal_names[one_row].idea_name.length < 30) {
            //console.log(proposal_names[i].idea_name.length)
            var divIdeaName =
                "<div class=\"idea-Name\"" + "\">" +
                //'<div  class="btn btn-primary btn-block ideaName" id="' + proposal_names[i].idea_id + '">' + proposal_names[i].idea_name + "</div>";
                '<div  class="ideaName" id="' + proposal_names[one_row].idea_id + '">' + '<p style="margin:5px 0px 5px 2px; word-wrap:break-word; text-align: left">' + proposal_names[one_row].idea_name + "</p></div>";
        }
        else {
            var divIdeaName =
                "<div class=\"idea-Name\"" + "\">" +
                //'<div  class="btn btn-primary btn-block ideaName" id="' + proposal_names[i].idea_id + '">' + proposal_names[i].idea_name + "</div>";
                '<div  class="ideaName" id="' + proposal_names[one_row].idea_id + '">' + '<p style="margin:0px 0px 0px 2px; word-wrap:break-word; text-align: left">' + proposal_names[one_row].idea_name + "</p></div>";
        }

        column0.innerHTML = divIdeaName

        //============================end of column 0==================//

        //============================ column 1 =========================//

        // column with proposal wise topics
        var divTopicName = "<div class=\"topic-body\"" + "\">"
        var column1 = document.getElementById("row" + one_row + "column1")
        for (var j = 0; j < proposal_wise_topic_agg[one_row].length; j++) {
            //console.log(proposal_wise_topic_agg[i][j])
            divTopicName = divTopicName +
                '<div  class="topicName" id="topic_' + proposal_names[one_row].idea_id + "_" + j + '\">' +
                '<span class="badge badge-warning topic-name" id="topic_' + proposal_names[one_row].idea_id + "_" + j + "_id\"" + 'style="margin: 1px 1px 1px 1px;font-size:0.7em;">' + proposal_wise_topic_agg[one_row][j].topic_keyphrase + '</span></div>'
        }

        column1.innerHTML = divTopicName

        //============================ column 1 end =====================//


        //============================ column 2 =========================//

        // column with proposal wise emotions
        var column2 = document.getElementById("row" + one_row + "column2")
        //console.log(proposal_wise_emotion_agg)
        tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        tempSvg.id = "svg" + "row" + one_row + "column2"
        tempSvg.setAttribute("class", "c_svg")
        tempSvg.setAttribute("width", column2.clientWidth)
        tempSvg.setAttribute("height", column2.clientHeight)
        column2.appendChild(tempSvg)

        send_data = []
        send_data.push(proposal_wise_emotion_agg[one_row])
        //console.log(send_data)
        emotion_rows(send_data, tempSvg.id, column2.id, proposal_names[one_row].idea_id)

        //============================end of column 2==================//

        //============================ column 3 =========================//
        // column with proposal wise sentiments

        var column3 = document.getElementById("row" + one_row + "column3")
        //console.log(proposal_wise_sentiment_agg)
        tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        tempSvg.id = "svg" + "row" + one_row + "column3"
        tempSvg.setAttribute("class", "c_svg")
        tempSvg.setAttribute("width", column3.clientWidth)
        tempSvg.setAttribute("height", column3.clientHeight)
        column3.appendChild(tempSvg)

        send_data = []
        send_data.push(proposal_wise_sentiment_agg[one_row])
        sentiment_rows(send_data, tempSvg.id, column3.id, proposal_names[one_row].idea_id)

        //============================end of column 3 ==================//

        //============================ column 4 =========================//
        // column with proposal wise subjectivity

        var column4 = document.getElementById("row" + one_row + "column4")
        //console.log(proposal_wise_subjectivity_agg)
        tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        tempSvg.id = "svg" + "row" + one_row + "column4"
        tempSvg.setAttribute("class", "c_svg")
        tempSvg.setAttribute("width", column4.clientWidth)
        tempSvg.setAttribute("height", column4.clientHeight)
        column4.appendChild(tempSvg)

        send_data = []
        send_data.push(proposal_wise_subjectivity_agg[one_row])
        subjectivity_rows(send_data, tempSvg.id, column4.id, proposal_names[one_row].idea_id)

        //============================ end of column 4 ==================//

        //============================ column 5 =========================//

        // column with proposal wise profanity

        var column5 = document.getElementById("row" + one_row + "column5")
        tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        tempSvg.id = "svg" + "row" + one_row + "column5"
        tempSvg.setAttribute("class", "c_svg")
        tempSvg.setAttribute("width", column5.clientWidth)
        tempSvg.setAttribute("height", column5.clientHeight)
        column5.appendChild(tempSvg)

        var column5 = document.getElementById("row" + one_row + "column5")
        var send_data = proposal_wise_profanity_agg[one_row].profanity_distribution;
        count_very_low = 0, count_low = 0, count_mid = 0, count_high = 0, count_very_high = 0;
        for (var x = 0; x < send_data.length; x++) {
            if (send_data[x] > 0.0 && send_data[x] <= 0.1) {
                count_very_low++;
            }
            else if (parseFloat(send_data[x]) > 0.1 && parseFloat(send_data[x]) <= 0.2) {
                count_low++;
            }
            else if (parseFloat(send_data[x]) > 0.2 && parseFloat(send_data[x]) <= 0.3) {
                count_mid++;
            }
            else if (parseFloat(send_data[x]) > 0.3 && parseFloat(send_data[x]) <= 0.4) {
                count_high++;
            }
            else if (parseFloat(send_data[x]) > 0.4 && parseFloat(send_data[x]) <= 0.5) {
                count_very_high++;
            }
        }

        var prof_data = []
        //console.log(prof_data)

        prof_data.push({
            key: proposal_names[one_row].idea_id,
            very_low: count_very_low,
            low: count_low,
            medium: count_mid,
            high: count_high,
            very_high: count_very_high,
        })

        profanity_rows(prof_data, tempSvg.id, column5.id, proposal_names[one_row].idea_id)
    }

    // // Instructions
    // var divInstr = document.getElementById("instr")
    // var divInstrHTML =
    //     "<span class=\"c_instr_button\" id=\"instr_button_id\"><i class=\"fas fa-info-circle fa-lg\"></i></span>";
    // divInstr.innerHTML = divInstrHTML;
    // setTippy(divInstr.id, json)

    // // refresh
    // var divRefresh = document.getElementById("refresh")
    // var divrefreshHTML =
    //     "<span class=\"c_refresh_button\" id=\"refresh_button_id\"><i class=\"fas fa-sync-alt fa-lg\"></i></span>";
    // divRefresh.innerHTML = divrefreshHTML;
}

function draw_view(json) {

    var myNode = document.getElementById("topDiv");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var myNode = document.getElementById("labelDiv");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var myNode = document.getElementById("aggregateDiv");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }

    var numberOfRows = 19;
    var numberOfColumns = 6;

    var proposal_names = get_proposal_names(json)
    var proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
    var proposal_wise_sentiment_agg = get_proposal_wise_sentiment(json)
    var proposal_wise_subjectivity_agg = get_proposal_wise_subjectivity(json)
    var proposal_wise_profanity_agg = get_proposal_wise_profanity(json)
    var proposal_wise_topic_agg = get_proposal_wise_topic(json)
    var all_proposal_sentiment_agg = get_all_proposal_sentiment(json)
    var all_proposal_emotion_agg = get_all_proposal_emotion(json)
    var all_proposal_subjectivity_agg = get_all_proposal_subjectivity(json)
    var all_proposal_profanity_agg = get_all_proposal_profanity(json)

    // backup data
    this.data = json

    // Top div fillup
    var topElement = document.getElementById("topDiv")
    for (var i = 0; i < numberOfColumns; i++) {
        var tempTopDiv = document.createElement("div")
        tempTopDiv.id = "top" + i
        tempTopDiv.className = "t_column" + i
        topElement.appendChild(tempTopDiv)
    }

    //============================ top column 0 =========================//

    var top0 = document.getElementById("top0")

    var divCaption =
        "<div class=\"search\"" + "\">" +
        "<input type=\"text\" class=\"c_search_box\"" + " id=\"search_box\"" + " placeholder=\"Search...\"" + "style=\"width:280px\"" + ">" +
        "<i class=\"fa fa-search fa-lg\"></i>" + "</div>";

    top0.innerHTML = ""

    //'<button type=\"submit\" id="search_button">' + "<i class=" + "\"fas fa-search fa-lg\"" + "></i>" + "</div>";

    //============================ top column 0 end =====================//


    //============================ top column 1 =========================//

    //var top1 = document.getElementById("top0")
    //tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    //tempSvg.id = "svgtop0"
    //tempSvg.setAttribute("class", "t_svg")
    //tempSvg.setAttribute("width", top1.clientWidth)
    //tempSvg.setAttribute("height", top1.clientHeight)
    //top1.appendChild(tempSvg)

    //============================ top column 1 end =====================//

    //============================ top column 2 =========================//

    // top emotions
    var top2 = document.getElementById("top2")
    // tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg_id = "svgtop2"
    // tempSvg.setAttribute("class", "t_svg")
    // tempSvg.setAttribute("width", top2.clientWidth)
    // tempSvg.setAttribute("height", top2.clientHeight)
    // top2.appendChild(tempSvg)

    send_data = all_proposal_emotion_agg
    emotion_rows(send_data, tempSvg_id, top2.id, null)

    //============================ top column 2 end =========================//
    //============================ top column 3 =========================//

    // top sentiments
    var top3 = document.getElementById("top3")
    // tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg_id = "svgtop3"
    // tempSvg.setAttribute("class", "t_svg")
    // tempSvg.setAttribute("width", top3.clientWidth)
    // tempSvg.setAttribute("height", top3.clientHeight)
    // top3.appendChild(tempSvg)

    send_data = all_proposal_sentiment_agg
    sentiment_rows(send_data, tempSvg_id, top3.id, null)

    //============================ top column 3 end =========================//

    //============================ top column 4 =========================//

    // // top subjectivity
    // var top4 = document.getElementById("top4")
    // tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    // tempSvg.id = "svgtop4"
    // tempSvg.setAttribute("class", "t_svg")
    // tempSvg.setAttribute("width", top4.clientWidth)
    // tempSvg.setAttribute("height", top4.clientHeight)
    // top4.appendChild(tempSvg)

    // send_data = all_proposal_subjectivity_agg
    // subjectivity_rows(send_data, tempSvg.id, top4.id, null)

    //============================ top column 4 end =========================//

    //============================ top column 5 =========================//

    // top profanity
    // var top5 = document.getElementById("top5")
    // tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    // tempSvg.id = "svgtop5"
    // tempSvg.setAttribute("class", "t_svg")
    // tempSvg.setAttribute("width", top5.clientWidth)
    // tempSvg.setAttribute("height", top5.clientHeight)
    // top5.appendChild(tempSvg)
    // send_data = all_proposal_profanity_agg[0].profanity_distribution;

    // count_very_low = 0, count_low = 0, count_mid = 0, count_high = 0, count_very_high = 0;
    // for (var x = 0; x < send_data.length; x++) {
    //     if (send_data[x] > 0.0 && send_data[x] <= 0.1) {
    //         count_very_low++;
    //     }
    //     else if (parseFloat(send_data[x]) > 0.1 && parseFloat(send_data[x]) <= 0.2) {
    //         count_low++;
    //     }
    //     else if (parseFloat(send_data[x]) > 0.2 && parseFloat(send_data[x]) <= 0.3) {
    //         count_mid++;
    //     }
    //     else if (parseFloat(send_data[x]) > 0.3 && parseFloat(send_data[x]) <= 0.4) {
    //         count_high++;
    //     }
    //     else if (parseFloat(send_data[x]) > 0.4 && parseFloat(send_data[x]) <= 0.5) {
    //         count_very_high++;
    //     }
    // }

    // var prof_data = []
    // //console.log(prof_data)

    // prof_data.push({
    //     key: proposal_names[i].idea_id,
    //     very_low: count_very_low,
    //     low: count_low,
    //     medium: count_mid,
    //     high: count_high,
    //     very_high: count_very_high,
    // })

    // profanity_rows(prof_data, tempSvg.id, top5.id, null)

    //============================ top column 5 end =========================//


    // Label div fillup

    var labelElement = document.getElementById("labelDiv")

    // =========================== label column 0 ===============================//

    // labels and search bars for proposals
    var labelColumn0Div = document.createElement("div")
    labelColumn0Div.id = "labelcolumn0"
    labelColumn0Div.className = "l_column0"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1.5em;text-align:left\"" + ">" + "Proposals" + "</p>" + "</div>" +
        "<div class=\"label-info-body\"" + ">" +
        "<p>" + "Users" + "</p>" +
        "<p>" + '<span class="label-info-button" id="span_id_commenters" >' +
        "<i class=" + "\"fas fa-user fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-info-body\"" + "\">" +
        "<p>" + "Comments" + "</p>" +
        "<p>" + '<span class="label-info-button" id="span_id_comments" >' +
        "<i class=" + "\"fas fa-comment-alt fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>"
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "19\xa0" + "</p>" + "</div>"

    labelColumn0Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn0Div)

    // =========================== label column 0 end ===========================//


    //============================ label column 1 =========================//

    // label and search bars for topics
    var labelColumn1Div = document.createElement("div")
    labelColumn1Div.id = "labelcolumn1"
    labelColumn1Div.className = "l_column1"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1.5em;text-align:left\"" + ">" + "Topics" + "</p>" + "</div>" +
        "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

    labelColumn1Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn1Div)

    //============================ label column 1 end =====================//



    // =========================== label column 2 ===============================//

    // labels and icons for emotions
    var labelColumn2Div = document.createElement("div")
    labelColumn2Div.id = "labelcolumn2"
    labelColumn2Div.className = "l_column2"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1.5em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + ">" +
        "<p>" + "Angry" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Worried" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_worried" >' +
        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Sad" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_sad" >' +
        "<i class=" + "\"fas fa-frown fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        //"<div class=\"label-emo-body\"" + "\">" +
        // "<p>" + "Bored" + "</p>" +
        // "<p>" + '<span class="label-emo-button" id="span_id_bored" >' +
        // "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Happy" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Excited" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";

    labelColumn2Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn2Div)

    // =========================== label column 2 end ===========================//


    // =========================== label column 3 ===============================//

    // labels and icons for sentiments
    var labelColumn3Div = document.createElement("div")
    labelColumn3Div.id = "labelcolumn3"
    labelColumn3Div.className = "l_column3"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1.5em;\"" + ">" + "Sentiment" + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + ">" +
        "<p>" + "Negative" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_negative" >' +
        "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + "\">" +
        "<p>" + "Neutral" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_neutral" >' +
        "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + "\">" +
        "<p>" + "Positive" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_positive" >' +
        "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
    labelColumn3Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn3Div)

    // =========================== label column 3 end ===========================//

    // =========================== label column 4 ===============================//

    // // labels and icons for subjectivity
    // var labelColumn4Div = document.createElement("div")
    // labelColumn4Div.id = "labelcolumn4"
    // labelColumn4Div.className = "l_column4"

    // var divCaption =
    //     "<div class=\"label-body\"" + "\">" +
    //     "<div class=\"label-title\"" + ">" +
    //     "<p style=\"margin: 5px 0px 5px 0px\"" + ">" + "Subjectivity" + "</p>" + "</div>" +
    //     "<div class=\"label-sub-body\"" + ">" +
    //     "<p>" + "Fact" + "</p>" +
    //     "<p>" + '<span class="label-sub-button" id="span_id_negative" >' +
    //     "<i class=" + "\"fas fa-clipboard-check fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
    //     "<div class=\"label-sub-body\"" + "\">" +
    //     "<p>" + "Opinion" + "</p>" +
    //     "<p>" + '<span class="label-sent-button" id="span_id_neutral" >' +
    //     "<i class=" + "\"fas fa-comments fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
    // labelColumn4Div.innerHTML = divCaption
    // labelElement.appendChild(labelColumn4Div)

    // =========================== label column 4 end ===========================//

    // =========================== label column 5 ===============================//

    // // labels for profanity
    // var labelColumn5Div = document.createElement("div")
    // labelColumn5Div.id = "labelcolumn5"
    // labelColumn5Div.className = "l_column5"

    // var divCaption =
    //     "<div class=\"label-body\"" + "\">" +
    //     "<div class=\"label-title\"" + ">" +
    //     "<p style=\"margin: 5px 0px 5px 0px\"" + ">" + "Profanity" + "</p>" + "</div>";
    // labelColumn5Div.innerHTML = divCaption
    // labelElement.appendChild(labelColumn5Div)

    // =========================== label column 5 end ===========================//

    // Aggregate div fillup
    var titles = []
    var aggElement = document.getElementById("aggregateDiv")
    for (var i = 0; i < numberOfRows; i++) {
        var tempRowDiv = document.createElement("div")
        tempRowDiv.id = "row" + i
        //console.log(tempRowDiv.id)
        tempRowDiv.className = "c_row"
        for (var j = 0; j < numberOfColumns; j++) {
            var tempColumnDiv = document.createElement("div")
            tempColumnDiv.id = "row" + i + "column" + j
            //console.log(tempColumnDiv.id)
            tempColumnDiv.className = "c_column" + j
            tempRowDiv.appendChild(tempColumnDiv)
        }

        aggElement.appendChild(tempRowDiv)

        //console.log(proposal_names[i]);
        //============================ column 0=========================//

        // column with all proposal names
        var column0 = document.getElementById("row" + i + "column0")

        if (proposal_names[i].idea_name.length < 30) {
            //console.log(proposal_names[i].idea_name.length)
            var divIdeaName =
                "<div class=\"idea-Name\" " + "\">" +
                //'<div  class="btn btn-primary btn-block ideaName" id="' + proposal_names[i].idea_id + '">' + proposal_names[i].idea_name + "</div>";
                '<div  class="ideaName" id="' + proposal_names[i].idea_id + '">' + '<p class="search_enable" style="margin:5px 0px 5px 2px; word-wrap:break-word; text-align: left">' + proposal_names[i].idea_name + "</p></div>";
        }
        else {
            var divIdeaName =
                "<div class=\"idea-Name\"" + "\">" +
                //'<div  class="btn btn-primary btn-block ideaName" id="' + proposal_names[i].idea_id + '">' + proposal_names[i].idea_name + "</div>";
                '<div  class="ideaName" id="' + proposal_names[i].idea_id + '">' + '<p style="margin:0px 0px 0px 2px; word-wrap:break-word; text-align: left">' + proposal_names[i].idea_name + "</p></div>";
        }

        column0.innerHTML = divIdeaName

        //============================end of column 0==================//

        //============================ column 1 =========================//

        // column with proposal wise topics
        var divTopicName = "<div class=\"topic-body\"" + "\">"
        var column1 = document.getElementById("row" + i + "column1")
        //console.log(proposal_wise_topic_agg)
        for (var j = 0; j < proposal_wise_topic_agg[i].length; j++) {
            divTopicName = divTopicName +
                '<div  class="topicName" id="topic_' + proposal_names[i].idea_id + "_" + j + '\">' +
                '<span class="badge badge-warning topic-name" id="topic_' + proposal_names[i].idea_id + "_" + j + "_id\"" + 'style="margin: 1px 1px 1px 1px;font-size:1em;">' + proposal_wise_topic_agg[i][j].topic_keyphrase + '</span></div>'
        }
        column1.innerHTML = divTopicName

        //============================ column 1 end =====================//


        //============================ column 2 =========================//

        // column with proposal wise emotions
        var column2 = document.getElementById("row" + i + "column2")
        //console.log(json)
        // tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        // tempSvg.id = "svg" + "row" + i + "column2"
        // tempSvg.setAttribute("class", "c_svg")
        // tempSvg.setAttribute("width", column2.clientWidth)
        // tempSvg.setAttribute("height", column2.clientHeight)
        // column2.appendChild(tempSvg)
        var svg_id = "svg" + "row" + i + "column2"
        send_data = []
        send_data.push(proposal_wise_emotion_agg[i])
        //console.log(send_data)
        emotion_rows(send_data, svg_id,column2.id, proposal_names[i].idea_id)


        //============================end of column 2==================//

        //============================ column 3 =========================//
        // column with proposal wise sentiments

        var column3 = document.getElementById("row" + i + "column3")
        //console.log(proposal_wise_sentiment_agg)
        // tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        var tempSvg_id = "svg" + "row" + i + "column3"
        // tempSvg.setAttribute("class", "c_svg")
        // tempSvg.setAttribute("width", column3.clientWidth)
        // tempSvg.setAttribute("height", column3.clientHeight)
        // column3.appendChild(tempSvg)

        send_data = []
        send_data.push(proposal_wise_sentiment_agg[i])
        sentiment_rows(send_data, tempSvg_id, column3.id, proposal_names[i].idea_id)

        //============================end of column 3 ==================//

        //============================ column 4 =========================//
        // // column with proposal wise subjectivity

        // var column4 = document.getElementById("row" + i + "column4")
        // //console.log(proposal_wise_subjectivity_agg)
        // tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        // tempSvg.id = "svg" + "row" + i + "column4"
        // tempSvg.setAttribute("class", "c_svg")
        // tempSvg.setAttribute("width", column4.clientWidth)
        // tempSvg.setAttribute("height", column4.clientHeight)
        // column4.appendChild(tempSvg)

        // send_data = []
        // send_data.push(proposal_wise_subjectivity_agg[i])
        // subjectivity_rows(send_data, tempSvg.id, column4.id, proposal_names[i].idea_id)

        //============================ end of column 4 ==================//

        //============================ column 5 =========================//

        // // column with proposal wise profanity

        // var column5 = document.getElementById("row" + i + "column5")
        // tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        // tempSvg.id = "svg" + "row" + i + "column5"
        // tempSvg.setAttribute("class", "c_svg")
        // tempSvg.setAttribute("width", column5.clientWidth)
        // tempSvg.setAttribute("height", column5.clientHeight)
        // column5.appendChild(tempSvg)

        // var column5 = document.getElementById("row" + i + "column5")
        // var send_data = proposal_wise_profanity_agg[i].profanity_distribution;
        // count_very_low = 0, count_low = 0, count_mid = 0, count_high = 0, count_very_high = 0;
        // for (var x = 0; x < send_data.length; x++) {
        //     if (send_data[x] > 0.0 && send_data[x] <= 0.1) {
        //         count_very_low++;
        //     }
        //     else if (parseFloat(send_data[x]) > 0.1 && parseFloat(send_data[x]) <= 0.2) {
        //         count_low++;
        //     }
        //     else if (parseFloat(send_data[x]) > 0.2 && parseFloat(send_data[x]) <= 0.3) {
        //         count_mid++;
        //     }
        //     else if (parseFloat(send_data[x]) > 0.3 && parseFloat(send_data[x]) <= 0.4) {
        //         count_high++;
        //     }
        //     else if (parseFloat(send_data[x]) > 0.4 && parseFloat(send_data[x]) <= 0.5) {
        //         count_very_high++;
        //     }
        // }

        // var prof_data = []
        // //console.log(prof_data)

        // prof_data.push({
        //     key: proposal_names[i].idea_id,
        //     very_low: count_very_low,
        //     low: count_low,
        //     medium: count_mid,
        //     high: count_high,
        //     very_high: count_very_high,
        // })

        // profanity_rows(prof_data, tempSvg.id, column5.id, proposal_names[i].idea_id)
        //============================ end of column 5 ==================//

        // // Instructions
        // var divInstr = document.getElementById("instr")
        // var divInstrHTML =
        //     "<span class=\"c_instr_button\" id=\"instr_button_id\"><i class=\"fas fa-info-circle fa-lg\"></i></span>";
        // divInstr.innerHTML = divInstrHTML;
        // setTippy(divInstr.id, json)

        // // refresh
        // var divRefresh = document.getElementById("refresh")
        // var divrefreshHTML =
        //     "<span class=\"c_refresh_button\" id=\"refresh_button_id\"><i class=\"fas fa-sync-alt fa-lg\"></i></span>";
        // divRefresh.innerHTML = divrefreshHTML;
    }

    // On click for sort icons by emotion
    $(document).ready(function () {
        $('.label-emo-button').click(function () {
            var id = $(this).attr('id');
            console.log("inside iconClick", id)
            this_emo = id.split("_")[2] + "_normalized"
            var emo_agg = get_proposal_wise_emotion(json)
            emo_agg.sort((function (a, b) {
                console.log(parseFloat(b[this_emo]) - parseFloat(a[this_emo]))
                return parseFloat(b[this_emo]) - parseFloat(a[this_emo])
            }))

            var id_keys = []
            for (var i = 0; i < emo_agg.length; i++) {
                id_keys.push(emo_agg[i].key)
            }

            var show_this = []
            for (var i = 0; i < id_keys.length; i++) {
                for (var j = 0; j < json["ideas"].length; j++) {
                    //console.log(json.ideas[j].id, id_keys[i])

                    if (json.ideas[j].id == id_keys[i]) {
                        //console.log(json.ideas[i])
                        show_this.push(json.ideas[j])
                    }
                }
            }
            sorted_ideas = { "ideas": show_this }
            draw_view(sorted_ideas)
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    // On click for sort icons by sentiment
    $(document).ready(function () {
        $('.label-sent-button').click(function () {
            var id = $(this).attr('id');
            console.log("inside iconClick", id)
            this_sent = id.split("_")[2] + "_normalized"
            var sent_agg = get_proposal_wise_sentiment(json)
            sent_agg.sort((function (a, b) {
                return parseFloat(b[this_sent]) - parseFloat(a[this_sent])
            }))

            var id_keys = []
            for (var i = 0; i < sent_agg.length; i++) {
                id_keys.push(sent_agg[i].key)
            }

            var show_this = []
            for (var i = 0; i < id_keys.length; i++) {
                for (var j = 0; j < json["ideas"].length; j++) {
                    //console.log(json.ideas[j].id, id_keys[i])

                    if (json.ideas[j].id == id_keys[i]) {
                        //console.log(json.ideas[i])
                        show_this.push(json.ideas[j])
                    }
                }
            }
            sorted_ideas = { "ideas": show_this }
            draw_view(sorted_ideas)
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    // On click for sort icons by info
    $(document).ready(function () {
        $('.label-info-button').click(function () {
            var id = $(this).attr('id');
            console.log("inside iconClick", id)
            this_info = "num_of_" + id.split("_")[2]

            var copy_json = JSON.parse(JSON.stringify(json))

            copy_json["ideas"].sort((function (a, b) {
                console.log(parseFloat(a[this_info]) - parseFloat(b[this_info]))
                return parseFloat(b[this_info]) - parseFloat(a[this_info])
            }))

            draw_view(copy_json)
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    // On click for proposals
    $(document).ready(function () {
        $('.ideaName').click(function () {
            var id = $(this).attr('id');
            if (selected_rows[id]) {
                selected_rows[id] = null;
                document.getElementById(id).setAttribute("style", "background-color:none")
            }
            else {
                selected_rows[id] = true;
                document.getElementById(id).setAttribute("style", "background-color:#3DAADD")
            }
            var all_filtered_comment = []

            for (var i = 0; i < selected_rows.length; i++) {
                if (selected_rows[i]) {
                    filterobj.idea_id = i
                    filterobj.emotion = null
                    filterobj.sentiment_final = null
                    filterobj.subjectivity = null
                    filterobj.task_id = null
                    filterobj.topic = []
                    var temp_comments = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
                    all_filtered_comment.push(temp_comments.ideas[0])
                }
            }
            var filtered_comment = { "ideas": all_filtered_comment }

            // console.log(filtered_comment)
            draw_filtered_comments(filtered_comment, json)

            if (!animate_trigger) {
                document.getElementById(id).scrollIntoView({ block: 'center' });
            }

            console.log(id)
            if (animate_trigger) {
                animatedDivs();
            }
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    function getAllIndexes(arr, val) {
        var indexes = [], i;
        for (i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i);
        return indexes;
    }

    // On click for topics //
    $(document).ready(function () {
        $('.topicName').click(function () {
            var id = $(this).attr('id');
            var split_str = id.split("_")

            if (selected_topics[split_str[1]][split_str[2]]) {
                selected_topics[split_str[1]][split_str[2]] = null;
                document.getElementById(id + "_id").setAttribute("style", "background-color:none")
            }
            else {
                selected_topics[split_str[1]][split_str[2]] = true;
                document.getElementById(id + "_id").setAttribute("style", "background-color:#3DAADD")
            }

            all_filtered_topics = []

            for (var i = 0; i < selected_topics.length; i++) {
                //console.log(filterobj.topic)
                filterobj.idea_id = i
                filterobj.emotion = null
                filterobj.sentiment_final = null
                filterobj.subjectivity = null
                filterobj.task_id = null
                filterobj.topic = getAllIndexes(selected_topics[i], true)

                if (filterobj.topic.length != 0) {
                    var temp_comments = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
                    all_filtered_topics.push(temp_comments.ideas[0])
                }
            }

            var filtered_comment = { "ideas": all_filtered_topics }
            console.log(filtered_comment)
            draw_filtered_comments(filtered_comment, json)

            // filterobj.idea_id = split_str[1]
            // filterobj.emotion = null
            // filterobj.sentiment_final = null
            // filterobj.subjectivity = null
            // filterobj.task_id = null
            // filterobj.topic = split_str[2]
            // var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
            // draw_filtered_comments(filtered_comment, json)

            //console.log()
            //$("#parentBox").animate({ scrollTop: 0 }, 1000);
            // draw_view();

            // id = id + "_id"

            // if (animate_trigger) {
            //     animatedDivs();
            // }
            // if (!animate_trigger) {
            //     $("#aggregateDiv").animate({ scrollTop: $('#' + filterobj.idea_id).offset().top }, 1000);
            //     document.getElementById(id).scrollIntoView({ block: 'center' });
            // }

            // document.getElementById(id).setAttribute("style", "background-color:#3DAADD")
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    // On click function for proposal search box
    $(document).ready(function () {

        $("#text-proposal").keyup(function (event) {
            if (event.keyCode === 13) {
                $("#span_id_proposal").click();
            }
        });

        $('.label-search-button-proposal').click(function () {
            var id = $(this).attr('id');
            var text_box = document.getElementById("text-proposal")
            var text = text_box.value
            var flag = true
            var proposal_names = get_proposal_names(json)

            for (var i = 0; i < proposal_names.length; i++) {
                if (text.toLowerCase().replace(/\s+/g, '') == proposal_names[i].idea_name.toLowerCase().replace(/\s+/g, '')) {
                    filterobj.idea_id = proposal_names[i].idea_id
                    filterobj.emotion = null
                    filterobj.sentiment_final = null
                    filterobj.subjectivity = null
                    filterobj.task_id = null
                    filterobj.topic = null
                    flag = false
                }
            }

            if (flag == false) {
                var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
                draw_filtered_comments(filtered_comment, json)

                $("#parentBox").animate({ scrollTop: 0 }, 1000);

                //console.log("redrawing")
                draw_view(json);
            }
            else {
                text_box.value = "No match found"
            }
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    // // On click function for topic search box
    $(document).ready(function () {

        $("#text-topic").keyup(function (event) {
            if (event.keyCode === 13) {
                $("#span_id_topic").click();
            }
        });

        $('.label-search-button-topic').click(function () {
            var id = $(this).attr('id');
            var text_box = document.getElementById("text-topic")
            var text = text_box.value
            var flag = true
            var all_topic_names = get_proposal_wise_topic(json)
            var proposal_names = get_proposal_names(json)

            for (var i = 0; i < all_topic_names.length; i++) {
                for (var j in all_topic_names[i]) {
                    if (text.toLowerCase().replace(/\s+/g, '') == all_topic_names[i][j].topic_keyphrase.toLowerCase().replace(/\s+/g, '')) {
                        filterobj.idea_id = proposal_names[i].idea_id
                        filterobj.emotion = null
                        filterobj.sentiment_final = null
                        filterobj.subjectivity = null
                        filterobj.task_id = null
                        filterobj.topic = j
                        flag = false
                    }
                }

            }

            if (flag == false) {
                var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
                draw_filtered_comments(filtered_comment, json)

                //$("#parentBox").animate({ scrollTop: 0 }, 1000);

                //console.log("redrawing")
                draw_view(json);
            }
            else {
                text_box.value = "No match found"
            }
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });

    });

    // functions for removing text from searchboxes
    $(document).ready(function () {
        $('.text-box-topic').click(function () {
            var id = $(this).attr('id');
            document.getElementById("text-topic").value = ""
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    $(document).ready(function () {
        $('.text-box-proposal').click(function () {
            var id = $(this).attr('id');
            document.getElementById("text-proposal").value = ""
        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });

    // On click for refresh //
    $(document).ready(function () {
        $('#refresh_button_id').click(function () {
            var row_num = ""
            filterobj.idea_id = null
            filterobj.emotion = null
            filterobj.sentiment_final = null
            filterobj.subjectivity = null
            filterobj.task_id = null
            filterobj.topic = null

            console.log("refreshing")
            //$("#parentBox").animate({ scrollTop: 0 }, 1000);
            draw_view();
            if (animate_trigger) {
                animatedDivs();
            }

            //console.log("redrawing")
            //var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
            //draw_filtered_comments(filtered_comment, json)

        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });
}

//functions for d3
function responsivefy(svg) {
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
        console.log(targetWidth,targetHeight)
        svg.attr("width", targetWidth);
        svg.attr("height", targetHeight);
        // svg.attr("height", Math.round(targetWidth / aspect));
    }
}
// draw emotions
function emotion_rows(salesData,svg_id, div_id, idea_id) {
    
    var group = ["angry", "worried", "sad", "happy", "excited"];
    var parseDate = d3.timeFormat("%b-%Y");
    var mainDiv = "#" + div_id;
    var mainDivName = div_id;

    var column = document.getElementById(div_id)

   var svg = d3.select(mainDiv)
   .append("svg")
   //responsive SVG needs these 2 attributes and no width and height attr
    .attr("id",svg_id)
   .attr("height", column.clientHeight)
   .attr("width",column.clientWidth)
   .call(responsivefy)
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
        height = +svg.attr("height");
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

    var z = d3.scaleOrdinal(["#E45756", "#B279A2", "#4C78A8", "#EECA3B", "#F58518"]);

    var maing = svg.append("g")
        .selectAll("g")
        .data(layers);
    var g = maing.enter().append("g")
        // .attr("fill", function (d) {
        //     return z(d.key);
        // })
        // .attr("style", "outline: solid;")
        // .attr("style", "outline-color: #F2F2F2")
        .style("cursor", "pointer");
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
            }
            else {
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
            return z(d.key);
        })
        .attr("stroke", function (d) {
            return z(d.key);
        })
        .attr("stroke-width", function (d) {
            return "2px";
        })
        .attr("height", 30)
        //.attr("height", y.bandwidth);
        .attr("opacity", 0.8);

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
            if (cellHistory.emo_switch && cellHistory.prev_idea_id_emo == idea_id && cellHistory.prev_emo_color == z(d.key)) {
                return 1
            }
            else {
                return 0.8
            }
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

    rect.on("click", clicked_emotion);

    function clicked_emotion(d) {

        console.log("oneclick")
        var this_cell = d3.select(this)
        filterobj.idea_id = idea_id
        filterobj.emotion = d.key

        // remove outline from previous cell 
        if (cellHistory.prev_emo_cell) {
            cellHistory.prev_emo_cell.attr("stroke", cellHistory.prev_emo_color)
            cellHistory.prev_emo_cell.attr("opacity", 0.8)
        }

        // deselect cell (check if previously selected row and column selected. Remove the column filter)
        if (cellHistory.emo_switch && cellHistory.prev_emo == d.key && cellHistory.prev_idea_id_emo == idea_id) {
            filterobj.idea_id = cellHistory.prev_idea_id
            filterobj.emotion = null
            filterobj.topic = null
            cellHistory.emo_switch = false
            if (animate_trigger) {
                animatedDivs();
            }
        }
        else {
            if (animate_trigger) {
                animatedDivs();
            }
            this_cell.attr("stroke", "black")
            this_cell.attr("id", "emo_cell")
            this_cell.attr("opacity", 1)
            cellHistory.emo_switch = true
        }

        //console.log(filterobj)

        var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
        draw_filtered_comments(filtered_comment, json)
        cellHistory.prev_emo_cell = this_cell
        cellHistory.prev_idea_id_emo = idea_id
        cellHistory.prev_idea_id = idea_id
        cellHistory.prev_emo = d.key
        cellHistory.prev_emo_color = z(d.key)

        $("#parentBox").animate({ scrollTop: 0 }, 1000);
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
        .attr("opacity", 0.71)
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

// draw sentiments
function sentiment_rows(salesData, svg_id, div_id, idea_id) {

    var group = ["negative", "neutral", "positive"];
    var parseDate = d3.timeFormat("%b-%Y");

    var mainDiv = "#" + div_id;
    var mainDivName = div_id;

    var column = document.getElementById(div_id)

    var svg = d3.select(mainDiv)
    .append("svg")
    //responsive SVG needs these 2 attributes and no width and height attr
     .attr("id",svg_id)
    .attr("height", column.clientHeight)
    .attr("width",column.clientWidth)
    .call(responsivefy)

    salesData.forEach(function (d) {
        d = type(d);
    });
    var layers = d3.stack()
        .keys(group)
        .offset(d3.stackOffsetDiverging)
        (salesData);

    var svg = d3.select("#" + svg_id),
        margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },

        width = +svg.attr("width") - 2,
        height = +svg.attr("height");
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

    var z = d3.scaleOrdinal(["#D8B365", "#F5F5F5", "#5AB4AC"]);

    var maing = svg.append("g")
        .selectAll("g")
        .data(layers);
    var g = maing.enter().append("g")
        // .attr("fill", function (d) {
        //     return z(d.key);
        // })
        // .attr("style", "outline: solid;")
        // .attr("style", "outline-color: #F2F2F2")
        .style("cursor", "pointer");
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
            }
            else {
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
            return z(d.key);
        })
        .attr("stroke", function (d) {
            return z(d.key);
        })
        .attr("stroke-width", function (d) {
            return "2px";
        })
        .attr("height", 30)
        .attr("opacity", 0.8);
    //.attr("height", y.bandwidth);

    rect.on("mouseover", function () {
        var currentEl = d3.select(this);
        currentEl.attr("opacity", 1)
        var fadeInSpeed = 120;
        d3.select("#recttooltip_" + mainDivName)
            .transition()
            .duration(fadeInSpeed)
            .style("opacity", function () {
                return 1;
            });
        d3.select("#recttooltip_" + mainDivName).attr("transform", function (d) {
            var mouseCoords = d3.mouse(this.parentNode);
            var xCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                    .attr("width"));
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
                        .attr("width"));
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
            if (cellHistory.senti_switch && cellHistory.prev_idea_id_senti == idea_id && cellHistory.prev_senti_color == z(d.key)) {
                return 1
            }
            else {
                return 0.8
            }
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

    rect.on("click", clicked_sentiment);

    function clicked_sentiment(d) {
        var this_cell = d3.select(this)
        filterobj.idea_id = idea_id
        filterobj.sentiment_final = d.key

        if (cellHistory.prev_senti_cell) {
            cellHistory.prev_senti_cell.attr("stroke", cellHistory.prev_senti_color)
            cellHistory.prev_senti_cell.attr("opacity", 0.8)
        }

        // deselect cell (check if previously selected row and column selected. Remove the column filter and revert back to last row)
        if (cellHistory.senti_switch && cellHistory.prev_senti == d.key && cellHistory.prev_idea_id_senti == idea_id) {
            filterobj.sentiment_final = null
            filterobj.idea_id = cellHistory.prev_idea_id
            filterobj.topic = null
            cellHistory.senti_switch = false
            if (animate_trigger) {
                animatedDivs();
            }

        }
        else {
            this_cell.attr("stroke", "black")
            this_cell.attr("opacity", 1)
            cellHistory.senti_switch = true
            if (animate_trigger) {
                animatedDivs();
            }
        }

        //console.log(filterobj)


        var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
        draw_filtered_comments(filtered_comment, json)
        cellHistory.prev_senti_cell = this_cell
        cellHistory.prev_idea_id_senti = idea_id
        cellHistory.prev_idea_id = idea_id
        cellHistory.prev_senti = d.key
        cellHistory.prev_senti_color = z(d.key)

        $("#parentBox").animate({ scrollTop: 0 }, 1000);
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
        .attr("opacity", 0.71)
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

// draw subjectivity
function subjectivity_rows(salesData, svg_id, div_id, idea_id) {

    var group = ["fact", "opinion"];
    var parseDate = d3.timeFormat("%b-%Y");

    var mainDiv = "#" + div_id;
    var mainDivName = div_id;

    salesData.forEach(function (d) {
        d = type(d);
    });
    var layers = d3.stack()
        .keys(group)
        .offset(d3.stackOffsetDiverging)
        (salesData);

    var svg = d3.select("#" + svg_id),
        margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },

        width = +svg.attr("width") - 2,
        height = +svg.attr("height");
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

    var z = d3.scaleOrdinal(["#bfbfbf", "#4d4d4d"]);

    var maing = svg.append("g")
        .selectAll("g")
        .data(layers);
    var g = maing.enter().append("g")
        // .attr("fill", function (d) {
        //     return z(d.key);
        // })
        // .attr("style", "outline: solid;")
        // .attr("style", "outline-color: #F2F2F2")
        .style("cursor", "pointer");
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
            }
            else {
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
            return z(d.key);
        })
        .attr("stroke", function (d) {
            return z(d.key);
        })
        .attr("stroke-width", function (d) {
            return "2px";
        })
        .attr("height", 25)
        .attr("opacity", 0.8);
    //.attr("height", y.bandwidth);

    rect.on("mouseover", function () {
        var currentEl = d3.select(this);
        currentEl.attr("opacity", 1)
        var fadeInSpeed = 120;
        d3.select("#recttooltip_" + mainDivName)
            .transition()
            .duration(fadeInSpeed)
            .style("opacity", function () {
                return 1;
            });
        d3.select("#recttooltip_" + mainDivName).attr("transform", function (d) {
            var mouseCoords = d3.mouse(this.parentNode);
            var xCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                    .attr("width"));
            } else {
                xCo = mouseCoords[0] + 10;
            }
            var x = xCo;
            var yCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                yCo = mouseCoords[1] + 10;
            } else {
                yCo = mouseCoords[1];
            }
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
                        .attr("width"));
                } else {
                    xCo = mouseCoords[0] + 10;
                }
                var x = xCo;
                var yCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    yCo = mouseCoords[1] + 10;
                } else {
                    yCo = mouseCoords[1];
                }
                var x = xCo;
                var y = yCo;
                return "translate(" + x + "," + y + ")";
            });
    });
    rect.on("mouseout", function () {
        var currentEl = d3.select(this);
        currentEl.attr("opacity", function (d) {
            if (cellHistory.sub_switch && cellHistory.sub_switch && cellHistory.prev_idea_id_sub == idea_id && cellHistory.prev_sub_color == z(d.key)) {
                return 1
            }
            else {
                return 0.8
            }
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

    rect.on("click", clicked_subjectivity);

    function clicked_subjectivity(d) {
        var this_cell = d3.select(this)
        filterobj.idea_id = idea_id
        filterobj.subjectivity = d.key

        if (cellHistory.prev_sub_cell) {
            cellHistory.prev_sub_cell.attr("stroke", cellHistory.prev_sub_color)
            cellHistory.prev_sub_cell.attr("opacity", 0.8)
        }

        // deselect cell (check if previously selected row and column selected. Remove the column filter and revert back to last row)
        if (cellHistory.sub_switch && cellHistory.prev_sub == d.key && cellHistory.prev_idea_id_sub == idea_id) {
            filterobj.subjectivity = null
            filterobj.idea_id = cellHistory.prev_idea_id
            cellHistory.sub_switch = false
            if (animate_trigger) {
                animatedDivs();
            }

        }
        else {
            this_cell.attr("stroke", "black")
            this_cell.attr("opacity", 1)
            cellHistory.sub_switch = true
            if (animate_trigger) {
                animatedDivs();
            }

        }

        //console.log(filterobj)

        var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
        draw_filtered_comments(filtered_comment, json)
        cellHistory.prev_sub_cell = this_cell
        cellHistory.prev_idea_id_sub = idea_id
        cellHistory.prev_idea_id = idea_id
        cellHistory.prev_sub = d.key
        cellHistory.prev_sub_color = z(d.key)

        $("#parentBox").animate({ scrollTop: 0 }, 1000);
    }

    var rectTooltipg = svg.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .attr("id", "recttooltip_" + mainDivName)
        .attr("style", "opacity:0")
        .attr("transform", "translate(-500,-500)")
        .attr("style", "position:absolute")
        .attr("style", "z-index:30");;

    rectTooltipg.append("rect")
        .attr("id", "recttooltipRect_" + mainDivName)
        .attr("x", 0)
        .attr("width", 120)
        .attr("height", 80)
        .attr("opacity", 0.71)
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

// draw profanity
function profanity_rows(salesData, svg_id, div_id, idea_id) {

    //console.log(salesData)
    var group = ["very_low", "low", "medium", "high", "very_high"];
    var parseDate = d3.timeFormat("%b-%Y");
    var mainDiv = "#" + div_id;
    var mainDivName = div_id;

    salesData.forEach(function (d) {
        d = type(d);
    });
    var layers = d3.stack()
        .keys(group)
        .offset(d3.stackOffsetDiverging)
        (salesData);

    var svg = d3.select("#" + svg_id),
        margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },

        width = +svg.attr("width") - 2,
        height = +svg.attr("height");
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

    var z = d3.scaleOrdinal(["#B3CCE6", "#8CB1D9", "#6697CC", "#407DBF", "#264B73"]);

    var maing = svg.append("g")
        .selectAll("g")
        .data(layers);
    var g = maing.enter().append("g")
        .attr("fill", function (d) {
            return z(d.key);
        })
    // .attr("style", "outline: solid;")
    // .attr("style", "outline-color: #F2F2F2");

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
            }
            else {
                return x(d[1]) - x(d[0]) - 2;
            }
        })
        .attr("x", function (d) {
            return x(d[0]);
        })
        .attr("y", function (d) {
            return y(d.data.date);
        })
        .style("fill", function (d) {

        })
        .attr("height", 25);
    //.attr("height", y.bandwidth);

    rect.on("mouseover", function () {
        var currentEl = d3.select(this);
        var fadeInSpeed = 120;
        d3.select("#recttooltip_" + mainDivName)
            .transition()
            .duration(fadeInSpeed)
            .style("opacity", function () {
                return 1;
            });
        d3.select("#recttooltip_" + mainDivName).attr("transform", function (d) {
            var mouseCoords = d3.mouse(this.parentNode);
            var xCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                xCo = mouseCoords[0] - parseFloat(d3.selectAll("#recttooltipRect_" + mainDivName)
                    .attr("width"));
            } else {
                xCo = mouseCoords[0] + 10;
            }
            var x = xCo;
            var yCo = 0;
            if (mouseCoords[0] + 10 >= width * 0.80) {
                yCo = mouseCoords[1] + 10;
            } else {
                yCo = mouseCoords[1];
            }
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
                        .attr("width"));
                } else {
                    xCo = mouseCoords[0] + 10;
                }
                var x = xCo;
                var yCo = 0;
                if (mouseCoords[0] + 10 >= width * 0.80) {
                    yCo = mouseCoords[1] + 10;
                } else {
                    yCo = mouseCoords[1];
                }
                var x = xCo;
                var y = yCo;
                return "translate(" + x + "," + y + ")";
            });
    });
    rect.on("mouseout", function () {
        var currentEl = d3.select(this);
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

    //clicking on the rectangles for profanity // mjasim - discuss if it needs to be implemented
    rect.on("click", clicked_profanity);

    function clicked_profanity(d) {
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
        .attr("opacity", 0.71)
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






