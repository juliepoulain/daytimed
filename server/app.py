#!/usr/bin/env python3
from flask import render_template, make_response, jsonify, request
from flask_restful import Resource
from models import TaskTemplate, User, RoutineTemplate, TaskRoutine 
from config import app, api, db

# @app.errorhandler(404)
# def not_found(e):
#     return render_template("index.html")

# @app.route("/api")
# def index():
#     return "<h1>Petsitting</h1>"

# class Pets(Resource):
#     def get(self):
#         pets = [pet.to_dict() for pet in Pet.query.all()]
#         return make_response(jsonify(pets), 200)
   
#     def post(self):
#         data = request.get_json()
#         new_pet = Pet(
#             name=data['name'],
#             animal=data['animal'],
#             breed=data['breed'],
#             age=data['age'],
#             temperament=data['temperament'],
#             image=data['image'],
#             owner_id=data['owner_id']
#         )
#         db.session.add(new_pet)
#         db.session.commit()
#         return make_response(jsonify(new_pet.to_dict()), 201)
# api.add_resource(Pets, '/api/pets')
 
# class PetsById(Resource):
    
#     def get(self, id):
#         print(f'Fetching pet with id: {id}')
#         pet = Pet.query.get(id)
#         if pet is None:
#             print("pet not found")
#             return make_response(jsonify(error='Pet not found'), 404)
#         return make_response(jsonify(pet.to_dict()), 200)
    
#     def patch(self, id):
#         pet = Pet.query.get(id)
#         if pet is None:
#             return make_response(jsonify(error='Pet not found'), 404)
#         for attr in request.get_json():
#             setattr(pet, attr, request.get_json()[attr])
#         db.session.commit()
#         return make_response(jsonify(pet.to_dict()), 200)
    
#     def delete(self, id):
#         pet = Pet.query.get(id)
#         if pet is None:
#             return make_response(jsonify(error='Pet not found'), 404)
#         db.session.delete(pet)
#         db.session.commit()
#         return make_response('', 204)
        

# api.add_resource(PetsById, '/api/pets/<int:id>')

# class Owners(Resource):
#     def get(self):
#         owners = [owner.to_dict() for owner in Owner.query.all()]
#         return make_response(jsonify(owners),200)
    
#     def post(self):
#         data = request.get_json()
#         new_owner = Owner(
#             name=data['name'],
#             address=data['address'],
#             email=data['email'],
#             phone=data['phone']
#         )
#         db.session.add(new_owner)
#         db.session.commit()
#         return make_response(jsonify(new_owner.to_dict()), 201)

# class OwnersById(Resource):
#     def get(self, id):
#         owner = db.session.get(Owner, id)
#         if not owner:
#             return make_response({"error": "Owner not found"}, 404)
#         return make_response(jsonify(owner.to_dict(only=('id', 'name', 'email', 'phone', 'address', 'pets', 'sitters', "unique_sitters", "visits"))), 200)
    
# class OwnersByPhone(Resource):
#     def get(self, phone):
#         owner = Owner.query.filter_by(phone=phone).first()
#         if not owner:
#             return make_response({"error": "Owner not found"}, 404)
#         return make_response(jsonify(owner.to_dict()), 200)

# api.add_resource(Owners, '/api/owners')
# api.add_resource(OwnersById, '/api/owners/<int:id>')
# api.add_resource(OwnersByPhone, '/api/owners/phone/<int:phone>')

# class Sitters(Resource):
#     def get(self):
#         sitters = [sitter.to_dict() for sitter in Sitter.query.all()]
#         return make_response(jsonify(sitters), 200)
    
#     def post(self):
#         data = request.get_json()
#         new_sitter = Sitter(
#             name=data['name'],
#             address=data['address'],
#             bio=data['bio'],
#             phone=data['phone'],
#             email=data['email'],
#             experience=data['experience'],
#             image=data['image'],
#         )
#         db.session.add(new_sitter)
#         db.session.commit()
#         return make_response(jsonify(new_sitter.to_dict()), 201)

# class SitterById(Resource):
#     def get(self, id):
#         sitter = db.session.get(Sitter, id)
#         if not sitter:
#             return make_response({"error": "Sitter not found"}, 404)
#         return make_response(jsonify(sitter.to_dict()), 200)

# api.add_resource(Sitters, '/api/sitters')
# api.add_resource(SitterById, '/api/sitters/<int:id>')

# class Visits(Resource):
#     def get(self):
#         visits = [visit.to_dict() for visit in Visit.query.all()]
#         return make_response(jsonify(visits), 200)
    
#     def post(self):
#         data = request.get_json()
#         new_visit = Visit(
#             check_in_time=data['check_in_time'],
#             date=data['date'],
#             visit_notes=['visit_notes']
#         )
#         db.session.add(new_visit)
#         db.session.commit()
#         return make_response(jsonify(new_visit.to_dict()), 201)

# class VisitById(Resource):
#     def get(self, id):
#         visit = db.session.get(Visit, id)
#         if not visit:
#             return make_response({"error": "Visit not found"}, 404)
#         return make_response(jsonify(visit.to_dict()), 200)

# api.add_resource(Visits, '/api/visits')
# api.add_resource(VisitById, '/api/visits/<int:id>')


# if __name__ == '__main__':
#     app.run(port=8080, debug=True)

