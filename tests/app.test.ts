import envs from '../src/config/envs';
import Server  from '../src/presentation/server';

jest.mock('../src/presentation/server');

describe('Test on App', () => {

  test('Should call server start with arguments and start', async () => {

    await import('../src/app');

    expect(Server).toHaveBeenCalledTimes(1);
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      router: expect.any(Function),
      public_path: envs.PUBLIC_PATH,
    });
    expect(Server.prototype.start).toHaveBeenCalledWith();

  });

});