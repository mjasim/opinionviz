// Define margins, dimensions, and some line colors
const margin = {
    top: 40,
    right: 120,
    bottom: 30,
    left: 40
};
const width = 800 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;


var states, tipBox;
var parseTime = d3.timeParse("%m/%d/%Y");
var tooltip_text = ""

// Define the scales and tell D3 how to draw the line
// const x = d3.scaleLinear().domain([1910, 2010]).range([0, width]);
// const y = d3.scaleLinear().domain([0, 40000000]).range([height, 0]);
// const line = d3.line().x(d => x(d.year)).y(d => y(d.population));

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
const line = d3.line().x(d => x(d.date)).y(d => y(d.comments));

const chart = d3.select('svg').append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

const tooltip = d3.select('#tooltip');
const tooltipLine = chart.append('line');

// Add the axes and a title
// const xAxis = d3.axisBottom(x).tickFormat(d3.format('.4'));
// const yAxis = d3.axisLeft(y).tickFormat(d3.format('.2s'));
// chart.append('g').call(yAxis);
// chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
// chart.append('text').html('Community reactions over time').attr('x', 200);


full_data = ''
d3.json("communitycrit_revised.json", function (err, full_data) {

    json = JSON.parse(JSON.stringify(full_data))

    proposal_wise_dates = get_proposal_wise_dates(JSON.parse(JSON.stringify(full_data)))

    date_history = []

    for (var i in proposal_wise_dates[0].dates) {
        c_excited = 0, c_happy = 0, c_neutral = 0, c_concerned = 0, c_angry = 0;
        for (var j in json.ideas[0].tasks) {
            for (var k in json.ideas[0].tasks[j].comments) {
                if (json.ideas[0].tasks[j].comments[k].post_time.split(" ")[0] == proposal_wise_dates[0].dates[i]) {
                    if (json.ideas[0].tasks[j].comments[k].emotion == "Excited") {
                        c_excited = c_excited + 1
                    }
                    if (json.ideas[0].tasks[j].comments[k].emotion == "Happy") {
                        c_happy = c_happy + 1
                    }
                    if (json.ideas[0].tasks[j].comments[k].emotion == "Neutral") {
                        c_neutral = c_neutral + 1
                    }
                    if (json.ideas[0].tasks[j].comments[k].emotion == "Concerned") {
                        c_concerned = c_concerned + 1
                    }
                    if (json.ideas[0].tasks[j].comments[k].emotion == "Angry") {
                        c_angry = c_angry + 1
                    }
                }
            }
        }

        temp = {
            "date": proposal_wise_dates[0].dates[i],
            "comments": c_excited + c_happy + c_neutral + c_concerned + c_angry,
            "Excited": c_excited,
            "Happy": c_happy,
            "Neutral": c_neutral,
            "Concerned": c_concerned,
            "Angry": c_angry,
        }

        date_history.push(temp)
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

    draw_line(line_data)

})

// Load the data and draw a chart
var states, tipBox;

// d3.json('data.json', d => {
//     states = d;
// })

function draw_line(line_data) {

    states = JSON.parse(JSON.stringify(line_data))

    console.log(states)

    // format the data
    states[0].history.forEach(function (d) {
        d.date = parseTime(d.date);
        d.comments = +d.comments;
    });

    x.domain(d3.extent(states[0].history, function (d) {
        return d.date;
    }));
    y.domain([0, d3.max(states[0].history, function (d) {
        return d.comments;
    })]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y);
    chart.append('g').call(yAxis);
    chart.append('g').attr('transform', 'translate(0,' + height + ')').call(xAxis);
    chart.append('text').html('Community reactions over time').attr('x', 200);

    chart.selectAll()
        .data(states).enter()
        .append('path')
        .attr('fill', 'none')
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .datum(d => d.history)
        .attr('d', line);

    chart.selectAll()
        .data(states).enter()
        .append('text')
        .html(d => d.name)
        .attr('fill', d => d.color)
        .attr('alignment-baseline', 'middle')
        .attr('x', width)
        .attr('dx', '.5em')
        .attr('y', d => y(d.maxval));

    // chart.selectAll()
    //     .data(states)
    //     .enter().append("circle")
    //     .attr("r", 5)
    //     .datum(d => d.history)

    tipBox = chart.append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('opacity', 0)
        .on('mousemove', drawTooltip)
        .on('mouseout', removeTooltip);
}

function removeTooltip() {
    if (tooltip) tooltip.style('display', 'none');
    if (tooltipLine) tooltipLine.attr('stroke', 'none');
}

function drawTooltip() {

    this_date = x.invert(d3.mouse(tipBox.node())[0]).toLocaleDateString("en-US");

    // const year = Math.floor((x.invert(d3.mouse(tipBox.node())[0]) + 5) / 10) * 10;
    // states.sort((a, b) => {
    //   return b.history.find(h => h.year == year).population - a.history.find(h => h.year == year).population;
    // })  

    // tooltipLine.attr('stroke', 'black')
    //   .attr('x1', x(year))
    //   .attr('x2', x(year))
    //   .attr('y1', 0)
    //   .attr('y2', height);

    tooltip.html(this_date)
        .style('display', 'block')
        .style('left', d3.event.pageX + 20)
        .style('top', d3.event.pageY - 20)
        .selectAll()
        .data(states).enter()
        .append('div')
        .style('color', d => d.color)
        .html(function (d) {

            if (d.history.find(h => h.date.toLocaleDateString("en-US") == this_date)) {
                tooltip_text = 'Excited: ' + d.history.find(h => h.date.toLocaleDateString("en-US") == this_date).Excited + '<br>' +
                    'Happy: ' + d.history.find(h => h.date.toLocaleDateString("en-US") == this_date).Happy + '<br>' +
                    'Neutral:' + d.history.find(h => h.date.toLocaleDateString("en-US") == this_date).Neutral + '<br>' +
                    'Concerned: ' + d.history.find(h => h.date.toLocaleDateString("en-US") == this_date).Concerned + '<br>' +
                    'Angry: ' + d.history.find(h => h.date.toLocaleDateString("en-US") == this_date).Angry;
                return tooltip_text

            } else
                return tooltip_text

        })
}