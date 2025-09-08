from pydantic import BaseModel, EmailStr

class SendLoginEmailIn(BaseModel):
    email: EmailStr
