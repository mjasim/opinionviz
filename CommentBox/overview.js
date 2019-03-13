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

// Get proposal-wise sentiments
function get_proposal_wise_sentiment(json) {
    var proposal_sentiment_agg = [];
    for (var i in json["ideas"]) {
        count_comment = 0, count_negative = 0; count_neutral = 0; count_positive = 0;
        var idea_id = json.ideas[i].id
        for (var j in json.ideas[i].tasks) {
            for (var k in json.ideas[i].tasks[j].comments) {
                if (json.ideas[i].tasks[j].comments[k].sentiment_final == "neutral") {
                    count_neutral++;
                }
                else if (json.ideas[i].tasks[j].comments[k].sentiment_final == "negative") {
                    count_negative++;
                }
                else if (json.ideas[i].tasks[j].comments[k].sentiment_final == "positive") {
                    count_positive++;
                }
            }
        }
        count_comment = count_comment + count_negative + count_neutral + count_positive 
        proposal_sentiment_agg.push({
            key: idea_id,
            negative: count_negative,
            neutral: count_neutral,
            positive: count_positive,
            negative_normalized: count_negative / count_comment,
            neutral_normalized: count_neutral / count_comment,
            positive_normalized: count_positive / count_comment
        })
    }
    return proposal_sentiment_agg;
}

// Get proposal-wise emotions
function get_proposal_wise_emotion(json) {
    var proposal_emotion_agg = [];
    for (var i in json["ideas"]) {
        count_comment = 0, count_angry = 0; count_fear = 0; count_sad = 0, count_bored = 0, count_happy = 0, count_excited = 0;
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
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Bored") {
                    count_bored++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Happy") {
                    count_happy++;
                }
                else if (json.ideas[i].tasks[j].comments[k].emotion == "Excited") {
                    count_excited++;
                }
            }
        }
        count_comment = count_angry + count_fear + count_sad + count_bored + count_happy + count_excited
        proposal_emotion_agg.push({
            key: idea_id,
            angry: count_angry,
            worried: count_fear,
            sad: count_sad,
            bored: count_bored,
            happy: count_happy,
            excited: count_excited,
            angry_normalized: count_angry / count_comment,
            worried_normalized: count_fear / count_comment,
            sad_normalized: count_sad / count_comment,
            bored_normalized: count_bored / count_comment,
            happy_normalized: count_happy / count_comment,
            excited_normalized: count_excited / count_comment,
            num_comments_normalized: count_comment

        })
    }
    return proposal_emotion_agg;
}

// Get proposal-wise subjectivity
function get_proposal_wise_subjectivity(json) {
    var proposal_subjectivity_agg = [];
    for (var i in json["ideas"]) {
        count_fact = 0; count_opinion = 0;
        var idea_id = json.ideas[i].id
        for (var j in json.ideas[i].tasks) {
            for (var k in json.ideas[i].tasks[j].comments) {
                if (json.ideas[i].tasks[j].comments[k].subjectivity == "Fact") {
                    count_fact++;
                }
                else if (json.ideas[i].tasks[j].comments[k].subjectivity == "Opinion") {
                    count_opinion++;
                }
            }
        }
        count_comment = count_fact + count_opinion
        proposal_subjectivity_agg.push({
            key: idea_id,
            fact: count_fact,
            opinion: count_opinion,
            fact_normalized: count_fact / count_comment,
            opinion_normalized: count_opinion / count_comment
        })
    }
    return proposal_subjectivity_agg;
}

// Get proposal-wise profanity distribution
function get_proposal_wise_profanity(json) {
    var proposal_profanity_agg = [];
    for (var i in json["ideas"]) {
        profanity_dist = [];
        var idea_id = json.ideas[i].id
        for (var j in json.ideas[i].tasks) {
            for (var k in json.ideas[i].tasks[j].comments) {
                profanity_dist.push(json.ideas[i].tasks[j].comments[k].profanity)
            }
        }

        proposal_profanity_agg.push({
            key: idea_id,
            profanity_count: profanity_dist.length,
            profanity_distribution: profanity_dist.sort()
        })
    }
    return proposal_profanity_agg;
}

// Get all-proposal sentiment
function get_all_proposal_sentiment(json) {
    var proposal_sentiment_agg = []
    var proposal_wise_sentiment_agg = get_proposal_wise_sentiment(json)
    count_comment = 0, count_negative = 0, count_neutral = 0, count_positive = 0;
 
    for (var i in proposal_wise_sentiment_agg){
        count_negative = count_negative + proposal_wise_sentiment_agg[i].negative
        count_neutral = count_neutral + proposal_wise_sentiment_agg[i].neutral
        count_positive = count_positive + proposal_wise_sentiment_agg[i].positive
    }
    count_comment = count_comment + count_negative + count_neutral + count_positive
    proposal_sentiment_agg.push({
        key: "sentiment",
        negative: count_negative,
        neutral: count_neutral,
        positive: count_positive,
        negative_normalized: count_negative / count_comment,
        neutral_normalized: count_neutral / count_comment,
        positive_normalized: count_positive / count_comment,
        num_comments: count_comment
    })
    return proposal_sentiment_agg;
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
        count_bored = count_bored + proposal_wise_emotion_agg[i].bored
        count_happy = count_happy + proposal_wise_emotion_agg[i].happy
        count_excited = count_excited + proposal_wise_emotion_agg[i].excited
    }
    count_comment = count_angry + count_fear + count_sad + count_bored + count_happy + count_excited
    proposal_emotion_agg.push({
        key: "emotion",
        angry: count_angry,
        worried: count_fear,
        sad: count_sad,
        bored: count_bored,
        happy: count_happy,
        excited: count_excited,
        angry_normalized: count_angry / count_comment,
        worried_normalized: count_fear / count_comment,
        sad_normalized: count_sad / count_comment,
        bored_normalized: count_bored / count_comment,
        happy_normalized: count_happy / count_comment,
        excited_normalized: count_excited / count_comment,
        num_comments: count_comment
    })
    return proposal_emotion_agg;
}

// Get all-proposal subjectivity
function get_all_proposal_subjectivity(json) {
    var proposal_subjectivity_agg = []
    var proposal_wise_subjectivity_agg = get_proposal_wise_subjectivity(json)
    count_comment = 0, count_fact = 0, count_opinion = 0;
    for (var i in proposal_wise_subjectivity_agg){
        count_fact = count_fact + proposal_wise_subjectivity_agg[i].fact
        count_opinion = count_opinion + proposal_wise_subjectivity_agg[i].opinion
    }
    count_comment = count_fact + count_opinion
    proposal_subjectivity_agg.push({
        key: "subjectivity",
        fact: count_fact,
        opinion: count_opinion,
        fact_normalized: count_fact / count_comment,
        opinion_normalized: count_opinion / count_comment,
        num_comments: count_comment
    })
    return proposal_subjectivity_agg;
}

// Get all-proposal profanity distribution
function get_all_proposal_profanity(json) {
    var proposal_profanity_agg = []
    var proposal_wise_profanity_agg = get_proposal_wise_profanity(json)
    profanity_dist = []
    for (var i in proposal_wise_profanity_agg){
        profanity_dist = profanity_dist.concat(proposal_wise_profanity_agg[i].profanity_distribution)
    }
    profanity_dist.sort()
    proposal_profanity_agg.push({
        key: "profanity",
        profanity_count: profanity_dist.length,
        profanity_distribution: profanity_dist 
    })
    return proposal_profanity_agg;
}