from pydantic import BaseModel, EmailStr

class SendLoginEmailIn(BaseModel):
    email: EmailStr
    
    
class VerifyOTPIn(BaseModel):
    email: EmailStr
    token: str
