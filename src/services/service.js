// const baseURL = 'https://backend-job-visualiser.onrender.com/api';
// const baseURL = 'https://localhost:3000/api';
const baseURL = 'https://job-tracker.jerome-baille.fr/api';

export async function getAllOpportunities(token) {
    const response = await fetch(baseURL,{
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json().then(data => ({status: response.status, body: data})))
    return response;
}

export async function getOneOpportunity(token, id) {
    const response = await fetch(`${baseURL}/job/${id}`,{
        method: 'GET',
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    .then((response) => response.json().then(data => ({status: response.status, body: data})))
    return response;
}

export async function postOpportunity(token, opportunity) {
    const response = await fetch(`${baseURL}/new`, {
        method: 'POST',
        withCredentials: true,
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
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.json().then(data => ({status: response.status, body: data})))
    return response;
}


// export opportunities as an excel spreadsheet
export async function exportOpportunities(selectedYear, selectedFormat, userId, token) {
    const response = await fetch(`${baseURL}/${selectedFormat}/export/${userId}/${selectedYear}`, {
      method: 'GET',
      withCredentials: true,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const blob = await response.blob();

    let filename;

    if(selectedFormat === 'excel') {
        filename = `opportunities-${Date.now()}.xlsx`;
    } else {
        filename = `opportunities-${Date.now()}.pdf`;
    }

    if (window.navigator.msSaveOrOpenBlob) {
      // For IE and Edge browsers
      window.navigator.msSaveBlob(blob, filename);
    } else {
      // For other browsers
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }  