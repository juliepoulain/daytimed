"""test

Revision ID: b9fc39fb9836
Revises: e7997b1b21a5
Create Date: 2024-06-12 13:16:31.796989

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b9fc39fb9836'
down_revision = 'e7997b1b21a5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('taskroutines',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tasktemplate_id', sa.Integer(), nullable=False),
    sa.Column('routinetemplate_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['routinetemplate_id'], ['routinetemplates.id'], name=op.f('fk_taskroutines_routinetemplate_id_routinetemplates')),
    sa.ForeignKeyConstraint(['tasktemplate_id'], ['tasktemplates.id'], name=op.f('fk_taskroutines_tasktemplate_id_tasktemplates')),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('taskroutine')
    with op.batch_alter_table('tasktemplates', schema=None) as batch_op:
        batch_op.alter_column('timer_length',
               existing_type=sa.VARCHAR(),
               type_=sa.Integer(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('tasktemplates', schema=None) as batch_op:
        batch_op.alter_column('timer_length',
               existing_type=sa.Integer(),
               type_=sa.VARCHAR(),
               existing_nullable=True)

    op.create_table('taskroutine',
    sa.Column('id', sa.INTEGER(), nullable=False),
    sa.Column('tasktemplate_id', sa.VARCHAR(), nullable=True),
    sa.Column('routinetemplate_id', sa.INTEGER(), nullable=False),
    sa.ForeignKeyConstraint(['routinetemplate_id'], ['routinetemplates.id'], name='fk_taskroutine_routinetemplate_id_routinetemplates'),
    sa.PrimaryKeyConstraint('id')
    )
    op.drop_table('taskroutines')
    # ### end Alembic commands ###
