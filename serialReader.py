import serial
import time
import csv
ser = serial.Serial('COM4')
ser.flushInput()

while True:
    try:
        humidity = ser.readline()
        temperature = ser.readline()
        moisture = ser.readline()

        humidity = humidity.decode('ASCII')
        temperature = temperature.decode('ASCII')
        moisture = moisture.decode('ASCII')

        humidity = str(humidity)
        humidity = humidity.strip()
        temperature = str(temperature)
        temperature = temperature.strip()
        moisture = str(moisture)
        moisture = moisture.strip()
        print(humidity)
        print(temperature)
        print(moisture)
        localtime = time.asctime(time.localtime(time.time()))
        with open("smartWormbin.csv", "a", newline='') as f:
            writer = csv.writer(f, delimiter=",")
            writer.writerow([localtime, humidity,temperature,moisture])
    except:
        print("Keyboard Interrupt")
        break