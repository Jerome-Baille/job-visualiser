import { API_BASE_URL } from "../config/apiConfig";

// Constants for headers and options that can be reused across requests.
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const options = {
  withCredentials: true,
};


/**
 * Makes an HTTP request with the given parameters.
 *
 * @param {string} url The URL to send the request to.
 * @param {string} token The authorization token to use for the request.
 * @param {string} method The HTTP method to use for the request.
 * @param {Object} [data] The data to include in the request body (for POST or PUT requests).
 * @returns {Object} An object with the HTTP response status code and response body.
 * @throws {Error} If the HTTP response status code is not in the 200 range.
 */
async function request(url, token, method, data) {
  const requestOptions = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      ...headers,
    },
    ...options,
  };
  if (data) {
    requestOptions.body = JSON.stringify(data);
  }
  try {
    const response = await fetch(url, requestOptions);
    const body = await response.json();
    if (response.status >= 200 && response.status < 300) {
        return { status: response.status, body };
    } else {
        throw new Error(`HTTP error: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

/**
 * Gets all opportunities from the server.
 *
 * @param {string} token The authorization token to use for the request.
 * @returns {Object} An object with the HTTP response status code and response body.
 * @throws {Error} If the HTTP response status code is not in the 200 range.
 */
export async function getAllOpportunities(token) {
  return request(API_BASE_URL, token, "GET");
}


/**
 * Gets a single opportunity from the server.
 *
 * @param {string} token The authorization token to use for the request.
 * @param {string} id The ID of the opportunity to get.
 * @returns {Object} An object with the HTTP response status code and response body.
 * @throws {Error} If the HTTP response status code is not in the 200 range.
 */
export async function getOneOpportunity(token, id) {
  return request(`${API_BASE_URL}/job/${id}`, token, "GET");
}

/**
 * Posts a new opportunity to the server.
 * @param {string} token The authorization token to use for the request.
 * @param {Object} opportunity The opportunity to post.
 * @returns {Object} An object with the HTTP response status code and response body.
 * @throws {Error} If the HTTP response status code is not in the 200 range.
 */
export async function postOpportunity(token, opportunity) {
  return request(`${API_BASE_URL}/new`, token, "POST", opportunity);
}

/**
 * Updates an existing opportunity on the server.
 * @param {string} token The authorization token to use for the request.
 * @param {Object} opportunity The opportunity to update.
 * @returns {Object} An object with the HTTP response status code and response body.
 * @throws {Error} If the HTTP response status code is not in the 200 range.
 */
export async function putOpportunity(token, opportunity) {
  return request(`${API_BASE_URL}/job/${opportunity._id}`, token, "PUT", opportunity);
}

/**
 * Deletes an existing opportunity from the server.
 * @param {string} token The authorization token to use for the request.
 * @param {string} id The ID of the opportunity to delete.
 * @returns {Object} An object with the HTTP response status code and response body.
 * @throws {Error} If the HTTP response status code is not in the 200 range.
 */
export async function deleteOpportunity(token, id) {
  return request(`${API_BASE_URL}/job/${id}`, token, "DELETE");
}


/**
 * Exports opportunities as an Excel or PDF spreadsheet.
 *
 * @param {string} selectedYear The selected year to export opportunities for.
 * @param {string} selectedFormat The selected format to export opportunities as (either "excel" or "pdf").
 * @param {string} userId The ID of the user exporting the opportunities.
 * @param {string} token The authorization token to use for the request.
 * @returns {void}
 * @throws {Error} If there is an error with the HTTP request.
 */
export async function exportOpportunities(selectedYear, selectedFormat, userId, token) {
    const url = `${API_BASE_URL}/${selectedFormat}/export/${userId}/${selectedYear}`;
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            ...headers,
        },
        ...options,
    };
    try {
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
            throw new Error(`Failed to export opportunities: ${response.statusText}`);
        }

        const file = await response.blob();

        let filename;
        if (selectedFormat === "excel") {
            filename = `Jerome_BAILLE_-_Tableau_de_bord_des_candidature_-_${Date.now()}.xlsx`;
        } else {
            filename = `Jerome_BAILLE_-_Tableau_de_bord_des_candidature_-_${Date.now()}.pdf`;
        }

        if (window.navigator.msSaveOrOpenBlob) {
            // For IE and Edge browsers
            window.navigator.msSaveBlob(file, filename);
        } else {
            // For other browsers
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(file);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(link.href);
            }, 0);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Failed to export opportunities: ${error.message}`);
    }
  }  