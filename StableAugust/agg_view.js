// global variable to maintain what will be filtered
var filterobj = {
    emotion: null,
    idea_id: null,
    task_id: null,
    topic: [],
    // cloudkey: null
}

// selected_cloud = "";

filepath = ""

var selected_sort = ["participants", "comments", "angry", "concerned", "neutral", "happy", "excited"];
var current_sort = ""
var sort_opt = 0
var sort_opt_emo = 0
selected_row = ""
prev_row = ""

selected_topic = ""
prev_topic = ""

compare_1 = ""
compare_2 = ""

compare_switch = false

// global variable to maintain filter selection
var cellHistory = {
    prev_idea_id: null,
    prev_emo_cell: null,
    prev_idea_id_emo: null,
    prev_emo_color: null,
    prev_emo: null,
    emo_switch: false,
}

var raw_json = null;
var prop_json = null;

var animate_trigger = false;

function check_empty() {
    if ($('.ideaDiv').length) {
        return false;
    } else {
        return true;
    }
}

function divMove() {
    if (check_empty() == true) {
        if (document.getElementById("parentBox"))
            document.getElementById("parentBox").setAttribute("style", "height:0px")
        if (document.getElementById("aggregateDiv"))
            document.getElementById("aggregateDiv").setAttribute("style", "height:74%")
    } else if (check_empty() == false) {
        if (document.getElementById("parentBox"))
            document.getElementById("parentBox").setAttribute("style", "height:55vh")
        if (document.getElementById("aggregateDiv"))
            document.getElementById("aggregateDiv").setAttribute("style", "height:20vh")
        //document.getElementById(filterobj.idea_id).parentElement.parentElement.scrollIntoView({ block: 'start' });
    }
}

for (var i in whitelist) {
    if (whitelist[i].username == localStorage.getItem("username")) {
        filepath = whitelist[i].file
    }
}

console.log(filepath)

d3.json(filepath, function (err, myjson) {
    raw_json = JSON.parse(JSON.stringify(myjson))
    prop_json = JSON.parse(JSON.stringify(myjson))
    draw_view(raw_json)
    //var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
    //draw_filtered_comments(filtered_comment, json)

    if (check_empty() == true) {
        //console.log(document.getElementById("box_header"))
        if (document.getElementById("box_header")) {
            document.getElementById("box_header").innerHTML = "Click on a Proposal, Topic or Emotion to see related comments"
        }
    }

    divMove();

})

