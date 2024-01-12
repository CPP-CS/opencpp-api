import {
  Association,
  BelongsToCreateAssociationMixin,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  HasOneCreateAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Sequelize,
} from 'sequelize';

export const init = (
  test: boolean,
  dbName: string,
  dbTestName: string,
  dbUsername: string,
  dbPassword: string,
  dbHost: string,
) => {
  console.log(test, 'Connecting to db ' + (test ? dbTestName : dbName));
  const sequelize = new Sequelize(
    test ? dbTestName : dbName,
    dbUsername,
    dbPassword,
    {
      host: dbHost,
      dialect: 'postgres',
      logging: false,
      pool: {
        max: 45,
      },
    },
  );
  Term.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      TermName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      StartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      EndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
    },
    { sequelize, modelName: 'Term' },
  );
  Professor.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      FirstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MiddleName: {
        type: DataTypes.STRING,
      },
      LastName: {
        type: DataTypes.STRING,
        allowNull: true,
        values: [],
      },
      Suffix: {
        type: DataTypes.STRING,
      },
      AvgGPA: DataTypes.FLOAT,
      GradePoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Professor',
      // validate: {
      //   validateGradePoints: validateGradePoints,
      // },
    },
  );
  Subject.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      Name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { sequelize, modelName: 'Subject' },
  );
  Course.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      CourseNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CourseType: {
        type: DataTypes.STRING,
      },
      CourseTitle: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CreditOnly: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      Units: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      AvgGPA: DataTypes.FLOAT,
      GradePoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Course',
      indexes: [
        {
          fields: ['SubjectId', 'CourseNumber'],
          unique: true,
        },
      ],
      // validate: {
      //   validateGradePoints: validateGradePoints,
      // },
    },
  );
  Instruction.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      AvgGPA: DataTypes.FLOAT,
      GradePoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Instruction',
      indexes: [
        {
          fields: ['ProfessorId', 'CourseId'],
          unique: true,
        },
      ],
      // validate: {
      //   validateGradePoints: validateGradePoints,
      // },
    },
  );
  Section.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      TotalCapacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      TotalEnrollment: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      InstructionMode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Course: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      SectionNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ClassNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AvgGPA: DataTypes.FLOAT,
      GradePoints: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'Section',
      indexes: [
        {
          fields: ['TermId', 'Course', 'SectionNumber'],
          unique: true,
        },
      ],
      // validate: {
      //   validateGradePoints: validateGradePoints,
      // },
    },
  );
  GradeData.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      A: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      Am: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      Bp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      B: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      Bm: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      Cp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      C: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      Cm: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      Dp: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      D: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      Dm: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      F: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
      },
      SectionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'GradeData',
    },
  );
  Location.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      Building: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Room: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Location',
      indexes: [
        {
          fields: ['Building', 'Room'],
          unique: true,
        },
      ],
    },
  );
  Event.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
      Sunday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      Monday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      Tuesday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      Wednesday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      Thursday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      Friday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      Saturday: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      StartTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
      EndTime: {
        type: DataTypes.TIME,
        allowNull: true,
      },
    },
    { sequelize, modelName: 'Event' },
  );

  Subject.hasMany(Course, {
    onDelete: 'RESTRICT',
    as: 'courses',
  });
  Course.belongsTo(Subject, {
    foreignKey: {
      allowNull: false,
      name: 'SubjectId',
    },
    as: 'subject',
  });

  Course.hasMany(Instruction, {
    onDelete: 'RESTRICT',
    as: 'instructions',
  });
  Instruction.belongsTo(Course, {
    foreignKey: {
      allowNull: false,
      name: 'CourseId',
    },
    as: 'course',
  });

  Term.hasMany(Section, {
    onDelete: 'RESTRICT',
    as: 'sections',
  });
  Section.belongsTo(Term, {
    foreignKey: {
      allowNull: false,
      name: 'TermId',
    },
    as: 'term',
  });

  Professor.hasMany(Instruction, {
    onDelete: 'RESTRICT',
    as: 'instructions',
  });
  Instruction.belongsTo(Professor, {
    foreignKey: {
      name: 'ProfessorId',
      // We cannot allow professorid to be null, it needs to be "Staff" for the unique index
      // since Postgresql doesn't treat multiple NULLS as conflicting with unique
      // allowNull: true,
    },
    as: 'professor',
  });

  Instruction.hasMany(Section, {
    onDelete: 'RESTRICT',
    as: 'sections',
  });
  Section.belongsTo(Instruction, {
    foreignKey: {
      name: 'InstructionId',
      allowNull: false,
    },
    as: 'instruction',
  });

  Section.hasOne(GradeData, {
    foreignKey: {
      allowNull: false,
      name: 'SectionId',
    },
    onDelete: 'CASCADE',
    as: 'gradeData',
  });
  GradeData.belongsTo(Section, {
    foreignKey: {
      allowNull: false,
      name: 'SectionId',
    },
    as: 'section',
  });

  Section.hasOne(Event, {
    foreignKey: {
      allowNull: false,
      name: 'SectionId',
    },
    onDelete: 'CASCADE',
    as: 'event',
  });
  Event.belongsTo(Section, {
    foreignKey: {
      allowNull: true,
      name: 'SectionId',
    },
    as: 'section',
  });

  Location.hasMany(Event, {
    onDelete: 'RESTRICT',
    as: 'events',
  });
  Event.belongsTo(Location, {
    foreignKey: {
      allowNull: false,
      name: 'LocationId',
    },
    as: 'location',
  });
};

