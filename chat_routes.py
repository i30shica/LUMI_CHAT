from flask import Blueprint, request, jsonify, current_app

bp = Blueprint('chat_routes', __name__)

@bp.route('/api/chat/history', methods=['GET'])
def get_chat_history():
    user_id = request.args.get('user_id')
    chatroom_id = request.args.get('chatroom_id')

    # Fetch messages from DB
    messages = current_app.db.messages.find(
        {'$or': [{'sender_id': user_id}, {'receiver_id': user_id}, {'chatroom_id': chatroom_id}]}
    )
    return jsonify([msg for msg in messages])

@bp.route('/api/chat/upload', methods=['POST'])
def upload_media():
    file = request.files['file']
    # file upload 
    media_url = save_media(file)
    return jsonify({'media_url': media_url})