function draw_view(json) {

    // var myNode = document.getElementById("topDiv");
    // while (myNode.firstChild) {
    //     myNode.removeChild(myNode.firstChild);
    // }

    var myNode = document.getElementById("labelDiv");
    if (myNode) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    var myNode = document.getElementById("aggregateDiv");
    if (myNode) {
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    var numberOfRows = 19;
    var numberOfColumns = 7;

    var proposal_names = get_proposal_names(json)
    var proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
    var proposal_wise_serial = get_serial_number(json)
    var proposal_wise_topic_agg = get_proposal_wise_topic(json)
    // var proposal_wise_cloudword_agg = get_proposal_wise_cloudwords(json)

    // backup data
    this.data = json


    // Label div fillup

    var labelElement = document.getElementById("labelDiv")


    // =========================== label column selector ===============================//

    var labelColumnselectorDiv = document.createElement("div")
    labelColumnselectorDiv.id = "labelcolumnSelector"
    labelColumnselectorDiv.className = "l_column_selector"

    var divCaption =
        "<div class=\"label-body\"" + "\">";
    //  "<div class=\"label-title\"" + ">" +
    //   "<p style=\"margin: 5px 0px 5px 0px;font-size:1.5em;text-align:left;border-bottom:solid\"" + ">" + "\xa0" + "</p>" + "</div>";
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "19\xa0" + "</p>" + "</div>"

    labelColumnselectorDiv.innerHTML = divCaption
    if (labelElement)
        labelElement.appendChild(labelColumnselectorDiv)

    // =========================== label column 0 ===============================//

    var labelColumn0Div = document.createElement("div")
    labelColumn0Div.id = "labelcolumn0"
    labelColumn0Div.className = "l_column0"

    var divCaption =
        "<div class=\"label-body\"" + "\">";
    //  "<div class=\"label-title\"" + ">" +
    //   "<p style=\"margin: 5px 0px 5px 0px;font-size:1.5em;text-align:left;border-bottom:solid\"" + ">" + "\xa0" + "</p>" + "</div>";
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "19\xa0" + "</p>" + "</div>"

    labelColumn0Div.innerHTML = divCaption
    if (labelElement)
        labelElement.appendChild(labelColumn0Div)

    // =========================== label column 1 ===============================//

    // labels and search bars for proposals
    var labelColumn1Div = document.createElement("div")
    labelColumn1Div.id = "labelcolumn1"
    labelColumn1Div.className = "l_column1"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + "title=\"Click on a proposal name from the list below to explore, or select the checkbox to compare upto two proposals\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1.0em;text-align:left; font-weight:bold; cursor:default\"" + ">" + "\xa0 Proposals (19)" + "</p>" + "</div>";
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "19\xa0" + "</p>" + "</div>"

    labelColumn1Div.innerHTML = divCaption
    if (labelElement)
        labelElement.appendChild(labelColumn1Div)

    // =========================== label column 1 end ===========================//


    // ========================= label column 2 =================================//

    // label and search bars for info
    var labelColumn2Div = document.createElement("div")
    labelColumn2Div.id = "labelcolumn2"
    labelColumn2Div.className = "l_column2"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;text-align:left\"" + ">" + "\xa0" + "</p>" + "</div>" +
        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + ">" +
        "Participants" +
        "<p title=\"Sort the proposals by number of participants in descending order\"" + ">" + '<span class="label-info-button" id="span_id_participants" >' +
        "<i class=" + "\"fas fa-user fa-2x label_icons\"" + "></i>" + "\xa0" +
        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + "\">" +
        "Comments" +
        "<p title=\"Sort the proposals by number of comments in descending order\"" + ">" + '<span class="label-info-button" id="span_id_comments" >' +
        "<i class=" + "\"fas fa-comment-alt fa-2x label_icons\"" + "></i>" + "\xa0" +
        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
    // "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

    labelColumn2Div.innerHTML = divCaption
    if (labelElement)
        labelElement.appendChild(labelColumn2Div)

    //========================== label column 2 end =============================//

    //============================ label column 3 =========================//

    // label and search bars for topics
    var labelColumn3Div = document.createElement("div")
    labelColumn3Div.id = "labelcolumn3"
    labelColumn3Div.className = "l_column3"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;text-align:left;margin-left:10px;cursor:default;font-weight:bold\"" + "title=\"Click on a topic to explore related comments\"" + ">" + "Topics (60)" + "</p>" + "</div>" +
        "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

    labelColumn3Div.innerHTML = divCaption
    if (labelElement)
        labelElement.appendChild(labelColumn3Div)

    //============================ label column 3 end =====================//


    // =========================== label column 4 ===============================//

    // label and search bars for topics
    // var labelColumn4Div = document.createElement("div")
    // labelColumn4Div.id = "labelcolumn4"
    // labelColumn4Div.className = "l_column4"

    // var divCaption =
    //     "<div class=\"label-body\"" + "\">" +
    //     "<div class=\"label-title\"" + ">" +
    //     "<p style=\"margin: 5px 0px 5px 0px;font-size:1em; text-align:center\"" + ">" + "Word Clouds" + "</p>" + "</div>" +
    //     "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
    // //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

    // labelColumn4Div.innerHTML = divCaption
    // labelElement.appendChild(labelColumn4Div)


    //============================ label column 4 end ==========================//


    var labelColumn5Div = document.createElement("div")
    labelColumn5Div.id = "labelcolumn5"
    labelColumn5Div.className = "l_column5"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px;font-size:1.0em;text-align:left; font-weight:bold; cursor:default\"" + ">" + "\xa0" + "</p>" + "</div>";

    labelColumn5Div.innerHTML = divCaption
    if (labelElement)
        labelElement.appendChild(labelColumn5Div)

    // =========================== label column 5 ===============================//

    // labels and icons for emotions
    var labelcolumn6Div = document.createElement("div")
    labelcolumn6Div.id = "labelcolumn6"
    labelcolumn6Div.className = "l_column6"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +

        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em; text-align:center; font-weight:bold; cursor:default\"" + "title=\"Click on an emotion icon to sort the proposals by the emotion, or click on an emotion bar to explore related comments\"" + ">" + "Emotion" + "</p>" + "</div>" +

        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
        // "<p style=\"font-size:0.7em;\">" + "Excited" + "</p>" +
        "Excited" +
        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
        '</span>' + "</p>" + "</div>" +

        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
        // "<p style=\"font-size:0.7em;\">" + "Happy" + "</p>" +
        "Happy" +
        "<p title=\"Sort the proposals by emotion - Happy in descending order\">" + '<span class="label-emo-button" id="span_id_happy" >' +
        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
        '</span>' + "</p>" + "</div>" +

        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
        // "<p style=\"font-size:0.7em;\">" + "Neutral" + "</p>" +
        "Neutral" +
        "<p title=\"Sort the proposals by emotion - Neutral in descending order\">" + '<span class="label-emo-button" id="span_id_neutral" >' +
        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
        '</span>' + "</p>" + "</div>" +

        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
        // "<p style=\"font-size:0.7em;\">" + "Concerned" + "</p>" +
        "Concerned" +
        "<p title=\"Sort the proposals by emotion - Concerned in descending order\">" + '<span class="label-emo-button" id="span_id_concerned" >' +
        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
        '</span>' + "</p>" + "</div>" +

        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
        // "<p style=\"font-size:0.7em;\">" + "Angry" + "</p>" +
        "Angry" +
        "<p title=\"Sort the proposals by emotion - Angry in descending order\">" + '<span class="label-emo-button" id="span_id_angry" >' +
        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
        '</span>' + "</p>" + "</div>";

    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
    // // "<p style=\"font-size:0.7em;\">" + "Positive" + "</p>" +
    // "Positive" +
    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
    // '</span>' + "</p>" + "</div>" +

    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
    // // "<p style=\"font-size:0.7em;\">" + "Neutral" + "</p>" +
    // "Neutral" +
    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
    // '</span>' + "</p>" + "</div>" +

    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
    // // "<p style=\"font-size:0.7em;\">" + "Negative" + "</p>" +
    // "Negative" +
    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
    // '</span>' + "</p>" + "</div>";

    labelcolumn6Div.innerHTML = divCaption
    if (labelElement)
        labelElement.appendChild(labelcolumn6Div)
    //setTippy("span_id_angry", null);

    console.log(json)

    // =========================== label column 5 end ===========================//

    // Aggregate div fillup
    var titles = []
    var aggElement = document.getElementById("aggregateDiv")
    for (var i = 0; i < numberOfRows; i++) {
        var tempRowDiv = document.createElement("div")
        tempRowDiv.id = "row" + i

        var tempColumnSelectorDiv = document.createElement("div")
        tempColumnSelectorDiv.id = "row" + i + "-column_selector"
        tempColumnSelectorDiv.className = "c_column_selector"
        tempColumnSelectorDiv.innerHTML = '<input type="checkbox"' + 'class="check_box" id="check_' + proposal_names[i].idea_id + '">'
        tempRowDiv.appendChild(tempColumnSelectorDiv)

        tempRowDiv.className = "c_row"
        for (var j = 0; j < numberOfColumns; j++) {
            var tempColumnDiv = document.createElement("div")
            tempColumnDiv.id = "row" + i + "-column" + j
            //console.log(tempColumnDiv.id)
            tempColumnDiv.className = "c_column" + j
            tempRowDiv.appendChild(tempColumnDiv)
        }

        if (aggElement)
            aggElement.appendChild(tempRowDiv)

        //console.log(proposal_wise_serial[i].serial_number)

        var column0 = document.getElementById("row" + i + "-column0")
        var divIdeaSerial =
            "<div class=\"serial-Name\"" + "\">" +
            //'<div  class="btn btn-primary btn-block ideaName" id="' + proposal_names[i].idea_id + '">' + proposal_names[i].idea_name + "</div>";
            "<div class=\"serial\">" + proposal_wise_serial[i].serial_number + "</div>";

        if (column0) {
            column0.innerHTML = divIdeaSerial
            // column0.setAttribute("title", proposal_wise_serial[i].serial_number)
        }

        //console.log(proposal_names[i]);
        //============================ column 1=========================//

        // column with all proposal names
        var column1 = document.getElementById("row" + i + "-column1")
        if (proposal_names[i].idea_name.length < 18) {


            //console.log(proposal_names[i].idea_name.length)
            var divIdeaName =
                "<div class=\"idea-Name\" " + "\">" +

                //'<div  class="btn btn-primary btn-block ideaName" id="' + proposal_names[i].idea_id + '">' + proposal_names[i].idea_name + "</div>";
                //'<div  class="ideaName" id="' + proposal_names[i].idea_id + '">' + '<p class="search_enable" style="margin:0px 0px 0px 0px; word-wrap:break-word; text-align: left">' + proposal_names[i].idea_name + "</p></div>";
                '<div><span class="badge badge-warning ideaName" id="' + proposal_names[i].idea_id + '" data-toggle="tooltip" data-placement="bottom">' + proposal_names[i].idea_name + '</span></div></div>'
        } else {
            var sentence_length = 0;
            var sentence = ""
            all_words = proposal_names[i].idea_name.split(" ")
            for (var x = 0; x < all_words.length; x++) {
                sentence_length += all_words[x].length
                //console.log(sentence_length, all_words[x])
                if (column1) {
                    if (sentence_length > column1.clientWidth / 10) {
                        sentence += "..."
                        break;
                    } else {
                        sentence += all_words[x] + " "
                    }
                }
            }

            var divIdeaName =
                "<div class=\"idea-Name\"" + "\">" +
                //'<div  class="btn btn-primary btn-block ideaName" id="' + proposal_names[i].idea_id + '">' + proposal_names[i].idea_name + "</div>";
                '<div><span class="badge badge-warning ideaName" id="' + proposal_names[i].idea_id + '"data-toggle="tooltip" data-placement="bottom">' + sentence + '</span></div></div>'
        }
        if (column1) {
            column1.innerHTML = divIdeaName
            column1.setAttribute("title", proposal_names[i].idea_name)
        }

        //============================end of column 1==================//


        // column with proposal wise stats
        var divTopicName = "<div class=\"info-body\"" + "\">"
        var column2 = document.getElementById("row" + i + "-column2")
        //console.log(proposal_wise_topic_agg)

        var buttons = "<div class='participantInfoColumn'>" + "\xa0" +
            '<span class="commenters_button" id="span_id_opt" >' +
            "<i class=" + "\"fas fa-user fa-xs\"" + "></i>" + "\xa0" +
            '</span>' +
            '<span class="commenters_number" id="span_id_opt" style="font-size:0.8em">' + ("0" + json.ideas[i].num_of_commenters).slice(-2) +
            '</span>' + "\xa0" + "</div>" + "<div  class='participantInfoColumn'>" +
            '<span class="comments_button" id="span_id_opt" >' +
            "<i class=" + "\"fas fa-comment-alt fa-xs\"" + "></i>" + "\xa0" +
            '</span>' +
            '<span class="comments_number" id="span_id_opt" style="font-size:0.8em" >' + ("0" + json.ideas[i].num_of_comments).slice(-2) +
            '</span>' +
            "</div>";

        if (column2)
            column2.innerHTML = buttons


        //============================ column 3 =========================//

        topic_row_length = 0

        // column with proposal wise topics
        var divTopicName = "<div class=\"topic-body\"" + "\">"
        var column3 = document.getElementById("row" + i + "-column3")
        //console.log(proposal_wise_topic_agg)
        for (var j = 0; j < proposal_wise_topic_agg[i].length; j++) {
            topic_row_length += proposal_wise_topic_agg[i][j].topic_keyphrase.length
            //console.log(proposal_wise_topic_agg[i][j].topic_keyphrase, topic_row_length)
            if (column3) {
                if (topic_row_length > column3.clientWidth / 9) {
                    break;
                } else {
                    divTopicName = divTopicName +
                        '<div  class="topicName" id="topic_' + proposal_names[i].idea_id + "_" + j + '\">' +
                        '<span class="badge badge-warning topic-name" id="topic_' + proposal_names[i].idea_id + "_" + j + "_id\">" + proposal_wise_topic_agg[i][j].topic_keyphrase + '</span></div>'
                }
            }
        }
        topic_row_length = 0

        if (column3)
            column3.innerHTML = divTopicName

        //============================ column 3 end =====================//


        //============================ column 4 =========================//

        // // column with proposal wise wcloud
        // var divTopicName = "<div class=\"wcloud-body\"" + "\">"
        // var column4 = document.getElementById("row" + i + "-column4")
        // //console.log(proposal_wise_topic_agg)

        // var wcloud_buttons = '<span class="wcloud_button" id="span_id_wcloud_' + proposal_names[i].idea_id + '">' +
        //     "<i class=" + "\"fas fa-cloud fa-lg\"" + "style=color:#2C485B" + "></i>" + "\xa0" + "</div>"

        // column4.innerHTML = wcloud_buttons

        // cloudTippy("span_id_wcloud_" + proposal_names[i].idea_id);

        //============================ column 4 end =====================//

        var column5 = document.getElementById("row" + i + "-column5")

        var column5HTML =
            '<div class="col-lg-12 col-m-12 col-sm-12">' +
            '<select class="form-control topic_down" id="all_topics_' + proposal_names[i].idea_id + "\"" +
            ' style="height:28px;font-size:0.8em;font-weight:bold;background-color:#F5F8FA;border-color:#337AB7">' +
            '<option value="">All</option>';

        // for (var k in proposal_wise_topic_agg[i]) {
        //     console.log(proposal_wise_topic_agg[i])
        //     column5HTML += '<option>' + proposal_wise_topic_agg[j][k].topic_keyphrase + '</option>'
        // }

        all_topics = proposal_wise_topic_agg[i]

        for (var j in all_topics) {
            column5HTML += '<option>' + all_topics[j].topic_keyphrase + '</option>'
        }


        column5HTML = column5HTML + '</select>' + '</div>' + '</div>';

        column5.innerHTML = column5HTML

        //============================ column 6 =========================//

        // column with proposal wise emotions
        var column6 = document.getElementById("row" + i + "-column6")
        var svg_id = "svg" + "row" + i + "-column6"
        send_data = []
        send_data.push(proposal_wise_emotion_agg[i])
        // console.log(send_data)
        if (column6)
            emotion_rows(send_data, svg_id, column6.id, proposal_names[i].idea_id)


        //============================end of column 4==================//
    }

    // On click for sort icons by emotion
    $(document).ready(function () {
        $('.label-emo-button').click(function () {
            var id = $(this).attr('id');
            console.log("inside iconClick", id)

            // if (id.split("_")[2] == current_sort) {
            //     current_sort = "";
            //     console.log("here")
            //     selected_rows = Array.apply(null, Array(36));
            //     // console.log(raw_json)
            //     draw_view(raw_json)
            //     prop_json = raw_json;

            //     for (var i = 0; i < selected_sort.length; i++) {
            //         document.getElementById("span_id_" + selected_sort[i]).setAttribute("style", "opacity:0.8")
            //         // console.log("span_id_"+selected_sort[i])
            //     }
            //     logInteraction('click, sortby, ' + id.split("_")[2]);
            //     selected_rows = Array.apply(null, Array(36));

            //     document.getElementById("box_header").innerHTML = "";

            //     selected_rows_stack = [];

            //     var myNode = document.getElementById("parentBox");
            //     while (myNode.firstChild) {
            //         myNode.removeChild(myNode.firstChild);
            //     }

            // }
            if (sort_opt_emo == 2) {
                this_emo = id.split("_")[2] + "_normalized"

                current_sort = id.split("_")[2];

                var x = (JSON.parse(JSON.stringify(raw_json)));
                // console.log(x)
                var emo_agg = get_proposal_wise_emotion(x)
                // console.log(emo_agg)

                // emo_agg.sort((function (a, b) {
                //     // console.log(parseFloat(b[this_emo]) - parseFloat(a[this_emo]))
                //     return parseFloat(a[this_emo]) - parseFloat(b[this_emo])
                // }))

                // var id_keys = []
                // for (var i = 0; i < emo_agg.length; i++) {
                //     id_keys.push(emo_agg[i].key)
                // }

                // var show_this = []
                // for (var i = 0; i < id_keys.length; i++) {
                //     for (var j = 0; j < raw_json["ideas"].length; j++) {
                //         //console.log(json.ideas[j].id, id_keys[i])

                //         if (raw_json.ideas[j].id == id_keys[i]) {
                //             //console.log(json.ideas[i])
                //             show_this.push(raw_json.ideas[j])
                //         }
                //     }
                // }
                // sorted_ideas = {
                //     "ideas": show_this
                // }

                // draw_view(x)
                // prop_json = sorted_ideas;
                document.getElementById("box_header").innerHTML = "Click on a Proposal, Topic or Emotion to see related comments";

                var myNode = document.getElementById("parentBox");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }

                //console.log(selected_sort)
                for (var i = 0; i < selected_sort.length; i++) {
                    document.getElementById("span_id_" + selected_sort[i]).setAttribute("style", "opacity:0.8")
                    // console.log("span_id_"+selected_sort[i])
                }

                if (id == "span_id_excited") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p title=\"Sort the proposals by emotion - Happy in descending order\">" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p title=\"Sort the proposals by emotion - Neutral in descending order\">" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p title=\"Sort the proposals by emotion - Concerned in descending order\">" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p title=\"Sort the proposals by emotion - Angry in descending order\">" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_happy") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_neutral") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_concerned") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_angry") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_positive") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_neutral") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_negative") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p title=\"Sort the proposals by emotion - Excited in descending order\">" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                }

                console.log(id)
                document.getElementById(id).setAttribute("style", "opacity:0.8");
                $("#" + id).children().css("opacity", "0.8");

                current_sort = ""
                draw_view(x)

                sort_opt_emo = 0;
            } else if (sort_opt_emo == 0) {
                this_emo = id.split("_")[2] + "_normalized"

                current_sort = id.split("_")[2];

                var x = (JSON.parse(JSON.stringify(raw_json)));
                // console.log(x)
                var emo_agg = get_proposal_wise_emotion(x)
                console.log(emo_agg)
                emo_agg.sort((function (a, b) {
                    // console.log(parseFloat(b[this_emo]) - parseFloat(a[this_emo]))
                    return parseFloat(b[this_emo]) - parseFloat(a[this_emo])
                }))

                var id_keys = []
                for (var i = 0; i < emo_agg.length; i++) {
                    id_keys.push(emo_agg[i].key)
                }

                var show_this = []
                for (var i = 0; i < id_keys.length; i++) {
                    for (var j = 0; j < raw_json["ideas"].length; j++) {
                        //console.log(json.ideas[j].id, id_keys[i])

                        if (raw_json.ideas[j].id == id_keys[i]) {
                            //console.log(json.ideas[i])
                            show_this.push(raw_json.ideas[j])
                        }
                    }
                }
                sorted_ideas = {
                    "ideas": show_this
                }
                draw_view(sorted_ideas)
                prop_json = sorted_ideas;
                document.getElementById("box_header").innerHTML = "Sorted by " + id.split("_")[2] + " in descending order";

                var myNode = document.getElementById("parentBox");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }

                //console.log(selected_sort)
                for (var i = 0; i < selected_sort.length; i++) {
                    document.getElementById("span_id_" + selected_sort[i]).setAttribute("style", "opacity:0.8")
                    // console.log("span_id_"+selected_sort[i])
                }

                if (id == "span_id_excited") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_happy") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_neutral") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_concerned") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_angry") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_positive") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_neutral") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_negative") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                }

                console.log(id)
                document.getElementById(id).setAttribute("style", "opacity:1.0");
                $("#" + id).children().css("opacity", "1.0");

                sort_opt_emo = 1;
            } else if (sort_opt_emo == 1) {
                this_emo = id.split("_")[2] + "_normalized"

                current_sort = id.split("_")[2];

                var x = (JSON.parse(JSON.stringify(raw_json)));
                // console.log(x)
                var emo_agg = get_proposal_wise_emotion(x)
                // console.log(emo_agg)
                emo_agg.sort((function (a, b) {
                    // console.log(parseFloat(b[this_emo]) - parseFloat(a[this_emo]))
                    return parseFloat(a[this_emo]) - parseFloat(b[this_emo])
                }))

                var id_keys = []
                for (var i = 0; i < emo_agg.length; i++) {
                    id_keys.push(emo_agg[i].key)
                }

                var show_this = []
                for (var i = 0; i < id_keys.length; i++) {
                    for (var j = 0; j < raw_json["ideas"].length; j++) {
                        //console.log(json.ideas[j].id, id_keys[i])

                        if (raw_json.ideas[j].id == id_keys[i]) {
                            //console.log(json.ideas[i])
                            show_this.push(raw_json.ideas[j])
                        }
                    }
                }
                sorted_ideas = {
                    "ideas": show_this
                }
                draw_view(sorted_ideas)
                prop_json = sorted_ideas;
                document.getElementById("box_header").innerHTML = "Sorted by " + id.split("_")[2] + " in ascending order";

                var myNode = document.getElementById("parentBox");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }

                //console.log(selected_sort)
                for (var i = 0; i < selected_sort.length; i++) {
                    document.getElementById("span_id_" + selected_sort[i]).setAttribute("style", "opacity:0.8")
                    // console.log("span_id_"+selected_sort[i])
                }

                if (id == "span_id_excited") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_happy") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_neutral") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_concerned") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_angry") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_positive") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_neutral") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                } else if (id == "span_id_negative") {
                    var labelcolumn6Div = document.getElementById("labelcolumn6")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +

                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;\"" + ">" + "Emotion" + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Excited" +
                        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
                        "<i class=" + "\"fas fa-smile-beam fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Happy" +
                        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
                        "<i class=" + "\"fas fa-smile fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Neutral" +
                        "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                        "<i class=" + "\"fas fa-meh fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Concerned" +
                        "<p>" + '<span class="label-emo-button" id="span_id_concerned" >' +
                        "<i class=" + "\"fas fa-flushed fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                        "Angry" +
                        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
                        "<i class=" + "\"fas fa-angry fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                        '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Positive" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_positive" >' +
                    // "<i class=" + "\"fas fa-thumbs-up fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + "\">" +
                    // "Neutral" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_neutral" >' +
                    // "<i class=" + "\"far fa-thumbs-down fa-2x neutral label_icons\"" + " style=transform:rotate(-90deg)" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>" +
                    // "<div class=\"label-emo-body\" style=\"font-size:0.7em\"" + ">" +
                    // "Negative" +
                    // "<p>" + '<span class="label-emo-button" id="span_id_negative" >' +
                    // "<i class=" + "\"fas fa-thumbs-down fa-2x label_icons\"" + "></i>" + "\xa0" +
                    // "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" +
                    // '</span>' + "</p>" + "</div>";

                    labelcolumn6Div.innerHTML = divCaption
                }

                console.log(id)
                document.getElementById(id).setAttribute("style", "opacity:1.0");
                $("#" + id).children().css("opacity", "1.0");

                sort_opt_emo = 2;
            }

        });
        // divMove();
    });

    // On click for sort icons by info
    $(document).ready(function () {
        $('.label-info-button').click(function () {
            var id = $(this).attr('id');
            console.log("inside iconClick", id)
            this_info = "num_of_" + id.split("_")[2]

            // if (id.split("_")[2] == current_sort) {
            //     current_sort = "";
            //     selected_rows = Array.apply(null, Array(36));
            //     console.log(raw_json)
            //     draw_view(raw_json)
            //     prop_json = raw_json;

            //     for (var i = 0; i < selected_sort.length; i++) {
            //         document.getElementById("span_id_" + selected_sort[i]).setAttribute("style", "opacity:0.8")
            //         // console.log("span_id_"+selected_sort[i])
            //     }
            //     logInteraction('click, sortby, ' + id.split("_")[2]);
            //     selected_rows = Array.apply(null, Array(36));

            //     document.getElementById("box_header").innerHTML = "";

            //     selected_rows_stack = [];

            //     var myNode = document.getElementById("parentBox");
            //     while (myNode.firstChild) {
            //         myNode.removeChild(myNode.firstChild);
            //     }
            // }

            if (sort_opt == 2) {
                logInteraction('click, sortby, ' + id.split("_")[2]);

                if (id.split("_")[2] == "participants") {
                    this_info = "num_of_commenters"
                }

                current_sort = id.split("_")[2];

                var copy_json = JSON.parse(JSON.stringify(raw_json))

                // copy_json["ideas"].sort((function (a, b) {
                //     //     console.log(parseFloat(a[this_info]) - parseFloat(b[this_info]))
                //     return parseFloat(a[this_info]) - parseFloat(b[this_info])
                // }))

                draw_view(copy_json)
                document.getElementById("box_header").innerHTML = "Click on a Proposal, Topic or Emotion to see related comments";

                var myNode = document.getElementById("parentBox");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }

                //console.log(selected_sort)
                for (var i = 0; i < selected_sort.length; i++) {
                    document.getElementById("span_id_" + selected_sort[i]).setAttribute("style", "opacity:0.8")
                    // console.log("span_id_"+selected_sort[i])
                }

                if (id == "span_id_comments") {
                    var labelColumn2Div = document.getElementById("labelcolumn2")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +
                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;text-align:left\"" + ">" + "\xa0" + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + ">" +
                        "Participants" +
                        "<p>" + '<span class="label-info-button" id="span_id_participants" >' +
                        "<i class=" + "\"fas fa-user fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Comments" +
                        "<p>" + '<span class="label-info-button" id="span_id_comments" >' +
                        "<i class=" + "\"fas fa-comment-alt fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
                    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

                    labelColumn2Div.innerHTML = divCaption
                } else if (id == "span_id_participants") {
                    var labelColumn2Div = document.getElementById("labelcolumn2")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +
                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;text-align:left\"" + ">" + "\xa0" + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + ">" +
                        "Participants" +
                        "<p>" + '<span class="label-info-button" id="span_id_participants" >' +
                        "<i class=" + "\"fas fa-user fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Comments" +
                        "<p>" + '<span class="label-info-button" id="span_id_comments" >' +
                        "<i class=" + "\"fas fa-comment-alt fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
                    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

                    labelColumn2Div.innerHTML = divCaption
                }

                document.getElementById(id).setAttribute("style", "opacity:0.8");

                console.log(id)

                $("#" + id).children().css("opacity", "0.8");
                selected_rows = Array.apply(null, Array(36));
                prop_json = copy_json;

                sort_opt = 0;

            } else if (sort_opt == 0) {
                logInteraction('click, sortby, ' + id.split("_")[2]);

                if (id.split("_")[2] == "participants") {
                    this_info = "num_of_commenters"
                }

                current_sort = id.split("_")[2];

                var copy_json = JSON.parse(JSON.stringify(raw_json))

                copy_json["ideas"].sort((function (a, b) {
                    //     console.log(parseFloat(a[this_info]) - parseFloat(b[this_info]))
                    return parseFloat(b[this_info]) - parseFloat(a[this_info])
                }))

                draw_view(copy_json)
                document.getElementById("box_header").innerHTML = "Sorted by number of " + id.split("_")[2] + " in descending order";

                var myNode = document.getElementById("parentBox");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }

                //console.log(selected_sort)
                for (var i = 0; i < selected_sort.length; i++) {
                    document.getElementById("span_id_" + selected_sort[i]).setAttribute("style", "opacity:0.8")
                    // console.log("span_id_"+selected_sort[i])
                }

                if (id == "span_id_comments") {
                    var labelColumn2Div = document.getElementById("labelcolumn2")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +
                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;text-align:left\"" + ">" + "\xa0" + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + ">" +
                        "Participants" +
                        "<p>" + '<span class="label-info-button" id="span_id_participants" >' +
                        "<i class=" + "\"fas fa-user fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Comments" +
                        "<p>" + '<span class="label-info-button" id="span_id_comments" >' +
                        "<i class=" + "\"fas fa-comment-alt fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
                    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

                    labelColumn2Div.innerHTML = divCaption
                } else if (id == "span_id_participants") {
                    var labelColumn2Div = document.getElementById("labelcolumn2")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +
                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;text-align:left\"" + ">" + "\xa0" + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + ">" +
                        "Participants" +
                        "<p>" + '<span class="label-info-button" id="span_id_participants" >' +
                        "<i class=" + "\"fas fa-user fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-up fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Comments" +
                        "<p>" + '<span class="label-info-button" id="span_id_comments" >' +
                        "<i class=" + "\"fas fa-comment-alt fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
                    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

                    labelColumn2Div.innerHTML = divCaption
                }

                document.getElementById(id).setAttribute("style", "opacity:1.0");

                console.log(id)

                $("#" + id).children().css("opacity", "1.0");
                selected_rows = Array.apply(null, Array(36));
                prop_json = copy_json;

                sort_opt = 1;

            } else if (sort_opt == 1) {

                console.log("double")

                logInteraction('click, sortby, ' + id.split("_")[2]);

                if (id.split("_")[2] == "participants") {
                    this_info = "num_of_commenters"
                }

                current_sort = id.split("_")[2];

                var copy_json = JSON.parse(JSON.stringify(raw_json))

                copy_json["ideas"].sort((function (a, b) {
                    //     console.log(parseFloat(a[this_info]) - parseFloat(b[this_info]))
                    return parseFloat(a[this_info]) - parseFloat(b[this_info])
                }))

                draw_view(copy_json)
                document.getElementById("box_header").innerHTML = "Sorted by number of " + id.split("_")[2] + " in ascending order";

                var myNode = document.getElementById("parentBox");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }

                //console.log(selected_sort)
                for (var i = 0; i < selected_sort.length; i++) {
                    document.getElementById("span_id_" + selected_sort[i]).setAttribute("style", "opacity:0.8")
                    // console.log("span_id_"+selected_sort[i])
                }

                if (id == "span_id_comments") {
                    var labelColumn2Div = document.getElementById("labelcolumn2")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +
                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;text-align:left\"" + ">" + "\xa0" + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + ">" +
                        "Participants" +
                        "<p>" + '<span class="label-info-button" id="span_id_participants" >' +
                        "<i class=" + "\"fas fa-user fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Comments" +
                        "<p>" + '<span class="label-info-button" id="span_id_comments" >' +
                        "<i class=" + "\"fas fa-comment-alt fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
                    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

                    labelColumn2Div.innerHTML = divCaption
                }

                if (id == "span_id_participants") {
                    var labelColumn2Div = document.getElementById("labelcolumn2")

                    var divCaption =
                        "<div class=\"label-body\"" + "\">" +
                        "<div class=\"label-title\"" + ">" +
                        "<p style=\"margin: 5px 0px 5px 0px;font-size:1em;text-align:left\"" + ">" + "\xa0" + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + ">" +
                        "Participants" +
                        "<p>" + '<span class="label-info-button" id="span_id_participants" >' +
                        "<i class=" + "\"fas fa-user fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-bars fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>" +
                        "<div class=\"label-info-body\" style=\"font-size:0.7em\"" + "\">" +
                        "Comments" +
                        "<p>" + '<span class="label-info-button" id="span_id_comments" >' +
                        "<i class=" + "\"fas fa-comment-alt fa-2x label_icons\"" + "></i>" + "\xa0" +
                        "<i class=" + "\"fas fa-sort-amount-down fa-2x label_icons\"" + "></i>" + '</span>' + "</p>" + "</div>";
                    // "<div class=\"label-title-body\"" + ">" + "</p>" + "</div>"
                    //    "<p style=\"margin: 5px 0px 5px 0px;font-size:3em;color:#337AB7\"" + ">" + "78\xa0" + "</p>" + "</div>";

                    labelColumn2Div.innerHTML = divCaption
                }

                document.getElementById(id).setAttribute("style", "opacity:1.0");

                console.log(id)

                $("#" + id).children().css("opacity", "1.0");
                selected_rows = Array.apply(null, Array(36));
                prop_json = copy_json;

                sort_opt = 2;
            }
        });
    });

    // On click for proposals
    $(document).ready(function () {
        $('.ideaName').click(function () {

            if (selected_topic || cellHistory.prev_emo_cell) {
                draw_view(json)
                prev_row = ""
                prev_topic = ""
                selected_topic = ""
                cellHistory = {}
            }

            var id = $(this).attr('id');
            selected_row = id
            logInteraction('click, idea, ' + id);

            if (selected_row != prev_row && selected_row != "") {
                filterobj.idea_id = id
                filterobj.emotion = null
                filterobj.task_id = null
                filterobj.topic = []
                filterobj.cloudkey = null
                filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), filterobj)

                // console.log(filtered_comment)

                new_view = JSON.parse(JSON.stringify(prop_json))
                draw_filtered_comments(filtered_comment, new_view)
                document.getElementById(id).setAttribute("style", "background-color:#3DAADD")
                if (prev_row) {
                    document.getElementById(prev_row).setAttribute("style", "background-color:none")
                }

                divMove();
                prev_row = selected_row;
            } else {

                console.log("here", selected_row, prev_row)
                var myNode = document.getElementById("parentBox");
                while (myNode.firstChild) {
                    myNode.removeChild(myNode.firstChild);
                }

                document.getElementById(id).setAttribute("style", "background-color:none")
                draw_view(json)
                divMove();
                selected_row = ""
                prev_row = ""

                filterobj = {}
            }

            //console.log(check_empty())

            if (check_empty() == true) {
                document.getElementById("box_header").innerHTML = "Click on a Proposal, Topic or Emotion to see related comments"
            } else if (current_sort == "") {
                document.getElementById("box_header").innerHTML = ""
            }

            if (current_sort != "") {
                console.log(current_sort)
                $("#span_id_" + current_sort).children().css("opacity", "1.0");
            }
        });
    });

    function getAllIndexes(arr, val) {
        var indexes = [],
            i;
        for (i = 0; i < arr.length; i++)
            if (arr[i] === val)
                indexes.push(i);
        return indexes;
    }

    // On click for topics //
    $(document).ready(function () {
        $('.topicName').click(function () {

            // if (!selected_topic && selected_row) {

            //     // draw_view(json)
            //     selected_row = ""
            //     prev_row = ""
            //     prev_topic = ""
            // }

            var id = $(this).attr('id');
            show_topics(id, false)
        });
    });

    //On click for wcloud //
    // $(document).ready(function () {
    //     $('.wcloud_button').click(function () {
    //         var id = $(this).attr('id');
    //         var split_str = id.split("_")
    //         logInteraction('click, wcloud, ' + split_str[3]);

    //         // console.log(proposal_wise_cloudword_agg)

    //         cloudclick(proposal_wise_cloudword_agg, ("wcloud_" + split_str[3]))
    //     });
    // });

    // On click for refresh //
    $(document).ready(function () {
        $('#refresh_button').click(function () {
            logInteraction('click, refresh');
            location.reload(true);

            console.log("refreshing")
            //$("#parentBox").animate({ scrollTop: 0 }, 1000);
            draw_view(raw_json);
        });
    });

    $(document).ready(function () {
        $('#cp_refresh').click(function () {
            logInteraction('click, cpRefresh');
            location.reload(true);

            console.log("refreshing")
            //$("#parentBox").animate({ scrollTop: 0 }, 1000);
            draw_view(raw_json);
        });
    });
}

