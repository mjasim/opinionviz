// Get proposal names

function get_serial_number(json) {
    var serial_numbers = []
    //console.log(json)
    for (var i in json["ideas"]) {
        serial_numbers.push({
            idea_id: json.ideas[i].id,
            serial_number: json.ideas[i].serial
        })
    }
    return serial_numbers;
}

function get_proposal_names(json) {
    var proposal_names = []
    //console.log(json)
    for (var i in json["ideas"]) {
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
        // console.log(topics)
        topics.sort((function (a, b) {
            return b.keyphrase_score - a.keyphrase_score
        }))

        proposal_topic_agg.push(topics)
    }
    return proposal_topic_agg;
}

// function get_proposal_wise_cloudwords(json) {

//     var proposal_cloudwords_agg = [];
//     var temp_cloud = {
//         key: 1,
//         cloudwords: ['would', 'tower', 'could', 'should', 'think', 'impact', 'city', 'how', 'area', 'structure'],
//         frequency: [14, 11, 6, 6, 5, 5, 4, 4, 4, 3]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 2,
//         cloudwords: ['art', 'think', 'idea', 'will', 'would', 'major', 'piece', 'barrio', 'artist', 'community'],
//         frequency: [7, 6, 4, 3, 3, 2, 2, 2, 2, 2]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 3,
//         cloudwords: ['traffic', 'motor', 'area', 'would', 'pedestrian', 'trolley', 'roundabout', 'will', 'space'],
//         frequency: [19, 8, 7, 6, 6, 5, 10, 5, 5]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 4,
//         cloudwords: ['water', 'fountain', 'think', 'area', 'will', 'yes', 'would', 'make', 'community', 'people'],
//         frequency: [11, 10, 6, 6, 5, 5, 5, 4, 3, 3]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 6,
//         cloudwords: ['would', 'art', 'area', 'monument', 'public', 'likely', 'just', 'east', 'village'],
//         frequency: [12, 10, 9, 6, 5, 4, 4, 3, 3]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 10,
//         cloudwords: ['people', 'park', 'space', 'private', 'dogs', 'motor', 'traffic', 'will', 'restricted', 'like'],
//         frequency: [5, 5, 5, 4, 4, 3, 3, 3, 3, 3]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 14,
//         cloudwords: ['would', 'homeless', 'public', 'situation', 'transit', 'safety', 'area', 'need', 'open', 'like'],
//         frequency: [5, 5, 4, 3, 3, 2, 2, 2, 2, 2]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 15,
//         cloudwords: ['would', 'street', 'great', 'idea', 'promenade', 'will', 'just', 'downtown', 'car', 'create'],
//         frequency: [17, 8, 6, 4, 4, 4, 4, 4, 4, 3]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 22,
//         cloudwords: ['would', 'just', 'don\'t', 'very', 'people', 'could', 'bridge', 'think', 'street', 'traffic'],
//         frequency: [16, 6, 6, 6, 5, 5, 5, 4, 4, 4]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 23,
//         cloudwords: ['will', 'platform', 'afford'],
//         frequency: [1, 1, 1]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 24,
//         cloudwords: ['would', 'gondola', 'will', 'love', 'might', 'get', 'feasible', 'idea', 'insurance'],
//         frequency: [4, 3, 3, 2, 2, 2, 2, 2, 2, 2]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 25,
//         cloudwords: ['idea', 'transit', 'area', 'hub', 'bus', 'trolley', 'neighborhood', 'point', 'would', 'san'],
//         frequency: [9, 8, 7, 6, 5, 4, 4, 3, 3, 3]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 26,
//         cloudwords: ['very', 'sense', 'place', 'impactful', 'except', 'draw', 'visitor', 'area', 'passerby'],
//         frequency: [2, 1, 1, 1, 1, 1, 1, 1, 1, 1]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 27,
//         cloudwords: ['idea', 'need', 'rendering', 'area', 'future', 'neutral', 'idea', 'without', 'context'],
//         frequency: [4, 2, 2, 2, 2, 2, 2, 1, 1, 1]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 31,
//         cloudwords: ['homeless', 'camp', 'library', 'great', 'safety', 'perception', 'walk', 'agree', 'look', 'another'],
//         frequency: [6, 3, 3, 2, 2, 2, 2, 2, 2, 2]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 32,
//         cloudwords: ['don\'t', 'should', 'area', 'believe', 'will', 'problem', 'name', 'el nudilo', 'polled'],
//         frequency: [2, 2, 2, 2, 2, 1, 1, 1, 1]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 33,
//         cloudwords: ['sure', 'will', 'area', 'picture', 'look', 'additional', 'image', 'art'],
//         frequency: [2, 2, 2, 1, 1, 1, 1, 1]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 34,
//         cloudwords: ['like', 'safety', 'pedestrian', 'would', 'believe', 'very', 'will', 'area', 'important'],
//         frequency: [2, 2, 4, 2, 2, 2, 2, 2, 2]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     var temp_cloud = {
//         key: 35,
//         cloudwords: ['would', 'area', 'market', 'community', 'barrio', 'east', 'village', 'will', 'public', 'neighborhood'],
//         frequency: [13, 11, 8, 5, 5, 4, 4, 4, 3]
//     }
//     proposal_cloudwords_agg.push(temp_cloud)
//     return proposal_cloudwords_agg;
// }

