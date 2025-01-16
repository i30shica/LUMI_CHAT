from flask import Flask
from flask_socketio import SocketIO
from pymongo import MongoClient

socketio = SocketIO()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config')  # Load configurations

    # Initialize extensions
    socketio.init_app(app)
    client = MongoClient(app.config['MONGO_URI'])
    app.db = client[app.config['DB_NAME']]

    # Register Blueprints
    from chat_routes import chat_routes
    app.register_blueprint(chat_routes.bp)

    return app
