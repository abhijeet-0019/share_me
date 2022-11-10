import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { client } from '../client'

export const createOrGetUser = async (response) => {
    localStorage.setItem('user', JSON.stringify(response.credential))
    console.log(response.credential)
    const {name, picture, sub} = jwt_decode(response.credential);

    const doc = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    }

    client.createIfNotExists(doc)
        .then(()=> )
    // saving user to database

    console.log(name, picture, sub);
}