// function cloudTippy(cloud_id) {
//     $(document).ready(function () {
//         tippy('#' + cloud_id, {
//             interactive: true,
//             role: 'menu',
//             arrow: true,
//             arrowType: 'sharp',
//             theme: 'light',
//             // `focus` is not suitable for buttons with dropdowns
//             trigger: 'click',
//             content: getCloudWords(cloud_id),
//             // Don't announce the tooltip's contents when expanded
//             aria: null,
//             // Important: the tooltip should be DIRECTLY after the reference element
//             // in the DOM source order, which is why it has its own wrapper element
//             appendTo: 'parent',
//             // Let the user know the popup has been expanded
//             onMount({
//                 reference
//             }) {
//                 reference.setAttribute('aria-expanded', 'true')
//             },
//             onHide({
//                 reference
//             }) {
//                 reference.setAttribute('aria-expanded', 'false')
//             },
//             onShow(tip) {
//                 tip.set({
//                     trigger: 'mouseenter'
//                 })
//             },
//             onHide(tip) {
//                 tip.set({
//                     trigger: 'click'
//                 })
//             }
//         });
//     });
// }

// function getCloudWords(cloud_id) {

//     // console.log("inside getcloud", cloud_id)
//     var emojiDiv =
//         "<div class=\"tippy-label-body\"" + "\">" +
//         "<div class=\"label-title\"" + " style=border:none;font-size:1em" + ">" + "<p> " + "Click on a word to see related comments" + "</p>" + "</div>" +
//         // '<div id=' + 'cloud_' + cloud_id.split('_')[3] + '" style="width: 300px; height: 200px;"></div>' +
//         "<div class=\"label-wcloud-body\"" + 'id=wcloud_' + cloud_id.split('_')[3] + ' style="width:300px; height: 50px;"></div>' +
//         // '<span class="wcloud_button" id="span_id_wcloud' + '" onclick="cloudclick(\'' + cloud_id + '\')">' +
//         // "<i class=" + "\"fas fa-cloud fa-4x\"" + "style=color:#2C485B" + "></i>" + "\xa0" + "</div>"
//         "</div>";

