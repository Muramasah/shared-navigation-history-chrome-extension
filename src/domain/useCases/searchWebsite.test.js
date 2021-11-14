import { SearchWebsite } from './searchWebsite';

describe('SearchWebsite should', () => {
  const websiteIndexRepository = { search: jest.fn() };
  const useCase = new SearchWebsite(websiteIndexRepository);

  test('execute a callback with the given query and search results', async () => {
    const query = 'query';
    const callback = jest.fn();
    const results = [{ url: 'url', title: 'title' }];

    websiteIndexRepository.search = jest.fn().mockReturnValueOnce(results);

    await useCase.execute(query, callback);

    expect(websiteIndexRepository.search).toBeCalledWith(query);
    expect(callback).toBeCalledWith(query, results);
  });
});
