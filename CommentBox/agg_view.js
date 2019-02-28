
d3.json("communitycrit.json", function (err, json) {
    //console.log(json)

    var proposal_names = get_proposal_names(json)
    var proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
    var proposal_wise_sentiment_agg = get_proposal_wise_sentiment(json)
    var proposal_wise_subjectivity_agg = get_proposal_wise_subjectivity(json)
    var proposal_wise_profanity_agg = get_proposal_wise_profanity(json)

    this.data = json

    var titles = []
    var svgs = []
    var element = document.getElementById("aggregateDiv")
    var numberOfRows = 18;
    var numberOfColumns = 5;
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

        element.appendChild(tempRowDiv)

        //============================ column 0=========================//
        var column0 = document.getElementById("row" + i + "column0")
        // add button 
        titles[i] = document.createElement("button")
        titles[i].id = "title" + i
        //console.log(tempColumnDiv.id)
        titles[i].className = "btn btn-warning ideaButton"
        var title_name = document.createTextNode(proposal_names[i].idea_name)
        titles[i].appendChild(title_name)
        column0.appendChild(titles[i])

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
        emotion_rows(send_data, tempSvg.id, column1.id)

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
        sentiment_rows(send_data, tempSvg.id, column2.id)

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
        subjectivity_rows(send_data, tempSvg.id, column3.id)

        //============================ end of column 3 ==================//

         //============================ column 4 =========================//
         var column4 = document.getElementById("row" + i + "column4")
         send_data = proposal_wise_profanity_agg[i].profanity_distribution; 
         profanity_rows(send_data, column4.id)

         //============================ end of column 4 ==================//
    }

    //function for d3

    function emotion_rows(salesData, svg_id, div_id) {

        var group = ["angry", "worried", "sad", "neutral", "happy", "excited"];
        var parseDate = d3.timeFormat("%b-%Y");
        var mainDiv = "#"+div_id;
        var mainDivName = div_id;

        salesData.forEach(function (d) {
            d = type(d);
        });
        var layers = d3.stack()
            .keys(group)
            .offset(d3.stackOffsetDiverging)
            (salesData);

        var svg = d3.select("#"+svg_id),
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

        var z = d3.scaleOrdinal(["red", "blue", "gray", "green", "yellow", "brown"]);

        var maing = svg.append("g")
            .selectAll("g")
            .data(layers);
        var g = maing.enter().append("g")
            .attr("fill", function (d) {
                return z(d.key);
            });

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

    function sentiment_rows(salesData, svg_id, div_id) {

        var group = ["negative", "neutral", "positive"];
        var parseDate = d3.timeFormat("%b-%Y");

        var mainDiv = "#"+div_id;
        var mainDivName = div_id;

        salesData.forEach(function (d) {
            d = type(d);
        });
        var layers = d3.stack()
            .keys(group)
            .offset(d3.stackOffsetDiverging)
            (salesData);

        var svg = d3.select("#"+svg_id),
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

        var z = d3.scaleOrdinal(["orange", "white", "purple"]);

        var maing = svg.append("g")
            .selectAll("g")
            .data(layers);
        var g = maing.enter().append("g")
            .attr("fill", function (d) {
                return z(d.key);
            });

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

    function subjectivity_rows(salesData, svg_id, div_id) {

        var group = ["fact", "opinion"];
        var parseDate = d3.timeFormat("%b-%Y");

        var mainDiv = "#"+div_id;
        var mainDivName = div_id;

        salesData.forEach(function (d) {
            d = type(d);
        });
        var layers = d3.stack()
            .keys(group)
            .offset(d3.stackOffsetDiverging)
            (salesData);

        var svg = d3.select("#"+svg_id),
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

        var z = d3.scaleOrdinal(["#424949", "white"]);

        var maing = svg.append("g")
            .selectAll("g")
            .data(layers);
        var g = maing.enter().append("g")
            .attr("fill", function (d) {
                return z(d.key);
            });

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
        console.log(salesData)
        var color_input = "to left,"
        for (var i = 0; i < salesData.length; i++){
            var factor = salesData[i]
            var color = interpolateColor("rgb(255, 255, 255)", "rgb(0, 0, 255)", factor)
            color_input +=  color + ","
        }

        //var style_gradient  = "background: linear-gradient( " + color_input.substring(0,color_input.length-1) + ");"
        var style_gradient  = "linear-gradient(" + color_input.substring(0,color_input.length-1) + ")"

        console.log(style_gradient)

        var dom = document.getElementById(div_id)
        console.log(dom.id)
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
        return rgbToHex(result[0],result[1],result[2]);
    };

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
});