//     // console.log('wcloud_' + cloud_id.split('_')[3])

//     return emojiDiv;
// }

// jQuery(document).ready(checkContainer);

// function checkContainer() {
//     if ($('#wcloud_4').length > 0) { //if the container is visible on the page
//         cloudclick("#wcloud_4"); //Adds a grid to the html
//     } else if ($('#wcloud_3').length > 0) {
//         cloudclick('#wcloud_3');
//     } else {
//         setTimeout(checkContainer, 10); //wait 50 ms, then try again
//     }
// }

// function cloudclick(cloudwords, cloud) {
//     // $(document).ready(function($) {

//     words = []
//     id = cloud.split('_')[1]
//     // cloudhandle = "#wcloud_" + id
//     cloudhandle = "#" + cloud
//     // console.log(cloud, id, cloudhandle)

//     for (var i in cloudwords) {
//         if (cloudwords[i].key == id) {
//             console.log("inside", id)
//             for (var j in cloudwords[i].cloudwords) {
//                 c_word = {
//                     text: cloudwords[i].cloudwords[j],
//                     weight: cloudwords[i].frequency[j],
//                     handlers: {
//                         click: function (res) {
//                             get_text(res.target.textContent, id)
//                             // console.log(res.target.textContent, i, j, id)
//                         }
//                     }
//                 }
//                 words.push(c_word)
//             }
//         }
//     }

