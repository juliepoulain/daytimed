#!/usr/bin/env python3
from flask import render_template, make_response, jsonify, request
from flask_restful import Resource
from models import TaskTemplate, User, RoutineTemplate, TaskRoutine 
from config import app, api, db

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

@app.route("/api")
def index():
    return "<h1>DayTimed</h1>"

class Users(Resource):
    def get(self):
        users = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(users), 200)
   
    def post(self):
        data = request.get_json()
        new_user = User(
            name=data['name'],
            email=data['email'],
            phone=data['phone']
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(new_user.to_dict()), 201)
    
api.add_resource(Users, '/api/users')

class UsersById(Resource):
    def get(self, id):
        user = db.session.get(User, id)

        if not user:
            return make_response({"error": "user not found"}, 404)
            
        return make_response(jsonify(user.to_dict()), 200)
    
api.add_resource(UsersById, '/api/users/<int:id>')


class UsersByPhone(Resource):
    def get(self, phone):
        user = User.query.filter_by(phone=phone).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        return make_response(jsonify(user.to_dict()), 200)

api.add_resource(UsersByPhone, '/api/users/phone/<int:phone>')
        
class TaskTemplates(Resource):
    def get(self):
        tasktemplates = [tasktemplate.to_dict() for tasktemplate in TaskTemplate.query.all()]
        return make_response(jsonify(tasktemplates),200)
    
    def post(self):
        data = request.get_json()
        new_task = TaskTemplate(
            task_name=data['task_name'],
            task_note=data['task_note'],
            timer_length=data['timer_length'],
            user_id=data['user_id']
        )
        db.session.add(new_task)
        db.session.commit()
        return make_response(jsonify(new_task.to_dict()), 201)
    
api.add_resource(TaskTemplates, '/api/tasktemplates')

class TasksById(Resource):
    def get(self, id):
        tasktemplate = db.session.get(TaskTemplate, id)

        if not tasktemplate:
            return make_response({"error": "Task not found"}, 404)
            
        return make_response(jsonify(tasktemplate.to_dict(rules=("-taskroutines.tasktemplates",))), 200)

    def delete(self, id):
        task = db.session.get(TaskTemplate, id)

        if not task:
            return make_response({"error": "task not found"}, 404)
        
        db.session.delete(task)
        db.session.commit()

        return make_response("deleted", 204)
    
    def patch(self, id):
        task = TaskTemplate.query.get(id)
        if task is None:
            return make_response(jsonify(error='task not found'), 404)
        for attr in request.get_json():
            setattr(task, attr, request.get_json()[attr])
        db.session.commit()
        return make_response(jsonify(task.to_dict()), 200)
    
    
api.add_resource(TasksById, '/api/tasktemplates/<int:id>')

class TasksByUserId(Resource):
    def get(self, user_id):
        tasks = [task.to_dict() for task in TaskTemplate.query.filter_by(user_id=user_id)]
        if not tasks:
            return make_response({"error": "tasks not found"}, 404)
        return make_response(jsonify(tasks), 200)

api.add_resource(TasksByUserId, '/api/tasktemplates/users/<int:user_id>')

class RoutineTemplates(Resource):
    def get(self):
        routinetemplates = [routinetemplate.to_dict() for routinetemplate in RoutineTemplate.query.all()]
        return make_response(jsonify(routinetemplates), 200)

    def post(self):
        data = request.get_json()
        new_routine = RoutineTemplate(
            routine_name=data['routine_name'],
            user_id=data['user_id']
        )
        db.session.add(new_routine)
        db.session.commit()
        return make_response(jsonify(new_routine.to_dict()), 201)
    
api.add_resource(RoutineTemplates, '/api/routinetemplates')

class RoutinesById(Resource):
    def get(self, id):
        routinetemplate = db.session.get(RoutineTemplate, id)

        if not routinetemplate:
            return make_response({"error": "Routine not found"}, 404)
            
        return make_response(jsonify(routinetemplate.to_dict(rules=("-taskroutines.routinetemplates",))), 200)
    
    def delete(self, id):
        routine = db.session.get(RoutineTemplate, id)

        if not routine:
            return make_response({"error": "routine not found"}, 404)
        
        db.session.delete(routine)
        db.session.commit()

        return make_response("deleted", 204)
    
    def patch(self, id):
        routine = RoutineTemplate.query.get(id)
        if routine is None:
            return make_response(jsonify(error='routine not found'), 404)
        for attr in request.get_json():
            setattr(routine, attr, request.get_json()[attr])
        db.session.commit()
        return make_response(jsonify(routine.to_dict()), 200)
    
api.add_resource(RoutinesById, '/api/routinetemplates/<int:id>')

class TaskRoutines(Resource):
    def get(self):
        taskroutines = [taskroutine.to_dict() for taskroutine in TaskRoutine.query.all()]
        return make_response(jsonify(taskroutines), 200)
    
api.add_resource(TaskRoutines, '/api/taskroutines')

class TasksByRoutine(Resource):
    def get(self, routinetemplate_id):
        tasks = [task.to_dict() for task in TaskRoutine.query.filter_by(routinetemplate_id=routinetemplate_id)]
        if not tasks:
            return make_response({"error": "tasks not found"}, 404)
        return make_response(jsonify(tasks), 200)

api.add_resource(TasksByRoutine, '/api/taskroutines/routine/<int:routinetemplate_id>')


if __name__ == '__main__':
    app.run(port=8080, debug=True)

