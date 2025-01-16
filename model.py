from datetime import datetime

class Chat:
    def __init__(self, db):
        self.db = db

    def create_message(self, sender_id, receiver_id, content, media_url=None):
        message = {
            'sender_id': sender_id,
            'receiver_id': receiver_id,
            'content': content,
            'media_url': media_url,
            'timestamp': datetime.utcnow()
        }
        self.db.messages.insert_one(message)

    def fetch_messages(self, chatroom_id):
        return list(self.db.messages.find({'chatroom_id': chatroom_id}))