//     // console.log("words", words)

//     var some_words_with_same_weight =
//         $(cloudhandle).jQCloud(words, {
//             width: 200,
//             height: 150
//         });
// }

// function get_text(key, id) {
//     console.log(key, id)

//     filterobj.idea_id = id
//     filterobj.emotion = null
//     filterobj.task_id = null
//     filterobj.topic = null
//     filterobj.cloudkey = key
//     filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), filterobj)

//     console.log(filtered_comment)

//     new_view = JSON.parse(JSON.stringify(prop_json))
//     draw_filtered_comments(filtered_comment, new_view)

//     divMove();
// }

function show_topics(id, drop) {
    var split_str = id.split("_")
    logInteraction('click, idea, ' + split_str[1], 'topic ', split_str[2]);

    selected_topic = split_str[2]

    console.log(id, prev_topic)

    if (id != prev_topic) {
        filterobj.idea_id = split_str[1]
        filterobj.emotion = null
        filterobj.task_id = null
        filterobj.topic = selected_topic
        // filterobj.cloudkey = null
        filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), filterobj)

        // console.log(filtered_comment)

        new_view = JSON.parse(JSON.stringify(prop_json))
        draw_filtered_comments(filtered_comment, new_view)
        if (drop == false) {
            document.getElementById(id + "_id").setAttribute("style", "background-color:#3DAADD")
        }
        // document.getElementById(selected_row).setAttribute("style", "background-color:#3DAADD")
        if (prev_topic && drop == false) {
            document.getElementById(prev_topic + "_id").setAttribute("style", "background-color:none")
        }

        divMove();
        prev_topic = id;
        prev_row = split_str[1];
    } else {
        if (!selected_row)
            filterobj.idea_id = null
        prev_topic = ""
        selected_topic = ""
        filterobj.topic = null
        document.getElementById(id + "_id").setAttribute("style", "background-color:none")

        console.log("here", filterobj)

        var myNode = document.getElementById("parentBox");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }

        new_view = JSON.parse(JSON.stringify(prop_json))

        if (selected_row) {
            console.log(selected_row, "srow")
            filterobj.idea_id = selected_row
            filtered_comment = get_filtered_comment(new_view, filterobj)
            draw_filtered_comments(filtered_comment, new_view)
        } else
            divMove();

        // selected_topic = ""
        // selected_row = ""
        // prev_row = ""

        filterobj = {}
    }

    if (check_empty() == true) {
        document.getElementById("box_header").innerHTML = "Click on a Proposal, Topic or Emotion to see related comments"
    } else {
        document.getElementById("box_header").innerHTML = ""
    }
}

