import {StrengthPipe} from './strength.pipe';

describe('StrengthPipe', () => {

  it('should diplay weak if strength is 5', () => {
    const pipe = new StrengthPipe();
    const val = pipe.transform(5);

    expect(val).toEqual('5 (weak)');
  });

    it('should diplay strong if strength is 10', () => {
      const pipe = new StrengthPipe();
      const val = pipe.transform(10);

      expect(val).toEqual('10 (strong)');
  });
});
