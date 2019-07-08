// Get proposal names

function get_serial_number(json){
    var serial_numbers = []
    //console.log(json)
    for (var i in json["ideas"]){
        serial_numbers.push({
            idea_id: json.ideas[i].id,
            serial_number: json.ideas[i].serial
        })
    }
    return serial_numbers;
}

function get_proposal_names(json){
    var proposal_names = []
    //console.log(json)
    for (var i in json["ideas"]){
        proposal_names.push({
            idea_id: json.ideas[i].id,
            idea_name: json.ideas[i].name
        })
    }
    return proposal_names;
}

// Get proposal-wise topic_names
function get_proposal_wise_topic(json) {
    var proposal_topic_agg = [];
    for (var i in json["ideas"]) {
        var topics = json.ideas[i].topic_keyphrases
        topics.sort((function(a, b){
            return a.topic_keyphrase.length-b.topic_keyphrase.length
        }))

        proposal_topic_agg.push(topics)
    }
    return proposal_topic_agg;
}

// Get proposal-wise emotions
function get_proposal_wise_emotion(json) {
    var proposal_emotion_agg = [];
    for (var i in json["ideas"]) {
        count_comment = 0, count_angry = 0; count_fear = 0; count_sad = 0, count_bored = 0, count_happy = 0, count_excited = 0, count_positive = 0, count_neutral = 0, count_negative = 0;
        var idea_id = json.ideas[i].id
        for (var j in json.ideas[i].tasks) {
            for (var k in json.ideas[i].tasks[j].comments) {
                if (json.ideas[i].tasks[j].comments[k].emotion == "Angry") {
                    count_angry++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Worried") {
                    count_fear++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Sad") {
                    count_sad++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Happy") {
                    count_happy++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Excited") {
                    count_excited++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Neutral") {
                    count_excited++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Negative") {
                    count_excited++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Positive") {
                    count_excited++;
                }
            }
        }
        count_comment = count_angry + count_fear + count_sad + count_happy + count_excited + count_negative + count_neutral + count_positive
        proposal_emotion_agg.push({
            key: idea_id,
            angry: count_angry,
            worried: count_fear,
            sad: count_sad,
            happy: count_happy,
            excited: count_excited,
            positive: count_positive,
            neutral: count_neutral,
            negative: count_negative,
            angry_normalized: count_angry / count_comment,
            worried_normalized: count_fear / count_comment,
            sad_normalized: count_sad / count_comment,
            happy_normalized: count_happy / count_comment,
            excited_normalized: count_excited / count_comment,
            positive_normalized: count_positive / count_comment,
            neutral_normalized: count_neutral / count_comment,
            negative_normalized: count_negative / count_comment,
            num_comments_normalized: count_comment
        })
    }
    return proposal_emotion_agg;
}

// Get all-proposal emotion
function get_all_proposal_emotion(json) {
    var proposal_emotion_agg = []
    var proposal_wise_emotion_agg = get_proposal_wise_emotion(json)
    count_comment = 0, count_angry = 0, count_fear = 0, count_sad = 0, count_bored = 0, count_happy = 0, count_excited = 0;
    for (var i in proposal_wise_emotion_agg){
        count_angry = count_angry + proposal_wise_emotion_agg[i].angry
        count_fear = count_fear + proposal_wise_emotion_agg[i].worried
        count_sad = count_sad + proposal_wise_emotion_agg[i].sad
        //count_bored = count_bored + proposal_wise_emotion_agg[i].bored
        count_happy = count_happy + proposal_wise_emotion_agg[i].happy
        count_excited = count_excited + proposal_wise_emotion_agg[i].excited
    }
    count_comment = count_angry + count_fear + count_sad + count_bored + count_happy + count_excited
    count_comment = count_angry + count_fear + count_sad + count_happy + count_excited
    proposal_emotion_agg.push({
        key: "emotion",
        angry: count_angry,
        worried: count_fear,
        sad: count_sad,
        //bored: count_bored,
        happy: count_happy,
        excited: count_excited,
        angry_normalized: count_angry / count_comment,
        worried_normalized: count_fear / count_comment,
        sad_normalized: count_sad / count_comment,
        //bored_normalized: count_bored / count_comment,
        happy_normalized: count_happy / count_comment,
        excited_normalized: count_excited / count_comment,
        num_comments: count_comment
    })
    return proposal_emotion_agg;
}