export class Term extends Model<
  InferAttributes<Term, { omit: 'sections' }>,
  InferCreationAttributes<Term>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare TermName: string;
  declare StartDate: Date;
  declare EndDate: Date;

  declare sections?: NonAttribute<Section[]>;
  declare getSections: HasManyGetAssociationsMixin<Section>;
  declare addSection: HasManyAddAssociationMixin<Section, number>;
  declare addSections: HasManyAddAssociationsMixin<Section, number>;
  declare setSections: HasManySetAssociationsMixin<Section, number>;
  declare removeSection: HasManyRemoveAssociationMixin<Section, number>;
  declare removeSections: HasManyRemoveAssociationsMixin<Section, number>;
  declare hasSection: HasManyHasAssociationMixin<Section, number>;
  declare hasSections: HasManyHasAssociationsMixin<Section, number>;
  declare countSections: HasManyCountAssociationsMixin;
  declare createSection: HasManyCreateAssociationMixin<Section, 'TermId'>;

  declare static associations: {
    sections: Association<Term, Section>;
  };
}

export class Professor extends Model<
  InferAttributes<Professor, { omit: 'instructions' }>,
  InferCreationAttributes<Professor, { omit: 'AvgGPA' | 'GradePoints' }>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare FirstName: string;
  declare MiddleName: CreationOptional<string | null>;
  declare LastName: CreationOptional<string | null>;
  declare Suffix: CreationOptional<string | null>;
  declare AvgGPA: number | null;
  declare GradePoints: number;

  declare instructions?: NonAttribute<Instruction[]>;
  declare getInstructions: HasManyGetAssociationsMixin<Instruction>;
  declare addInstruction: HasManyAddAssociationMixin<Instruction, number>;
  declare addInstructions: HasManyAddAssociationsMixin<Instruction, number>;
  declare setInstructions: HasManySetAssociationsMixin<Instruction, number>;
  declare removeInstruction: HasManyRemoveAssociationMixin<Instruction, number>;
  declare removeInstructions: HasManyRemoveAssociationsMixin<
    Instruction,
    number
  >;
  declare hasInstruction: HasManyHasAssociationMixin<Instruction, number>;
  declare hasInstructions: HasManyHasAssociationsMixin<Instruction, number>;
  declare countInstructions: HasManyCountAssociationsMixin;
  declare createInstruction: HasManyCreateAssociationMixin<
    Instruction,
    'ProfessorId'
  >;

  declare static associations: {
    instructions: Association<Term, Instruction>;
  };
}

export class Subject extends Model<
  InferAttributes<Subject, { omit: 'courses' }>,
  InferCreationAttributes<Subject>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare Name: string;

  declare courses?: NonAttribute<Course[]>;
  declare getCourses: HasManyGetAssociationsMixin<Course>;
  declare addCourse: HasManyAddAssociationMixin<Course, number>;
  declare addCourses: HasManyAddAssociationsMixin<Course, number>;
  declare setCourses: HasManySetAssociationsMixin<Course, number>;
  declare removeCourse: HasManyRemoveAssociationMixin<Course, number>;
  declare removeCourses: HasManyRemoveAssociationsMixin<Course, number>;
  declare hasCourse: HasManyHasAssociationMixin<Course, number>;
  declare hasCourses: HasManyHasAssociationsMixin<Course, number>;
  declare countCourses: HasManyCountAssociationsMixin;
  declare createCourse: HasManyCreateAssociationMixin<Course, 'SubjectId'>;

  declare static associations: {
    courses: Association<Term, Course>;
  };
}

