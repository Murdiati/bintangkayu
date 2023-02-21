import jwt_decode from "jwt-decode";

export function tokenDecode(token) {
    jwt_decode(token)
}