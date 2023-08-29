import useAxiosInstance from '../utils/axiosInstance';
import { API_BASE_URL } from "../config/apiConfig";

export function useOpportunityService() {
  const axiosInstance = useAxiosInstance();
  /**
   * Makes an HTTP request with the given parameters using Axios.
   *
   * @param {string} url The URL to send the request to.
   * @param {string} method The HTTP method to use for the request.
   * @param {Object} [data] The data to include in the request body (for POST or PUT requests).
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   */
  async function request(url, method, data) {
    try {
      const response = await axiosInstance({
        method,
        url,
        data,
      });

      return {
        status: response.status,
        body: response.data,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  /**
   * Gets all opportunities from the server.
   *
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   */
  async function getAllOpportunities() {
    return request(API_BASE_URL, "GET");
  }

  /**
   * Gets a single opportunity from the server.
   *
   * @param {string} id The ID of the opportunity to get.
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   */
  async function getOneOpportunity(id) {
    return request(`${API_BASE_URL}/job/${id}`, "GET");
  }

  /**
   * Posts a new opportunity to the server.
   *
   * @param {Object} opportunity The opportunity to post.
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   */
  async function postOpportunity(opportunity) {
    return request(`${API_BASE_URL}/new`, "POST", opportunity);
  }

  /**
   * Updates an existing opportunity on the server.
   *
   * @param {Object} opportunity The opportunity to update.
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   */
  async function putOpportunity(opportunity) {
    return request(`${API_BASE_URL}/job/${opportunity._id}`, "PUT", opportunity);
  }

  /**
   * Deletes an existing opportunity from the server.
   *
   * @param {string} id The ID of the opportunity to delete.
   * @returns {Object} An object with the HTTP response status code and response body.
   * @throws {Error} If the HTTP response status code is not in the 200 range.
   */
  async function deleteOpportunity(id) {
    return request(`${API_BASE_URL}/job/${id}`, "DELETE");
  }

  /**
   * Exports opportunities as an Excel or PDF spreadsheet.
   *
   * @param {string} selectedYear The selected year to export opportunities for.
   * @param {string} selectedFormat The selected format to export opportunities as (either "excel" or "pdf").
   * @param {string} userId The ID of the user exporting the opportunities.
   * @returns {void}
   * @throws {Error} If there is an error with the HTTP request.
   */
  async function exportOpportunities(selectedYear, selectedFormat, userId) {
    const url = `${API_BASE_URL}/${selectedFormat}/export/${userId}/${selectedYear}`;

    try {
      const response = await axiosInstance({
        method: "GET",
        url,
        responseType: "blob",
      });

      const file = new Blob([response.data], { type: response.headers["content-type"] });

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
  return { getAllOpportunities, getOneOpportunity, postOpportunity, putOpportunity, deleteOpportunity, exportOpportunities };
}