// Get proposal-wise emotions

function get_proposal_wise_emotion(json) {
    var proposal_emotion_agg = [];
    for (var i in json["ideas"]) {
        count_comment = 0, count_angry = 0;
        count_fear = 0;
        count_neutral = 0, count_bored = 0, count_happy = 0, count_excited = 0, count_positive = 0, count_neutral = 0, count_negative = 0;
        var idea_id = json.ideas[i].id
        for (var j in json.ideas[i].tasks) {
            for (var k in json.ideas[i].tasks[j].comments) {
                if (json.ideas[i].tasks[j].comments[k].emotion == "Angry") {
                    count_angry++;
                } else if (json.ideas[i].tasks[j].comments[k].emotion == "Concerned") {
                    count_fear++;
                } else if (json.ideas[i].tasks[j].comments[k].emotion == "Neutral") {
                    count_neutral++;
                } else if (json.ideas[i].tasks[j].comments[k].emotion == "Happy") {
                    count_happy++;
                } else if (json.ideas[i].tasks[j].comments[k].emotion == "Excited") {
                    count_excited++;
                } else if (json.ideas[i].tasks[j].comments[k].emotion == "Neutral") {
                    count_excited++;
                } else if (json.ideas[i].tasks[j].comments[k].emotion == "Negative") {
                    count_excited++;
                } else if (json.ideas[i].tasks[j].comments[k].emotion == "Positive") {
                    count_excited++;
                }
            }
        }
        count_comment = count_angry + count_fear + count_neutral + count_happy + count_excited;
        proposal_emotion_agg.push({
            key: idea_id,
            angry: count_angry,
            concerned: count_fear,
            neutral: count_neutral,
            happy: count_happy,
            excited: count_excited,
            positive: count_positive,
            neutral: count_neutral,
            negative: count_negative,
            angry_normalized: count_angry / count_comment,
            concerned_normalized: count_fear / count_comment,
            neutral_normalized: count_neutral / count_comment,
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
    count_comment = 0, count_angry = 0, count_fear = 0, count_neutral = 0, count_bored = 0, count_happy = 0, count_excited = 0;
    for (var i in proposal_wise_emotion_agg) {
        count_angry = count_angry + proposal_wise_emotion_agg[i].angry
        count_fear = count_fear + proposal_wise_emotion_agg[i].concerned
        count_neutral = count_neutral + proposal_wise_emotion_agg[i].neutral
        count_happy = count_happy + proposal_wise_emotion_agg[i].happy
        count_excited = count_excited + proposal_wise_emotion_agg[i].excited
    }
    count_comment = count_angry + count_fear + count_neutral + count_happy + count_excited
    proposal_emotion_agg.push({
        key: "emotion",
        angry: count_angry,
        concerned: count_fear,
        neutral: count_neutral,
        happy: count_happy,
        excited: count_excited,
        angry_normalized: count_angry / count_comment,
        concerned_normalized: count_fear / count_comment,
        neutral_normalized: count_neutral / count_comment,
        happy_normalized: count_happy / count_comment,
        excited_normalized: count_excited / count_comment,
        num_comments: count_comment
    })
    return proposal_emotion_agg;
}

$("div[id^='myModal']").each(function () {

    console.log("Damn")
    var currentModal = $(this);

    //click next
    currentModal.find('.btn-next').click(function () {
        currentModal.modal('hide');
        currentModal.closest("div[id^='myModal']").nextAll("div[id^='myModal']").first().modal('show');
    });

    //click prev
    currentModal.find('.btn-prev').click(function () {
        currentModal.modal('hide');
        currentModal.closest("div[id^='myModal']").prevAll("div[id^='myModal']").first().modal('show');
    });

});