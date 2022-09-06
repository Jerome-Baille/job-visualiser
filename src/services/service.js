const baseURL = '/api';
// const baseURL = 'http://localhost:3000/api';

export async function getAllOpportunities(token) {
    const response = await fetch(baseURL,{
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    return response;
}

export async function getOneOpportunity(token, id) {
    const response = await fetch(`${baseURL}/job/${id}`,{
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json())
    return response;
}

export async function postOpportunity(token, opportunity) {
    const response = await fetch(`${baseURL}/new`, {
        method: 'POST',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opportunity)
    })
    .then((response) => response.json().then(data => ({status: response.status, body: data})))
    return response;
}

export async function putOpportunity(token, opportunity) {
    const response = await fetch(`${baseURL}/job/${opportunity._id}`, {
        method: 'PUT',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...opportunity
        })
    })
    .then((response) => response.json().then(data => ({status: response.status, body: data})))
    return response;
}

export async function deleteOpportunity(token, id) {
    const response = await fetch(`${baseURL}/job/${id}`, {
        method: 'DELETE',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json().then(data => ({status: response.status, body: data})))
    return response;
}