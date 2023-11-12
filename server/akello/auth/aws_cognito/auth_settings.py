from pydantic_settings import BaseSettings
from pydantic.types import Any
from typing import Optional
from fastapi_cognito import CognitoAuth, CognitoSettings
from pydantic import BaseModel, HttpUrl, Field
from akello.settings import configs

AWS_COGNITO_APP_CLIENT_ID = configs['environment_variables']['AWS_COGNITO_APP_CLIENT_ID']['value']
AWS_COGNITO_USER_POOL_ID = configs['environment_variables']['AWS_COGNITO_USER_POOL_ID']['value']
AWS_REGION = configs['environment_variables']['AWS_REGION']['value']


class Settings(BaseSettings):
    check_expiration: bool = True
    jwt_header_prefix: str = "Bearer"
    jwt_header_name: str = "Authorization"
    userpools: dict[str, dict[str, Any]] = {
        "us": {
            "region": AWS_REGION,
            "userpool_id": AWS_COGNITO_USER_POOL_ID,
            "app_client_id": AWS_COGNITO_APP_CLIENT_ID
        },
    }


class CognitoTokenCustom(BaseModel):
    origin_jti: Optional[str] = None
    cognito_id: str = Field(alias="sub")
    event_id: Optional[str] = None
    token_use: str
    scope: Optional[str] = None
    auth_time: int
    iss: HttpUrl
    exp: int
    iat: int
    jti: str
    client_id: Optional[str] = None
    username: Optional[str] = None
    email: str
