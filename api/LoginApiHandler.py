from flask import flash
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.User import User
from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required


class LoginApiHandler(Resource):
    login_args = reqparse.RequestParser()
    login_args.add_argument("email", type=str, help="Email is required", required=True)
    login_args.add_argument("password", type=str, help="Password is required", required=True)

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Login Api Handler"
        }

    def post(self):

        args = LoginApiHandler.login_args.parse_args()
        email = args.get("email")
        password = args.get("password")

        # test
        if email!="test@test.com" or password!="test":
            return jsonify(msg="authentication error"), 401

        # user = User.find_by_email(email)

        # if not user or user.verify_password(password):
        #     return {'message': 'Wrong username or password'}

        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token)

        # print("success")