function triggerCompare() {
    window.open('compare.html', '_self')
}

function triggerLogin() {
    console.log("beleh")
    window.open('login.html', '_self')
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
        //console.log(targetWidth,targetHeight)
        svg.attr("width", targetWidth);
        svg.attr("height", targetHeight);
        // svg.attr("height", Math.round(targetWidth / aspect));
    }
}
// draw emotions
function emotion_rows(salesData, svg_id, div_id, idea_id) {

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
            if (current_sort === "" || current_sort == selected_sort[0] || current_sort == selected_sort[1])
                return 0.8
            else if (d.key == current_sort) {
                return 1.0
            } else {
                return 0.5
            }
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
            if (current_sort === "" || current_sort == selected_sort[0] || current_sort == selected_sort[1])
                return 0.8
            if (d.key == current_sort) {
                return 1.0
            }
            if (cellHistory.emo_switch && cellHistory.prev_idea_id_emo == idea_id && cellHistory.prev_emo_color == z(d.key)) {
                return 1.0
            }
            if (current_sort !== "") {
                return 0.5
            } else {
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

        logInteraction('click, idea, ' + idea_id + ', emotion, ' + d.key);

        // document.getElementById(div_id.split("-")[0]).setAttribute("style", "outline:solid thin gray");

        console.log(filterobj)

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
            // filterobj.cloudkey = null
            cellHistory.emo_switch = false
        } else {
            this_cell.attr("stroke", "black")
            this_cell.attr("id", "emo_cell")
            this_cell.attr("opacity", 1)
            cellHistory.emo_switch = true
        }

        console.log(filterobj)

        var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(raw_json)), filterobj)

        console.log(filtered_comment)

        draw_filtered_comments(filtered_comment, raw_json)
        if (check_empty() == true) {
            document.getElementById("box_header").innerHTML = "Click on a Proposal, Topic, or Emotion to see related comments"
        } else {
            document.getElementById("box_header").innerHTML = ""
        }
        cellHistory.prev_emo_cell = this_cell
        cellHistory.prev_idea_id_emo = idea_id
        cellHistory.prev_idea_id = idea_id
        cellHistory.prev_emo = d.key
        cellHistory.prev_emo_color = z(d.key)

        $("#parentBox").animate({
            scrollTop: 0
        }, 1000);

        if (check_empty() == true) {
            // console.log(document.getElementById("box_header"))
            document.getElementById("box_header").innerHTML = "No comments for emotion - " + d.key
        }

        if (!filterobj.emotion && !selected_row) {
            var myNode = document.getElementById("parentBox");
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
            }
            // document.getElementById(div_id.split("-")[0]).setAttribute("style", "outline:0");
        }

        divMove();
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

