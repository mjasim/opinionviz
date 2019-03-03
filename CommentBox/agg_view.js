
var filterobj = {
    emotion: null,
    sentiment_final: null,
    subjectivity: null,
    idea_id: null,
    task_id: null
}

d3.json("communitycrit.json", function (err, json) {
    //console.log(json)

    var numberOfRows = 18;
    var numberOfColumns = 5;

    var proposal_names = get_proposal_names(json)
    var proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
    var proposal_wise_sentiment_agg = get_proposal_wise_sentiment(json)
    var proposal_wise_subjectivity_agg = get_proposal_wise_subjectivity(json)
    var proposal_wise_profanity_agg = get_proposal_wise_profanity(json)
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
    tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg.id = "svgtop0"
    tempSvg.setAttribute("class", "t_svg")
    tempSvg.setAttribute("width", top0.clientWidth)
    tempSvg.setAttribute("height", top0.clientHeight)
    top0.appendChild(tempSvg)

    //============================ top column 0 end =====================//
    //============================ top column 1 =========================//

    var top1 = document.getElementById("top1")
    tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg.id = "svgtop1"
    tempSvg.setAttribute("class", "t_svg")
    tempSvg.setAttribute("width", top1.clientWidth)
    tempSvg.setAttribute("height", top1.clientHeight)
    top1.appendChild(tempSvg)

    send_data = all_proposal_emotion_agg
    emotion_rows(send_data, tempSvg.id, top1.id, null)

    //============================ top column 1 end =========================//
    //============================ top column 2 =========================//

    var top2 = document.getElementById("top2")
    tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg.id = "svgtop2"
    tempSvg.setAttribute("class", "t_svg")
    tempSvg.setAttribute("width", top2.clientWidth)
    tempSvg.setAttribute("height", top2.clientHeight)
    top2.appendChild(tempSvg)

    send_data = all_proposal_sentiment_agg
    sentiment_rows(send_data, tempSvg.id, top2.id, null)

    //============================ top column 2 end =========================//

    //============================ top column 3 =========================//

    var top3 = document.getElementById("top3")
    tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    tempSvg.id = "svgtop3"
    tempSvg.setAttribute("class", "t_svg")
    tempSvg.setAttribute("width", top3.clientWidth)
    tempSvg.setAttribute("height", top3.clientHeight)
    top3.appendChild(tempSvg)

    send_data = all_proposal_subjectivity_agg
    subjectivity_rows(send_data, tempSvg.id, top3.id, null)

    //============================ top column 3 end =========================//

    //============================ top column 4 =========================//

    var top4 = document.getElementById("top4")
    send_data = all_proposal_profanity_agg[0].profanity_distribution;

    var min = Math.min(...send_data)
    var max = Math.max(...send_data)
    normalized = []
    for (var x = 0; x < send_data.length; x++) {
        normalized.push(normalize(send_data[x], max, min))
    }
    //console.log(send_data)
    profanity_rows(normalized, top4.id)


    //============================ top column 4 end =========================//


    // Label div fillup

    var labelElement = document.getElementById("labelDiv")

    // =========================== label column 0 ===============================//

    var labelColumn0Div = document.createElement("div")
    labelColumn0Div.id = "labelcolumn0"
    labelColumn0Div.className = "l_column0"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\""+ ">" + "Proposal Title" + "</p>" + "</div>" +
        "<div class=\"label-title-body\"" + ">" +
        "<p>" + "Search" + "</p>" +
        "<p>" + '<span class="label-search-button" id="span_id_angry" >' +
        "<i class=" + "\"fas fa-search fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>"

    labelColumn0Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn0Div)

    // =========================== label column 0 end ===========================//

    // =========================== label column 1 ===============================//

    var labelColumn1Div = document.createElement("div")
    labelColumn1Div.id = "labelcolumn1"
    labelColumn1Div.className = "l_column1"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\""+ ">" + "Emotion" + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + ">" +
        "<p>" + "Angry" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_angry" >' +
        "<i class=" + "\"fas fa-angry fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Fear" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_fear" >' +
        "<i class=" + "\"fas fa-flushed fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Sad" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_sad" >' +
        "<i class=" + "\"fas fa-frown fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Bored" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_bored" >' +
        "<i class=" + "\"fas fa-meh fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Happy" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_happy" >' +
        "<i class=" + "\"fas fa-smile fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-emo-body\"" + "\">" +
        "<p>" + "Excited" + "</p>" +
        "<p>" + '<span class="label-emo-button" id="span_id_excited" >' +
        "<i class=" + "\"fas fa-smile-beam fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>";

    labelColumn1Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn1Div)

    // =========================== label column 1 end ===========================//


    // =========================== label column 2 ===============================//

    var labelColumn2Div = document.createElement("div")
    labelColumn2Div.id = "labelcolumn2"
    labelColumn2Div.className = "l_column2"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\""+ ">" + "Sentiment" + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + ">" +
        "<p>" + "Negative" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_negative" >' +
        "<i class=" + "\"fas fa-thumbs-down fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + "\">" +
        "<p>" + "Neutral" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_neutral" >' +
        "<i class=" + "\"fas fa-thumbs-down fa-2x neutral\"" + " style=transform:rotate(-90deg)" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sent-body\"" + "\">" +
        "<p>" + "Positive" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_sad" >' +
        "<i class=" + "\"fas fa-thumbs-up fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>";
    labelColumn2Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn2Div)

    // =========================== label column 2 end ===========================//

    // =========================== label column 3 ===============================//

    var labelColumn3Div = document.createElement("div")
    labelColumn3Div.id = "labelcolumn3"
    labelColumn3Div.className = "l_column3"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\""+ ">" + "Subjectivity" + "</p>" + "</div>" +
        "<div class=\"label-sub-body\"" + ">" +
        "<p>" + "Fact" + "</p>" +
        "<p>" + '<span class="label-sub-button" id="span_id_negative" >' +
        "<i class=" + "\"fas fa-clipboard-check fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>" +
        "<div class=\"label-sub-body\"" + "\">" +
        "<p>" + "Opinion" + "</p>" +
        "<p>" + '<span class="label-sent-button" id="span_id_neutral" >' +
        "<i class=" + "\"fas fa-comments fa-2x\"" + "></i>" + '</span>' + "</p>" + "</div>";
    labelColumn3Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn3Div)

    // =========================== label column 3 end ===========================//

    // =========================== label column 4 ===============================//

    var labelColumn4Div = document.createElement("div")
    labelColumn4Div.id = "labelcolumn4"
    labelColumn4Div.className = "l_column4"

    var divCaption =
        "<div class=\"label-body\"" + "\">" +
        "<div class=\"label-title\"" + ">" +
        "<p style=\"margin: 5px 0px 5px 0px\""+ ">"+ "Profanity" + "</p>" + "</div>";
        labelColumn4Div.innerHTML = divCaption
    labelElement.appendChild(labelColumn4Div)

    // =========================== label column 3 end ===========================//


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
        var column0 = document.getElementById("row" + i + "column0")
        var divIdeaName =
            "<div class=\"idea-Name\"" + "\">" +
            '<div  class="btn btn-primary btn-block ideaName" id="' + proposal_names[i].idea_id + '">' + proposal_names[i].idea_name + "</div>";

        column0.innerHTML = divIdeaName

        //============================end of column 0==================//

        //============================ column 1 =========================//
        var column1 = document.getElementById("row" + i + "column1")
        //console.log(proposal_wise_emotion_agg)
        tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        tempSvg.id = "svg" + "row" + i + "column1"
        tempSvg.setAttribute("class", "c_svg")
        tempSvg.setAttribute("width", column1.clientWidth)
        tempSvg.setAttribute("height", column1.clientHeight)
        column1.appendChild(tempSvg)

        send_data = []
        send_data.push(proposal_wise_emotion_agg[i])
        emotion_rows(send_data, tempSvg.id, column1.id, proposal_names[i].idea_id)

        //============================end of column 1==================//

        //============================ column 2 =========================//
        var column2 = document.getElementById("row" + i + "column2")
        //console.log(proposal_wise_sentiment_agg)
        tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        tempSvg.id = "svg" + "row" + i + "column2"
        tempSvg.setAttribute("class", "c_svg")
        tempSvg.setAttribute("width", column2.clientWidth)
        tempSvg.setAttribute("height", column2.clientHeight)
        column2.appendChild(tempSvg)

        send_data = []
        send_data.push(proposal_wise_sentiment_agg[i])
        sentiment_rows(send_data, tempSvg.id, column2.id, proposal_names[i].idea_id)

        //============================end of column 2 ==================//

        //============================ column 3 =========================//
        var column3 = document.getElementById("row" + i + "column3")
        //console.log(proposal_wise_subjectivity_agg)
        tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        tempSvg.id = "svg" + "row" + i + "column3"
        tempSvg.setAttribute("class", "c_svg")
        tempSvg.setAttribute("width", column3.clientWidth)
        tempSvg.setAttribute("height", column3.clientHeight)
        column3.appendChild(tempSvg)

        send_data = []
        send_data.push(proposal_wise_subjectivity_agg[i])
        subjectivity_rows(send_data, tempSvg.id, column3.id, proposal_names[i].idea_id)

        //============================ end of column 3 ==================//

        //============================ column 4 =========================//
        var column4 = document.getElementById("row" + i + "column4")
        var send_data = proposal_wise_profanity_agg[i].profanity_distribution;
        var min = Math.min(...send_data)
        var max = Math.max(...send_data)
        normalized = []
        for (var x = 0; x < send_data.length; x++) {
            //console.log(send_data, max, min)
            normalized.push(normalize(send_data[x], max, min))
        }
        //console.log(send_data)
        profanity_rows(normalized, column4.id)

        //============================ end of column 4 ==================//
    }

    function normalize(val, max, min) {
        return (val - min) / (max - min);
    }

    $(document).ready(function () {
        $('.ideaName').click(function () {
            var id = $(this).attr('id');
            filterobj.idea_id = id
            filterobj.emotion = null
            filterobj.sentiment_final = null
            filterobj.subjectivity = null
            filterobj.task_id = null
            var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
            draw_filtered_comments(filtered_comment)

        });
        // $('.emoticon_button').mouseover(function() {
        //     var id = $(this).attr('id');
        //     console.log('emotion mouseover',id)
        // });
    });
    //functions for d3

    function emotion_rows(salesData, svg_id, div_id, idea_id) {

        var group = ["angry", "worried", "sad", "neutral", "happy", "excited"];
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

            width = +svg.attr("width"),
            height = +svg.attr("height");

        var x = d3.scaleLinear()
            .rangeRound([margin.left, width - margin.right]);

        x.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)]);

        var y = d3.scaleBand()
            .rangeRound([height - margin.bottom, margin.top])
            .padding(0.1);

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

        var z = d3.scaleOrdinal(["#E45756", "#54A24B", "#4C78A8", "#72B7B2", "#EECA3B", "#F58518"]);

        var maing = svg.append("g")
            .selectAll("g")
            .data(layers);
        var g = maing.enter().append("g")
            .attr("fill", function (d) {
                return z(d.key);
            })
            .attr("style", "outline: thin solid black;");

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
                return x(d[1]) - x(d[0]);
            })
            .attr("x", function (d) {
                return x(d[0]);
            })
            .attr("y", function (d) {
                return y(d.data.date);
            })
            .attr("height", y.bandwidth);

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

        //clicking on the rectangles for emotions
        rect.on("click", clicked_emotion);

        function clicked_emotion(d) {
            console.log(filterobj)
            filterobj.idea_id = idea_id
            filterobj.emotion = d.key
            var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
            draw_filtered_comments(filtered_comment)
        }

        var rectTooltipg = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .attr("id", "recttooltip_" + mainDivName)
            .attr("style", "opacity:0")
            .attr("transform", "translate(-500,-500)");

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

    function sentiment_rows(salesData, svg_id, div_id, idea_id) {

        var group = ["negative", "neutral", "positive"];
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

            width = +svg.attr("width"),
            height = +svg.attr("height");

        var x = d3.scaleLinear()
            .rangeRound([margin.left, width - margin.right]);

        x.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)]);

        var y = d3.scaleBand()
            .rangeRound([height - margin.bottom, margin.top])
            .padding(0.1);

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

        var z = d3.scaleOrdinal(["#D67195", "#FFBF79", "#439894"]);

        var maing = svg.append("g")
            .selectAll("g")
            .data(layers);
        var g = maing.enter().append("g")
            .attr("fill", function (d) {
                return z(d.key);

            })
            .attr("style", "outline: thin solid black;");

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
                return x(d[1]) - x(d[0]);
            })
            .attr("x", function (d) {
                return x(d[0]);
            })
            .attr("y", function (d) {
                return y(d.data.date);
            })
            .attr("height", y.bandwidth);

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

        rect.on("click", clicked_sentiment);

        function clicked_sentiment(d) {
            filterobj.idea_id = idea_id
            filterobj.sentiment_final = d.key
            var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
            draw_filtered_comments(filtered_comment)
        }
        var rectTooltipg = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .attr("id", "recttooltip_" + mainDivName)
            .attr("style", "opacity:0")
            .attr("transform", "translate(-500,-500)");

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

            width = +svg.attr("width"),
            height = +svg.attr("height");

        var x = d3.scaleLinear()
            .rangeRound([margin.left, width - margin.right]);

        x.domain([d3.min(layers, stackMin), d3.max(layers, stackMax)]);

        var y = d3.scaleBand()
            .rangeRound([height - margin.bottom, margin.top])
            .padding(0.1);

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
            .attr("fill", function (d) {
                return z(d.key);
            })
            .attr("style", "outline: thin solid black;");

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
                return x(d[1]) - x(d[0]);
            })
            .attr("x", function (d) {
                return x(d[0]);
            })
            .attr("y", function (d) {
                return y(d.data.date);
            })
            .attr("height", y.bandwidth);

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

        rect.on("click", clicked_subjectivity);

        function clicked_subjectivity(d) {
            filterobj.idea_id = idea_id
            filterobj.subjectivity = d.key
            var filtered_comment = get_filtered_comment(JSON.parse(JSON.stringify(json)), filterobj)
            draw_filtered_comments(filtered_comment)
        }

        var rectTooltipg = svg.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .attr("id", "recttooltip_" + mainDivName)
            .attr("style", "opacity:0")
            .attr("transform", "translate(-500,-500)");

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

    function profanity_rows(salesData, div_id) {
        //console.log(salesData)
        var color_input = "to left,"
        for (var i = 0; i < salesData.length; i++) {
            var factor = salesData[i]
            var color = interpolateColor("rgb(44, 72, 91)", "rgb(242, 242, 242)", factor)
            color_input += color + ","
        }

        //var style_gradient  = "background: linear-gradient( " + color_input.substring(0,color_input.length-1) + ");"
        var style_gradient = "linear-gradient(" + color_input.substring(0, color_input.length - 1) + ")"

        var dom = document.getElementById(div_id)

        dom.style.background = style_gradient
    }

    function interpolateColor(color1, color2, factor) {
        if (arguments.length < 3) {
            factor = 0.5;
        }
        color1 = color1.match(/\d+/g).map(Number);
        color2 = color2.match(/\d+/g).map(Number);

        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return rgbToHex(result[0], result[1], result[2]);
    };

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }

    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
});