export class Course extends Model<
  InferAttributes<Course, { omit: 'subject' | 'instructions' }>,
  InferCreationAttributes<Course, { omit: 'AvgGPA' | 'GradePoints' }>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare CourseNumber: string;
  declare CourseType: CreationOptional<string>;
  declare CourseTitle: CreationOptional<string | null>;
  declare CreditOnly: CreationOptional<boolean>;
  declare Units?: CreationOptional<number>;
  declare AvgGPA: number | null;
  declare GradePoints: number;

  declare SubjectId: ForeignKey<Subject['id']>;
  declare subject?: NonAttribute<Subject>;
  declare getSubject: BelongsToGetAssociationMixin<Subject>;
  declare setSubject: BelongsToSetAssociationMixin<Subject, Subject['id']>;
  declare createSubject: BelongsToCreateAssociationMixin<Subject>;

  declare instructions?: NonAttribute<Instruction[]>;
  declare getInstructions: HasManyGetAssociationsMixin<Instruction>;
  declare addInstruction: HasManyAddAssociationMixin<Instruction, number>;
  declare addInstructions: HasManyAddAssociationsMixin<Instruction, number>;
  declare setInstructions: HasManySetAssociationsMixin<Instruction, number>;
  declare removeInstruction: HasManyRemoveAssociationMixin<Instruction, number>;
  declare removeInstructions: HasManyRemoveAssociationsMixin<
    Instruction,
    number
  >;
  declare hasInstruction: HasManyHasAssociationMixin<Instruction, number>;
  declare hasInstructions: HasManyHasAssociationsMixin<Instruction, number>;
  declare countInstructions: HasManyCountAssociationsMixin;
  declare createInstruction: HasManyCreateAssociationMixin<
    Instruction,
    'CourseId'
  >;

  declare static associations: {
    Instructions: Association<Term, Instruction>;
  };
}

export class Instruction extends Model<
  InferAttributes<Instruction, { omit: 'sections' | 'course' | 'professor' }>,
  InferCreationAttributes<Instruction, { omit: 'AvgGPA' | 'GradePoints' }>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare AvgGPA: number | null;
  declare GradePoints: number;

  // This is necessary to access previous grade values in hooks.
  declare _previousDataValues: NonAttribute<Instruction>;

  declare sections?: NonAttribute<Section[]>;
  declare getSections: HasManyGetAssociationsMixin<Section>;
  declare addSection: HasManyAddAssociationMixin<Section, number>;
  declare addSections: HasManyAddAssociationsMixin<Section, number>;
  declare setSections: HasManySetAssociationsMixin<Section, number>;
  declare removeSection: HasManyRemoveAssociationMixin<Section, number>;
  declare removeSections: HasManyRemoveAssociationsMixin<Section, number>;
  declare hasSection: HasManyHasAssociationMixin<Section, number>;
  declare hasSections: HasManyHasAssociationsMixin<Section, number>;
  declare countSections: HasManyCountAssociationsMixin;
  declare createSection: HasManyCreateAssociationMixin<
    Section,
    'InstructionId'
  >;

  declare CourseId: ForeignKey<Course['id']>;
  declare course?: NonAttribute<Course>;
  declare getCourse: BelongsToGetAssociationMixin<Course>;
  declare setCourse: BelongsToSetAssociationMixin<Course, Course['id']>;
  declare createCourse: BelongsToCreateAssociationMixin<Course>;

  declare ProfessorId: ForeignKey<Professor['id']>;
  declare professor?: NonAttribute<Professor>;
  declare getProfessor: BelongsToGetAssociationMixin<Professor>;
  declare setProfessor: BelongsToSetAssociationMixin<
    Professor,
    Professor['id']
  >;
  declare createProfessor: BelongsToCreateAssociationMixin<Professor>;
}

