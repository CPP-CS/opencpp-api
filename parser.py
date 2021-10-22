from html.parser import HTMLParser
from bs4 import BeautifulSoup
import csv
from datetime import datetime

filename = 'publicScheduleData.html'

file = BeautifulSoup(open(filename, 'r').read(), 'html.parser')


classList = file.find(id="class_list")
courses = classList.find_all('li')
print("Parsing " + str(len(courses)) + " courses")

courseDataList = []

courseDataList.append(["Subject","Course Number","Section","Class Number","Class Capacity","Class Title","Units","Start Time","End Time","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Building","Room","Start Date","End Date","Academic Session","Instructor","Component","Instruction Mode"])

def calcTime(time:str) -> str:
  time:datetime = datetime.strptime(time, '%I:%M %p')
  return time.time()


for courseData in courses:
  text:str = courseData.text
  subject = text[:text.find(' ')]
  courseNumber = text[text.find(' '):text.find('Section')].strip()
  section = text[text.find('Section')+7:text.find("Class")].strip();
  data = courseData.find_all('td')

  #class number parser
  classNumber = data[0].text

  capacity = data[1].text
  title = data[2].text
  units = data[3].text

  #time parse
  time = str(data[4].text)
  try: 
    startTime = calcTime(time.split('\xa0\xa0\xa0')[0].split('â€“')[0])
    endTime = calcTime(time.split('\xa0\xa0\xa0')[0].split('â€“')[1])
    days = time.split('\xa0\xa0\xa0')[1].lower()
    m = True if days.__contains__('m') else  False
    tu = True if days.__contains__('tu') else  False
    w = True if days.__contains__('w') else  False
    th = True if days.__contains__('th') else  False
    f = True if days.__contains__('f') else  False
    sa = True if days.__contains__('sa') else  False
    su = True if days.__contains__('su') else  False
  except:
    time == 'TBA'
    startTime = 'TBA'
    endTime = 'TBA'
    m = False
    tu = False
    w = False
    th = False
    f = False
    sa = False
    su = False


  #location parse
  if data[5].text == 'TBA' or data[5].text == '':
    building = 'TBA'
    room = 'TBA'
  else:
    location = str(data[5].text).split(' ')
    building = location[1]
    room = location[3]
  

  startDate = data[6].text.split('\xa0to\xa0')[0]
  endDate = data[6].text.split('\xa0to\xa0')[1]

  session = data[7].text

  try:
    instructor = data[8].text.replace('\n','').replace('                                                                                                                                        ','&').strip()
  except:
    instructor = data[8].text

  #component/mode parse
  component = data[9].text.split(', ')[0]
  mode = data[9].text.split(', ')[1]

  print(subject, courseNumber, section, classNumber, capacity, title, units, startTime, endTime, m, tu, w, th, f, sa, su, building, room, startDate, endDate, session, instructor, component, mode)
  courseDataList.append([subject, courseNumber, section, classNumber, capacity, title, units, startTime, endTime, m, tu, w, th, f, sa, su, building, room, startDate, endDate, session, instructor, component, mode])

with open ('courses.csv', 'w', newline = "") as csvfile:
  spreadsheet = csv.writer(csvfile)
  for courseData in courseDataList:
    spreadsheet.writerow(courseData)








