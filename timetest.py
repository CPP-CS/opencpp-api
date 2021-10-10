from datetime import datetime

timeString = '1:00 PM'
time = datetime.strptime(timeString, '%I:%M %p')

print(time.time())