



function save_note(data) {
  //console.log(data)

  for (var i in data["ideas"]) {
    for (var j in data.ideas[i].tasks) {
      for (var k in data.ideas[i].tasks[j].comments) {
        data.ideas[i].tasks[j].comments[k].comment = "Yolololololo"
      }
    }
  }
  console.log(data)
}         