import json

with open('data_final.json') as f:
    data = json.load(f)

idea = "idea"
tasks = "tasks"
comments = "comments"

ideas = []

questions = data[idea]["1"][tasks]["13"]["questions"]


def giveMeQuestion(idea_id, question_id):
    for q_id in questions:
        question = questions[q_id]
        if question["idea_id"] == int(idea_id) and question["question_id"] == int(question_id):
            return question
    return None

idea_name = ["Build A Tower", "Public Art", "Roundabout", "Huge Fountain", "null", "Interactive Art",
             "null", "null", "null", "El Parquecito", "null", "null", "null", "Pedestrian Destination",
             "Promenade Real", "null", "null", "null", "null", "null", "null", "Platform connected with bridges",
             "Triangle platform with 3 pillars and flat bridge", "Zipline", "Transit Hub", "Gateway", "Connecting the past to the future",
             "null", "null", "null", "Cart before the Horse", "Call the Area Something Else", "The Diamond", "The Lyre", "EV/Bario Market"]

for idea_id in data[idea]:
    my_idea_obj = {}
    my_idea_obj["name"] = idea_name[int(idea_id) - 1]
    my_idea_obj["id"] = idea_id
    tasks_obj = data[idea][idea_id][tasks]
    all_tasks = []

    for task_id in tasks_obj:
        if task_id == "13":
            continue

        my_task_obj = {}
        my_task_obj["name"] = tasks_obj[task_id]["task_name"]
        my_task_obj["id"] = task_id
        all_comments = []

        if "comments" in tasks_obj[task_id]:
            comments = tasks_obj[task_id]["comments"]
            for comment_id in comments:

                comment = comments[comment_id]
                if task_id == "12":
                    q = giveMeQuestion(idea_id, comment["quesion_id"])
                    comment["question"] = q["text"]
                    comment["q_user_id"] = q["user_id"]
                all_comments.append(comment)

        my_task_obj["comments"] = all_comments
        all_tasks.append(my_task_obj)
    my_idea_obj["tasks"] = all_tasks
    ideas.append(my_idea_obj)
    pass
with open('communitycrit.json', 'w') as f:
    json.dump({"ideas": ideas}, f)
