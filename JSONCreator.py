import json
import collections
from collections import defaultdict

def tree():
    return collections.defaultdict(tree)
    
json_dict = tree()

def generateJson():
    idea = pd.read_csv("ideas.csv", usecols = ['id', 'name', 'user_id'])
    tasks = pd.read_csv("tasks.csv", usecols = ['id', 'name'])
    questions = pd.read_csv("questions.csv", usecols = ['id', 'text', 'idea_id', 'user_id'])
    df = pd.read_csv("outputs/finaloutput.csv", usecols = ['comment','idea_id','task_id','user_id','created_at', 'id', 'emotion', 'polarity', 'subjectivity_score', 'subjectivity', 'profanity', 'sentiment_final','named_entities_corenlp','processed','Dominant_Topic','Topic_Perc_Contrib','Keywords','findTopicLabels'])
    df2 = pd.read_csv("feedback1.csv", usecols = ['id','ques_id','comment'])

    for index, row in df.iterrows():
        for index2, row2 in tasks.iterrows():
            if row2["id"] == 13:
                for index4, row4 in questions.iterrows():
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["id"] = row2["id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["task_name"] = row2["name"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["questions"][row4["id"]]["question_id"] = row4["id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["questions"][row4["id"]]["text"] = row4["text"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["questions"][row4["id"]]["user_id"] = row4["user_id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["questions"][row4["id"]]["idea_id"] = row4["idea_id"]
            if row2["id"] == 12:
                json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["id"] = row2["id"]
                json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["task_name"] = row2["name"]
                if(row2["id"]==row["task_id"]):
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["comment_id"] = row["id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["comment"] = str(row["comment"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["idea_id"] = row["idea_id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["task_id"] = 12
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["user_id"] = row["user_id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["emotion"] = str(row["emotion"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["polarity"] = row["polarity"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["subjectivity_score"] = row["subjectivity_score"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["subjectivity"] = str(row["subjectivity"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["profanity"] = row["profanity"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["sentiment_final"] = str(row["sentiment_final"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["named_entities_corenlp"] = str(row["named_entities_corenlp"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["processed"] = str(row["processed"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["Dominant_Topic"] = row["Dominant_Topic"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["Topic_Perc_Contrib"] = row["Topic_Perc_Contrib"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["Keywords"] = str(row["Keywords"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["findTopicLabels"] = str(row["findTopicLabels"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["quesion_id"] = df2.loc[df2['comment'] == row["comment"]]["ques_id"].item()
            else:
                if(row2["id"]==row["task_id"]):
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["id"] = row2["id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["task_name"] = row2["name"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["comment_id"] = row["id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["comment"] = str(row["comment"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["idea_id"] = row["idea_id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["task_id"] = row["task_id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["user_id"] = row["user_id"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["emotion"] = str(row["emotion"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["polarity"] = row["polarity"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["subjectivity_score"] = row["subjectivity_score"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["subjectivity"] = str(row["subjectivity"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["profanity"] = row["profanity"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["sentiment_final"] = str(row["sentiment_final"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["named_entities_corenlp"] = str(row["named_entities_corenlp"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["processed"] = str(row["processed"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["Dominant_Topic"] = row["Dominant_Topic"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["Topic_Perc_Contrib"] = row["Topic_Perc_Contrib"]
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["Keywords"] = str(row["Keywords"])
                    json_dict["idea"][row["idea_id"]]["tasks"][row2["id"]]["comments"][row["id"]]["findTopicLabels"] = str(row["findTopicLabels"])


    with open('outputs/data_final.json', 'w') as outfile:
        json.dump(json_dict, outfile)

generateJson()