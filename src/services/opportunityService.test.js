import { getAllOpportunities, getOneOpportunity, postOpportunity, putOpportunity, deleteOpportunity } from './opportunityService';

describe('CRUD tests', () => {
  const accessToken = 'some-auth-token';

  // Mock the fetch API so that we can control the responses in our tests
  const mockFetch = jest.fn();
  global.fetch = mockFetch;

  // Reset the mock after each test to avoid side effects
  afterEach(() => {
    mockFetch.mockReset();
  });

  test('Get all opportunities', async () => {
    const opportunities = [{ id: 'some-opportunity-id', name: 'Opportunity 1' }];
    const response = { status: 200, body: opportunities };
    mockFetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(response.body), status: response.status });

    const result = await getAllOpportunities(accessToken);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('localhost'), {
        method: 'GET',
        headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json', 'Content-Type': 'application/json' },
        withCredentials: true,
    });
    expect(result).toEqual(response);
    });

  test('Get one opportunity', async () => {
    const id = 'some-opportunity-id';
    const opportunity = { id, name: 'Opportunity 1' };
    const response = { status: 200, body: opportunity };
    mockFetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(response.body), status: response.status });

    const result = await getOneOpportunity(accessToken, id);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(id), {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json', 'Content-Type': 'application/json' },
      withCredentials: true,
    });
    expect(result).toEqual(response);
  });

  test('Create an opportunity', async () => {
    const opportunity = { name: 'New Opportunity' };
    const response = { status: 201, body: { ...opportunity, id: 'some-generated-id' } };
    mockFetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(response.body), status: response.status });

    const result = await postOpportunity(accessToken, opportunity);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('new'), {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json', 'Content-Type': 'application/json' },
      withCredentials: true,
      body: JSON.stringify(opportunity),
    });
    expect(result).toEqual(response);
  });

  test('Update an opportunity', async () => {
    const _id = 'some-opportunity-id';
    const opportunity = { _id, name: 'Opportunity 1' };
    const response = { status: 200, body: opportunity };
    mockFetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(response.body), status: response.status });

    const result = await putOpportunity(accessToken, opportunity);

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(_id), {
      method: 'PUT',
      headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json', 'Content-Type': 'application/json' },
      withCredentials: true,
      body: JSON.stringify(opportunity),
    });
    expect(result).toEqual(response);
    });

    test('Delete an opportunity', async () => {
        const id = 'some-opportunity-id';
        const response = { status: 204 };
        mockFetch.mockResolvedValueOnce({ json: jest.fn().mockResolvedValueOnce(response.body), status: response.status });

        const result = await deleteOpportunity(accessToken, id);

        expect(mockFetch).toHaveBeenCalledTimes(1);
        expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining(id), {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${accessToken}`, Accept: 'application/json', 'Content-Type': 'application/json' },
            withCredentials: true,
        });
        expect(result).toEqual(response);
    });
});
