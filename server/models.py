from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    # # add relationships
    # visits = db.relationship("Visit", back_populates="owner")
    # pets = db.relationship("Pet", back_populates="owner")
    # sitters = association_proxy("visits", "sitter")

    # @hybrid_property
    # def unique_sitters(self):
    #     sitter_list = [visit.sitter for visit in self.visits]
    #     unique_sitter_list = list(set(sitter_list))
    #     return unique_sitter_list
    # # add serialization rules
    # serialize_rules = ('-visits.owner', '-pets.owner', 'sitters')

    # # add validation
    # @validates("phone")
    # def validate_phone(self, _, phone):
    #     if not isinstance(phone, int) or (len(str(phone)) != 10):
    #         raise ValueError("Phone must be an integer with 10 characters, no spaces")
    #     return phone

    def __repr__(self):
        return f"<User: {self.name}>"
    
class TaskTemplate(db.Model, SerializerMixin):
    __tablename__ = 'tasktemplates'
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String)
    task_note = db.Column(db.String)
    timer_length = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    # user = db.relationship('User', back_populates='tasktemplates')
    # routinetemplates = db.relationship('Routine Template', back_populates='tasktemplates')

    def __repr__(self):
        return f'<Task {self.id}: {self.name}>'

    # serialize_rules = ('-owner.pets', '-visits.pet', '-owner.visits')
           
    
class RoutineTemplate(db.Model, SerializerMixin):
    __tablename__ = "routinetemplates"

    id = db.Column(db.Integer, primary_key=True)
    routine_name = db.Column(db.String, nullable=False)
    total_timer_length = db.Column(db.Integer)
    # start_time = db.Column(db.Integer)
    # end_time = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # task_templates = db.relationship('Task Template', back_populates='routinetemplates')

    # serialize_rules = ('-visits.sitter', '-owners.sitters', '-visits.owner', '-visits.pet')

    # @validates("phone")
    # def validate_phone(self, _, phone):
    #     if not isinstance(phone, int) or (len(str(phone)) != 10):
    #         raise ValueError("Phone must be an integer with 10 characters, no spaces")
    #     return phone
    
    # @validates("experience")
    # def validate_experience(self, _, experience):
    #     if not isinstance(experience, int) or (experience > 10):
    #         raise ValueError("Experience must be an integer between 1 and 10")
    #     return experience

def repr(self):
        return f"<Routine {self.id}: {self.name}>"

class TaskRoutine(db.Model, SerializerMixin):
    __tablename__ = "taskroutines"

    id = db.Column(db.Integer, primary_key=True)
    tasktemplate_id = db.Column(db.Integer, db.ForeignKey("tasktemplates.id"), nullable=False)
    routinetemplate_id = db.Column(db.Integer, db.ForeignKey("routinetemplates.id"), nullable=False)

    # add relationships
    # tasktemplate = db.relationship("Tasktemplate", back_populates="taskroutines")
    # routinetemplate = db.relationship("Routinetemplate", back_populates="taskroutines")

    # add serialization rules
    # serialize_rules = ('-owner.visits', '-sitter.visits', '-pet.visits', '-owner.pets', '-sitter.owners')

    def __repr__(self):
        return f"<Task & Routine: {self.id}>"