export class Section extends Model<
  InferAttributes<
    Section,
    { omit: 'term' | 'instruction' | 'event' | 'gradeData' }
  >,
  InferCreationAttributes<Section, { omit: 'AvgGPA' | 'GradePoints' }>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare TotalCapacity: number;
  declare TotalEnrollment: number | undefined;
  declare InstructionMode: string;
  declare SectionNumber: string;
  declare ClassNumber: number;
  declare AvgGPA: number | null;
  declare GradePoints: number;

  // This is necessary for the unique constraint. The proper way to do this
  // is make the foreign key for Instructions a composite of Course & Professor
  // id, but sequelize doesn't support this for now. This is a temp fix by storing
  // the subject+course string on the section table as well.
  declare Course: string;

  // This is necessary to access previous grade values in hooks.
  declare _previousDataValues: NonAttribute<Section>;

  declare TermId: ForeignKey<Term['id']>;
  declare term?: NonAttribute<Term>;
  declare getTerm: BelongsToGetAssociationMixin<Term>;
  declare setTerm: BelongsToSetAssociationMixin<Term, Term['id']>;
  declare createTerm: BelongsToCreateAssociationMixin<Term>;

  declare InstructionId: ForeignKey<Instruction['id']>;
  declare instruction?: NonAttribute<Instruction>;
  declare getInstruction: BelongsToGetAssociationMixin<Instruction>;
  declare setInstruction: BelongsToSetAssociationMixin<
    Instruction,
    Instruction['id']
  >;
  declare createInstruction: BelongsToCreateAssociationMixin<Instruction>;

  declare EventId?: ForeignKey<Event['id']>;
  declare event?: NonAttribute<Event>;
  declare getEvent: BelongsToGetAssociationMixin<Event>;
  declare setEvent: BelongsToSetAssociationMixin<Event, Event['id']>;
  declare createEvent: BelongsToCreateAssociationMixin<Event>;

  declare gradeData?: NonAttribute<GradeData>;
  declare getGradeData: HasOneGetAssociationMixin<GradeData>;
  declare setGradeData: HasOneSetAssociationMixin<GradeData, number>;
  declare createGradeData: HasOneCreateAssociationMixin<GradeData>;

  declare static associations: {
    gradeData: Association<Section, GradeData>;
  };
}

export class GradeData extends Model<
  InferAttributes<GradeData, { omit: 'section' }>,
  InferCreationAttributes<GradeData>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare A: CreationOptional<number>;
  declare Am: CreationOptional<number>;
  declare Bp: CreationOptional<number>;
  declare B: CreationOptional<number>;
  declare Bm: CreationOptional<number>;
  declare Cp: CreationOptional<number>;
  declare C: CreationOptional<number>;
  declare Cm: CreationOptional<number>;
  declare Dp: CreationOptional<number>;
  declare D: CreationOptional<number>;
  declare Dm: CreationOptional<number>;
  declare F: CreationOptional<number>;

  // This is necessary to access previous grade values in hooks.
  declare _previousDataValues: NonAttribute<GradeData>;

  declare SectionId: ForeignKey<Section['id']>;
  declare section?: NonAttribute<Section>;
  declare getSection: BelongsToGetAssociationMixin<Section>;
  declare setSection: BelongsToSetAssociationMixin<Section, Section['id']>;
  declare createSection: BelongsToCreateAssociationMixin<Section>;
}

export class Location extends Model<
  InferAttributes<Location, { omit: 'events' }>,
  InferCreationAttributes<Location>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare Building: string;
  declare Room: string;

  declare events?: NonAttribute<Event[]>;
  declare getEvents: HasManyGetAssociationsMixin<Event>;
  declare addEvent: HasManyAddAssociationMixin<Event, number>;
  declare addEvents: HasManyAddAssociationsMixin<Event, number>;
  declare setEvents: HasManySetAssociationsMixin<Event, number>;
  declare removeEvent: HasManyRemoveAssociationMixin<Event, number>;
  declare removeEvents: HasManyRemoveAssociationsMixin<Event, number>;
  declare hasEvent: HasManyHasAssociationMixin<Event, number>;
  declare hasEvents: HasManyHasAssociationsMixin<Event, number>;
  declare countEvents: HasManyCountAssociationsMixin;
  declare createEvent: HasManyCreateAssociationMixin<Event, 'LocationId'>;

  declare static associations: {
    events: Association<Location, Event>;
  };
}

export class Event extends Model<
  InferAttributes<Event, { omit: 'location' | 'section' }>,
  InferCreationAttributes<Event>
> {
  declare id: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare Sunday: boolean;
  declare Monday: boolean;
  declare Tuesday: boolean;
  declare Wednesday: boolean;
  declare Thursday: boolean;
  declare Friday: boolean;
  declare Saturday: boolean;
  declare StartTime: string;
  declare EndTime: string;

  declare LocationId: ForeignKey<Location['id']>;
  declare location?: NonAttribute<Location>;
  declare getLocation: BelongsToGetAssociationMixin<Location>;
  declare setLocation: BelongsToSetAssociationMixin<Location, Location['id']>;
  declare createLocation: BelongsToCreateAssociationMixin<Location>;

  declare SectionId: ForeignKey<Section['id']>;
  declare section?: NonAttribute<Section>;
  declare getSection: BelongsToGetAssociationMixin<Section>;
  declare setSection: BelongsToSetAssociationMixin<Section, Section['id']>;
  declare createSection: BelongsToCreateAssociationMixin<Section>;
}
