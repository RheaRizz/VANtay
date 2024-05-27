
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as vanService from './vanService';

describe('vanService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should create a van', async () => {
    const vanData = { model: 'Van Model', plate_no: 'ABC123', capacity: 10 };
    const responseData = { id: 1, ...vanData };

    mock.onPost(`${vanService.API_BASE_URL}/van`, vanData).reply(200, responseData);

    const result = await vanService.createVan(vanData);
    expect(result).toEqual(responseData);
  });

  it('should fetch vans', async () => {
    const vansData = [{ id: 1, model: 'Van 1' }, { id: 2, model: 'Van 2' }];

    mock.onGet(`${vanService.API_BASE_URL}/van`).reply(200, vansData);

    const result = await vanService.getVans();
    expect(result).toEqual(vansData);
  });

  it('should update a van', async () => {
    const vanId = 1;
    const vanData = { model: 'Updated Van Model' };
    const responseData = { id: vanId, ...vanData };

    mock.onPut(`${vanService.API_BASE_URL}/van/${vanId}`, vanData).reply(200, responseData);

    const result = await vanService.updateVan(vanId, vanData);
    expect(result).toEqual(responseData);
  });

  it('should delete a van', async () => {
    const vanId = 1;

    mock.onDelete(`${vanService.API_BASE_URL}/van/${vanId}`).reply(204);

    await vanService.deleteVan(vanId);
    expect(mock.history.delete.length).toBe(1);
    expect(mock.history.delete[0].url).toBe(`${vanService.API_BASE_URL}/van/${vanId}`);
  });

  it('should fetch a van by ID', async () => {
    const vanId = 1;
    const vanData = { id: vanId, model: 'Van 1' };

    mock.onGet(`${vanService.API_BASE_URL}/van/${vanId}`).reply(200, vanData);

    const result = await vanService.getVanById(vanId);
    expect(result).toEqual(vanData);
  });
});
