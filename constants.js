const gpa = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0,
};

const subjectMap = {
  "Don B. Huntley College of Agriculture": {
    "Agribusiness & Food Industry Management/Agricultural Science": {
      ABM: "Agribusiness and Food Industry Management",
      AG: "Agriculture",
      AGS: "Agricultural Science",
    },
    "Animal and Veterinary Science": {
      AHS: "Animal Health Science",
      AVS: "Animal and Veterinary Science",
    },
    "Apparel Merchandising & Management": {
      AMM: "Apparel Merchandising and Management",
      IAM: "International Apparel Management",
    },
    "Nutrition & Food Science": {
      FST: "Food Science and Technology",
      NTR: "Nutrition",
    },
    "Plant Science": {
      PLT: "Plant Science",
    },
  },
  "College of Business Administration": {
    "Accounting Department": {
      ACC: "Accounting",
    },
    "Computer Information Systems Department": {
      CIS: "Computer Information Systems",
    },
    "Finance, Real Estate, & Law Department": {
      FRL: "Finance, Real Estate, and Law",
    },
    "International Business & Marketing Department": {
      IBM: "International Business and Marketing",
    },
    "Management & Human Resources Department": {
      MHR: "Management and Human Resources",
    },
    "Technology & Operations Management Department": {
      EBZ: "E-Business",
      TOM: "Technology and Operations Management",
    },
    "All College - CBA": {
      BUS: "Business",
    },
    "All College-Grad-MBA": {
      GBA: "Graduate Business Administration",
    },
  },
  "College of Education and Integrative Studies": {
    "Ethnic and Women's Studies (EWS) Department": {
      EWS: "Ethnic and Women's Studies",
    },
    "Early Childhood Studies (ECS) Department": {
      ECS: "Early Childhood Studies",
    },
    "Education (EDU) Department": {
      ECI: "Education Curriculum and Instruction",
      EDU: "Education",
      EMM: "Education Multimedia Design",
      ERA: "Educational Research and Assessment",
    },
    "Interdisciplinary General Eduation (IGE) Department": {
      IGE: "Interdisciplinary General Education",
    },
    "Liberal Studies (LS) Department": {
      LS: "Liberal Studies",
    },
    "Educational Leadership Department": {
      EDD: "Education Leadership Doctorate",
      EDL: "Educational Leadership",
    },
  },
  "College of Engineering": {
    "Aerospace Engineering Department": {
      ARO: "Aerospace Engineering",
    },
    "Chemicals & Materials Engineering Department": {
      CHE: "Chemical Engineering",
      CHM: "Chemistry",
      MTE: "Materials Engineering",
    },
    "Civil Engineering Department": {
      CE: "Civil Engineering",
    },
    "Electrical & Computer Engineering Department": {
      ECE: "Electrical and Computer Engineering",
    },
    "Electromechanical Engineering Technology Department": {
      ETE: "Electronic Systems Engineering Technology",
      ETM: "Electromechanical Systems Engineering Technology",
    },
    "Industrial & Manufacturing Engineering Department": {
      EMT: "Engineering Management",
      IE: "Industrial Engineering",
      IME: "Industrial and Manufacturing Engineering",
      MFE: "Manufacturing Engineering",
      SE: "Systems Engineering",
    },
    "Mechanical Engineering Department": {
      ME: "Mechanical Engineering",
    },
    "All College - Engineering": {
      EGR: "Engineering",
    },
  },
  "College of Environmental Design": {
    "Architecture Department": {
      ARC: "Architecture",
      INA: "Interior Architecture",
    },
    "Art Department": {
      AH: "Art History",
      VCD: "Visual Communication Design",
    },
    "John T. Lyle Center for Regenerative Studies": {
      RS: "Regenerative Studies",
    },
    "Landscape Architecture Department": {
      LA: "Landscape Architecture",
    },
    "Urban & Regional Planning Department": {
      URP: "Urban and Regional Planning",
    },
    "All College - Env Design": {
      ENV: "Environmental Design",
    },
  },
  "Collins College of Hospitality Management": {
    "Collins College of Hospitality Management": {
      HRT: "Hospitality Management",
    },
  },
  "College of Letters, Arts, and Social Sciences": {
    "Communication Department": {
      COM: "Communication",
    },
    "Economics Department": {
      EC: "Economics",
    },
    "English & Modern Languages Department": {
      CHN: "Chinese",
      ENG: "English",
      FRE: "French",
      GER: "German",
      SPN: "Spanish",
    },
    "Geography & Anthropology Department": {
      ANT: "Anthropology",
      GEO: "Geography",
      GSC: "Geological Sciences",
    },
    "History Department": {
      HST: "History",
    },
    "Music Department": {
      MU: "Music",
    },
    "Philosophy Department": {
      PHL: "Philosophy",
      STS: "Science, Technology, and Society",
    },
    "Political Science Department": {
      MPA: "Master of Public Administration",
      PLS: "Political Science",
    },
    "Psychology Department": {
      PSY: "Psychology",
    },
    "Sociology Department": {
      CRM: "Criminology",
      SOC: "Sociology",
      SW: "Social Work",
    },
    "Theatre & New Dance Department": {
      DAN: "Dance",
      TH: "Theatre",
    },
    "All College -Ltrs,Arts,Soc Sci": {
      CLS: "CLASS",
    },
  },
  "College of Science": {
    "Biological Sciences Department": {
      BIO: "Biology",
    },
    "Chemistry and Biochemistry": {},
    "Computer Science Department": {
      CS: "Computer Science",
    },
    "Geological Sciences Department": {},
    "Kinesiology & Health Promotion Department": {
      KIN: "Kinesiology and Health Promotion",
    },
    "Mathematics & Statistics Department": {
      MAE: "Mathematic Education",
      MAT: "Mathematics",
      STA: "Statistics",
      SME: "Center for Science and Mathematics Education",
    },
    "Department of Physics & Astronomy": {
      AST: "Astronomy",
      PHY: "Physics",
    },
    "All College - Science": {
      SCI: "Science",
    },
  },
  "College of the Extended University": {
    "College of the Extended University": {},
  },
  Other: {
    "Cal Poly": {
      CPU: "Cal Poly University",
    },
    Library: {
      LIB: "Library",
    },
    "Learning Resource Center": {
      LRC: "Learning Resource Center",
    },
    ROTC: {
      MSL: "Military Science and Leadership",
    },
  },
};

exports.gpa = gpa;
exports.subjectMap = subjectMap;
