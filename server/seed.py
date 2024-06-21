from config import db, app
from random import randint, choice as rc
from datetime import date, time, datetime
from models import TaskTemplate, User, RoutineTemplate, TaskRoutine 

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

with app.app_context():

    print("Deleting taskroutines...")
    TaskRoutine.query.delete()
    print("Deleting tasktemplates...")
    TaskTemplate.query.delete()
    print("Deleting routinetemplates...")
    RoutineTemplate.query.delete()
    print("Deleting users...")
    User.query.delete()


    print("Creating users...")
    julie = User(name="Julie Poulain", email="juliempoulain@gmail.com", phone=9785510848)
    andrew = User(name="Andrew", email="andrew@example.com")
    kelly = User(name="Kelly", email="kelly@example.com")
    users = [julie, andrew, kelly]
    db.session.add_all(users)
    db.session.commit()

    print("creating tasktemplates...")
    task1 = TaskTemplate(task_name="stand up", task_note="GET OUT OF BED", timer_length=5, user_id=julie.id)
    task2 = TaskTemplate(task_name="make bed", timer_length=5, user_id=julie.id)
    task3 = TaskTemplate(task_name="bathroom routine", timer_length=5, user_id=julie.id) 
    task4 = TaskTemplate(task_name="dress and go to the gym", timer_length=5, user_id=julie.id)
    task5 = TaskTemplate(task_name="shower", timer_length=5, user_id=julie.id)
    task6 = TaskTemplate(task_name="eat breakfast", timer_length=5, user_id=julie.id)
    task7 = TaskTemplate(task_name="work", task_note="start work day by 9am!!", timer_length=5, user_id=julie.id)
    task8 = TaskTemplate(task_name="break", timer_length=5, user_id=julie.id)
    task9 = TaskTemplate(task_name="work", timer_length=5, user_id=julie.id)
    task10 = TaskTemplate(task_name="break", timer_length=5, user_id=julie.id)
    task11 = TaskTemplate(task_name="finish work day", timer_length=5, user_id=julie.id)
    task12 = TaskTemplate(task_name="get dressed", timer_length=5, user_id=julie.id)
    task13 = TaskTemplate(task_name="test", timer_length=5, user_id=andrew.id)

    tasks=[task1, task2, task3, task4, task5, task6, task7, task8, task9, task10, task11, task12, task13]
    db.session.add_all(tasks)
    db.session.commit()

    print("creating routinetemplates...")
    routine1 = RoutineTemplate(routine_name="Morning Routine - No Gym", total_timer_length=(task1.timer_length + task2.timer_length + task3.timer_length + task5.timer_length + task6.timer_length + task7.timer_length + task8.timer_length + task9.timer_length + task10.timer_length + task11.timer_length + task12.timer_length),  user_id=julie.id)
    routine2 = RoutineTemplate(routine_name="Morning Routine - Gym", total_timer_length=(task1.timer_length + task2.timer_length + task3.timer_length + task5.timer_length + task6.timer_length + task7.timer_length + task8.timer_length + task9.timer_length + task10.timer_length + task11.timer_length + task4.timer_length),  user_id=julie.id)

    routines=[routine1, routine2]
    db.session.add_all(routines)
    db.session.commit()


    print("creating taskroutines...")
    taskroutine1 = TaskRoutine(tasktemplate_id=task1.id, routinetemplate_id=routine1.id)
    taskroutine2 = TaskRoutine(tasktemplate_id=task2.id, routinetemplate_id=routine1.id)
    taskroutine3 = TaskRoutine(tasktemplate_id=task3.id, routinetemplate_id=routine1.id)
    taskroutine4 = TaskRoutine(tasktemplate_id=task12.id, routinetemplate_id=routine1.id)
    taskroutine5 = TaskRoutine(tasktemplate_id=task5.id, routinetemplate_id=routine1.id)
    taskroutine6 = TaskRoutine(tasktemplate_id=task6.id, routinetemplate_id=routine1.id)
    taskroutine7 = TaskRoutine(tasktemplate_id=task7.id, routinetemplate_id=routine1.id)
    taskroutine8 = TaskRoutine(tasktemplate_id=task8.id, routinetemplate_id=routine1.id)
    taskroutine9 = TaskRoutine(tasktemplate_id=task9.id, routinetemplate_id=routine1.id)
    taskroutine10 = TaskRoutine(tasktemplate_id=task10.id, routinetemplate_id=routine1.id)
    taskroutine11 = TaskRoutine(tasktemplate_id=task11.id, routinetemplate_id=routine1.id)
    taskroutine12 = TaskRoutine(tasktemplate_id=task1.id, routinetemplate_id=routine2.id)
    taskroutine13 = TaskRoutine(tasktemplate_id=task2.id, routinetemplate_id=routine2.id)
    taskroutine14 = TaskRoutine(tasktemplate_id=task3.id, routinetemplate_id=routine2.id)
    taskroutine15 = TaskRoutine(tasktemplate_id=task4.id, routinetemplate_id=routine2.id)
    taskroutine16 = TaskRoutine(tasktemplate_id=task5.id, routinetemplate_id=routine2.id)
    taskroutine17 = TaskRoutine(tasktemplate_id=task6.id, routinetemplate_id=routine2.id)
    taskroutine18 = TaskRoutine(tasktemplate_id=task7.id, routinetemplate_id=routine2.id)
    taskroutine19 = TaskRoutine(tasktemplate_id=task8.id, routinetemplate_id=routine2.id)
    taskroutine20 = TaskRoutine(tasktemplate_id=task9.id, routinetemplate_id=routine2.id)
    taskroutine21 = TaskRoutine(tasktemplate_id=task10.id, routinetemplate_id=routine2.id)
    taskroutine22 = TaskRoutine(tasktemplate_id=task11.id, routinetemplate_id=routine2.id)

    taskroutines=[taskroutine1, taskroutine2, taskroutine3, taskroutine4, taskroutine5, taskroutine6, taskroutine7, taskroutine8, taskroutine9, taskroutine10, taskroutine11, taskroutine12, taskroutine13, taskroutine14, taskroutine15, taskroutine16, taskroutine17, taskroutine18, taskroutine19, taskroutine20, taskroutine21, taskroutine22]
    db.session.add_all(taskroutines)
    db.session.commit()

    print("Seeding done!")

    

    
    