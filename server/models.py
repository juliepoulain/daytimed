from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin
from config import db

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)
    phone = db.Column(db.BigInteger)

    # # add relationships
    tasktemplates = db.relationship("TaskTemplate", back_populates="users")
    routinetemplates = db.relationship("RoutineTemplate", back_populates="users")

    # add serialization rules
    serialize_rules = ("-tasktemplates",)

    def __repr__(self):
        return f"<User: {self.name}>"
    
class TaskTemplate(db.Model, SerializerMixin):
    __tablename__ = 'tasktemplates'
    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String)
    task_note = db.Column(db.String)
    timer_length = db.Column(db.Integer)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    
    users = db.relationship("User", back_populates="tasktemplates")
    taskroutines = db.relationship("TaskRoutine", back_populates="tasktemplates")
    routines = association_proxy("taskroutines", "tasktemplate") 

    serialize_rules = ("-taskroutines","-users")

    def __repr__(self):
        return f'<Task {self.id}: {self.name}>'           
    
class RoutineTemplate(db.Model, SerializerMixin):
    __tablename__ = "routinetemplates"

    id = db.Column(db.Integer, primary_key=True)
    routine_name = db.Column(db.String, nullable=False)
    total_timer_length = db.Column(db.Integer)
    # start_time = db.Column(db.Integer)
    # end_time = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # add relationships
    users = db.relationship("User", back_populates="routinetemplates")
    taskroutines = db.relationship("TaskRoutine", back_populates="routinetemplates")
    tasks = association_proxy("taskroutines", "routinetemplate") 

    serialize_rules = ("-taskroutines","-users")

def repr(self):
        return f"<Routine {self.id}: {self.name}>"

class TaskRoutine(db.Model, SerializerMixin):
    __tablename__ = "taskroutines"

    id = db.Column(db.Integer, primary_key=True)
    tasktemplate_id = db.Column(db.Integer, db.ForeignKey("tasktemplates.id"), nullable=False)
    routinetemplate_id = db.Column(db.Integer, db.ForeignKey("routinetemplates.id"), nullable=False)

    # add relationships
    tasktemplates = db.relationship("TaskTemplate", back_populates="taskroutines")
    routinetemplates = db.relationship("RoutineTemplate", back_populates="taskroutines")

    # add serialization rules
    # serialize_rules = ("-users",)

    def __repr__(self):
        return f"<Task & Routine: {self.id}>"