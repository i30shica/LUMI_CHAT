from flask_socketio import emit, join_room, leave_room
from datetime import datetime
from flask import current_app

@socketio.on('send_message')
def handle_send_message(data):
    message = {
        'sender_id': data['sender_id'],
        'receiver_id': data.get('receiver_id'),
        'chatroom_id': data.get('chatroom_id'),
        'content': data['content'],
        'timestamp': datetime.utcnow(),
        'media_url': data.get('media_url')
    }
    # Save message to DB
    current_app.db.messages.insert_one(message)

    # Emit the message to the relevant room
    room = data.get('receiver_id') or data.get('chatroom_id')
    emit('receive_message', message, room=room)

@socketio.on('join_room')
def handle_join_room(data):
    join_room(data['room'])
    emit('room_notification', {'msg': f"{data['username']} has joined the room"}, room=data['room'])

@socketio.on('leave_room')
def handle_leave_room(data):
    leave_room(data['room'])
    emit('room_notification', {'msg': f"{data['username']} has left the room"}, room=data['room'])
