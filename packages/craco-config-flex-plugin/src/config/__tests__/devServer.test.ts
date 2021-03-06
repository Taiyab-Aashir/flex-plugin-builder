import devServer, { Configuration } from '../devServer';
import * as utilsFs from '../../utils/fs';

describe('devServer', () => {
  const defaultContentBase = 'entry1';

  const assertConfig = (config: Configuration, hasDefault = true) => {
    expect(Array.isArray(config.contentBase)).toBeTruthy();

    if (hasDefault) {
      expect(config.contentBase[0]).toEqual(defaultContentBase);
    }
    const index = hasDefault ? 1 : 0;
    expect(config.contentBase[index].indexOf('flex-plugin-scripts/dev_assets') ).not.toEqual(-1);
  };

  it('should add devAssets when contentBase is array', () => {
    const config = devServer({
      contentBase: [defaultContentBase],
    });

    assertConfig(config);
  });

  it('should add devAssets when contentBase is string', () => {
    const config = devServer({
      contentBase: defaultContentBase,
    });

    assertConfig(config);
  });

  it('should add devAssets when contentBase is undefined', () => {
    const config = devServer({});

    assertConfig(config, false);
  });

  it('should load custom config', () => {
    const loadFile = jest
      .spyOn(utilsFs, 'loadFile')
      .mockReturnValue({
        devServer: { public: 'bar' },
      });

    const config = devServer({});

    assertConfig(config, false);
    expect(config.public).toEqual('bar');

    loadFile.mockRestore();
  });
});
