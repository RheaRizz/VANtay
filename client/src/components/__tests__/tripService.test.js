
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as tripService from './services//tripService';

describe('tripService', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.restore();
  });

  it('should create a trip', async () => {
    const tripData = { name: 'Test Trip' };
    const responseData = { id: 1, ...tripData };

    mock.onPost(`${tripService.API_BASE_URL}/trip`).reply(200, responseData);

    const result = await tripService.createTrip(tripData);
    expect(result).toEqual(responseData);
  });

  it('should fetch vans', async () => {
    const vansData = [{ id: 1, model: 'Van 1' }];

    mock.onGet(`${tripService.API_BASE_URL}/van`).reply(200, vansData);

    const result = await tripService.fetchVans();
    expect(result).toEqual(vansData);
  });

  it('should fetch trips', async () => {
    const tripsData = [{ id: 1, name: 'Trip 1' }];

    mock.onGet(`${tripService.API_BASE_URL}/trip`).reply(200, tripsData);

    const result = await tripService.fetchTrips();
    expect(result).toEqual(tripsData);
  });

  it('should delete a trip', async () => {
    const responseData = { message: 'Trip deleted' };

    mock.onDelete(`${tripService.API_BASE_URL}/trip/1`).reply(200, responseData);

    const result = await tripService.deleteTrip(1);
    expect(result).toEqual(responseData);
  });

  it('should update a trip', async () => {
    const tripData = { name: 'Updated Trip' };
    const responseData = { id: 1, ...tripData };

    mock.onPut(`${tripService.API_BASE_URL}/trip/1`).reply(200, responseData);

    const result = await tripService.updateTrip(1, tripData);
    expect(result).toEqual(responseData);
  });

  it('should fetch trip by ID', async () => {
    const tripData = { id: 1, name: 'Trip 1' };

    mock.onGet(`${tripService.API_BASE_URL}/trip/1`).reply(200, tripData);

    const result = await tripService.fetchTripById(1);
    expect(result).toEqual(tripData);
  });
});
