import { convertPLNToUSD } from './../convertPLNToUSD';

describe('ConvertPLNtoUSD', () => {
  it('should return proper value when good input', () => {
    expect(convertPLNToUSD(1)).toBe('$0.29');
    expect(convertPLNToUSD(2)).toBe('$0.57');
    expect(convertPLNToUSD(20)).toBe('$5.71');
    expect(convertPLNToUSD(12)).toBe('$3.43');
  });

  it('should rerutn NaN when input is TEXT', () => {
    expect(convertPLNToUSD('abc')).toBeNaN();
    expect(convertPLNToUSD('66')).toBeNaN();
    expect(convertPLNToUSD('-250')).toBeNaN();
  });

  it('should return NaN when input is NULL', () => {
    expect(convertPLNToUSD()).toBeNaN();
  });

  it('should return $0.00 when input is minus', () => {
    expect(convertPLNToUSD(-1)).toBe('$0.00');
    expect(convertPLNToUSD(-22)).toBe('$0.00');
    expect(convertPLNToUSD(-48)).toBe('$0.00');
    expect(convertPLNToUSD(-221)).toBe('$0.00');
  });

  it('should return "Error" when input is not a text nor number', () => {
    expect(convertPLNToUSD({})).toBe('Error');
    expect(convertPLNToUSD([])).toBe('Error');
    expect(convertPLNToUSD(null)).toBe('Error');
    expect(convertPLNToUSD(function() {})).toBe('Error');
  });

});