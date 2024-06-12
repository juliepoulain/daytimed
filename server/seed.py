from config import db, app
from random import randint, choice as rc
from datetime import date, time, datetime
from models import TaskTemplate, User, RoutineTemplate, TaskRoutine 

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

with app.app_context():

    print("Deleting users...")
    User.query.delete()
    print("Deleting tasktemplates...")
    TaskTemplate.query.delete()
    print("Deleting routinetemplates...")
    RoutineTemplate.query.delete()
    print("Deleting taskroutines...")
    TaskRoutine.query.delete()

    print("Creating users...")
    julie = User(name="Julie", email="juliempoulain@gmail.com")
    andrew = User(name="Andrew", email="andrew@example.com")
    kelly = User(name="Kelly", email="kelly@example.com")
    users = [julie, andrew, kelly]
    db.session.add_all(users)
    db.session.commit()

    print("creating tasktemplates...")
    task1 = TaskTemplate(task_name="stand UP", task_note="GET OUT OF BED", timer_length=120, user_id=julie.id)
    task2 = TaskTemplate(task_name="make bed", timer_length=180, user_id=julie.id)
    task3 = TaskTemplate(task_name="bathroom routine", timer_length=600, user_id=julie.id) 
    task4 = TaskTemplate(task_name="dress and go to the gym", timer_length=2700, user_id=julie.id)
    task5 = TaskTemplate(task_name="shower", timer_length=900, user_id=julie.id)
    task6 = TaskTemplate(task_name="eat breakfast", timer_length=180, user_id=julie.id)
    task7 = TaskTemplate(task_name="work", task_note="start work day by 9am!!", timer_length=10800, user_id=julie.id)
    task8 = TaskTemplate(task_name="break", timer_length=3600, user_id=julie.id)
    task9 = TaskTemplate(task_name="work", timer_length=10800, user_id=julie.id)
    task10 = TaskTemplate(task_name="break", timer_length=1800, user_id=julie.id)
    task11 = TaskTemplate(task_name="finish work day", timer_length=3600, user_id=julie.id)

    tasks=[task1, task2, task3, task4, task5, task6, task7, task8, task9, task10]
    db.session.add_all(tasks)
    db.session.commit()

    # print("Creating sitters...")
    # sitters = [
    #     Sitter(
    #         name="Jason Vorhees",
    #         bio="Great with watching your little ones at a lake",
    #         experience=7,
    #         image="https://images.nightcafe.studio/jobs/6sLDmT6whBds1MnmQf6y/6sLDmT6whBds1MnmQf6y--1--5hp52_2x.jpg?tr=w-1200,c-at_max",
    #         address="12 Crystal Lake, Wantabe, NJ 07050",
    #         phone=1111111111,
    #         email="jvorheesluvsyou1@madeup.com"
    #     ),
    #     Sitter(
    #         name="Freddy Krueger",
    #         bio="Ensures your pets have the best dreams",
    #         experience=10,
    #         image="https://static1.srcdn.com/wordpress/wp-content/uploads/2016/10/Nightmare-on-Elm-Street-6.jpg",
    #         address="1428 Elm Street, Springwood, OH 45459",
    #         phone=1111111111,
    #         email="fkrueger@nightmares.com"
    #     ),
    #     Sitter(
    #         name="Michael Myers",
    #         bio="Silent but always keeps an eye on your pets",
    #         experience=8,
    #         image="https://coleandmarmalade.com/wp-content/uploads/2022/03/Michael-Meowers-1.jpg",
    #         address="45 Lampkin Lane, Haddonfield, IL 60120",
    #         phone=1111111111,
    #         email="mmyers@halloween.com"
    #     ),
    #     Sitter(
    #         name="Chucky Ray",
    #         bio="Great with pets, especially if they like to play",
    #         experience=5,
    #         image="https://static1.srcdn.com/wordpress/wp-content/uploads/2021/10/Brad-Dourif-as-Chucky-with-Binx-the-Cat-in-Chucky-Episode-1.jpg",
    #         address="123 Good Guys St, Hackensack, NJ 07601",
    #         phone=1111111111,
    #         email="cray@goodguys.com"
    #     ),
    #     Sitter(
    #         name="Norman Bates",
    #         bio="Takes care of your pets like they were his own",
    #         experience=6,
    #         image="https://m.media-amazon.com/images/M/MV5BMWZiYmM3MzItYzFiOC00N2VmLWEwOWQtZTYzYjFmNjZlMWRlL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNzAzMDEzNTI@._V1_.jpg",
    #         address="12 Old Highway, Fairvale, CA 93922",
    #         phone=1111111111,
    #         email="nbates@batesmotel.com"
    #     ),
    #     Sitter(
    #         name="Pennywise Clown",
    #         bio="Your pets will float with joy under my care",
    #         experience=9,
    #         image="https://photos.costume-works.com/full/pennywise_and_his_dog-31298-1.jpg",
    #         address="29 Neibolt Street, Derry, ME 04401",
    #         phone=1111111111,
    #         email="pennywise@it.com"
    #     )
    # ]
    # for sitter in sitters:
    #     db.session.add(sitter)
    # db.session.commit()

    # print("Creating visits...")
    # visitA = Visit(visit_notes="Garfield was very sweet today. He ate all his food and I watched him drink some water. We played fetch for a while and cuddled while watching Bridgerton. A great visit!", sitter_id=sitters[0].id, pet_id=garfield.id, owner_id=julie.id, date=date(2024, 1, 2), check_in_time=time(14, 27))
    # visitB = Visit(visit_notes="Garfield was aloof today. I guess we're not friends anymore. I am sad.", sitter_id=sitters[0].id, pet_id=garfield.id, owner_id=julie.id, date=date(2024, 2, 1), check_in_time=time(12, 12))
    # visitC = Visit(visit_notes="Rose was a good girl!", sitter_id=sitters[1].id, pet_id=rose.id, owner_id=billy.id, date=date(2024, 5, 27), check_in_time=time(15, 32))
    # visitD = Visit(visit_notes="Buddy was very bad today. I would like an added tip for the inconvenience.", sitter_id=sitters[2].id, pet_id=buddy.id, owner_id=billy.id, date=date(2024, 6, 15), check_in_time=time(10, 15))
    # visitE = Visit(visit_notes="Nothing to report.", sitter_id=sitters[3].id, pet_id=rose.id, owner_id=billy.id, date=date(2024, 8, 10), check_in_time=time(9, 45))
    # visitF = Visit(visit_notes="Nothing to report.", sitter_id=sitters[4].id, pet_id=buddy.id, owner_id=billy.id, date=date(2024, 9, 20), check_in_time=time(11, 30))
    # visitG = Visit(visit_notes="I adore garfield!", sitter_id=sitters[5].id, pet_id=garfield.id, owner_id=julie.id, date=date(2024, 10, 5), check_in_time=time(14, 0))
    # visitH = Visit(visit_notes="Olivia is so cute!!!! She hid from me at first but then came out for cuddles", sitter_id=sitters[2].id, pet_id=olivia.id, owner_id=julie.id, date=date(2024, 10, 5), check_in_time=time(14, 0))
    # visits = [visitA, visitB, visitC, visitD, visitE, visitF, visitG, visitH]
    # db.session.add_all(visits)
    # db.session.commit()

    print("Seeding done!")

    

    
    