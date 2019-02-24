var sentiment = [{}];

d3.json("comments.json", function (err, json) {
  negative = 0, neutral = 0, positive = 0;
  for (var i in json) {
    comments.innerText = comments.innerText + i + ": " + json[i].comment + "\n\n"
    
    
    
    
    
    console.log(json[i].emotion)
    if(json[i].sentiment_final == "neutral"){
      neutral++;
    }
    else if(json[i].sentiment_final == "negative"){
      negative++;
    }
    else if(json[i].sentiment_final == "positive"){
      positive++;
    }
  }
  
  sentiment['State'] = "sentiment"
  sentiment['negative'] = negative
  sentiment['neutral'] = neutral
  sentiment['positive'] = positive
  sentiment['columns'] = ["State", "negative", "neutral", "positive"]
});

//console.log(sentiment)

var svg = d3.select("#bars").append("svg"),
  margin = { top: 20, right: 60, bottom: 30, left: 40 },
  width = 30,
  height = 120,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var y = d3.scaleBand()
  .rangeRound([0, width])
  .padding(0.1)
  .align(0.1);

var x = d3.scaleLinear()
  .rangeRound([height, 0]);

var z = d3.scaleOrdinal()
  .range(['#02CA22', '#FB5652', '#FFB005']);

var stack = d3.stack()
  .offset(d3.stackOffsetExpand);

d3.csv("data.csv", type, function (error, data) {
  if (error) throw error;

  //data = sentiment
  console.log(data)

  y.domain(data.map(function (d) {
    console.log(d)
    return d.State;
  }));
  z.domain(data.columns.slice(1));

  //z.domain(["negative", "neutral", "positive"])

  var serie = g.selectAll(".serie")
    .data(stack.keys(data.columns.slice(1))(data))
    //.data(stack.keys(["negative", "neutral", "positive"])(data))
    .enter().append("g")
    .attr("class", "serie")
    .attr("fill", function (d) {
      return z(d.key);
    });

  var bar = serie.selectAll("rect")
    .data(function (d) {
      console.log(d)
    return d;
    })
    .enter().append("rect")
    .attr("y", function (d) {
      //console.log(d.data.State)
      return y(d.data.State);
    })
    .attr("x", function (d) {
      return x(d[1]);
    })
    .attr("width", function (d) {
      //console.log(d)
      return x(d[0]) - x(d[1]);
    })
    .attr("height", y.bandwidth());
});

function type(d, i, columns) {
  var t;
  for (i = 1, t = 0; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
  d.total = t;
  return d;
}