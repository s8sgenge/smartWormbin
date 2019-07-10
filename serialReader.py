"""
    IoT SmartWormbin
    HBKsaar OMTWGR
    Listen to serial port COM4 and write data to csv file

    @author Simon Engel
    @version 0
"""

import serial, datetime, csv        #import necessary modules
ser = serial.Serial('/dev/ttyACM0')     #arduino is connected to COM4 (may vary)
ser.flushInput()

while True:
    try:
        humidity = ser.readline()   #read humidity, temperature and moisture
        temperature = ser.readline()
        moisture = ser.readline()

        #decode value using ASCII, cast to string, remove whitespace using strip function
        humidity = str(humidity.decode('ASCII')).strip()
        temperature = str(temperature.decode('ASCII')).strip()
        moisture =str(moisture.decode('ASCII')).strip()

        print(humidity)     #printing values for terminal use
        print(temperature)
        print(moisture)

        timestamp = datetime.datetime.today().strftime('%b/%d/%Y %H:%M') #create timestamp

        with open("smartWormbin.csv", "a", newline='') as f:    #create smartWormbin.csv and write data to it
            writer = csv.writer(f, delimiter=",")
            writer.writerow([timestamp, humidity,temperature,moisture])
    except:
        print("Keyboard Interrupt")
        break
