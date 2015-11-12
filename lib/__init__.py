import base64
import hashlib
import random

def get_guid():
    """Return a new guid. May not be unique. Check for existance before using"""
    guid = base64.b64encode(hashlib.md5(str(random.randint(1, 10e10)).encode('utf-8')).hexdigest(), '-_')[:11].lower()
    return guid