// $(<parent>).on('<event>', '<child>', callback);
$(document).on('change', '.check_box', function () {
    if (this.checked) {
        // checkbox is checked
        // $('.button input').prop('checked', true);
        var id = $(this).attr('id');

        if (compare_1 && compare_2) {
            if (compare_switch == false) {
                $('#' + compare_1).prop('checked', false)
                localStorage.setItem("compare_1", id);
                compare_1 = id
                compare_switch = true
            } else if (compare_switch == true) {
                $('#' + compare_2).prop('checked', false)
                localStorage.setItem("compare_2", id);
                compare_2 = id
                compare_switch = false
            }
        }

        if (compare_1 && !compare_2) {
            console.log("1 !2")
            localStorage.setItem("compare_2", id);
            compare_2 = id
        }

        if (!compare_1) {
            console.log("!1")
            localStorage.setItem("compare_1", id);
            compare_1 = id
        }

        console.log("1 2", compare_1, compare_2)
    }
    if (!this.checked) {
        // checkbox is checked
        // $('.button input').prop('checked', true);
        var id = $(this).attr('id');

        if (compare_1 == id) {
            compare_1 = ""
            localStorage.setItem("compare_1", "")
        }

        if (compare_2 == id) {
            compare_2 = ""
            localStorage.setItem("compare_2", "")
        }
    }

    if (localStorage.getItem("compare_1") && localStorage.getItem("compare_2")) {
        document.getElementById("compare_button").setAttribute("style", "background-color:#DEE5EA; border:none;color:#2C485B")
    } else {
        document.getElementById("compare_button").setAttribute("style", "background-color:#2C485B;border:none;color:white")
    }
});

$(document).ready(function () {
    $('#box_header_button_down').click(function () {
        console.log("down")
        if (document.getElementById("parentBox"))
            document.getElementById("parentBox").setAttribute("style", "height:0px")
        if (document.getElementById("aggregateDiv"))
            document.getElementById("aggregateDiv").setAttribute("style", "height:74%")
    });
});

$(document).ready(function () {
    $('#box_header_button_up').click(function () {
        if (!check_empty()) {
            document.getElementById("parentBox").setAttribute("style", "height:55vh")
            document.getElementById("aggregateDiv").setAttribute("style", "height:20vh")
        }
    });
});

$(document).on('change', '.topic_down', function () {

    var pos = 0
    var topic = ""
    id = $(this).attr('id')
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
        console.log(props[i].topic_keyphrase, topic_input)
        if (props[i].topic_keyphrase == topic_input) {
            topic = i
        }
    }

    topic_parameter = "topic_" + id_input + "_" + topic
    console.log(topic_parameter)

    show_topics(topic_parameter, true)
});