import { ObjectFalsum } from '../../../../src';
import { pruneNulls } from '../../../../src';

const falsum: ObjectFalsum = {
  notUndefined: 'someValue',
  undefinedValue: undefined,
  nullValue: null,
  emtpyList: [],
  obj: {
    notUndefined: 'someValue',
    undefinedValue: undefined,
    nullValue: null,
  },
  list: [
    {
      obj: {
        notUndefined: 'someValue',
        undefinedValue: undefined,
      },
    },
    undefined,
    'someValue',
    null,
  ],
  emptyObj: {},
};

describe('pruneNulls function', () => {
  it('should remove fields with undefined value', () => {
    const pruned = pruneNulls(falsum);
    expect(Object.keys(pruned).length).toBe(6);
  });

  it('should remove fields with undefined value in nested objects', () => {
    const pruned = pruneNulls(falsum) as ObjectFalsum;
    expect(Object.keys(pruned.obj).length).toBe(2);
  });

  it('should remove fields with undefined value in nested arrays', () => {
    const pruned = pruneNulls(falsum) as ObjectFalsum;
    expect(pruned.list.length).toBe(3);
  });
});
