from flask import *
import pymysql
import pymysql.cursors
import os

# remember to install cors
from flask_cors import CORS

# initiate an application
app = Flask(__name__)

# cors = cross origin resource sharing
CORS(app)

# configure onto which folder the image get saved
app.config['UPLOAD_FOLDER'] = 'static/images'


# create the signup route
# mapped
@app.route("/api/signup", methods=["POST"])
def signup():
    if request.method == "POST":
        # Extract the inserted details from the form
        username = request.form["username"]
        email = request.form["email"]
        phone = request.form["phone"]
        password = request.form["password"]

        # establish a connection to the database
        connection = pymysql.connect(host="localhost", user="root", password="", database="pizzahut")

        # create cursor that will enable use execute sql queries/commands on python
        cursor = connection.cursor()

        # structure the sql insert query
        # %s is a placeholder ~ something used inplace of another thing. It will be replaced with actual/real data gotten from the form
        sql = "INSERT INTO users(username,password,email,phone) VALUES(%s, %s, %s, %s)"

        # put the information extracted from the form into a variable
        data = (username, password, email, phone)

        # use the cursor to execute the sql as you replace the placeholders with the actual data
        cursor.execute(sql, data)

        # commit the changes to the database.
        connection.commit()

        return jsonify({"Message": "Signup successful"})
    


@app.route("/api/signin", methods=["POST"])
def signin():
    if request.method == "POST":
        # get the details entered on the form from insomnia
        email = request.form["email"]
        password = request.form["password"]

        # establish a database connection
        connection = pymysql.connect(host="localhost", user="root", password="", database="pizzahut")

        # create a cursor
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        # structure a query to verify whether the email and the password entered is correct.
        sql = "SELECT * FROM users WHERE email=%s AND password=%s"

        # create a variable that will hold the two data/information gotten from the form
        data = (email, password)

        # use the cursor to execute the sql as you replace the placeholders with the actual data.
        cursor.execute(sql, data)

        # check how many rows are found when you run the query
        # if there is no row found, it mean either the password or email or both are incorrect
        # if there is a row found, it means both of the password and the email are correct.

        if cursor.rowcount == 0:
            return jsonify({"Message" : "Login Failed"})
        else:
            # when the details are correct
            user = cursor.fetchone()

            # show the details of the user
            return jsonify({"Message": "Login Successful", "user": user})





# Mpesa Payment Route
import requests
import datetime
import base64
from requests.auth import HTTPBasicAuth

@app.route('/api/mpesa_payment', methods=['POST'])
def mpesa_payment():
    if request.method == 'POST':
        # Extract POST Values sent
        amount = request.form['amount']
        phone = request.form['phone']

        # Provide consumer_key and consumer_secret provided by safaricom
        # pass keys
        consumer_key = "GTWADFxIpUfDoNikNGqq1C3023evM6UH"
        consumer_secret = "amFbAoUByPV2rM5A"

        # Authenticate Yourself using above credentials to Safaricom Services, and Bearer Token this is used by safaricom for security identification purposes - Your are given Access
        api_URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"  # AUTH URL
        # Provide your consumer_key and consumer_secret
        response = requests.get(api_URL, auth=HTTPBasicAuth(consumer_key, consumer_secret))
        # Get response as Dictionary
        data = response.json()
        # Retrieve the Provide Token
        # Token allows you to proceed with the transaction
        access_token = "Bearer" + ' ' + data['access_token']

        #  GETTING THE PASSWORD
        timestamp = datetime.datetime.today().strftime('%Y%m%d%H%M%S')  # Current Time
        passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'  # Passkey(Safaricom Provided)
        business_short_code = "174379"  # Test Paybile (Safaricom Provided)
        # Combine above 3 Strings to get data variable
        data = business_short_code + passkey + timestamp
        # Encode to Base64
        encoded = base64.b64encode(data.encode())
        password = encoded.decode()

        # BODY OR PAYLOAD
        payload = {
            "BusinessShortCode": "174379",
            "Password":password,
            "Timestamp": timestamp,
            "TransactionType": "CustomerPayBillOnline",
            "Amount": amount,  # use 1 when testing
            "PartyA": phone,  # change to your number
            "PartyB": "174379",
            "PhoneNumber": phone,
            "CallBackURL": "https://coding.co.ke/api/confirm.php",
            "AccountReference": "pizzahut Online",
            "TransactionDesc": "Payments for Products"
        }

        # POPULAING THE HTTP HEADER, PROVIDE THE TOKEN ISSUED EARLIER
        headers = {
            "Authorization": access_token,
            "Content-Type": "application/json"
        }

        # Specify STK Push  Trigger URL
        url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
        # Create a POST Request to above url, providing headers, payload
        # Below triggers an STK Push to the phone number indicated in the payload and the amount.
        response = requests.post(url, json=payload, headers=headers)
        print(response.text) #
        # Give a Response
        return jsonify({"message": "An MPESA Prompt has been sent to Your Phone, Please Check & Complete Payment"})
    

@app.route("/api/addpizza", methods=["POST"])
def addpizza():
    if request.method == "POST":
        # Extract form fields from the frontend
        pizza_name = request.form["pizza_name"]
        pizza_description = request.form["pizza_description"]
        pizza_cost = request.form["pizza_cost"]
        category = request.form["category"]  # NEW FIELD from frontend

        # Handle the uploaded photo
        photo = request.files["pizza_photo"]
        filename = photo.filename
        photo_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        photo.save(photo_path)

        # Connect to the database
        connection = pymysql.connect(host="localhost", user="root", password="", database="pizzahut")
        cursor = connection.cursor()

        # SQL query to insert data into the 'pizza' table (including 'category' column)
        sql = """
            INSERT INTO pizza (pizza_name, pizza_description, pizza_cost, pizza_photo, category)
            VALUES (%s, %s, %s, %s, %s)
        """
        data = (pizza_name, pizza_description, pizza_cost, filename, category)
        
        try:
            # Execute the query
            cursor.execute(sql, data)
            connection.commit()

            # Return success message as JSON
            return jsonify({"Message": "Pizza details added successfully"})
        except Exception as e:
            # In case of error, rollback and return error message
            connection.rollback()
            return jsonify({"error": str(e)}), 500
        finally:
            # Close the database connection
            cursor.close()
            connection.close()


@app.route("/api/getpizza", methods=["GET"])
def getpizza():
    # Get search and category from query parameters
    search = request.args.get("search", "").lower()  # Optional search query (case insensitive)
    category = request.args.get("category", "All")  # Default category is 'All'

    # Connect to the database
    connection = pymysql.connect(host="localhost", user="root", password="", database="pizzahut")
    cursor = connection.cursor(pymysql.cursors.DictCursor)

    # Base SQL query
    sql = "SELECT * FROM pizza"
    params = []

    # Filter by category if specified
    if category != "All":
        sql += " WHERE category = %s"
        params.append(category)

    # Filter by search term if specified
    if search:
        if category != "All":
            sql += " AND (pizza_name LIKE %s OR pizza_description LIKE %s)"
            params.extend(['%' + search + '%', '%' + search + '%'])
        else:
            sql += " WHERE (pizza_name LIKE %s OR pizza_description LIKE %s)"
            params.extend(['%' + search + '%', '%' + search + '%'])

    try:
        # Execute SQL query
        cursor.execute(sql, tuple(params))

        # Fetch the result of the query
        pizza_details = cursor.fetchall()

        # Return the results as JSON
        return jsonify(pizza_details)

    except Exception as e:
        # In case of an error, return error message
        return jsonify({"error": str(e)}), 500

    finally:
        # Close the database connection
        cursor.close()
        connection.close()
